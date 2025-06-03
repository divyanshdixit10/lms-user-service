import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CircuitNode {
  x: number;
  y: number;
  connections: { x: number; y: number; animated: boolean; progress: number; speed: number }[];
  size: number;
  active: boolean;
  pulseSize: number;
  pulseOpacity: number;
}

interface CircuitPatternAnimationProps {
  className?: string;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  color?: string;
  density?: 'low' | 'medium' | 'high';
  pulseEffect?: boolean;
}

const CircuitPatternAnimation: React.FC<CircuitPatternAnimationProps> = ({
  className = '',
  animationSpeed = 'medium',
  color = '#3B82F6', // Default blue
  density = 'medium',
  pulseEffect = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const circuitRef = useRef<CircuitNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  // Get colors based on theme
  const getColors = () => {
    // Primary color - used for active nodes and connections
    const primaryColor = color || (theme === 'dark' ? '#4F46E5' : '#4F46E5');
    
    // Secondary color - used for inactive elements
    const secondaryColorValue = theme === 'dark' ? '#1E293B' : '#E2E8F0';
    
    return { primaryColor, secondaryColor: secondaryColorValue };
  };
  
  // Convert speed to milliseconds
  const getAnimationSpeed = () => {
    switch (animationSpeed) {
      case 'slow': return 0.25;
      case 'fast': return 1.5;
      default: return 0.75;
    }
  };

  // Get density value
  const getDensity = () => {
    switch (density) {
      case 'low': return 10;
      case 'high': return 30;
      default: return 20;
    }
  };
  
  // Generate circuit pattern
  const generateCircuit = (width: number, height: number): CircuitNode[] => {
    const nodeCount = getDensity();
    const nodes: CircuitNode[] = [];
    const gridSize = 40; // Size of the grid cells
    
    // Create grid cells
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);
    
    // Helper function to check if point is too close to existing nodes
    const isTooClose = (x: number, y: number, minDistance: number): boolean => {
      for (const node of nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) return true;
      }
      return false;
    };
    
    // Create nodes at grid intersections with some randomness
    const createdCells = new Set<string>();
    
    while (nodes.length < nodeCount && createdCells.size < cols * rows) {
      // Select a random grid cell
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      const cellKey = `${col},${row}`;
      
      if (createdCells.has(cellKey)) continue;
      createdCells.add(cellKey);
      
      // Add some random offset within the cell
      const offsetX = (Math.random() - 0.5) * gridSize * 0.6;
      const offsetY = (Math.random() - 0.5) * gridSize * 0.6;
      
      const x = col * gridSize + gridSize / 2 + offsetX;
      const y = row * gridSize + gridSize / 2 + offsetY;
      
      // Only add if not too close to other nodes
      if (!isTooClose(x, y, gridSize * 0.8)) {
        nodes.push({
          x,
          y,
          connections: [],
          size: 2 + Math.random() * 3, // Random size variation
          active: Math.random() > 0.5, // Some nodes start active
          pulseSize: 0,
          pulseOpacity: 0
        });
      }
    }
    
    // Create connections - prefer grid-like connections (horizontal and vertical)
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const connectionCount = Math.floor(Math.random() * 3) + 1; // 1-3 connections per node
      
      // Organize nodes by proximity
      const otherNodes = [...nodes];
      otherNodes.splice(i, 1); // Remove current node
      
      otherNodes.sort((a, b) => {
        const distA = Math.abs(a.x - node.x) + Math.abs(a.y - node.y); // Manhattan distance
        const distB = Math.abs(b.x - node.x) + Math.abs(b.y - node.y);
        return distA - distB;
      });
      
      // Prefer horizontal and vertical connections
      const possibleConnections = otherNodes.filter(other => {
        const dx = Math.abs(other.x - node.x);
        const dy = Math.abs(other.y - node.y);
        
        // Prefer connections that are more horizontal or vertical
        const ratio = Math.min(dx, dy) / Math.max(dx, dy);
        return ratio < 0.3 || Math.random() < 0.3; // Sometimes allow diagonal
      }).slice(0, 6); // Take closest 6 as candidates
      
      // Randomly select connections from candidates
      for (let c = 0; c < Math.min(connectionCount, possibleConnections.length); c++) {
        const targetIdx = Math.floor(Math.random() * possibleConnections.length);
        const target = possibleConnections[targetIdx];
        
        // Remove selected target to avoid duplicates
        possibleConnections.splice(targetIdx, 1);
        
        // Add connection with animation properties
        node.connections.push({
          x: target.x,
          y: target.y,
          animated: Math.random() < 0.5, // 50% chance of being animated
          progress: 0,
          speed: 0.05 + Math.random() * 0.1 // Random speed
        });
      }
    }
    
    return nodes;
  };
  
  // Draw circuit pattern
  const drawCircuit = (ctx: CanvasRenderingContext2D, nodes: CircuitNode[], time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { primaryColor, secondaryColor } = getColors();
    
    // Draw connections first (behind nodes)
    for (const node of nodes) {
      // Update animation progress for each connection
      for (const conn of node.connections) {
        if (conn.animated) {
          conn.progress = (conn.progress + conn.speed) % 1;
        }
      }
      
      // Draw regular connections
      for (const conn of node.connections) {
        // Direction vector
        const dx = conn.x - node.x;
        const dy = conn.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize direction
        const nx = dx / distance;
        const ny = dy / distance;
        
        // Determine if connection should be active
        const isActive = node.active || nodes.find(n => n.x === conn.x && n.y === conn.y)?.active;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(conn.x, conn.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = isActive ? primaryColor : secondaryColor;
        ctx.globalAlpha = isActive ? 0.5 : 0.1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Draw animated pulse if connection is animated and active
        if (conn.animated && isActive) {
          // Draw animated light pulse
          const pulsePosition = conn.progress;
          const pulseX = node.x + dx * pulsePosition;
          const pulseY = node.y + dy * pulsePosition;
          
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 1
          );
          
          gradient.addColorStop(0, primaryColor);
          gradient.addColorStop(1, 'transparent');
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 1, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }
    
    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Update node activity state randomly
      if (Math.random() < 0.002) {
        node.active = !node.active;
      }
      
      // Update pulse effect
      if (pulseEffect && node.active) {
        if (node.pulseSize < node.size * 3) {
          node.pulseSize += 0.2;
          node.pulseOpacity = Math.max(0, 1 - node.pulseSize / (node.size * 3));
        } else {
          node.pulseSize = 0;
        }
      } else {
        node.pulseSize = 0;
        node.pulseOpacity = 0;
      }
      
      // Draw pulse effect
      if (node.pulseSize > 0) {
        const gradient = ctx.createRadialGradient(
          node.x, node.y, node.size,
          node.x, node.y, node.pulseSize
        );
        
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = node.pulseOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = node.active ? primaryColor : secondaryColor;
      ctx.globalAlpha = node.active ? 0.8 : 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
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
      
      // Regenerate circuit on resize
      circuitRef.current = generateCircuit(width, height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let startTime = Date.now();
    
    // Animation loop
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      drawCircuit(ctx, circuitRef.current, time);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animationSpeed, color, density, pulseEffect, theme]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default CircuitPatternAnimation; 