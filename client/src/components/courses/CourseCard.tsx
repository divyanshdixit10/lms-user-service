import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface CourseCardProps {
  title: string;
  duration: string;
  level: string;
  rating: number;
  students: string;
  price: string;
  image: string;
  tags: string[];
  slug?: string;
  category?: string;
  featured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  duration,
  level,
  rating,
  students,
  price,
  image,
  tags,
  slug = '',
  category = '',
  featured = false,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate slug if not provided
  const courseSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
  
  // Generate random tech pattern for background
  const generateTechPattern = () => {
    const patternElements = [];
    const symbols = ['{ }', '< >', '( )', '[ ]', '//', '/*', '*/', '=>', ';;', '&&', '||'];
    const count = Math.floor(Math.random() * 5) + 5; // 5-10 elements
    
    for (let i = 0; i < count; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.3 + 0.05;
      const size = Math.random() * 0.5 + 0.7; // 0.7-1.2rem
      
      patternElements.push(
        <div 
          key={i}
          className="absolute text-current font-mono"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity,
            fontSize: `${size}rem`,
            transform: `rotate(${Math.random() * 60 - 30}deg)`,
          }}
        >
          {symbol}
        </div>
      );
    }
    
    return patternElements;
  };
  
  // Generate stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="url(#half-gradient)" />
        </svg>
      );
    }
    
    // Add empty stars to make total of 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  // Calculate gradient based on category or level
  const getCategoryGradient = () => {
    if (category === 'ai' || title.toLowerCase().includes('ai') || title.toLowerCase().includes('machine learning')) {
      return 'from-purple-600 to-purple-800 dark:from-purple-600 dark:to-purple-900';
    } else if (category === 'web' || title.toLowerCase().includes('web') || title.toLowerCase().includes('full stack')) {
      return 'from-indigo-600 to-indigo-800 dark:from-indigo-600 dark:to-indigo-900';
    } else if (category === 'cloud' || title.toLowerCase().includes('cloud') || title.toLowerCase().includes('devops')) {
      return 'from-cyan-600 to-cyan-800 dark:from-cyan-600 dark:to-cyan-900';
    } else if (category === 'security' || title.toLowerCase().includes('security') || title.toLowerCase().includes('cyber')) {
      return 'from-slate-600 to-slate-800 dark:from-slate-600 dark:to-slate-900';
    } else {
      return 'from-blue-600 to-blue-800 dark:from-blue-600 dark:to-blue-900';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={`relative rounded-xl overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-800/90 backdrop-blur-sm border border-slate-700/50'
          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
      } h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tech pattern background - only visible on hover */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-0 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {generateTechPattern()}
      </motion.div>
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryGradient()} text-white`}>
            Featured
          </div>
        </div>
      )}
      
      {/* Course image with overlay */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"
          animate={{
            opacity: isHovered ? 0.9 : 0.7
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x200?text=Course";
          }}
        />
        
        {/* Level badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs ${
            level.toLowerCase().includes('advanced')
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              : level.toLowerCase().includes('intermediate')
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {level}
          </div>
        </div>
        
        {/* Course title overlay */}
        <div className="absolute bottom-0 left-0 w-full z-20 p-4">
          <h3 className="text-xl font-bold text-white line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Course details */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs ${
                theme === 'dark'
                  ? 'bg-slate-700/50 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Rating and students */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="flex mr-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{students} students</span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration}
        </div>
        
        {/* Price and CTA */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {price}
          </div>
          
          <Link
            to={`/courses/${courseSlug}`}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getCategoryGradient()} text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95`}
          >
            View Course
          </Link>
        </div>
      </div>
      
      {/* Hover overlay with animation */}
      <motion.div
        className={`absolute inset-0 rounded-xl pointer-events-none border-2 ${
          theme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-500/20'
        }`}
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered
            ? theme === 'dark'
              ? '0 0 20px rgba(99, 102, 241, 0.3)'
              : '0 0 20px rgba(99, 102, 241, 0.2)'
            : '0 0 0px rgba(99, 102, 241, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CourseCard; 