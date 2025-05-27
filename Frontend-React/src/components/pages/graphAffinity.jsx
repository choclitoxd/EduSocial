// src/components/GrafoEjemplo.jsx
import React, { useContext, useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { AuthContext } from "../../context/AuthContext";
import "../ui/css/Graph.css";

export const GrafoEjemplo = () => {
  const { getGraphData } = useContext(AuthContext);
  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para limpiar y garantizar IDs únicos
  const cleanGraphData = (rawData) => {
    // Eliminar nodos duplicados basándose en el ID
    const uniqueNodes = rawData.nodes.reduce((acc, node) => {
      const existingNode = acc.find(n => n.id === node.id);
      if (!existingNode) {
        acc.push(node);
      } else {
        // Si existe, puedes optar por mantener el primero o fusionar los datos
        console.warn(`Nodo duplicado encontrado con ID: ${node.id}`);
      }
      return acc;
    }, []);

    // Eliminar edges duplicados y validar que los nodos existan
    const nodeIds = new Set(uniqueNodes.map(node => node.id));
    const uniqueEdges = rawData.edges.reduce((acc, edge) => {
      // Crear un ID único para el edge basado en from y to
      const edgeKey = `${edge.from}-${edge.to}`;
      const existingEdge = acc.find(e => `${e.from}-${e.to}` === edgeKey);
      
      if (!existingEdge && nodeIds.has(edge.from) && nodeIds.has(edge.to)) {
        // Asignar un ID único al edge si no lo tiene
        acc.push({
          ...edge,
          id: edge.id || edgeKey
        });
      } else if (existingEdge) {
        console.warn(`Edge duplicado encontrado: ${edge.from} -> ${edge.to}`);
      } else {
        console.warn(`Edge referencia nodos inexistentes: ${edge.from} -> ${edge.to}`);
      }
      return acc;
    }, []);

    return {
      nodes: uniqueNodes,
      edges: uniqueEdges
    };
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        const data = await getGraphData();
        
        // Asegurarse de que estamos usando el primer elemento si es un array
        const rawGraphData = Array.isArray(data) ? data[0] : data;
        
        // Validar que los datos tienen la estructura esperada
        if (!rawGraphData || !rawGraphData.nodes || !rawGraphData.edges) {
          throw new Error('Los datos del grafo no tienen la estructura esperada');
        }

        // Limpiar datos y eliminar duplicados
        const cleanedData = cleanGraphData(rawGraphData);
        
        // Agregar colores y tamaños personalizados a los nodos
        const enhancedNodes = cleanedData.nodes.map(node => ({
          ...node,
          id: String(node.id), // Asegurar que el ID sea string
          color: getNodeColor(node.id),
          size: getNodeSize(node.id, cleanedData.edges),
          title: `${node.label || node.id} (${node.id})` // Tooltip con nombre y correo
        }));

        // Asegurar que los edges tengan IDs únicos y referencias válidas
        const enhancedEdges = cleanedData.edges.map((edge, index) => ({
          ...edge,
          id: edge.id || `edge_${index}`, // ID único para cada edge
          from: String(edge.from), // Asegurar que from sea string
          to: String(edge.to) // Asegurar que to sea string
        }));

        setGraph({
          nodes: enhancedNodes,
          edges: enhancedEdges
        });
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos del grafo:', err);
        setError('Error al cargar el grafo de relaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [getGraphData]);

  // Función para obtener el color del nodo basado en el dominio del correo
  const getNodeColor = (email) => {
    if (String(email).includes('admin')) {
      return '#FF5733'; // Color para administradores
    }
    return '#3498DB'; // Color para usuarios regulares
  };

  // Función para calcular el tamaño del nodo basado en sus conexiones
  const getNodeSize = (nodeId, edges) => {
    const connections = edges.filter(edge => 
      String(edge.from) === String(nodeId) || String(edge.to) === String(nodeId)
    ).length;
    return 30 + (connections * 5); // Tamaño base + 5 por cada conexión
  };

  const options = {
    layout: {
      randomSeed: 42, // Para mantener un layout consistente
      improvedLayout: true
    },
    nodes: {
      shape: "dot",
      font: {
        size: 16,
        color: "#ffffff", // Color del texto
        strokeWidth: 2, // Borde del texto
        strokeColor: "#000000" // Color del borde del texto
      },
      borderWidth: 2,
      borderWidthSelected: 4,
      shadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.5)',
        size: 10,
        x: 5,
        y: 5
      }
    },
    edges: {
      width: 2,
      color: { 
        color: '#848484',
        highlight: '#848484',
        hover: '#848484',
        opacity: 0.8
      },
      smooth: {
        type: "continuous",
        roundness: 0.5
      },
      hoverWidth: 3
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      navigationButtons: true,
      keyboard: true
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 200
      },
      barnesHut: {
        gravitationalConstant: -30000,
        centralGravity: 1,
        springLength: 200,
        springConstant: 0.04,
        damping: 0.09
      }
    },
    height: "600px"
  };

  const events = {
    select: ({ nodes, edges }) => {
      if (nodes.length > 0) {
        const selectedNode = graph.nodes.find(node => String(node.id) === String(nodes[0]));
        console.log("Usuario seleccionado:", selectedNode?.label);
      }
    },
    hoverNode: (event) => {
      const { node } = event;
      const selectedNode = graph.nodes.find(n => String(n.id) === String(node));
      console.log("Usuario hover:", selectedNode?.label);
    }
  };

  if (loading) {
    return (
      <div className="graph-container">
        <h2 className="graph-title">Grafo de Relaciones</h2>
        <div className="loading-message">Cargando grafo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="graph-container">
        <h2 className="graph-title">Grafo de Relaciones</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

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