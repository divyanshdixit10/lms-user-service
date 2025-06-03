import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  instructor: string;
  price: number;
  image: string;
  category: string;
}

const CoursesPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and modern user interfaces.',
      level: 'Beginner',
      duration: '12 weeks',
      lessons: 48,
      rating: 4.8,
      students: 1250,
      instructor: 'John Smith',
      price: 49.99,
      image: '/courses/web-dev.jpg',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'React & TypeScript Masterclass',
      description: 'Master React with TypeScript. Build scalable applications with modern best practices.',
      level: 'Intermediate',
      duration: '10 weeks',
      lessons: 40,
      rating: 4.9,
      students: 850,
      instructor: 'Sarah Johnson',
      price: 69.99,
      image: '/courses/react.jpg',
      category: 'Frontend',
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      description: 'Build robust backend services with Node.js. Learn Express, MongoDB, and API development.',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 32,
      rating: 4.7,
      students: 720,
      instructor: 'Michael Chen',
      price: 59.99,
      image: '/courses/nodejs.jpg',
      category: 'Backend',
    },
    {
      id: 4,
      title: 'Advanced System Design',
      description: 'Learn to design and implement scalable distributed systems. Master microservices architecture.',
      level: 'Advanced',
      duration: '14 weeks',
      lessons: 56,
      rating: 4.9,
      students: 450,
      instructor: 'Emily Rodriguez',
      price: 89.99,
      image: '/courses/system-design.jpg',
      category: 'System Design',
    },
  ];

  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-12`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Explore Our Courses
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Learn from industry experts and advance your career with our comprehensive courses
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-secondary-800 text-white placeholder-gray-400'
                    : 'bg-white text-gray-900 placeholder-gray-500'
                } border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors`}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-secondary-800 text-white'
                  : 'bg-white text-gray-900'
              } border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-secondary-800 text-white'
                  : 'bg-white text-gray-900'
              } border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors`}
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className={`rounded-xl overflow-hidden ${
                theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="aspect-video bg-gray-800 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner'
                      ? 'bg-green-500/90 text-white'
                      : course.level === 'Intermediate'
                        ? 'bg-yellow-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`}>
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className={`ml-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.lessons} lessons
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${course.price}
                  </span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No courses found
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 