import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
  borderOpacity?: number;
  variant?: 'default' | 'elevated' | 'soft' | 'gradient';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 70,
  borderOpacity = 20,
  variant = 'default',
}) => {
  const { theme } = useTheme();
  
  // Get blur value
  const getBlurValue = () => {
    switch (blur) {
      case 'sm': return 'backdrop-blur-sm';
      case 'md': return 'backdrop-blur-md';
      case 'lg': return 'backdrop-blur-lg';
      case 'xl': return 'backdrop-blur-xl';
      case '2xl': return 'backdrop-blur-2xl';
      default: return 'backdrop-blur-md';
    }
  };
  
  // Create custom background style based on theme and variant
  const getBackgroundStyle = () => {
    const opacityValue = opacity / 100;
    
    if (theme === 'dark') {
      return {
        backgroundColor: `rgba(30, 41, 59, ${opacityValue})`, // slate-800 with opacity
      };
    } else {
      // Light theme with improved aesthetics
      switch (variant) {
        case 'elevated':
          return {
            backgroundColor: `rgba(255, 255, 255, ${opacityValue})`,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
          };
        case 'soft':
          return {
            backgroundColor: `rgba(248, 250, 252, ${opacityValue})`, // slate-50 with opacity
          };
        case 'gradient':
          return {
            backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 244, 246, 0.85))',
          };
        default:
          return {
            backgroundColor: `rgba(255, 255, 255, ${opacityValue})`,
          };
      }
    }
  };
  
  // Create custom border style based on theme and variant
  const getBorderStyle = () => {
    const borderOpacityValue = borderOpacity / 100;
    
    if (theme === 'dark') {
      return {
        borderColor: `rgba(71, 85, 105, ${borderOpacityValue})` // slate-600 with opacity
      };
    } else {
      // Light theme with improved aesthetics
      switch (variant) {
        case 'elevated':
          return {
            borderColor: 'rgba(241, 245, 249, 0.9)', // slate-100 with opacity
            borderWidth: '1px',
          };
        case 'soft':
          return {
            borderColor: 'rgba(226, 232, 240, 0.8)', // slate-200 with opacity
            borderWidth: '1px',
          };
        case 'gradient':
          return {
            borderColor: 'rgba(224, 231, 255, 0.6)', // indigo-50 with opacity
            borderWidth: '1px',
          };
        default:
          return {
            borderColor: `rgba(226, 232, 240, ${borderOpacityValue})`, // slate-200 with opacity
          };
      }
    }
  };

  // Get additional classes based on variant
  const getVariantClasses = () => {
    if (theme === 'dark') return '';
    
    switch (variant) {
      case 'elevated':
        return 'shadow-lg';
      case 'soft':
        return 'shadow-md';
      case 'gradient':
        return 'shadow-xl';
      default:
        return 'shadow-sm';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${getBlurValue()} ${getVariantClasses()} ${className}`}
      style={{
        ...getBackgroundStyle(),
        ...getBorderStyle(),
      }}
    >
      {variant === 'gradient' && theme === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 pointer-events-none"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard; 