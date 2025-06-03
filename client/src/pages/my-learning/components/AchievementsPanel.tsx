import React from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
}

const AchievementsPanel: React.FC = () => {
  // Mock data for achievements
  const achievements: Achievement[] = [
    {
      id: 'a1',
      title: 'Fast Learner',
      description: 'Complete 5 lessons in a single day',
      icon: '🚀',
      unlockedAt: new Date('2023-05-10')
    },
    {
      id: 'a2',
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      unlockedAt: new Date('2023-05-08')
    },
    {
      id: 'a3',
      title: 'Quiz Whiz',
      description: 'Score 100% on 3 consecutive quizzes',
      icon: '🧠',
      unlockedAt: new Date('2023-04-28')
    },
    {
      id: 'a4',
      title: 'Code Master',
      description: 'Complete 10 coding challenges',
      icon: '💻',
      progress: {
        current: 6,
        total: 10
      }
    },
    {
      id: 'a5',
      title: 'Course Champion',
      description: 'Complete 5 courses',
      icon: '🏆',
      progress: {
        current: 3,
        total: 5
      }
    }
  ];
  
  // Split achievements between unlocked and in-progress
  const unlockedAchievements = achievements.filter(achievement => achievement.unlockedAt);
  const inProgressAchievements = achievements.filter(achievement => !achievement.unlockedAt);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
        </div>
        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
          {unlockedAchievements.length}/{achievements.length}
        </span>
      </div>
      
      {/* Unlocked Achievements */}
      <div className="space-y-4 mb-6">
        {unlockedAchievements.map(achievement => (
          <motion.div 
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 text-xl">
              {achievement.icon}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Unlocked: {achievement.unlockedAt?.toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* In-Progress Achievements */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">In Progress</h4>
        <div className="space-y-4">
          {inProgressAchievements.map(achievement => (
            <div 
              key={achievement.id}
              className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-xl opacity-60">
                {achievement.icon}
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                {achievement.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress.current}/{achievement.progress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gray-500 dark:bg-gray-400 h-1.5 rounded-full" 
                        style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* View All Achievements Button */}
      <button className="w-full mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
        View All Achievements
      </button>
    </motion.div>
  );
};

export default AchievementsPanel; 