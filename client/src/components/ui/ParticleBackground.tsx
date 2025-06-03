import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'multicolor';
  particleSize?: [number, number]; // Min and max size
  speed?: [number, number]; // Min and max speed
  connectParticles?: boolean;
  interactivity?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleCount = 80,
  colorScheme = 'blue',
  particleSize = [1, 3],
  speed = [0.2, 0.7],
  connectParticles = true,
  interactivity = true
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const animationFrameRef = useRef<number | null>(null);

  // Get particle colors based on color scheme and theme
  const getParticleColors = () => {
    switch (colorScheme) {
      case 'blue':
        return theme === 'dark' 
          ? ['#4F46E5', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF'] 
          : ['#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'];
      case 'purple':
        return theme === 'dark'
          ? ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95']
          : ['#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'];
      case 'cyan':
        return theme === 'dark'
          ? ['#22D3EE', '#06B6D4', '#0891B2', '#0E7490', '#155E75']
          : ['#67E8F9', '#22D3EE', '#06B6D4', '#0891B2', '#0E7490'];
      case 'multicolor':
        return theme === 'dark'
          ? ['#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
          : ['#6366F1', '#A78BFA', '#F472B6', '#FBBF24', '#34D399'];
      default:
        return theme === 'dark'
          ? ['#4F46E5', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF']
          : ['#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'];
    }
  };

  // Initialize particles
  const initParticles = (canvas: HTMLCanvasElement) => {
    const colors = getParticleColors();
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * (speed[1] - speed[0]) + speed[0];
      const speedY = (Math.random() - 0.5) * (speed[1] - speed[0]) + speed[0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.3; // Between 0.3 and 0.8
      
      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
        opacity
      });
    }
    
    particlesRef.current = particles;
  };

  // Draw particles and connections
  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const particles = particlesRef.current;
    
    // Update and draw particles
    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
      
      // Interactivity with mouse
      if (interactivity) {
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - particle.x, 2) +
          Math.pow(mouseRef.current.y - particle.y, 2)
        );
        
        if (mouseDistance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - mouseDistance) / mouseRef.current.radius;
          const directionX = (mouseRef.current.x - particle.x);
          const directionY = (mouseRef.current.y - particle.y);
          
          particle.x -= directionX * force * 0.2;
          particle.y -= directionY * force * 0.2;
        }
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      
      // Draw connections
      if (connectParticles) {
        for (let j = index + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(particles[j].x - particle.x, 2) +
            Math.pow(particles[j].y - particle.y, 2)
          );
          
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / maxDistance) * 0.5 * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    });
  };

  // Animation loop
  const animate = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        draw(canvas, ctx);
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      initParticles(canvas);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current && interactivity) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 150
      };
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      initParticles(canvas);
      animate();
      
      window.addEventListener('resize', handleResize);
      
      if (interactivity) {
        canvas.addEventListener('mousemove', handleMouseMove);
      }
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        
        if (interactivity) {
          canvas.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, [colorScheme, theme, particleCount, particleSize, speed, connectParticles, interactivity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default ParticleBackground; 