import React from 'react'
import './network-viz.css'
import { NetworkVisualization } from '../../components'

const NetworkViz = () => {

  const data = {
    wallets: ['wallet1', 'wallet2', 'wallet3', 'wallet4', 'wallet5', 'wallet6', 'wallet7'],
    transactions: [
      { from: 'wallet1', to: 'wallet2', tokens: 10 },
      { from: 'wallet1', to: 'wallet3', tokens: 5 },
      { from: 'wallet1', to: 'wallet4', tokens: 10 },
      { from: 'wallet1', to: 'wallet5', tokens: 12 },
      { from: 'wallet1', to: 'wallet6', tokens: 10 },
      { from: 'wallet1', to: 'wallet7', tokens: 12 },
    ],
  };

  return (
    <div className='ether_visualization section__padding'  id="visualization">
       <div className="ether__vizualization-heading">
            <h1 className="gradient__text">Visualization</h1>
        </div> 
        <svg className='network' id='network_container'>
        <NetworkVisualization data={data} />
      </svg>
    </div>
  )
}

export default NetworkViz