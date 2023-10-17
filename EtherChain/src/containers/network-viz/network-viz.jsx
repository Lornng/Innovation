import React, { useEffect, useState } from 'react';
import './network-viz.css'
import { NetworkVisualization } from '../../components'
import axios from 'axios';

const NetworkViz = () => {
  let data = {wallets:[],
  transactions:[]}
  // const data = {
  //   wallets: ['wallet1', 'wallet2', 'wallet3', 'wallet4', 'wallet5', 'wallet6', 'wallet7', 'wallet8'],
  //   transactions: [
  //     { from: 'wallet1', to: 'wallet2', tokens: 10 },
  //     { from: 'wallet1', to: 'wallet3', tokens: 5 },
  //     { from: 'wallet1', to: 'wallet4', tokens: 10 },
  //     { from: 'wallet1', to: 'wallet5', tokens: 12 },
  //     { from: 'wallet1', to: 'wallet6', tokens: 10 },
  //     { from: 'wallet1', to: 'wallet7', tokens: 12 },
  //     { from: 'wallet7', to: 'wallet8', tokens: 10 },
  //   ],
  // };

  const [addressId, setAddressIds] = useState([]);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    // Fetch the addressIds using Axios when the component mounts
    axios
      .get('http://127.0.0.1:8000/getAllNodes')
      .then(response => {
        // let data = {wallets:[]}
        const addressId = response.data;
        for(let i = 0; i<addressId.nodes.length; i++){
          data.wallets.push(addressId.nodes[i].addressId)
        }

        // if (data.addressId) {  
        //   setAddressIds(data.addressId);

        //   // Create wallets based on addressIds
        //   const generatedWallets = data.addressId.map((addressId, index) => {
        //     return {
        //       id: `wallet_${addressId}`,
        //       // addressId: addressId,
        //       // Add other wallet properties as needed
        //     };
        //   });
        //   setWallets(generatedWallets);
        // }
      })
      .catch(error => {
        console.error('Error fetching addressIds:', error);
      });

      // console.log(data)   
  }, []);


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