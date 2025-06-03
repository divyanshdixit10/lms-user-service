import React from 'react';
import { motion } from 'framer-motion';

interface HeroGradientTextProps {
  text: string;
  className?: string;
  gradientColors?: string;
  animationType?: 'none' | 'fade' | 'slide' | 'reveal';
  duration?: number;
}

const HeroGradientText: React.FC<HeroGradientTextProps> = ({
  text,
  className = '',
  gradientColors = 'from-indigo-600 via-purple-600 to-indigo-600',
  animationType = 'none',
  duration = 1.0,
}) => {
  // Animation variants based on type
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'reveal':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      default:
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        };
    }
  };

  // For words animation in 'reveal' mode
  const createWordRevealAnimation = () => {
    // Split text into words
    const words = text.split(' ');
    
    return (
      <div className={`inline-block ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className={`inline-block mr-1.5 text-transparent bg-clip-text bg-gradient-to-r ${gradientColors}`}
            style={{
              backgroundSize: '200% 200%',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  };

  // For simple animation modes
  if (animationType !== 'reveal') {
    return (
      <motion.h1
        className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientColors} ${className}`}
        style={{
          backgroundSize: '200% 200%',
        }}
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants()}
        transition={{ duration }}
      >
        {text}
      </motion.h1>
    );
  }

  // For reveal animation
  return createWordRevealAnimation();
};

export default HeroGradientText; 