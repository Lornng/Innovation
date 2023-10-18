import { useState } from 'react'
import React from 'react'
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import TopTable from '../tables/top_table'; 
import CollapsibleTable from '../tables/bot_table';


// add onclick behavior that retrieves information about address

// //use UseEffect
function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [responseNode, setResponseNode] = useState(null);
    const [responseRelation, setResponseRelation] = useState([]);
    const [error, setError] = useState(null);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    //function to handle all the logic when the search button is pressed.
    const handleButtonClick = () => {
      // Clear the previous data before making a new API request
      setResponseRelation([]);      

      axios
        .get(`http://127.0.0.1:8000/get_node/${inputValue}`)
        .then((response) => {
          if (!response.data || !response.data.node) {
            setError('No data received. Please try again.');
          } else {
            setResponseNode(response.data);
            if (response.data.node.addressId === inputValue) {
              setError(null);
              global.currentId = inputValue;
            } else {
              setError('The received address does not match the input.');
            }
          }
        })
        .catch((error) => {
          console.error('Error in getting response data:', error);
          setError('An error occurred while fetching data. Please try again later.');
        });
        
        //retrieve the the related node and relationship
        axios
          .get(`http://127.0.0.1:8000/get_related_nodes/${inputValue}`) // Dynamic API URL using inputValue, replace with appropriate API function
          .then((response) => {
            setResponseRelation(response.data.data);
          })
          .catch((error) => {
            console.error("Error in getting response data:", error);
            setError('An error occurred while fetching data. Please try again later.');
          });
    };

    const fromNodeAddress = responseNode && responseNode.node.addressId;
    const fromNodeType = responseNode && responseNode.node.type;

    return (
        <div className='search'>
            <div className='searchInput'>
                 <input type='text' placeholder="Insert wallet address..." onChange={handleInputChange} />
                 <a href="#top_table_id">
                    <button className='searchButton' onClick={handleButtonClick}>
                        <SearchIcon />
                    </button>
                </a>
              </div>
              {/* Only appear when data input is available */}
              <div className='tablecontainer'>
                {fromNodeAddress && fromNodeType && (
                  <TopTable address={fromNodeAddress} type={fromNodeType} />
                )}
                {responseRelation && responseRelation.length > 0 && (
                  <CollapsibleTable data={responseRelation} />
                )}
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
             </div>
    )
}

export default SearchBar;