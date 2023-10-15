import React from 'react'
import './search.css'
import { SearchBar } from '../../components'

const Search = () => {
  return (
    <div className="ether__search section__padding" id="search">
       <div className="ether__search-heading">
            <h1 className="gradient__text">Wallet Address Search</h1>
        </div> 
        <div className="ether__search-container">
            <SearchBar placeholder="Insert wallet address..." />
        </div>
    </div>
  )
}

export default Search