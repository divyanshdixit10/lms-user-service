import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleOpen: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'elastic';
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  toggleOpen,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const { theme } = useTheme();
  
  // Size mappings
  const sizeConfig = {
    sm: { width: 18, height: 2, gap: 4 },
    md: { width: 24, height: 2, gap: 6 },
    lg: { width: 32, height: 3, gap: 8 },
  };
  
  const { width, height, gap } = sizeConfig[size];
  
  // Variants for animations
  const variants = {
    default: {
      top: {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: 45, translateY: gap + height }
      },
      middle: {
        closed: { opacity: 1 },
        open: { opacity: 0 }
      },
      bottom: {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: -45, translateY: -(gap + height) }
      }
    },
    minimal: {
      top: {
        closed: { width: width, translateX: 0 },
        open: { width: width * 0.75, translateX: width * 0.125 }
      },
      middle: {
        closed: { width: width },
        open: { width: width * 0.5, translateX: width * 0.25 }
      },
      bottom: {
        closed: { width: width, translateX: 0 },
        open: { width: width * 0.75, translateX: width * 0.125 }
      }
    },
    elastic: {
      top: {
        closed: { rotate: 0, translateY: 0, width: width },
        open: { rotate: 45, translateY: gap + height, width: Math.sqrt(2) * width }
      },
      middle: {
        closed: { scaleX: 1, opacity: 1 },
        open: { scaleX: 0, opacity: 0 }
      },
      bottom: {
        closed: { rotate: 0, translateY: 0, width: width },
        open: { rotate: -45, translateY: -(gap + height), width: Math.sqrt(2) * width }
      }
    }
  };
  
  // Choose the correct variant
  const currentVariant = variants[variant];
  
  return (
    <button
      onClick={toggleOpen}
      className={`relative flex flex-col justify-center items-center focus:outline-none ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      style={{ height: 2 * gap + 3 * height }}
    >
      <div className="relative" style={{ width, height: 2 * gap + 3 * height }}>
        <motion.div
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-secondary-800'}`}
          style={{ width, height, top: 0 }}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={currentVariant.top}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-secondary-800'}`}
          style={{ width, height, top: gap + height }}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={currentVariant.middle}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-secondary-800'}`}
          style={{ width, height, top: 2 * (gap + height) - height }}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={currentVariant.bottom}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
};

export default HamburgerMenu; 