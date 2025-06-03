import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Node {
  x: number;
  y: number;
  connections: number[];
  size: number;
  hue: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface NeuralNetworkAnimationProps {
  className?: string;
  layerCount?: number;
  nodesPerLayer?: number;
  nodeSize?: number;
  connectionOpacity?: number;
  animated?: boolean;
  activationEffect?: boolean;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'multicolor';
}

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({
  className = '',
  layerCount = 4,
  nodesPerLayer = 6,
  nodeSize = 6,
  connectionOpacity = 0.5,
  animated = true,
  activationEffect = true,
  colorScheme = 'blue'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number | null>(null);
  const activationRef = useRef<number[]>([]);
  const nodesRef = useRef<Node[]>([]);
  
  // Get color based on theme and scheme
  const getBaseColors = () => {
    switch (colorScheme) {
      case 'blue':
        return theme === 'dark' 
          ? ['#1D4ED8', '#3B82F6', '#60A5FA'] 
          : ['#1E40AF', '#3B82F6', '#93C5FD'];
      case 'purple':
        return theme === 'dark'
          ? ['#6D28D9', '#8B5CF6', '#A78BFA']
          : ['#5B21B6', '#8B5CF6', '#C4B5FD'];
      case 'cyan':
        return theme === 'dark'
          ? ['#0E7490', '#06B6D4', '#22D3EE']
          : ['#0891B2', '#06B6D4', '#67E8F9'];
      case 'multicolor':
        return theme === 'dark'
          ? ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B']
          : ['#6366F1', '#8B5CF6', '#F472B6', '#FBBF24'];
      default:
        return theme === 'dark'
          ? ['#1D4ED8', '#3B82F6', '#60A5FA'] 
          : ['#1E40AF', '#3B82F6', '#93C5FD'];
    }
  };

  // Initialize the neural network
  const initializeNetwork = (width: number, height: number) => {
    const nodes: Node[] = [];
    const layerWidth = width / (layerCount + 1);
    
    // Create nodes for each layer
    for (let layer = 0; layer < layerCount; layer++) {
      // Adjust nodes per layer - more in middle, fewer at ends
      let currentLayerNodes = nodesPerLayer;
      if (layer === 0 || layer === layerCount - 1) {
        currentLayerNodes = Math.max(3, Math.floor(nodesPerLayer * 0.7));
      }
      
      const layerHeight = height / (currentLayerNodes + 1);
      
      for (let i = 0; i < currentLayerNodes; i++) {
        const node: Node = {
          x: (layer + 1) * layerWidth,
          y: (i + 1) * layerHeight,
          connections: [],
          size: nodeSize * (Math.random() * 0.4 + 0.8), // Slight size variation
          hue: Math.random() * 30, // Hue variation
          pulseSpeed: 0.02 + Math.random() * 0.02, // Random pulse speed
          pulsePhase: Math.random() * Math.PI * 2 // Random starting phase
        };
        
        // Connect to nodes in the next layer if not the last layer
        if (layer < layerCount - 1) {
          const startIdx = nodes.length;
          const endIdx = startIdx + currentLayerNodes;
          node.connections = [];
          
          // Connect to some nodes in the next layer (will be filled later)
          node.connections = [];
        }
        
        nodes.push(node);
      }
    }
    
    // Create connections between layers
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Skip if node is in the last layer
      if (i >= nodes.length - Math.max(3, Math.floor(nodesPerLayer * 0.7))) continue;
      
      // Find the layer of the current node
      let currentLayer = 0;
      let nodesInPrevLayers = 0;
      
      for (let l = 0; l < layerCount; l++) {
        const layerNodeCount = l === 0 || l === layerCount - 1 
          ? Math.max(3, Math.floor(nodesPerLayer * 0.7)) 
          : nodesPerLayer;
          
        if (i < nodesInPrevLayers + layerNodeCount) {
          currentLayer = l;
          break;
        }
        
        nodesInPrevLayers += layerNodeCount;
      }
      
      // Find nodes in the next layer
      const nextLayerStart = nodesInPrevLayers + 
        (currentLayer === 0 || currentLayer === layerCount - 1 
          ? Math.max(3, Math.floor(nodesPerLayer * 0.7)) 
          : nodesPerLayer);
          
      const nextLayerNodeCount = (currentLayer + 1) === 0 || (currentLayer + 1) === layerCount - 1 
        ? Math.max(3, Math.floor(nodesPerLayer * 0.7)) 
        : nodesPerLayer;
        
      // Connect to random nodes in the next layer
      const connectionsCount = Math.floor(Math.random() * (nextLayerNodeCount - 1)) + 1;
      
      for (let c = 0; c < connectionsCount; c++) {
        const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayerNodeCount);
        
        if (targetIdx < nodes.length && !node.connections.includes(targetIdx)) {
          node.connections.push(targetIdx);
        }
      }
    }
    
    return nodes;
  };

  // Draw the neural network
  const drawNetwork = (
    ctx: CanvasRenderingContext2D, 
    nodes: Node[], 
    colors: string[], 
    time: number,
    activeNodes: number[]
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw connections first (behind nodes)
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      for (const connectionIdx of node.connections) {
        if (connectionIdx < nodes.length) {
          const targetNode = nodes[connectionIdx];
          
          // Determine if connection is active
          const isActive = activeNodes.includes(i) || activeNodes.includes(connectionIdx);
          
          // Set connection style
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          
          if (isActive && activationEffect) {
            // Animated active connection
            ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.8;
          } else {
            // Regular connection
            ctx.strokeStyle = theme === 'dark' ? '#64748B' : '#94A3B8'; // Slate color
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = connectionOpacity;
          }
          
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    
    // Draw nodes on top
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Pulse effect for size if animated
      let currentSize = node.size;
      if (animated) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase);
        currentSize = node.size * (1 + pulse * 0.2);
      }
      
      // Determine if node is active
      const isActive = activeNodes.includes(i);
      
      // Draw the node
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
      
      if (isActive && activationEffect) {
        // Active node with glow
        const activeColor = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = activeColor;
        
        // Add glow
        ctx.shadowColor = activeColor;
        ctx.shadowBlur = 15;
      } else {
        // Regular node
        ctx.fillStyle = colors[0];
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    }
  };

  // Propagate activation through the network
  const activateNetwork = () => {
    if (!activationEffect) return [];
    
    const activeNodes: number[] = [];
    
    // Initialize activation if empty
    if (activationRef.current.length === 0) {
      // Start with an input node
      const inputLayerSize = Math.max(3, Math.floor(nodesPerLayer * 0.7));
      activationRef.current = [Math.floor(Math.random() * inputLayerSize)];
    }
    
    // Copy current activations
    activeNodes.push(...activationRef.current);
    
    // Propagate through connections
    const newActivations: number[] = [];
    
    for (const nodeIdx of activationRef.current) {
      if (nodeIdx < nodesRef.current.length) {
        const node = nodesRef.current[nodeIdx];
        
        // Randomly activate some connections
        for (const connIdx of node.connections) {
          if (Math.random() > 0.7 && !newActivations.includes(connIdx)) {
            newActivations.push(connIdx);
          }
        }
      }
    }
    
    // Update active nodes
    activationRef.current = newActivations;
    
    // If no more activations, start a new one
    if (activationRef.current.length === 0 && Math.random() > 0.7) {
      const inputLayerSize = Math.max(3, Math.floor(nodesPerLayer * 0.7));
      activationRef.current = [Math.floor(Math.random() * inputLayerSize)];
    }
    
    return activeNodes;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize network on resize
      nodesRef.current = initializeNetwork(width, height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let startTime = Date.now();
    const colors = getBaseColors();
    
    // Animation loop
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      const activeNodes = activateNetwork();
      drawNetwork(ctx, nodesRef.current, colors, time, activeNodes);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [layerCount, nodesPerLayer, nodeSize, connectionOpacity, animated, activationEffect, colorScheme, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default NeuralNetworkAnimation; 