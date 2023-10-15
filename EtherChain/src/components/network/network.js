import React from 'react';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './network.css';

const NetworkVisualization = ({ data }) => {
  // Create a reference to the SVG element
  const svgRef = useRef(null);

  // Initialization of variables for dimensions and forces
  const width = window.innerWidth * 0.75 ;
  const height = window.innerHeight * 0.9;
  // const height = document.getElementById('network_container').getAttribute("height");
  // const width = document.getElementById('network_container').getAttribute("width");
  let strength = 0;
  let labelBackgroundWidth = 0;
  let labelBackgroundHeight = 0;
  let labelY = 0;
  let labelX = 0;
  let labelTextY = 0;
  let labelTextX = 0;

  // Determine values based on the screen width
  if (width <= 550) {
    strength = -1500;
    labelBackgroundWidth = 90;
    labelBackgroundHeight = 25;
    labelY = 45;
    labelX = 50;
    labelTextY = 20;
    labelTextX = 47;
  } else if (width <= 1000) {
    strength = -3000;
    labelBackgroundWidth = 90;
    labelBackgroundHeight = 25;
    labelY = 45;
    labelX = 50;
    labelTextY = 20;
    labelTextX = 47;
  } else {
    strength = -5000;
    labelBackgroundWidth = 100;
    labelBackgroundHeight = 30;
    labelY = 64;
    labelX = 50;
    labelTextY = 22;
    labelTextX = 50;
  }

  // useEffect to manage D3.js visualization
  useEffect(() => {
    // Select the SVG element using the reference
    const svg = d3.select(svgRef.current);

    // Create nodes and links based on the data prop
    const nodes = data.wallets.map(wallet => ({ id: wallet }));
    const links = data.transactions.map(transaction => ({
      source: transaction.from,
      target: transaction.to,
      tokens: transaction.tokens,
    }));

    // Create a D3.js force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(strength))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create SVG elements for links, nodes, and labels
    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node');

    const labelsGroup = svg.selectAll('.label-group')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'label-group');

    // Create background rectangles for labels
    labelsGroup
      .append('rect')
      .attr('class', 'label-bg')
      .attr('rx', 5) // Rounded corners
      .attr('ry', 5)
      .attr('width', labelBackgroundWidth) // Set the width of the background rectangle
      .attr('height', labelBackgroundHeight) // Set the height of the background rectangle
      .attr('fill', 'lightgray'); // Background color

    // Create text labels and position them
    labelsGroup
      .append('text')
      .attr('class', 'label')
      .text(d => d.id)
      .attr('dy', labelTextY) // Adjust label vertical position
      .attr('dx', labelTextX)
      .attr('text-anchor', 'middle'); // Center-align the text

    // Function to update positions on each animation frame
    function tick() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labelsGroup
        .attr('transform', d => `translate(${d.x - labelX},${d.y - labelY})`); // Position the label group

      // Request the next animation frame
      requestAnimationFrame(tick);
    }

    // Start the simulation and initiate animation
    simulation.on('tick', tick);

  }, [data, height, width]);

  return (
    // Render the SVG element where the visualization will be displayed
    <svg ref={svgRef}>
      {/* Add any additional SVG elements if needed */}
    </svg>
  );
};

export default NetworkVisualization;
