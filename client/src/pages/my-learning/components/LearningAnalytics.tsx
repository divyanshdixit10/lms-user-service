import React from 'react';
import { motion } from 'framer-motion';

const LearningAnalytics: React.FC = () => {
  // Mock data
  const dailyProgress = {
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [2.5, 1, 3.5, 0.5, 2, 1.5, 3],
  };
  
  // Calculate max value for scaling
  const maxValue = Math.max(...dailyProgress.values);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Analytics</h3>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">42.5</p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">7 days</p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Daily</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2.1h</p>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Progress</h4>
          <div className="text-xs text-gray-500 dark:text-gray-400">14.5 hours this week</div>
        </div>
        
        <div className="flex items-end h-32 mt-2 space-x-2">
          {dailyProgress.values.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t"
                style={{ 
                  height: `${(value / maxValue) * 100}%`, 
                  minHeight: value > 0 ? '4px' : '0'
                }}
              ></div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {dailyProgress.dates[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Learning Categories</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
              <span>Web Development</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
              <span>Data Science</span>
              <span>25%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
              <span>Mobile Development</span>
              <span>10%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningAnalytics; 