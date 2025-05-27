// src/components/GrafoEjemplo.jsx
import React from "react";
import Graph from "react-graph-vis";
import "../ui/css/Graph.css";

export const GrafoEjemplo = () => {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 4, to: 5 },
    ],
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: "dot",
      size: 30,
      font: {
        size: 14,
        color: "#1e293b",
      },
      borderWidth: 2,
      shadow: true,
    },
    edges: {
      width: 2,
      color: { color: "#94a3b8", highlight: "#3b82f6" },
      smooth: {
        type: "continuous",
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
    },
    physics: {
      stabilization: false,
      barnesHut: {
        gravitationalConstant: -80000,
        springConstant: 0.001,
        springLength: 200,
      },
    },
    height: "100%",
  };

  const events = {
    select: ({ nodes, edges }) => {
      console.log("Selected nodes:", nodes);
      console.log("Selected edges:", edges);
    },
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Grafo de Relaciones</h2>
      <div className="graph-visualization">
        <Graph
          graph={graph}
          options={options}
          events={events}
        />
      </div>
    </div>
  );
};


