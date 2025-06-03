import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ThreeDCardProps {
  className?: string;
  children: React.ReactNode;
  depth?: number;
  backgroundImage?: string;
  backgroundColor?: string;
  rotateMultiplier?: number;
  borderRadius?: string;
  shadow?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  glareEffect?: boolean;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  className = '',
  children,
  depth = 50,
  backgroundImage,
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  rotateMultiplier = 10,
  borderRadius = '1rem',
  shadow = true,
  clickable = false,
  onClick,
  glareEffect = true
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      // Get the position of the mouse relative to the card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate the rotation
      // We want the rotation to be based on the position of the mouse relative to the center of the card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angle. Multiply by rotateMultiplier for more pronounced effect
      // Divide by width/height to get a range of -0.5 to 0.5, then multiply by rotateMultiplier
      const rotateYValue = ((x - centerX) / centerX) * rotateMultiplier;
      const rotateXValue = -((y - centerY) / centerY) * rotateMultiplier;
      
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
      
      // Calculate glare position
      if (glareEffect) {
        // Normalize x and y to be between 0 and 100 (as percentage)
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
      }
    };
    
    const handleMouseLeave = () => {
      // Reset rotation when mouse leaves
      setRotateX(0);
      setRotateY(0);
      setIsHovered(false);
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    
    // Clean up event listeners
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rotateMultiplier, glareEffect]);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu perspective-1000 ${clickable ? 'cursor-pointer' : ''} ${className}`}
      style={{ borderRadius }}
      onClick={clickable ? onClick : undefined}
      whileTap={clickable ? { scale: 0.95 } : undefined}
    >
      <motion.div
        className="relative preserve-3d w-full h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          borderRadius,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Card outer container with shadow */}
        <div 
          className={`w-full h-full rounded-inherit overflow-hidden ${shadow ? 'shadow-xl' : ''}`}
          style={{ borderRadius }}
        >
          {/* Background layer - can be image or color */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
              backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius,
              transform: `translateZ(-${depth / 2}px)`,
            }}
          />
          
          {/* Content layer */}
          <div 
            className="relative w-full h-full z-10"
            style={{ 
              transform: `translateZ(${depth / 2}px)`,
              borderRadius,
            }}
          >
            {children}
          </div>
          
          {/* Glare effect */}
          {glareEffect && (
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" 
              style={{ 
                borderRadius,
                opacity: isHovered ? 0.15 : 0, 
                transition: 'opacity 0.3s ease' 
              }}
            >
              <div 
                className="absolute w-[200%] h-[200%] top-0 left-0 bg-gradient-to-br from-white via-white to-transparent"
                style={{
                  transform: `translate(-50%, -50%) translate(${glarePosition.x}%, ${glarePosition.y}%) rotate(30deg)`,
                  opacity: 0.7,
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThreeDCard; 