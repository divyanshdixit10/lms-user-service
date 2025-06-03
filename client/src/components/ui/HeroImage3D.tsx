import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroImage3DProps {
  imageSrc: string;
  overlayColor?: string;
  glowColor?: string;
  depth?: number;
  hoverEffect?: boolean;
  floatEffect?: boolean;
  badgeContent?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const HeroImage3D: React.FC<HeroImage3DProps> = ({
  imageSrc,
  overlayColor = 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20',
  glowColor = 'rgba(79, 70, 229, 0.3)',
  depth = 50,
  hoverEffect = true,
  floatEffect = false,
  badgeContent,
  badgePosition = 'bottom-right',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMousePosition({ x, y });
  };

  // Get badge position classes
  const getBadgePositionClasses = () => {
    switch (badgePosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Glow effect behind image */}
      <div
        className="absolute inset-0 rounded-xl blur-xl"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.8 : 0.5,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* 3D Container with parallax effect */}
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        animate={{
          rotateX: hoverEffect ? -mousePosition.y * 10 : 0,
          rotateY: hoverEffect ? mousePosition.x * 10 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 1,
        }}
      >
        {/* Image layer with 3D effect */}
        <motion.div
          className="relative w-full h-full"
          animate={floatEffect ? {
            y: [0, -10, 0],
          } : {}}
          transition={floatEffect ? {
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          } : {}}
        >
          <img
            src={imageSrc}
            alt="Hero"
            className="w-full h-full object-cover rounded-xl"
          />
          
          {/* Color overlay */}
          <div className={`absolute inset-0 ${overlayColor} rounded-xl`} />
        </motion.div>

        {/* Badge element if provided */}
        {badgeContent && (
          <motion.div
            className={`absolute z-20 ${getBadgePositionClasses()}`}
          >
            {badgeContent}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HeroImage3D; 