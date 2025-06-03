import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const AdminAnalyticsPage: React.FC = () => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<string>('30');
  
  // Mock analytics data for charts
  const statsCards = [
    { 
      id: 1, 
      title: 'Revenue', 
      value: '$45,289', 
      change: '+12.5%', 
      isPositive: true, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) 
    },
    { 
      id: 2, 
      title: 'Users', 
      value: '4,327', 
      change: '+8.1%', 
      isPositive: true, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) 
    },
    { 
      id: 3, 
      title: 'Course Completions', 
      value: '568', 
      change: '+15.3%', 
      isPositive: true, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) 
    },
    { 
      id: 4, 
      title: 'Average Rating', 
      value: '4.8', 
      change: '+0.2', 
      isPositive: true, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ) 
    },
  ];

  // Mock data for top courses
  const topCourses = [
    { id: 1, title: 'React for Beginners', students: 354, revenue: 17697, rating: 4.8 },
    { id: 2, title: 'Python for Data Science', students: 432, revenue: 34558, rating: 4.9 },
    { id: 3, title: 'Advanced JavaScript Patterns', students: 218, revenue: 15258, rating: 4.9 },
    { id: 4, title: 'Node.js API Development', students: 186, revenue: 11158, rating: 4.7 },
    { id: 5, title: 'TypeScript Masterclass', students: 176, revenue: 10558, rating: 4.7 },
  ];

  // Mock data for revenue by category
  const revenueByCategory = [
    { category: 'Frontend', revenue: 28650, percentage: 40 },
    { category: 'Data Science', revenue: 18500, percentage: 25 },
    { category: 'Backend', revenue: 12000, percentage: 15 },
    { category: 'Mobile', revenue: 8500, percentage: 10 },
    { category: 'DevOps', revenue: 7000, percentage: 10 },
  ];

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
                Analytics Dashboard
              </h1>
              <div className="flex gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-secondary-800 border-secondary-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-700'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-secondary-800 text-white hover:bg-secondary-700' 
                      : 'bg-white text-secondary-800 hover:bg-gray-100'
                  } border ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-300'} transition-colors`}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.id * 0.1, duration: 0.5 }}
                  className={`rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                      : 'bg-white shadow-md'
                  } p-6`}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg ${
                      theme === 'dark' ? 'bg-primary-900/30' : 'bg-primary-100'
                    } flex items-center justify-center mr-4 text-primary-500`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                      <h3 className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </h3>
                      <p className={`text-xs font-medium mt-1 flex items-center ${
                        stat.isPositive
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }`}>
                        {stat.isPositive ? (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue Chart */}
              <div className={`rounded-xl ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              } overflow-hidden`}>
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Revenue Overview
                  </h2>
                </div>
                <div className="p-6">
                  {/* Mock chart - would be replaced with a real chart component */}
                  <div className={`w-full h-64 rounded-lg overflow-hidden ${
                    theme === 'dark' ? 'bg-secondary-700/50' : 'bg-gray-100'
                  } p-4 flex flex-col justify-end`}>
                    <div className="flex items-end justify-between h-40">
                      <div className="w-1/12 h-20 bg-primary-400 rounded-t-sm"></div>
                      <div className="w-1/12 h-28 bg-primary-400 rounded-t-sm"></div>
                      <div className="w-1/12 h-24 bg-primary-400 rounded-t-sm"></div>
                      <div className="w-1/12 h-32 bg-primary-400 rounded-t-sm"></div>
                      <div className="w-1/12 h-16 bg-primary-400 rounded-t-sm"></div>
                      <div className="w-1/12 h-36 bg-primary-500 rounded-t-sm"></div>
                      <div className="w-1/12 h-24 bg-primary-500 rounded-t-sm"></div>
                      <div className="w-1/12 h-28 bg-primary-500 rounded-t-sm"></div>
                      <div className="w-1/12 h-40 bg-primary-600 rounded-t-sm"></div>
                      <div className="w-1/12 h-32 bg-primary-600 rounded-t-sm"></div>
                      <div className="w-1/12 h-36 bg-primary-600 rounded-t-sm"></div>
                      <div className="w-1/12 h-28 bg-primary-600 rounded-t-sm"></div>
                    </div>
                    <div className={`flex justify-between mt-4 text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Total Revenue
                      </p>
                      <p className={`text-lg font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        $74,958
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Average Monthly
                      </p>
                      <p className={`text-lg font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        $6,246
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Growth Rate
                      </p>
                      <p className={`text-lg font-bold mt-1 text-green-500`}>
                        +12.5%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Revenue by Category */}
              <div className={`rounded-xl ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              } overflow-hidden`}>
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Revenue by Category
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex justify-center">
                    {/* Mock donut chart - would be replaced with a real chart component */}
                    <div className="w-40 h-40 rounded-full border-8 border-primary-500 relative">
                      <div className="w-full h-full rounded-full border-8 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent transform rotate-45"></div>
                      <div className="w-full h-full rounded-full absolute top-0 border-8 border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-500 transform rotate-[135deg]"></div>
                      <div className="w-full h-full rounded-full absolute top-0 border-8 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent transform -rotate-[70deg]"></div>
                      <div className="w-24 h-24 rounded-full bg-secondary-800 dark:bg-secondary-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          $74,958
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {revenueByCategory.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {category.category}
                          </span>
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            ${category.revenue.toLocaleString()}
                          </span>
                        </div>
                        <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className={`h-full rounded-full ${
                              index === 0 ? 'bg-primary-500' :
                              index === 1 ? 'bg-purple-500' :
                              index === 2 ? 'bg-blue-500' :
                              index === 3 ? 'bg-amber-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Courses */}
            <div className={`rounded-xl ${
              theme === 'dark' 
                ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                : 'bg-white shadow-md'
            } overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Top Performing Courses
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
                  <thead className={`${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${theme === 'dark' ? 'divide-y divide-secondary-700' : 'divide-y divide-gray-200'}`}>
                    {topCourses.map((course) => (
                      <tr key={course.id} className={theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {course.title}
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {course.students}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          ${course.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mr-2`}>
                              {course.rating}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* Mock mini sparkline chart */}
                          <div className="flex items-end h-5 space-x-1">
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '30%' }}></div>
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '60%' }}></div>
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '40%' }}></div>
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '70%' }}></div>
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '50%' }}></div>
                            <div className={`w-1 ${theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-300'} rounded-t`} style={{ height: '60%' }}></div>
                            <div className="w-1 bg-primary-500 rounded-t" style={{ height: '80%' }}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage; 