import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LearningGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline?: Date;
  completed: boolean;
}

const LearningGoals: React.FC = () => {
  const [goals, setGoals] = useState<LearningGoal[]>([
    {
      id: 'g1',
      title: 'Complete React Course',
      target: 100,
      current: 45,
      unit: '%',
      deadline: new Date('2023-06-30'),
      completed: false
    },
    {
      id: 'g2',
      title: 'Practice Coding',
      target: 20,
      current: 12,
      unit: 'hours',
      deadline: new Date('2023-05-31'),
      completed: false
    },
    {
      id: 'g3',
      title: 'Solve Algorithm Problems',
      target: 50,
      current: 23,
      unit: 'problems',
      deadline: new Date('2023-07-15'),
      completed: false
    },
    {
      id: 'g4',
      title: 'Read Documentation',
      target: 10,
      current: 10,
      unit: 'articles',
      completed: true
    }
  ]);
  
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalUnit, setNewGoalUnit] = useState('hours');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  
  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline: Date): number => {
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  // Add new goal
  const handleAddGoal = () => {
    if (!newGoalTitle || !newGoalTarget) return;
    
    const newGoal: LearningGoal = {
      id: `g${goals.length + 1}`,
      title: newGoalTitle,
      target: parseInt(newGoalTarget),
      current: 0,
      unit: newGoalUnit,
      deadline: newGoalDeadline ? new Date(newGoalDeadline) : undefined,
      completed: false
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalUnit('hours');
    setNewGoalDeadline('');
    setShowAddGoal(false);
  };
  
  // Mark goal as completed
  const toggleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Goals</h3>
        </div>
        
        <button 
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="text-sm flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Goal
        </button>
      </div>
      
      {/* Add Goal Form */}
      {showAddGoal && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">New Learning Goal</h4>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="goal-title" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Goal Title
              </label>
              <input
                id="goal-title"
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Enter your goal"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="goal-target" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Target
                </label>
                <input
                  id="goal-target"
                  type="number"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  min="1"
                  placeholder="Target amount"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="goal-unit" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Unit
                </label>
                <select
                  id="goal-unit"
                  value={newGoalUnit}
                  onChange={(e) => setNewGoalUnit(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                >
                  <option value="hours">Hours</option>
                  <option value="%">Percent</option>
                  <option value="problems">Problems</option>
                  <option value="courses">Courses</option>
                  <option value="articles">Articles</option>
                  <option value="videos">Videos</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="goal-deadline" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Deadline (Optional)
              </label>
              <input
                id="goal-deadline"
                type="date"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Goal
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Goals List */}
      <div className="space-y-4">
        {goals.map(goal => (
          <div 
            key={goal.id}
            className={`p-4 border ${goal.completed ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'} rounded-lg transition-colors`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoalCompletion(goal.id)}
                  className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <div className="ml-3">
                  <h4 className={`text-sm font-medium ${goal.completed ? 'line-through text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {goal.title}
                  </h4>
                  {goal.deadline && (
                    <p className={`text-xs mt-1 ${
                      goal.completed 
                        ? 'text-green-600 dark:text-green-400' 
                        : getDaysRemaining(goal.deadline) < 7 
                          ? 'text-red-500' 
                          : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {goal.completed 
                        ? 'Completed' 
                        : `Deadline: ${goal.deadline.toLocaleDateString()} (${getDaysRemaining(goal.deadline)} days left)`}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {goal.current}/{goal.target} {goal.unit}
              </div>
            </div>
            
            {!goal.completed && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {goals.length === 0 && (
          <div className="text-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No learning goals yet. Add your first goal to stay motivated!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LearningGoals; 