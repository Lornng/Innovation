import React from 'react'
import './search.css'
import { SearchBar } from '../../components'
import CollapsibleTable from '../../components/tables/bot_table'

const Search = () => {
  return (
    <div className="ether__search section__padding" id="search">
       <div className="ether__search-heading">
            <h1 className="gradient__text">Wallet Address Search</h1>
        </div> 
        <div className="ether__search-container">
            <SearchBar />
        </div>
    </div>
  )
}

export default Search