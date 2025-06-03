import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  attempted: boolean;
  correct?: boolean;
}

interface CourseMCQsProps {
  courseId: string;
  lectureId: string;
}

const CourseMCQs: React.FC<CourseMCQsProps> = ({ courseId, lectureId }) => {
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  // Mock MCQs data
  const mcqs: MCQ[] = [
    {
      id: 'q1',
      question: 'Which of the following is NOT a valid variable name in C?',
      options: [
        { id: 'q1_a', text: '_variable', isCorrect: false },
        { id: 'q1_b', text: 'variable123', isCorrect: false },
        { id: 'q1_c', text: '123variable', isCorrect: true },
        { id: 'q1_d', text: 'variable_name', isCorrect: false }
      ],
      explanation: 'Variable names in C cannot start with a number. They must begin with a letter or underscore.',
      difficulty: 'easy',
      topic: 'Variables',
      attempted: true,
      correct: true
    },
    {
      id: 'q2',
      question: 'What is the output of the following code?\n\n```c\nint x = 5;\nprintf("%d", x++);\n```',
      options: [
        { id: 'q2_a', text: '5', isCorrect: true },
        { id: 'q2_b', text: '6', isCorrect: false },
        { id: 'q2_c', text: '4', isCorrect: false },
        { id: 'q2_d', text: 'Compilation error', isCorrect: false }
      ],
      explanation: 'The post-increment operator (x++) increments the value after it is used. So printf prints 5, then x becomes 6.',
      difficulty: 'easy',
      topic: 'Operators',
      attempted: true,
      correct: false
    },
    {
      id: 'q3',
      question: 'Which header file should be included to use the malloc() function?',
      options: [
        { id: 'q3_a', text: '<string.h>', isCorrect: false },
        { id: 'q3_b', text: '<stdlib.h>', isCorrect: true },
        { id: 'q3_c', text: '<math.h>', isCorrect: false },
        { id: 'q3_d', text: '<memory.h>', isCorrect: false }
      ],
      explanation: 'The stdlib.h header file contains declarations for dynamic memory allocation functions like malloc(), calloc(), realloc(), and free().',
      difficulty: 'medium',
      topic: 'Memory Management',
      attempted: false
    },
    {
      id: 'q4',
      question: 'What does the following code do?\n\n```c\nint *p = (int*)malloc(5 * sizeof(int));\n```',
      options: [
        { id: 'q4_a', text: 'Allocates memory for 5 integers and assigns the address to pointer p', isCorrect: true },
        { id: 'q4_b', text: 'Allocates memory for a single integer and multiplies it by 5', isCorrect: false },
        { id: 'q4_c', text: 'Creates an array of 5 integers on the stack', isCorrect: false },
        { id: 'q4_d', text: 'Causes a compilation error', isCorrect: false }
      ],
      explanation: 'This code allocates memory on the heap for an array of 5 integers using malloc() and assigns the starting address to the pointer p.',
      difficulty: 'medium',
      topic: 'Memory Management',
      attempted: false
    },
    {
      id: 'q5',
      question: 'What is the time complexity of binary search algorithm?',
      options: [
        { id: 'q5_a', text: 'O(n)', isCorrect: false },
        { id: 'q5_b', text: 'O(n²)', isCorrect: false },
        { id: 'q5_c', text: 'O(log n)', isCorrect: true },
        { id: 'q5_d', text: 'O(n log n)', isCorrect: false }
      ],
      explanation: 'Binary search repeatedly divides the search interval in half, resulting in a logarithmic time complexity of O(log n).',
      difficulty: 'hard',
      topic: 'Algorithms',
      attempted: false
    },
    {
      id: 'q6',
      question: 'Which of the following is a valid way to declare a function pointer in C that points to a function taking an int and returning void?',
      options: [
        { id: 'q6_a', text: 'void (*fp)(int);', isCorrect: true },
        { id: 'q6_b', text: 'void *fp(int);', isCorrect: false },
        { id: 'q6_c', text: 'int (*fp)(void);', isCorrect: false },
        { id: 'q6_d', text: 'int *fp(void);', isCorrect: false }
      ],
      explanation: 'The correct syntax for a function pointer declaration is: return_type (*pointer_name)(parameter_types);',
      difficulty: 'hard',
      topic: 'Pointers',
      attempted: false
    }
  ];
  
  // Get unique topics and difficulties for filters
  const topics = ['all', ...Array.from(new Set(mcqs.map(q => q.topic)))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];
  
  // Filter MCQs based on selected filters
  const filteredMCQs = mcqs.filter(mcq => {
    if (filterTopic !== 'all' && mcq.topic !== filterTopic) return false;
    if (filterDifficulty !== 'all' && mcq.difficulty !== filterDifficulty) return false;
    if (filterStatus === 'attempted' && !mcq.attempted) return false;
    if (filterStatus === 'unattempted' && mcq.attempted) return false;
    if (filterStatus === 'correct' && (!mcq.attempted || !mcq.correct)) return false;
    if (filterStatus === 'incorrect' && (!mcq.attempted || mcq.correct)) return false;
    return true;
  });
  
  // Handle option selection
  const handleOptionSelect = (mcqId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [mcqId]: optionId
    });
  };
  
  // Check answer and show result
  const checkAnswer = (mcqId: string) => {
    setShowResults({
      ...showResults,
      [mcqId]: true
    });
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentMCQIndex < filteredMCQs.length - 1) {
      setCurrentMCQIndex(currentMCQIndex + 1);
    }
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentMCQIndex > 0) {
      setCurrentMCQIndex(currentMCQIndex - 1);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilterTopic('all');
    setFilterDifficulty('all');
    setFilterStatus('all');
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty: MCQ['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="relative">
            Multiple Choice Questions
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
          </span>
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Test your knowledge with these multiple choice questions related to the course material.
        </motion.p>
      </div>
      
      {/* Filters */}
      <motion.div 
        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Topic</label>
            <div className="relative">
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="w-full appearance-none px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Difficulty</label>
            <div className="relative">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full appearance-none px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="all">All Questions</option>
                <option value="attempted">Attempted</option>
                <option value="unattempted">Unattempted</option>
                <option value="correct">Correct</option>
                <option value="incorrect">Incorrect</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="self-end ml-auto">
            <motion.button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Questions */}
      <AnimatePresence mode="wait">
        {filteredMCQs.length === 0 ? (
          <motion.div 
            className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key="no-mcqs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">No questions found</p>
            <p className="mt-2 text-gray-500 dark:text-gray-500 max-w-md mx-auto">We couldn't find any questions that match your filter criteria. Try adjusting your filters.</p>
            <motion.button 
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="mcq-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question navigation */}
            <motion.div 
              className="flex justify-between items-center mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Question {currentMCQIndex + 1} of {filteredMCQs.length}
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={prevQuestion}
                  disabled={currentMCQIndex === 0}
                  className={`p-2 rounded-full ${
                    currentMCQIndex === 0
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  whileHover={currentMCQIndex !== 0 ? { scale: 1.1, backgroundColor: 'rgba(238, 242, 255, 1)' } : {}}
                  whileTap={currentMCQIndex !== 0 ? { scale: 0.9 } : {}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={nextQuestion}
                  disabled={currentMCQIndex === filteredMCQs.length - 1}
                  className={`p-2 rounded-full ${
                    currentMCQIndex === filteredMCQs.length - 1
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  whileHover={currentMCQIndex !== filteredMCQs.length - 1 ? { scale: 1.1, backgroundColor: 'rgba(238, 242, 255, 1)' } : {}}
                  whileTap={currentMCQIndex !== filteredMCQs.length - 1 ? { scale: 0.9 } : {}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
            
            {/* Current question */}
            <AnimatePresence mode="wait">
              {filteredMCQs[currentMCQIndex] && (
                <motion.div 
                  key={filteredMCQs[currentMCQIndex].id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getDifficultyColor(filteredMCQs[currentMCQIndex].difficulty)
                    }`}>
                      {filteredMCQs[currentMCQIndex].difficulty.charAt(0).toUpperCase() + filteredMCQs[currentMCQIndex].difficulty.slice(1)}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                      Topic: {filteredMCQs[currentMCQIndex].topic}
                    </span>
                    {filteredMCQs[currentMCQIndex].attempted && (
                      <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                        filteredMCQs[currentMCQIndex].correct
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                      }`}>
                        {filteredMCQs[currentMCQIndex].correct ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6 whitespace-pre-wrap">
                    {filteredMCQs[currentMCQIndex].question}
                  </h4>
                  
                  <div className="space-y-3 mb-6">
                    {filteredMCQs[currentMCQIndex].options.map((option, idx) => {
                      const isSelected = selectedOptions[filteredMCQs[currentMCQIndex].id] === option.id;
                      const showResult = showResults[filteredMCQs[currentMCQIndex].id];
                      const isCorrect = option.isCorrect;
                      
                      let optionClass = 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750 hover:bg-gray-50 dark:hover:bg-gray-700';
                      
                      if (showResult) {
                        if (isCorrect) {
                          optionClass = 'border border-green-500 bg-green-50 dark:bg-green-900/20';
                        } else if (isSelected && !isCorrect) {
                          optionClass = 'border border-red-500 bg-red-50 dark:bg-red-900/20';
                        }
                      } else if (isSelected) {
                        optionClass = 'border border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
                      }
                      
                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => !showResult && handleOptionSelect(filteredMCQs[currentMCQIndex].id, option.id)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-xl flex items-center text-left transition-all ${optionClass}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * idx }}
                          whileHover={!showResult ? { scale: 1.01, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } : {}}
                          whileTap={!showResult ? { scale: 0.99 } : {}}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {option.id.split('_')[1].toUpperCase()}
                          </div>
                          <span className="text-gray-800 dark:text-gray-200 font-medium">{option.text}</span>
                          {showResult && isCorrect && (
                            <motion.svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-6 w-6 text-green-600 ml-auto" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <AnimatePresence>
                    {showResults[filteredMCQs[currentMCQIndex].id] && filteredMCQs[currentMCQIndex].explanation && (
                      <motion.div 
                        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6"
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h5 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">Explanation</h5>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {filteredMCQs[currentMCQIndex].explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!filteredMCQs[currentMCQIndex].attempted && !showResults[filteredMCQs[currentMCQIndex].id] && (
                    <div className="flex justify-end">
                      <motion.button
                        onClick={() => checkAnswer(filteredMCQs[currentMCQIndex].id)}
                        disabled={!selectedOptions[filteredMCQs[currentMCQIndex].id]}
                        className={`px-5 py-2.5 rounded-lg ${
                          selectedOptions[filteredMCQs[currentMCQIndex].id]
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                        whileHover={selectedOptions[filteredMCQs[currentMCQIndex].id] ? { scale: 1.03 } : {}}
                        whileTap={selectedOptions[filteredMCQs[currentMCQIndex].id] ? { scale: 0.97 } : {}}
                      >
                        Check Answer
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Question list navigation */}
            <motion.div 
              className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Questions Overview</h5>
              <div className="flex flex-wrap gap-2">
                {filteredMCQs.map((mcq, index) => {
                  let buttonClass = 'w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all';
                  
                  if (index === currentMCQIndex) {
                    buttonClass += ' bg-indigo-600 text-white shadow-md';
                  } else if (mcq.attempted) {
                    buttonClass += mcq.correct
                      ? ' bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                      : ' bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
                  } else {
                    buttonClass += ' bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600';
                  }
                  
                  return (
                    <motion.button
                      key={mcq.id}
                      onClick={() => setCurrentMCQIndex(index)}
                      className={buttonClass}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 * index }}
                    >
                      {index + 1}
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Not attempted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Correct</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Incorrect</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Current</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CourseMCQs; 