import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  image: string;
  quote: string;
  courseCompleted?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  image,
  quote,
  courseCompleted
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a color based on company or role
  const getAccentColor = () => {
    const companyOrRole = (company || role || '').toLowerCase();
    
    if (companyOrRole.includes('microsoft')) {
      return theme === 'dark' ? '#7FBA00' : '#5A9F00';
    } else if (companyOrRole.includes('google')) {
      return theme === 'dark' ? '#4285F4' : '#4285F4';
    } else if (companyOrRole.includes('amazon')) {
      return theme === 'dark' ? '#FF9900' : '#E88B00';
    } else if (companyOrRole.includes('meta') || companyOrRole.includes('facebook')) {
      return theme === 'dark' ? '#0668E1' : '#0668E1';
    } else if (companyOrRole.includes('apple')) {
      return theme === 'dark' ? '#A3AAAE' : '#555555';
    } else if (companyOrRole.includes('data')) {
      return theme === 'dark' ? '#8B5CF6' : '#7C3AED';
    } else if (companyOrRole.includes('web') || companyOrRole.includes('frontend') || companyOrRole.includes('full stack')) {
      return theme === 'dark' ? '#3B82F6' : '#2563EB';
    } else {
      return theme === 'dark' ? '#6366F1' : '#4F46E5';
    }
  };
  
  // Generate code syntax elements
  const codeSyntaxDecorations = () => {
    return (
      <>
        {/* Opening comment with name */}
        <div className="absolute top-4 left-6 font-mono text-sm opacity-40">
          <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            /* {name.split(' ')[0]}'s experience */
          </span>
        </div>
        
        {/* Function-like decoration */}
        <div className="absolute top-4 right-6 font-mono text-sm opacity-40">
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            function
          </span>
          <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {' success'}
          </span>
          <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            () {'{'}
          </span>
        </div>
        
        {/* Variable declaration */}
        <div className="absolute bottom-16 left-6 font-mono text-sm opacity-40">
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            const
          </span>
          <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} ml-1`}>
            skills
          </span>
          <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} ml-1`}>
            =
          </span>
          <span className={`${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} ml-1`}>
            ['advanced', 'certified', 'professional'];
          </span>
        </div>
        
        {/* Closing bracket */}
        <div className="absolute bottom-4 right-6 font-mono text-sm opacity-40">
          <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {'}'}
          </span>
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-800/50 backdrop-blur-md border border-slate-700/50'
          : 'bg-white/70 backdrop-blur-md shadow-xl shadow-slate-200/60 border border-slate-100'
      } rounded-xl p-6`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Code syntax decorations - visible on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {codeSyntaxDecorations()}
      </motion.div>
      
      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${getAccentColor()}40`
            : '0 0 0px transparent'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Quote first */}
      <motion.div
        className={`relative mb-6 ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}
        animate={{
          opacity: isHovered ? 1 : 0.9
        }}
      >
        {/* Quote mark */}
        <div 
          className="absolute -top-4 -left-2 text-5xl opacity-10"
          style={{ color: getAccentColor() }}
        >
          "
        </div>
        
        <p className="relative z-10 italic">"{quote}"</p>
        
        {/* Closing quote mark */}
        <div 
          className="absolute -bottom-8 -right-2 text-5xl opacity-10"
          style={{ color: getAccentColor() }}
        >
          "
        </div>
      </motion.div>
      
      {/* Person info */}
      <div className="flex items-center">
        {/* Image with border */}
        <motion.div
          className="mr-4 relative"
          animate={{
            borderColor: isHovered ? getAccentColor() : 'transparent'
          }}
        >
          <motion.div
            className="w-14 h-14 rounded-full overflow-hidden border-2"
            animate={{
              borderColor: isHovered ? getAccentColor() : 'transparent'
            }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`;
              }}
            />
          </motion.div>
          
          {/* Animated pulse around image on hover */}
          <motion.div
            className="absolute -inset-1 rounded-full"
            animate={{
              boxShadow: isHovered 
                ? `0 0 15px ${getAccentColor()}60` 
                : '0 0 0px transparent'
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Name and role */}
        <div>
          <h4 className={`font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {name}
          </h4>
          
          <p 
            className="text-sm font-medium"
            style={{ color: getAccentColor() }}
          >
            {role} {company && `at ${company}`}
          </p>
          
          {courseCompleted && (
            <p className={`text-xs mt-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Completed: {courseCompleted}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative corner for code theme */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-12 h-12 opacity-20"
        animate={{
          opacity: isHovered ? 0.7 : 0.2,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={getAccentColor()} strokeWidth="4">
          <path d="M90,10 L10,10 L10,90" />
          <circle cx="90" cy="10" r="5" fill={getAccentColor()} />
          <circle cx="10" cy="10" r="5" fill={getAccentColor()} />
          <circle cx="10" cy="90" r="5" fill={getAccentColor()} />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard; 