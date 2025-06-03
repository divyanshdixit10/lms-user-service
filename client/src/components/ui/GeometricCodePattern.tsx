import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Shape {
  type: 'square' | 'circle' | 'triangle' | 'hexagon' | 'bracket' | 'codeTag' | 'text';
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  pulse: boolean;
  pulseSpeed: number;
  pulsePhase: number;
  text?: string;
}

interface GeometricCodePatternProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  codeElements?: boolean;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'multicolor' | 'indigo';
  lineConnections?: boolean;
}

const GeometricCodePattern: React.FC<GeometricCodePatternProps> = ({
  className = '',
  density = 'medium',
  animated = true,
  codeElements = true,
  colorScheme = 'blue',
  lineConnections = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const shapesRef = useRef<Shape[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  // Get shape count based on density
  const getShapeCount = (): number => {
    switch (density) {
      case 'low': return 15;
      case 'high': return 50;
      default: return 30; // medium
    }
  };
  
  // Get color palette based on theme and color scheme
  const getColors = (): { primary: string; secondary: string } => {
    switch (colorScheme) {
      case 'blue':
        return { primary: theme === 'dark' ? '#1D4ED8' : '#3B82F6', secondary: theme === 'dark' ? '#60A5FA' : '#BFDBFE' };
      case 'purple':
        return { primary: theme === 'dark' ? '#6D28D9' : '#8B5CF6', secondary: theme === 'dark' ? '#A78BFA' : '#C4B5FD' };
      case 'cyan':
        return { primary: theme === 'dark' ? '#0E7490' : '#06B6D4', secondary: theme === 'dark' ? '#22D3EE' : '#A5F3FC' };
      case 'multicolor':
        return { primary: theme === 'dark' ? '#4F46E5' : '#6366F1', secondary: theme === 'dark' ? '#EC4899' : '#F472B6' };
      case 'indigo':
        return { primary: theme === 'dark' ? '#6366F1' : '#4F46E5', secondary: theme === 'dark' ? '#4F46E5' : '#6366F1' };
      default:
        return { primary: theme === 'dark' ? '#1D4ED8' : '#3B82F6', secondary: theme === 'dark' ? '#60A5FA' : '#BFDBFE' };
    }
  };
  
  // Create shapes
  const createShapes = (width: number, height: number): Shape[] => {
    const shapes: Shape[] = [];
    const shapeCount = getShapeCount();
    const { primary, secondary } = getColors();
    const shapeTypes: ('square' | 'circle' | 'triangle' | 'hexagon' | 'bracket' | 'codeTag' | 'text')[] = 
      codeElements 
        ? ['square', 'circle', 'triangle', 'hexagon', 'bracket', 'codeTag', 'text'] 
        : ['square', 'circle', 'triangle', 'hexagon', 'bracket', 'codeTag'];
    
    for (let i = 0; i < shapeCount; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 20 + 10;
      const margin = size * 2;
      
      const shape: Shape = {
        type,
        x: margin + Math.random() * (width - margin * 2),
        y: margin + Math.random() * (height - margin * 2),
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: Math.random() > 0.5 ? primary : secondary,
        opacity: Math.random() * 0.3 + 0.1,
        pulse: Math.random() > 0.5,
        pulseSpeed: 0.5 + Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      };
      
      shapes.push(shape);
    }
    
    return shapes;
  };
  
  // Draw shapes and connections
  const drawShapes = (ctx: CanvasRenderingContext2D, shapes: Shape[], time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw connections first (if enabled)
    if (lineConnections) {
      const connectionDistance = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.2;
      
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(100, 116, 139, 0.15)' : 'rgba(148, 163, 184, 0.15)';
      
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.globalAlpha = opacity * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
    }
    
    // Draw each shape
    for (const shape of shapes) {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      
      // Apply rotation if animated
      if (animated) {
        shape.rotation += shape.rotationSpeed;
        ctx.rotate(shape.rotation);
      }
      
      // Apply pulse effect if enabled
      let scaleFactor = 1;
      if (animated && shape.pulse) {
        scaleFactor = 1 + Math.sin(time * shape.pulseSpeed + shape.pulsePhase) * 0.2;
        ctx.scale(scaleFactor, scaleFactor);
      }
      
      ctx.fillStyle = shape.color;
      ctx.globalAlpha = shape.opacity;
      
      // Draw based on shape type
      switch (shape.type) {
        case 'square':
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
          
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = Math.cos(angle) * (shape.size / 2);
            const y = Math.sin(angle) * (shape.size / 2);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'bracket':
          // Drawing code brackets
          ctx.lineWidth = 2;
          ctx.strokeStyle = shape.color;
          
          // Left curly brace
          ctx.beginPath();
          ctx.moveTo(shape.size / 4, -shape.size / 2);
          ctx.lineTo(-shape.size / 4, -shape.size / 2);
          ctx.lineTo(-shape.size / 4, shape.size / 2);
          ctx.lineTo(shape.size / 4, shape.size / 2);
          ctx.stroke();
          
          break;
          
        case 'codeTag':
          // Drawing code tag
          ctx.lineWidth = 2;
          ctx.strokeStyle = shape.color;
          
          // < >
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(-shape.size / 4, -shape.size / 2);
          ctx.lineTo(shape.size / 4, -shape.size / 2);
          ctx.lineTo(shape.size / 2, 0);
          ctx.lineTo(shape.size / 4, shape.size / 2);
          ctx.lineTo(-shape.size / 4, shape.size / 2);
          ctx.closePath();
          ctx.stroke();
          
          break;
      }
      
      ctx.restore();
    }
  };
  
  // Update shape positions and animate
  const updateShapes = (shapes: Shape[], time: number, width: number, height: number) => {
    if (!animated) return;
    
    for (const shape of shapes) {
      // Add slight movement
      shape.x += Math.sin(time * 0.5 + shape.pulsePhase) * 0.2;
      shape.y += Math.cos(time * 0.3 + shape.pulsePhase) * 0.2;
      
      // Keep within bounds
      const margin = shape.size;
      if (shape.x < margin) shape.x = margin;
      if (shape.x > width - margin) shape.x = width - margin;
      if (shape.y < margin) shape.y = margin;
      if (shape.y > height - margin) shape.y = height - margin;
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
      
      // Reinitialize shapes on resize
      shapesRef.current = createShapes(width, height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let startTime = Date.now();
    
    // Animation loop
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      updateShapes(shapesRef.current, time, canvas.width, canvas.height);
      drawShapes(ctx, shapesRef.current, time);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [density, animated, codeElements, colorScheme, lineConnections, theme]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default GeometricCodePattern; 