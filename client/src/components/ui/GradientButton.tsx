import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonGradient = 'orange' | 'amber' | 'coral' | 'tangerine' | 'none';

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  gradient?: ButtonGradient;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: 'button' | 'a' | 'link';
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  gradient = 'orange',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  as = 'button',
  href,
  to,
  target,
  rel,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const { theme } = useTheme();
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  // Gradient classes
  const gradientClasses = {
    orange: theme === 'dark'
      ? 'bg-gradient-to-r from-primary-600 to-amber-500 hover:from-primary-500 hover:to-amber-400'
      : 'bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-400 hover:to-amber-400',
    amber: theme === 'dark'
      ? 'bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300'
      : 'bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200',
    coral: theme === 'dark'
      ? 'bg-gradient-to-r from-coral-600 to-primary-600 hover:from-coral-500 hover:to-primary-500'
      : 'bg-gradient-to-r from-coral-500 to-primary-500 hover:from-coral-400 hover:to-primary-400',
    tangerine: theme === 'dark'
      ? 'bg-gradient-to-r from-tangerine-600 to-amber-500 hover:from-tangerine-500 hover:to-amber-400'
      : 'bg-gradient-to-r from-tangerine-500 to-amber-400 hover:from-tangerine-400 hover:to-amber-300',
    none: theme === 'dark'
      ? 'bg-primary-600 hover:bg-primary-500'
      : 'bg-primary-500 hover:bg-primary-400',
  };
  
  // Variant classes
  const variantBaseClasses = {
    primary: 'text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    secondary: theme === 'dark'
      ? 'text-white bg-secondary-700 hover:bg-secondary-600 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500'
      : 'text-white bg-secondary-500 hover:bg-secondary-400 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-400',
    outline: theme === 'dark'
      ? 'text-white bg-transparent border border-white/20 hover:bg-white/10'
      : 'text-primary-600 bg-transparent border border-primary-500 hover:bg-primary-50',
    ghost: theme === 'dark'
      ? 'text-white bg-transparent hover:bg-white/10'
      : 'text-primary-600 bg-transparent hover:bg-primary-50',
  };
  
  // Combine classes based on variant and gradient
  const combinedClasses = variant === 'primary' && gradient !== 'none'
    ? `${variantBaseClasses[variant]} ${gradientClasses[gradient]}`
    : variantBaseClasses[variant];
  
  // Common classes
  const commonClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
  `;
  
  // Animation props
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  };
  
  // Loading state
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Content with icon
  const content = (
    <>
      {loading ? loadingSpinner : icon && iconPosition === 'left' ? <span className="mr-2">{icon}</span> : null}
      {children}
      {icon && iconPosition === 'right' && !loading ? <span className="ml-2">{icon}</span> : null}
    </>
  );
  
  // Render based on component type
  if (as === 'link' && to) {
    return (
      <motion.div {...motionProps}>
        <Link
          to={to}
          className={`${commonClasses} ${combinedClasses} ${className}`}
        >
          {content}
        </Link>
      </motion.div>
    );
  } else if (as === 'a' && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${commonClasses} ${combinedClasses} ${className}`}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  } else {
    return (
      <motion.button
        type={type}
        className={`${commonClasses} ${combinedClasses} ${className}`}
        disabled={disabled || loading}
        onClick={onClick}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }
};

export default GradientButton; 