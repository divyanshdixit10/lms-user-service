import React from 'react';
import { motion } from 'framer-motion';

interface CourseProgress {
  courseId: string;
  completedLectures: string[];
  completedQuizzes: string[];
  lastWatched: {
    lectureId: string;
    timestamp: Date;
    position: number;
  };
  totalProgress: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: string;
  description: string;
  enrolledDate: Date;
  tags: string[];
  totalLectures: number;
  totalDuration: number;
  ratings: {
    average: number;
    count: number;
  };
  progress: CourseProgress;
}

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
  onViewCourse: (courseId: string) => void;
  formatDuration: (minutes: number) => string;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ 
  course, 
  onViewCourse,
  formatDuration
}) => {
  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    const colors = {
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
      'React': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
      'Python': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
      'Machine Learning': 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
      'Data Science': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
      'Web Development': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
      'ES6': 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100',
      'Frontend': 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100',
      'Redux': 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    };
    
    // @ts-ignore
    return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };
  
  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            <span className="text-white text-xs font-medium">
              {formatDuration(course.totalDuration)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 h-14">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          by {course.instructor}
        </p>
        
        <div className="mt-3 flex items-center">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${course.progress.totalProgress}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {course.progress.totalProgress}%
          </span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              +{course.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {course.ratings.average.toFixed(1)}
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              ({course.ratings.count})
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {course.totalLectures} lectures
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onViewCourse(course.id)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            Continue Learning
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnrolledCourseCard; 