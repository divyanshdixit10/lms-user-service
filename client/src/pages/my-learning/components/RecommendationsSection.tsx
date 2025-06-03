import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RecommendedCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  relevanceScore: number;
  tags: string[];
  price: string;
}

const RecommendationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  
  // Mock recommended courses data
  const recommendedCourses: RecommendedCourse[] = [
    {
      id: 'rc1',
      title: 'Advanced React Patterns and Performance',
      instructor: 'James Lee',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: 'Web Development',
      level: 'Advanced',
      duration: '12h 30m',
      rating: 4.9,
      students: 12430,
      relevanceScore: 98,
      tags: ['React', 'Performance', 'Frontend'],
      price: '₹14,999'
    },
    {
      id: 'rc2',
      title: 'GraphQL API Development with Node.js',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: 'Backend Development',
      level: 'Intermediate',
      duration: '8h 45m',
      rating: 4.8,
      students: 8765,
      relevanceScore: 92,
      tags: ['GraphQL', 'Node.js', 'API Development'],
      price: '₹11,999'
    },
    {
      id: 'rc3',
      title: 'Machine Learning with TensorFlow 2.0',
      instructor: 'Dr. Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
      category: 'Machine Learning',
      level: 'Advanced',
      duration: '16h 20m',
      rating: 4.9,
      students: 15230,
      relevanceScore: 85,
      tags: ['Machine Learning', 'TensorFlow', 'Python'],
      price: '₹16,999'
    },
    {
      id: 'rc4',
      title: 'Full-Stack JavaScript: MERN Stack',
      instructor: 'David Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '14h 15m',
      rating: 4.7,
      students: 9870,
      relevanceScore: 90,
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      price: '₹13,999'
    }
  ];
  
  const trendingCourses: RecommendedCourse[] = [
    {
      id: 'tc1',
      title: 'The Complete AWS Cloud Certification Guide',
      instructor: 'Alex Davidson',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      category: 'Cloud Computing',
      level: 'All Levels',
      duration: '21h 45m',
      rating: 4.8,
      students: 28540,
      relevanceScore: 94,
      tags: ['AWS', 'Cloud', 'Certification'],
      price: '₹17,999'
    },
    {
      id: 'tc2',
      title: 'Modern Web Animation Techniques',
      instructor: 'Emily Parker',
      thumbnail: 'https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '9h 30m',
      rating: 4.9,
      students: 18920,
      relevanceScore: 88,
      tags: ['Animation', 'CSS', 'JavaScript'],
      price: '₹12,999'
    },
    {
      id: 'tc3',
      title: 'Flutter & Firebase: Mobile App Development',
      instructor: 'Ryan Martinez',
      thumbnail: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '15h 20m',
      rating: 4.8,
      students: 14560,
      relevanceScore: 91,
      tags: ['Flutter', 'Firebase', 'Mobile Apps'],
      price: '₹14,999'
    },
    {
      id: 'tc4',
      title: 'Blockchain Development: Ethereum & Solidity',
      instructor: 'Daniel Brown',
      thumbnail: 'https://images.unsplash.com/photo-1644143379190-08a5f055de1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Blockchain',
      level: 'Advanced',
      duration: '18h 10m',
      rating: 4.7,
      students: 11230,
      relevanceScore: 87,
      tags: ['Blockchain', 'Ethereum', 'Solidity'],
      price: '₹15,999'
    }
  ];
  
  // Get courses based on active tab
  const getActiveCourses = () => {
    switch (activeTab) {
      case 'for-you':
        return recommendedCourses;
      case 'trending':
        return trendingCourses;
      default:
        return recommendedCourses;
    }
  };
  
  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800',
      'Performance': 'bg-purple-100 text-purple-800',
      'Frontend': 'bg-sky-100 text-sky-800',
      'GraphQL': 'bg-pink-100 text-pink-800',
      'Node.js': 'bg-green-100 text-green-800',
      'API Development': 'bg-teal-100 text-teal-800',
      'Machine Learning': 'bg-indigo-100 text-indigo-800',
      'TensorFlow': 'bg-blue-100 text-blue-800',
      'Python': 'bg-green-100 text-green-800',
      'MongoDB': 'bg-green-100 text-green-800',
      'Express': 'bg-gray-100 text-gray-800',
      'AWS': 'bg-orange-100 text-orange-800',
      'Cloud': 'bg-blue-100 text-blue-800',
      'Certification': 'bg-amber-100 text-amber-800',
      'Animation': 'bg-pink-100 text-pink-800',
      'CSS': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'Flutter': 'bg-blue-100 text-blue-800',
      'Firebase': 'bg-orange-100 text-orange-800',
      'Mobile Apps': 'bg-teal-100 text-teal-800',
      'Blockchain': 'bg-indigo-100 text-indigo-800',
      'Ethereum': 'bg-purple-100 text-purple-800',
      'Solidity': 'bg-gray-100 text-gray-800',
    };
    
    // @ts-ignore
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI-Powered Recommendations
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('for-you')}
            className={`px-4 py-2 text-sm rounded-full ${
              activeTab === 'for-you'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 text-sm rounded-full ${
              activeTab === 'trending'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            Trending Now
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getActiveCourses().map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-32 object-cover"
                />
                {activeTab === 'for-you' && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {course.relevanceScore}% Match
                  </div>
                )}
                {activeTab === 'trending' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Trending
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-2 h-12">
                  {course.title}
                </h3>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  by {course.instructor}
                </p>
                
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="mx-2 text-gray-300 dark:text-gray-600">|</div>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {course.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 2 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      +{course.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {course.price}
                  </span>
                  
                  <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium">
                    View Course
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection; 