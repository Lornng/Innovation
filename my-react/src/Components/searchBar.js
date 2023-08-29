import React from 'react'
import "./searchBar.css";
import SearchIcon from '@mui/icons-material/Search';


function SearchBar({placeholder, data}) {
    return(
        <div className='search'>
            <div className='searchInput'>
                <input type='text' placeholder={placeholder}/>
                    <button className='searchButton'>
                    <SearchIcon />
                    </button>
            </div>
        </div>
    );
}

export default SearchBar;