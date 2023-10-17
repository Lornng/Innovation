import React, { useEffect, useState } from 'react';
import './network-viz.css';
import { NetworkVisualization } from '../../components';
import axios from 'axios';

const NetworkViz = () => {
  const [data, setData] = useState({
    wallets: [],
    transactions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the addressIds using Axios when the component mounts
    axios
      .get('http://127.0.0.1:8000/getAllNodes')
      .then((response) => {
        const addressId = response.data;
        const wallets = addressId.nodes.map((node) => node.addressId);
        axios
          .get('http://127.0.0.1:8000/getAllNodesAndRelationships')
          .then((response) => {
            const fromTo = response.data;
            const transactions = fromTo.r.map((relation) => ({
              from: relation.from,
              to: relation.to,
            }));
            setData({ wallets, transactions });
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching addressIds:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="ether_visualization sectionpadding" id="visualization">
      <div className="ethervizualization-heading">
        <h1 className="gradient__text">Visualization</h1>
      </div>
      {loading ? (
        // You can render a loading indicator or other content here
        <p>Loading...</p>
      ) : (
        <svg className="network" id="network_container">
          <NetworkVisualization data={data} />
        </svg>
      )}
    </div>
  );
};

export default NetworkViz;