import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface CompanyCardProps {
  name: string;
  logo: string;
  hires?: number;
  partnerships?: 'hiring' | 'curriculum' | 'internship' | 'workshop' | 'multiple';
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  hires,
  partnerships = 'hiring',
  tier = 'gold'
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get tier-based styling
  const getTierStyling = () => {
    switch (tier) {
      case 'platinum':
        return {
          border: theme === 'dark' ? 'border-gray-300' : 'border-gray-400',
          text: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
          shadow: 'rgba(255, 255, 255, 0.3)',
          gradientFrom: theme === 'dark' ? 'from-gray-300' : 'from-gray-400',
          gradientTo: theme === 'dark' ? 'to-slate-400' : 'to-slate-500',
        };
      case 'gold':
        return {
          border: theme === 'dark' ? 'border-amber-400' : 'border-amber-500',
          text: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
          shadow: 'rgba(245, 158, 11, 0.3)',
          gradientFrom: theme === 'dark' ? 'from-amber-400' : 'from-amber-500',
          gradientTo: theme === 'dark' ? 'to-orange-400' : 'to-orange-500',
        };
      case 'silver':
        return {
          border: theme === 'dark' ? 'border-slate-400' : 'border-slate-500',
          text: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
          shadow: 'rgba(148, 163, 184, 0.3)',
          gradientFrom: theme === 'dark' ? 'from-slate-400' : 'from-slate-500',
          gradientTo: theme === 'dark' ? 'to-slate-500' : 'to-slate-600',
        };
      case 'bronze':
        return {
          border: theme === 'dark' ? 'border-amber-700' : 'border-amber-800',
          text: theme === 'dark' ? 'text-amber-700' : 'text-amber-800',
          shadow: 'rgba(180, 83, 9, 0.3)',
          gradientFrom: theme === 'dark' ? 'from-amber-700' : 'from-amber-800',
          gradientTo: theme === 'dark' ? 'to-yellow-700' : 'to-yellow-800',
        };
      default:
        return {
          border: theme === 'dark' ? 'border-indigo-500' : 'border-indigo-600',
          text: theme === 'dark' ? 'text-indigo-500' : 'text-indigo-600',
          shadow: 'rgba(99, 102, 241, 0.3)',
          gradientFrom: theme === 'dark' ? 'from-indigo-500' : 'from-indigo-600',
          gradientTo: theme === 'dark' ? 'to-purple-500' : 'to-purple-600',
        };
    }
  };
  
  const tierStyles = getTierStyling();
  
  // Partnership badge text
  const getPartnershipText = () => {
    switch (partnerships) {
      case 'curriculum':
        return 'Curriculum Partner';
      case 'internship':
        return 'Internship Partner';
      case 'workshop':
        return 'Workshop Partner';
      case 'multiple':
        return 'Strategic Partner';
      case 'hiring':
      default:
        return 'Hiring Partner';
    }
  };
  
  // Technology pattern for background
  const renderTechPattern = () => {
    // Generate binary/hex pattern based on company name
    const binary = [];
    const nameToHex = name.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
    
    for (let i = 0; i < 4; i++) {
      binary.push(
        <div key={i} className="absolute text-xs font-mono opacity-10 font-light">
          {Math.random() > 0.5
            ? '01'.repeat(Math.floor(Math.random() * 8) + 4)
            : nameToHex.slice(0, Math.floor(Math.random() * nameToHex.length))}
        </div>
      );
    }
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {binary.map((el, idx) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          return (
            <div
              key={idx}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`relative ${
        theme === 'dark'
          ? 'bg-slate-800/60 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm shadow-lg'
      } p-6 rounded-xl overflow-hidden flex flex-col items-center justify-center`}
      style={{ minHeight: '160px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border glow effect on hover */}
      <motion.div
        className={`absolute inset-0 rounded-xl border ${tierStyles.border} pointer-events-none`}
        animate={{
          opacity: isHovered ? 1 : 0.3,
          boxShadow: isHovered
            ? `0 0 15px ${tierStyles.shadow}`
            : '0 0 0px transparent'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Tech pattern in the background - animate on hover */}
      <motion.div
        className={`${
          theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
        } overflow-hidden pointer-events-none absolute inset-0`}
        animate={{
          opacity: isHovered ? 0.1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {renderTechPattern()}
      </motion.div>
      
      {/* Tier-based gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${tierStyles.gradientFrom} ${tierStyles.gradientTo} opacity-0 pointer-events-none`}
        animate={{
          opacity: isHovered ? 0.05 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Company logo */}
      <motion.div
        className="mb-4 flex items-center justify-center"
        animate={{
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={logo}
          alt={name}
          className="h-14 w-auto max-w-[120px] object-contain"
          style={{ filter: theme === 'dark' ? 'brightness(1.2)' : 'none' }}
        />
      </motion.div>
      
      {/* Company name */}
      <motion.h3
        className={`text-center font-medium ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}
        animate={{
          y: isHovered ? -5 : 0,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {name}
      </motion.h3>
      
      {/* Stats on hover */}
      <motion.div
        className="text-center"
        animate={{
          y: isHovered ? 0 : 20,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {hires && (
          <div className={`text-sm font-semibold ${tierStyles.text}`}>
            {hires}+ Hires
          </div>
        )}
        
        <div className={`text-xs mt-1 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {getPartnershipText()}
        </div>
      </motion.div>
      
      {/* Tier badge */}
      <motion.div
        className={`absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-full ${tierStyles.border} ${tierStyles.text}`}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </motion.div>
    </motion.div>
  );
};

export default CompanyCard; 