import React from 'react';
import { motion } from 'framer-motion';

interface PathMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
  estimatedHours: number;
}

const LearningPathProgress: React.FC = () => {
  // Mock data for learning path
  const learningPath: PathMilestone[] = [
    {
      id: 'm1',
      title: 'Frontend Fundamentals',
      description: 'HTML, CSS, JavaScript basics',
      completed: true,
      estimatedHours: 20
    },
    {
      id: 'm2',
      title: 'Advanced JavaScript',
      description: 'ES6+, Promises, Async/Await',
      completed: true,
      estimatedHours: 25
    },
    {
      id: 'm3',
      title: 'React Fundamentals',
      description: 'Components, Props, State',
      completed: true,
      estimatedHours: 30
    },
    {
      id: 'm4',
      title: 'Advanced React',
      description: 'Hooks, Context, Performance',
      completed: false,
      current: true,
      estimatedHours: 35
    },
    {
      id: 'm5',
      title: 'Backend Integration',
      description: 'REST APIs, Authentication',
      completed: false,
      estimatedHours: 40
    },
    {
      id: 'm6',
      title: 'Full Stack Project',
      description: 'Build a complete application',
      completed: false,
      estimatedHours: 50
    }
  ];
  
  // Calculate overall progress
  const completedMilestones = learningPath.filter(milestone => milestone.completed).length;
  const totalMilestones = learningPath.length;
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Path</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
          <span>Overall Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="relative">
        {/* Path vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Milestones */}
        <div className="space-y-4">
          {learningPath.map((milestone, index) => (
            <div 
              key={milestone.id}
              className={`relative flex items-start pl-10 ${
                milestone.current ? 'animate-pulse' : ''
              }`}
            >
              {/* Milestone indicator */}
              <div className="absolute left-0 top-0 mt-1.5">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  milestone.completed
                    ? 'bg-green-500'
                    : milestone.current
                      ? 'bg-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-900'
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {milestone.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : milestone.current ? (
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  ) : (
                    <span className="text-xs text-gray-600 dark:text-gray-400">{index + 1}</span>
                  )}
                </div>
              </div>
              
              {/* Milestone content */}
              <div className={`flex-1 pb-4 ${
                milestone.completed 
                  ? 'opacity-70' 
                  : milestone.current 
                    ? 'font-medium' 
                    : 'opacity-50'
              }`}>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {milestone.title}
                  {milestone.current && (
                    <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                      Current
                    </span>
                  )}
                </h4>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Estimated time: {milestone.estimatedHours} hours
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Customize Learning Path
        </button>
      </div>
    </motion.div>
  );
};

export default LearningPathProgress; 