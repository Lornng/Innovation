import React from 'react'

import { Footer, Header, About, Search, NetworkViz } from './containers';
import { Navbar } from './components';
import './App.css';
import CollapsibleTable from './components/tables/bot_table';
import TableComponent from './components/tables/top_table';
import VizButton from './components/tables/viz_button';

const App = () => {
  return (
    <div className="App">
        <div className="gradient__bg"> {/*consider changing this to vid background */}
            <Navbar />
            <Header />
        </div>
        <About />
        {/* search section and table section here */}
        <Search />
        <TableComponent/>
        <CollapsibleTable/>
        {/* <VizButton/> */}
        <NetworkViz />
        <Footer />
    </div>
  )
}

export default App