import React from 'react'
import './about.css'
import {Feature} from '../../components'

//contains all the titles and text data of the about page
const featuresData = [
    {
        title: "Wallet Address Search",
        text: "Users can input a wallet address in the search bar to retrieve basic information about the address. The website will display details such as the wallet's balance and other relevant data related to the address."
    },
    {
        title: "Graph Display",
        text: "Upon searching for a wallet address, the system will display a directed graph, where each node represents a wallet address, and each edge represents a transaction between connected addresses."
    },
    {
        title: "Graph Interactions",
        text: "Users can interact with the graph and explore the next/previous hop of connected addresses (e.g., clicking on nodes to explore further transaction paths)."
    },
    {
        title: "Transaction Details Display",
        text: "The website will present relevant detailed transaction information in a tabular format."
    },
    {
        title: "Graph Database",
        text: "All transaction data needs to be stored in a graph database for efficient retrieval and visualization."
    }

]

const About = () => {
  return (
    <div className="ether__about section__padding" id="about">
       <div className="ether__about-heading">
            <h1 className="gradient__text">Core functional features</h1>
        </div> 
        <div className="ether__about-container">
            {featuresData.map((item, index) => (    
                <Feature title={item.title} text={item.text} key={item.title + index} />
            ))}
        </div>
    </div>
  )
}

export default About