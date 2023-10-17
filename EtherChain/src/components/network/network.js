import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as d3Drag from 'd3-drag'; // Import d3-drag for node dragging
import './network.css';
let originalNodes
let originalLinks;
let links;
let nodes;
let link;
let node;
let labelsGroup;
let initalized = false;

const NetworkVisualization = ({ data }) => {
  // Create a reference to the SVG element
  const svgRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth * 0.7);
  const [height, setHeight] = useState(window.innerHeight * 0.7);

  let [clickedNode, setClickedNode] = useState(null);
  // console.log("test");
  if (initalized == false) {
    // Create nodes and links based on the data prop
    nodes = data.wallets.map(wallet => ({ id: wallet }));
    links = data.transactions.map(transaction => ({
      source: transaction.from,
      target: transaction.to,
      tokens: transaction.tokens,

    }));
    console.log(nodes)
    originalNodes = nodes;
    originalLinks = links;
    initalized = true;
  }
  console.log(initalized)

  let strength, labelBackgroundHeight, labelBackgroundWidth, labelX, labelY, labelTextY, labelTextX, countTextX, countTextY= 0;

  // Initialization of variables for dimensions and forces
  // let width = window.innerWidth * 0.7;
  // let height = window.innerHeight * 0.7;

  // Determine values based on the screen width
  if (width <= 550) {
    strength = -1500;
    labelBackgroundWidth = 90;
    labelBackgroundHeight = 25;
    labelY = 45;
    labelX = 50;
    labelTextY = 20;
    labelTextX = 47;
    countTextY = 52;
    countTextX = 50;
  } else if (width <= 1000) {
    strength = -3000;
    labelBackgroundWidth = 90;
    labelBackgroundHeight = 25;
    labelY = 45;
    labelX = 50;
    labelTextY = 20;
    labelTextX = 47;
    countTextY = 62;
    countTextX = 50;
  } else {
    strength = -5000;
    labelBackgroundWidth = 100;
    labelBackgroundHeight = 30;
    labelY = 64;
    labelX = 50;
    labelTextY = 22;
    labelTextX = 50;
    countTextY = 72;
    countTextX = 50;
  }
  // useEffect to manage D3.js visualization

  const updateDimensions = () => {
    setWidth(window.innerWidth * 0.7);
    setHeight(window.innerHeight * 0.7);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {

    // Select the SVG element using the reference
    const svg = d3.select(svgRef.current);
    // // Create a D3.js force simulation
    let simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(strength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', tick);

    function createSVGElements() {

      // Create SVG elements for links, nodes, and labels
      link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

      node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        // console.log("Cool")
      // Enable drag behavior for the nodes
      node.call(d3Drag.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded))
        // Add a click event handler to each node
        .on('click', (event, d) => {
          // console.log("Cool")
          // Call the function to remove labels
          console.log(`Clicked Node ID: ${d.id}`);
          // setClickedNode(d.id);
          const connectedNodes = new Set();
          const filteredLinks = originalLinks.filter((link) => {
            connectedNodes.add(d.id)
            if (link.source.id === d.id) {

              connectedNodes.add(link.target.id);
              return true;
            }
            if (link.target.id === d.id) {
              connectedNodes.add(link.source.id);
              return true;
            }
            return false;
          });
          const filteredNodes = originalNodes.filter((n) => connectedNodes.has(n.id));
          simulation.nodes(filteredNodes).force('link', d3.forceLink(filteredLinks).id(d => d.id));
          link = link.data(filteredLinks);
          node = node.data(filteredNodes);
          labelsGroup = labelsGroup.data(filteredNodes);
          // console.log('ded')
          
          link.exit().remove();
          node.exit().remove();
          labelsGroup.exit().remove();

          const nodeEnter = node.enter().append('circle').attr('class', 'node');
          const linkEnter = link.enter().append('line').attr('class', 'link');
          const labelsEnter = labelsGroup.enter().append('g').attr('class', 'label-group');

          link = linkEnter.merge(link);
          node = nodeEnter.merge(node);
          labelsGroup = labelsEnter.merge(labelsGroup)


          links = filteredLinks;
          node.call(d3Drag.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));
          nodes = filteredNodes;
          simulation.alpha(1).restart();
          setClickedNode(d.id);
        });
        // console.log("Cool")
        
      labelsGroup = svg.selectAll('.label-group')
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

    }

    // Call the createSVGElements function during initialization
    createSVGElements();

    // Function to reset the visualization after simulation refresh
    function resetVisualization() {
      // Remove existing elements
      svg.selectAll('.link').remove();
      svg.selectAll('.node').remove();
      svg.selectAll('.label-group').remove();
      // console.log("Cool")
      // Call createSVGElements again to reappend elements in the desired order
      createSVGElements();
    }
    // Event handler for node drag start
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    // Event handler for node drag
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    // Event handler for node drag end
    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    // Function to update positions on each animation frame
    function tick() {
      // console.log("Cool Dawg")
      resetVisualization();
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => {
        d.x = Math.max(labelBackgroundWidth / 2, Math.min(width - labelBackgroundWidth / 2, d.x));
        return d.x;
      });

      node.attr('cy', d => {
        d.y = Math.max(labelBackgroundHeight / 2, Math.min(height - labelBackgroundHeight / 2, d.y));
        return d.y;
      });

      labelsGroup
        .attr('transform', d => `translate(${d.x - labelX},${d.y - labelY})`); // Position the label group

      // Request the next animation frame
      requestAnimationFrame(tick);
    }
    // console.log("Cool")
    // Start the simulation and initiate animation
    simulation.on('tick', tick);

  }, [data, height, width, clickedNode]);

  return (
    // Render the SVG element where the visualization will be displayed
    <svg ref={svgRef}>
      {/* Add any additional SVG elements if needed */}
    </svg>

  );
};

export default NetworkVisualization;
