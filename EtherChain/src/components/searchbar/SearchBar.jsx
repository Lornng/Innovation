// import React from 'react'
// import './searchbar.css';
// import SearchIcon from '@mui/icons-material/Search';


// const SearchBar = ({placeholder, data}) => {
//   return (
//     <div className='search'>
//             <div className='searchInput'>
//                 <input type='text' placeholder={placeholder}/>
//                 <a href="#top_table_id">
//                     <button className='searchButton'>
//                       <SearchIcon />
//                     </button>
//                 </a>
//             </div>
//         </div>
//   )
// }

// export default SearchBar


import { useState } from 'react'
import React from 'react'
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import TopTable from '../tables/top_table'; 


// add onclick behavior that retrieves information about address

// //function to handle search button click? 
// //use UseEffect
function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [responseData, setResponseData] = useState(null);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        axios
          .get(`http://127.0.0.1:8000/get_node/${inputValue}`) // Dynamic API URL using inputValue, replace with appropriate API function
          .then((response) => {
            setResponseData(response.data);
          })
          .catch((error) => {
            console.error("Error in getting response data:", error);
          });
    };

    const address = responseData && responseData.node.addressId; //node address
    const type = responseData && responseData.node.type; //node type
    const hash = responseData && responseData.node.hash; //node hash

    return (
        <div className='search'>
            <div className='searchInput'>
                 <input type='text' placeholder="Insert wallet address..." onChange={handleInputChange} />
                 <a href="#top_table_id">
                    <button className='searchButton' onClick={handleButtonClick}>
                        <SearchIcon />
                    </button>
                </a>
                <TopTable address={address} type={type} /> 
                {/*Just for testing if it saves the input value, remove later*/}
                {/* <p style={{color: "white"}}>Input value: {inputValue}</p> */}
                {/*Just for testing if it saves the input value, remove later*/}
                {responseData && responseData.node && (
                    <div>
                        <p style={{color: "white"}}>Response Data: </p>
                        <p style={{color: "white"}}>Address: {address}</p>
                        <p style={{color: "white"}}>Hash: {hash}</p>
                    </div>
                )}
             </div>
        </div>
    )
}

export default SearchBar;