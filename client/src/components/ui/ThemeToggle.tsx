import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme();
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-14 h-7'
  };
  
  const toggleSize = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6' 
  };
  
  const translateX = {
    sm: theme === 'dark' ? 16 : 0,
    md: theme === 'dark' ? 24 : 0,
    lg: theme === 'dark' ? 28 : 0
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && (
        <span className="mr-2 text-sm font-medium">
          {theme === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
      
      <button
        onClick={toggleTheme}
        className={`${sizeClasses[size]} relative inline-flex flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
        }`}
        aria-pressed={theme === 'dark'}
      >
        <span className="sr-only">Use dark mode</span>
        <motion.span
          className={`${toggleSize[size]} rounded-full bg-white shadow pointer-events-none`}
          animate={{ x: translateX[size] }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
        
        {/* Sun and Moon icons */}
        <span 
          className={`absolute inset-0 flex items-center justify-between p-0.5 ${size === 'sm' ? 'p-0' : 'p-0.5'}`}
          aria-hidden="true"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`text-amber-500 transition ${theme === 'dark' ? 'opacity-0' : 'opacity-100'} ${
              size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
            }`}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`text-indigo-200 ml-auto transition ${theme === 'light' ? 'opacity-0' : 'opacity-100'} ${
              size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
            }`}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle; 