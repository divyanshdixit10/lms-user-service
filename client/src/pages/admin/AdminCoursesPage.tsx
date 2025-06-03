import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Course {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  price: number;
  status: 'published' | 'draft' | 'archived';
  students: number;
  rating: number;
  lastUpdated: string;
}

const AdminCoursesPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Mock course data
  const courses: Course[] = [
    {
      id: '1',
      title: 'React for Beginners',
      category: 'Frontend',
      level: 'beginner',
      instructor: 'Jane Smith',
      price: 49.99,
      status: 'published',
      students: 354,
      rating: 4.8,
      lastUpdated: '2023-04-20'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      category: 'Frontend',
      level: 'advanced',
      instructor: 'John Doe',
      price: 69.99,
      status: 'published',
      students: 218,
      rating: 4.9,
      lastUpdated: '2023-03-15'
    },
    {
      id: '3',
      title: 'Node.js API Development',
      category: 'Backend',
      level: 'intermediate',
      instructor: 'David Wilson',
      price: 59.99,
      status: 'published',
      students: 186,
      rating: 4.7,
      lastUpdated: '2023-04-05'
    },
    {
      id: '4',
      title: 'Python for Data Science',
      category: 'Data Science',
      level: 'intermediate',
      instructor: 'Sarah Williams',
      price: 79.99,
      status: 'published',
      students: 432,
      rating: 4.9,
      lastUpdated: '2023-04-30'
    },
    {
      id: '5',
      title: 'Flutter Mobile App Development',
      category: 'Mobile',
      level: 'beginner',
      instructor: 'Mike Johnson',
      price: 54.99,
      status: 'draft',
      students: 0,
      rating: 0,
      lastUpdated: '2023-05-01'
    },
    {
      id: '6',
      title: 'Docker and Kubernetes',
      category: 'DevOps',
      level: 'advanced',
      instructor: 'Emily Davis',
      price: 69.99,
      status: 'published',
      students: 124,
      rating: 4.6,
      lastUpdated: '2023-03-28'
    },
    {
      id: '7',
      title: 'Machine Learning Fundamentals',
      category: 'Data Science',
      level: 'intermediate',
      instructor: 'Robert Brown',
      price: 89.99,
      status: 'archived',
      students: 286,
      rating: 4.5,
      lastUpdated: '2022-12-10'
    },
    {
      id: '8',
      title: 'TypeScript Masterclass',
      category: 'Frontend',
      level: 'intermediate',
      instructor: 'Jane Smith',
      price: 59.99,
      status: 'published',
      students: 176,
      rating: 4.7,
      lastUpdated: '2023-02-15'
    },
  ];

  // Categories for filter
  const categories = Array.from(new Set(courses.map(course => course.category)));

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter(course => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get level badge class
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'intermediate':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'advanced':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-6`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-secondary-900'}`}>
                Course Management
              </h1>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 shadow-sm transition-colors`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Course
                </span>
              </button>
            </div>

            {/* Filters */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
            } shadow-md`}>
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  placeholder="Search courses..."
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`w-full py-2 px-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full py-2 px-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Course Table */}
            <div className={`rounded-lg overflow-hidden shadow-md ${
              theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
            }`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
                  <thead className={`${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${theme === 'dark' ? 'divide-y divide-secondary-700' : 'divide-y divide-gray-200'}`}>
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className={theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg ${
                              theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-100'
                            } flex items-center justify-center mr-3 text-primary-500`}>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {course.title}
                              </div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {course.instructor}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {course.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeClass(course.level)}`}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          ${course.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(course.status)}`}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {course.students}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {course.rating > 0 ? (
                            <div className="flex items-center">
                              <span>{course.rating}</span>
                              <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-secondary-600' : 'hover:bg-gray-100'}`}>
                              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-secondary-600' : 'hover:bg-gray-100'}`}>
                              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-secondary-600' : 'hover:bg-gray-100'}`}>
                              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing <span className="font-medium">{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
              </div>
              <div className="flex space-x-1">
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-primary-700 text-white' 
                    : 'bg-primary-500 text-white'
                }`}>1</button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>2</button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCoursesPage; 