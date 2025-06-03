import React, { useEffect, useRef } from 'react';

interface CodeBackgroundAnimationProps {
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'low' | 'medium' | 'high';
  characters?: string;
}

const CodeBackgroundAnimation: React.FC<CodeBackgroundAnimationProps> = ({
  className = '',
  speed = 'medium',
  density = 'medium',
  characters = 'const let var function class import export default return true false',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeedValue = () => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'fast': return 2;
      default: return 1;
    }
  };

  const getDensityValue = () => {
    switch (density) {
      case 'low': return 25;
      case 'high': return 75;
      default: return 50;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create a simple animation that looks like code
    const words = characters.split(' ');
    const columns = Math.floor(canvas.width / 10);
    const rows = Math.floor(canvas.height / 20);
    const matrix: string[] = [];

    for (let i = 0; i < columns; i++) {
      matrix[i] = words[Math.floor(Math.random() * words.length)];
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = '12px monospace';
      
      for (let i = 0; i < columns; i++) {
        const text = matrix[i];
        const x = i * 20;
        const y = (Math.random() * rows) * 20;
        
        ctx.fillText(text, x, y);
        
        if (Math.random() > 0.95) {
          matrix[i] = words[Math.floor(Math.random() * words.length)];
        }
      }
    };

    const interval = setInterval(draw, 100 / getSpeedValue());

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [characters, density, speed]);

  return (
    <canvas 
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
};

export default CodeBackgroundAnimation; 