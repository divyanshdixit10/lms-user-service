import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ThreeDCard from '../ui/3DCard';
import GlassCard from '../ui/GlassCard';

interface CourseTag {
  name: string;
  color: string;
}

interface EnhancedCourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  rating: number;
  students: string;
  price: string;
  discount?: string;
  image: string;
  tags: string[];
  featured?: boolean;
  className?: string;
  category?: 'web' | 'ai' | 'cloud' | 'security' | 'mobile' | string;
  progress?: number;
  liveClass?: boolean;
  certification?: boolean;
  newContent?: boolean;
  bestseller?: boolean;
}

const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({
  id,
  title,
  description,
  instructor,
  instructorAvatar,
  duration,
  level,
  rating,
  students,
  price,
  discount,
  image,
  tags,
  featured = false,
  className = '',
  category = 'web',
  progress,
  liveClass = false,
  certification = false,
  newContent = false,
  bestseller = false,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Format tags with appropriate colors
  const formatTags = (): CourseTag[] => {
    const tagColors: {[key: string]: string} = {
      'React': 'bg-blue-500',
      'Node.js': 'bg-green-600',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'Python': 'bg-indigo-600',
      'Java': 'bg-red-600',
      'AWS': 'bg-orange-500',
      'Azure': 'bg-blue-700',
      'Docker': 'bg-blue-500',
      'Kubernetes': 'bg-blue-600',
      'MongoDB': 'bg-green-600',
      'Express': 'bg-gray-700',
      'TensorFlow': 'bg-orange-600',
      'PyTorch': 'bg-red-500',
      'Machine Learning': 'bg-purple-600',
      'Deep Learning': 'bg-purple-700',
      'CSS': 'bg-blue-500',
      'HTML': 'bg-orange-600',
      'UI/UX': 'bg-pink-500',
      'Flutter': 'bg-blue-400',
      'React Native': 'bg-blue-600',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-500',
      'Angular': 'bg-red-600',
      'Vue.js': 'bg-green-500',
      'Next.js': 'bg-black',
      'Svelte': 'bg-red-500',
      'PHP': 'bg-indigo-500',
      'Laravel': 'bg-red-600',
      'Ruby': 'bg-red-700',
      'Rails': 'bg-red-600',
      'C#': 'bg-purple-700',
      '.NET': 'bg-purple-600',
      'Go': 'bg-blue-500',
      'Rust': 'bg-orange-700',
      'Data Science': 'bg-blue-700',
      'Blockchain': 'bg-blue-900',
      'Web3': 'bg-purple-700',
      'Solidity': 'bg-gray-700',
      'GraphQL': 'bg-pink-600',
      'REST': 'bg-blue-600',
      'SQL': 'bg-blue-800',
      'NoSQL': 'bg-green-700',
      'Microservices': 'bg-teal-600',
      'DevOps': 'bg-blue-600',
      'CI/CD': 'bg-orange-600',
      'Testing': 'bg-green-600',
      'Network Security': 'bg-red-700',
      'Ethical Hacking': 'bg-gray-800',
      'Cryptography': 'bg-purple-800',
    };
    
    return tags.map(tag => ({
      name: tag,
      color: tagColors[tag] || 'bg-gray-600'
    }));
  };
  
  // Get category icon
  const getCategoryIcon = () => {
    switch(category) {
      case 'ai':
        return '🤖';
      case 'cloud':
        return '☁️';
      case 'security':
        return '🔒';
      case 'mobile':
        return '📱';
      case 'web':
      default:
        return '💻';
    }
  };
  
  // Get level badge color
  const getLevelColor = () => {
    switch(level) {
      case 'Beginner':
        return 'from-green-500 to-green-600';
      case 'Intermediate':
        return 'from-yellow-500 to-orange-500';
      case 'Advanced':
      case 'Expert':
        return 'from-red-500 to-red-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };
  
  return (
    <ThreeDCard
      depth={30}
      rotateMultiplier={10}
      glareEffect={true}
      shadow={true}
      clickable={true}
      onClick={() => window.location.href = `/courses/${id}`}
      className={`h-full ${className}`}
      borderRadius="0.75rem"
    >
      <div
        className={`relative h-full rounded-xl overflow-hidden transition-all duration-500 ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        } ${featured ? 'border-2 border-indigo-500' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top image with overlay gradient */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div 
            className={`absolute inset-0 opacity-30 bg-gradient-to-br ${
              category === 'ai' ? 'from-purple-900 via-indigo-900 to-transparent' :
              category === 'cloud' ? 'from-blue-900 via-cyan-900 to-transparent' :
              category === 'security' ? 'from-red-900 via-orange-900 to-transparent' :
              category === 'mobile' ? 'from-green-900 via-emerald-900 to-transparent' :
              'from-indigo-900 via-blue-900 to-transparent'
            }`}
          ></div>
          
          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <GlassCard 
              blur="sm" 
              opacity={80} 
              variant="elevated" 
              className="py-1 px-2"
            >
              <div className="flex items-center gap-1">
                <span>{getCategoryIcon()}</span>
                <span className="text-xs font-medium capitalize">
                  {category}
                </span>
              </div>
            </GlassCard>
          </div>
          
          {/* Special badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {bestseller && (
              <GlassCard blur="sm" opacity={80} variant="elevated" className="py-1 px-2 border-l-2 border-yellow-500">
                <span className="text-xs font-medium text-yellow-500">Bestseller</span>
              </GlassCard>
            )}
            
            {newContent && (
              <GlassCard blur="sm" opacity={80} variant="elevated" className="py-1 px-2 border-l-2 border-green-500">
                <span className="text-xs font-medium text-green-500">New</span>
              </GlassCard>
            )}
            
            {liveClass && (
              <GlassCard blur="sm" opacity={80} variant="elevated" className="py-1 px-2 border-l-2 border-red-500">
                <div className="flex items-center gap-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-medium text-red-500">Live</span>
                </div>
              </GlassCard>
            )}
          </div>
          
          {/* Price tag */}
          <div className="absolute bottom-3 right-3">
            <GlassCard blur="md" opacity={90} variant="elevated" className="py-1 px-3">
              <div className="flex flex-col items-end">
                {discount && (
                  <span className="text-xs line-through opacity-70">
                    {discount}
                  </span>
                )}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                  {price}
                </span>
              </div>
            </GlassCard>
          </div>
          
          {/* Progress bar for enrolled courses */}
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="w-full h-1 bg-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Level badge */}
          <div className="mb-2">
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full text-white bg-gradient-to-r ${getLevelColor()}`}>
              {level}
            </span>
            
            {certification && (
              <span className="inline-block ml-2 text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                Certification
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className={`text-lg font-bold mb-2 line-clamp-2 transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${isHovered ? 'text-indigo-500' : ''}`}>
            {title}
          </h3>
          
          {/* Description */}
          <p className={`text-sm mb-3 line-clamp-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {formatTags().map((tag, index) => (
              <span 
                key={index}
                className={`text-xs px-2 py-0.5 rounded-full text-white ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
          
          {/* Instructor */}
          <div className="flex items-center mb-4">
            <img 
              src={instructorAvatar} 
              alt={instructor} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {instructor}
            </span>
          </div>
          
          {/* Course stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {rating.toFixed(1)} ({students})
              </span>
            </div>
            
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {duration}
            </div>
          </div>
          
          {/* Hidden hover state - Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/70 to-black/90 p-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/90 text-sm mb-6">{description}</p>
              <Link
                to={`/courses/${id}`}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 px-6 rounded-full inline-flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Course</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ThreeDCard>
  );
};

export default EnhancedCourseCard; 