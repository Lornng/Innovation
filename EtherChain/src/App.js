import React from 'react'

import { Footer, Header, About, Search, NetworkViz } from './containers';
import { Navbar } from './components';
import './App.css';

const App = () => {
  return (
    <div className="App">
        <div className="gradient__bg"> {/*consider changing this to vid background */}
            <Navbar />
            <Header />
        </div>
        <About />
        {/* search section here */}
        <Search />
        <NetworkViz />
        <Footer />
    </div>
  )
}

export default App