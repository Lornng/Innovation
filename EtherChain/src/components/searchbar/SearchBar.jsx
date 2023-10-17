import { useState, useEffect  } from 'react';
import React from 'react';
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import TopTable from '../tables/top_table';
import NetworkViz from '../../containers/network-viz/network-viz';
import { Global } from '@emotion/react';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError(null); // Clear any previous error when input changes
  };

  const handleButtonClick = () => {
    axios
      .get(`http://127.0.0.1:8000/get_node/${inputValue}`)
      .then((response) => {
        if (!response.data || !response.data.node) {
          setError('No data received. Please try again.');
        } else {
          setResponseData(response.data);
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
  };

  const address = responseData && responseData.node && responseData.node.addressId;
  const type = responseData && responseData.node && responseData.node.type;
  const hash = responseData && responseData.node && responseData.node.hash;

  return (
    <div className="search">
      <div className="searchInput">
        <input type="text" placeholder="Insert wallet address..." onChange={handleInputChange} />
        <a href="#top_table_id">
          <button className="searchButton" onClick={handleButtonClick}>
            <SearchIcon />
          </button>
        </a>
        <TopTable address={address} type={type} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* {responseData && responseData.node && (
          <div>
            <p style={{ color: 'white' }}>Response Data: </p>
            <p style={{ color: 'white' }}>Address: {address}</p>
            <p style={{ color: 'white' }}>Hash: {hash}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SearchBar;