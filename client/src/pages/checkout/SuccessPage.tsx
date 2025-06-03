import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const SuccessPage: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const courseTitle = location.state?.courseTitle || 'your course';
  
  useEffect(() => {
    // Show a welcome toast when the page loads
    toast.success(`You're now enrolled in ${courseTitle}!`);
  }, [courseTitle]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg shadow-sm p-8 text-center ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Thank You for Your Purchase!
          </h1>

          <p className={`mb-8 ${
            theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
          }`}>
            You've successfully enrolled in <span className="font-semibold">{courseTitle}</span>. You can now access your course materials and start learning right away.
          </p>

          <div className="space-y-4">
            <Link
              to="/dashboard/my-learning"
              className={`block w-full px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                theme === 'dark'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Go to My Learning
            </Link>

            <Link
              to="/courses"
              className={`block w-full px-6 py-3 rounded-md ${
                theme === 'dark'
                  ? 'border border-slate-600 text-slate-300 hover:bg-slate-700'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Browse More Courses
            </Link>
          </div>

          <div className={`mt-8 pt-8 ${
            theme === 'dark' ? 'border-t border-slate-700' : 'border-t border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl mb-2">📚</div>
                <h3 className={`font-medium mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Access Course Materials
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Start learning with our comprehensive course materials
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl mb-2">👥</div>
                <h3 className={`font-medium mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Join Community
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Connect with other students and instructors
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl mb-2">📱</div>
                <h3 className={`font-medium mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Download App
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Learn on the go with our mobile app
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage; 