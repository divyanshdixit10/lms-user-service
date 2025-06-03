import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data for dashboard stats
  const stats = [
    { id: 1, title: 'Total Users', value: '4,328', change: '+12%', icon: '👥' },
    { id: 2, title: 'Active Courses', value: '64', change: '+3', icon: '📚' },
    { id: 3, title: 'Revenue', value: '$45,289', change: '+18%', icon: '💰' },
    { id: 4, title: 'Completion Rate', value: '68%', change: '+5%', icon: '📈' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'completed', course: 'React Fundamentals', time: '2 hours ago' },
    { id: 2, user: 'Sara Johnson', action: 'enrolled in', course: 'Advanced JavaScript', time: '5 hours ago' },
    { id: 3, user: 'Mike Smith', action: 'submitted', course: 'Final Project', time: '1 day ago' },
    { id: 4, user: 'Emily Wilson', action: 'reviewed', course: 'Python for Data Science', time: '2 days ago' },
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
                Admin Dashboard
              </h1>
              <div className="flex gap-3">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-secondary-800 text-white hover:bg-secondary-700' 
                      : 'bg-white text-secondary-800 hover:bg-gray-100'
                  } shadow-sm transition-colors`}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Data
                  </span>
                </button>
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
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                      <h3 className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </h3>
                      <p className={`text-xs font-medium mt-1 flex items-center ${
                        stat.change.includes('+') 
                          ? 'text-green-500' 
                          : stat.change.includes('-') 
                            ? 'text-red-500' 
                            : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {stat.change.includes('+') && (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        )}
                        {stat.change.includes('-') && (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        {stat.change}
                      </p>
                    </div>
                    <div className={`text-2xl w-12 h-12 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-100'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className={`lg:col-span-2 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              } overflow-hidden`}>
                <div className={`px-6 py-4 ${theme === 'dark' ? 'border-b border-secondary-700' : 'border-b'}`}>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200 dark:divide-secondary-700">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="py-3">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${
                            theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-100'
                          } flex items-center justify-center mr-3 text-xs`}>
                            {activity.user.split(' ').map(word => word[0]).join('')}
                          </div>
                          <div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                              <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                              <span className="text-primary-500">{activity.course}</span>
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <button className={`text-sm ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'} hover:underline`}>
                      View All Activity
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className={`rounded-xl ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              } overflow-hidden`}>
                <div className={`px-6 py-4 ${theme === 'dark' ? 'border-b border-secondary-700' : 'border-b'}`}>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Quick Links
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <Link 
                      to="/admin/users" 
                      className={`block p-4 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-secondary-700 hover:bg-secondary-600' 
                          : 'bg-orange-50 hover:bg-orange-100'
                      } transition-colors`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${
                          theme === 'dark' ? 'bg-secondary-600' : 'bg-orange-100'
                        } flex items-center justify-center mr-3`}>
                          <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            User Management
                          </h3>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            View and manage users
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/admin/courses" 
                      className={`block p-4 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-secondary-700 hover:bg-secondary-600' 
                          : 'bg-orange-50 hover:bg-orange-100'
                      } transition-colors`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${
                          theme === 'dark' ? 'bg-secondary-600' : 'bg-orange-100'
                        } flex items-center justify-center mr-3`}>
                          <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Course Management
                          </h3>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Add and edit courses
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/admin/analytics" 
                      className={`block p-4 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-secondary-700 hover:bg-secondary-600' 
                          : 'bg-orange-50 hover:bg-orange-100'
                      } transition-colors`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${
                          theme === 'dark' ? 'bg-secondary-600' : 'bg-orange-100'
                        } flex items-center justify-center mr-3`}>
                          <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Analytics
                          </h3>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Platform performance metrics
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 