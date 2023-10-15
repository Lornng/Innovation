import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Bviz.css';

const BlockchainVisualization = ({ data }) => {
  const svgRef = useRef(null);
   // Define width and height for the SVG canvas
   const width = 1200;  // Set your desired width
   const height = 800; // Set your desired height

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define your data preprocessing and graph creation logic here
    // This might involve creating nodes, links, and applying force simulation

    // Example: Create a simple circle for each node
    const nodes = data.wallets.map(wallet => ({ id: wallet }));
    const links = data.transactions.map(transaction => ({
      source: transaction.from,
      target: transaction.to,
      tokens: transaction.tokens,
    }));

    const simulation = d3.forceSimulation(nodes)
      // Define force properties (e.g., charge, link distance)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw nodes and links
    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', 10) // Adjust node radius as needed
      .call(d3.drag() /* Enable dragging behavior if desired */);

    simulation.on('tick', () => {
      // Update node and link positions on each tick of the simulation
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }, [data]);

  return (
    <svg ref={svgRef}>
      {/* Add any additional SVG elements if needed */}
    </svg>
  );
};

export default BlockchainVisualization;
