import React from 'react'
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = ({placeholder, data}) => {
  return (
    <div className='search'>
            <div className='searchInput'>
                <input type='text' placeholder={placeholder}/>
                <a href="#top_table_id">
                    <button className='searchButton'>
                      <SearchIcon />
                    </button>
                </a>
            </div>
        </div>
  )
}

export default SearchBar