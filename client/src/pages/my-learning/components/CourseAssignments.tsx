import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  pointsPossible: number;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  requirements: string[];
  submissionType: 'code' | 'document' | 'project';
}

interface CourseAssignmentsProps {
  courseId: string;
  lectureId: string;
}

const CourseAssignments: React.FC<CourseAssignmentsProps> = ({ courseId, lectureId }) => {
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  // Mock assignments data
  const assignments: Assignment[] = [
    {
      id: 'a1',
      title: 'Basic C Programming Exercises',
      description: 'Complete a set of basic programming exercises to demonstrate your understanding of fundamental C programming concepts.',
      dueDate: new Date('2023-05-30'),
      pointsPossible: 100,
      status: 'graded',
      grade: 90,
      feedback: 'Excellent work! Your code is well-structured and properly commented. You missed a few edge cases in exercise 3, but overall very good job.',
      requirements: [
        'Implement all 5 exercises provided in the assignment document',
        'Each solution should compile without errors or warnings',
        'Include appropriate comments explaining your code',
        'Handle all error conditions and edge cases',
        'Follow the provided coding style guidelines'
      ],
      submissionType: 'code'
    },
    {
      id: 'a2',
      title: 'Memory Management Implementation',
      description: 'Implement a custom memory management system that demonstrates your understanding of dynamic memory allocation, deallocation, and management in C.',
      dueDate: new Date('2023-06-15'),
      pointsPossible: 150,
      status: 'submitted',
      requirements: [
        'Implement custom malloc(), free(), and realloc() functions',
        'The implementation should be efficient in terms of space and time',
        'Handle memory fragmentation appropriately',
        'Include a comprehensive test suite that demonstrates the functionality',
        'Write a report explaining your implementation approach and design decisions'
      ],
      submissionType: 'project'
    },
    {
      id: 'a3',
      title: 'Data Structures Implementation',
      description: 'Implement various data structures (linked list, stack, queue, binary search tree) in C and demonstrate their functionality.',
      dueDate: new Date('2023-07-01'),
      pointsPossible: 200,
      status: 'in_progress',
      requirements: [
        'Implement all 4 data structures with appropriate operations',
        'Include proper error handling and memory management',
        'Write thorough test cases that verify the functionality',
        'The implementation should be efficient in terms of time complexity',
        'Document the time and space complexity of each operation'
      ],
      submissionType: 'code'
    },
    {
      id: 'a4',
      title: 'Sorting Algorithms Analysis',
      description: 'Implement and analyze various sorting algorithms in C/C++, comparing their performance across different input sizes and distributions.',
      dueDate: new Date('2023-07-15'),
      pointsPossible: 150,
      status: 'not_started',
      requirements: [
        'Implement at least 5 different sorting algorithms',
        'Create a benchmarking framework to measure performance',
        'Test with various input sizes and distributions',
        'Create visualizations that illustrate the performance differences',
        'Write a comprehensive report analyzing the results'
      ],
      submissionType: 'document'
    },
    {
      id: 'a5',
      title: 'Final Project: Custom Library Implementation',
      description: 'Design and implement a comprehensive C library that solves a specific problem or provides a useful set of functionality.',
      dueDate: new Date('2023-08-10'),
      pointsPossible: 300,
      status: 'not_started',
      requirements: [
        'The library should provide a well-designed API',
        'Include comprehensive documentation',
        'Implement thorough error handling',
        'Create a test suite that verifies the functionality',
        'Write a user guide with examples',
        'Present your library to the class'
      ],
      submissionType: 'project'
    }
  ];
  
  // Filter assignments based on status
  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus === 'all') return true;
    return assignment.status === filterStatus;
  });
  
  // Get submission type icon
  const getSubmissionTypeIcon = (type: Assignment['submissionType']) => {
    switch (type) {
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'project':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status: Assignment['status']) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Format status for display
  const formatStatus = (status: Assignment['status']) => {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'in_progress': return 'In Progress';
      case 'submitted': return 'Submitted';
      case 'graded': return 'Graded';
      default: return status;
    }
  };
  
  // Calculate days until due
  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Toggle assignment expansion
  const toggleAssignment = (id: string) => {
    if (activeAssignmentId === id) {
      setActiveAssignmentId(null);
    } else {
      setActiveAssignmentId(id);
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
            Course Assignments
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
          </span>
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Complete and submit assignments to demonstrate your understanding of the course material.
        </motion.p>
      </div>
      
      {/* Filters */}
      <motion.div 
        className="flex flex-wrap items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Filter Status:</label>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="all">All Assignments</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="ml-auto flex gap-2">
          <motion.button 
            className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Options
            </span>
          </motion.button>
          <motion.button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Assignment
            </span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Assignments list */}
      <AnimatePresence>
        {filteredAssignments.length === 0 ? (
          <motion.div 
            className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">No assignments found</p>
            <p className="mt-2 text-gray-500 dark:text-gray-500 max-w-md mx-auto">We couldn't find any assignments that match your filter criteria.</p>
            <motion.button 
              onClick={() => setFilterStatus('all')}
              className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Assignments
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAssignments.map((assignment, idx) => (
              <motion.div 
                key={assignment.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.07 * idx }}
              >
                <motion.div 
                  className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 cursor-pointer transition-colors ${
                    activeAssignmentId === assignment.id 
                      ? 'bg-indigo-50 dark:bg-indigo-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  onClick={() => toggleAssignment(assignment.id)}
                  layout
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shadow-sm">
                    {getSubmissionTypeIcon(assignment.submissionType)}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-indigo-600">{assignment.title}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(assignment.status)}`}>
                        {formatStatus(assignment.status)}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        <span className="font-medium">{assignment.pointsPossible}</span> points
                      </span>
                      {assignment.grade !== undefined && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full">
                          Grade: <span className="font-medium">{assignment.grade}/{assignment.pointsPossible}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between gap-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Due {assignment.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                    
                    {assignment.status !== 'graded' && getDaysUntilDue(assignment.dueDate) > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        getDaysUntilDue(assignment.dueDate) <= 3
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {getDaysUntilDue(assignment.dueDate)} days left
                      </span>
                    )}
                    
                    {assignment.status !== 'graded' && getDaysUntilDue(assignment.dueDate) <= 0 && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 rounded-full">
                        Overdue
                      </span>
                    )}
                    
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        activeAssignmentId === assignment.id ? 'text-indigo-500' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ rotate: activeAssignmentId === assignment.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  {activeAssignmentId === assignment.id && (
                    <motion.div 
                      className="px-5 pb-5 pt-3 border-t border-gray-200 dark:border-gray-700"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-5">
                        {assignment.description}
                      </p>
                      
                      <motion.div 
                        className="mb-5 bg-gray-50 dark:bg-gray-750 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Requirements:
                        </h5>
                        <ul className="space-y-2">
                          {assignment.requirements.map((req, index) => (
                            <motion.li 
                              key={index} 
                              className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 + (index * 0.05) }}
                            >
                              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-2 text-xs font-medium">
                                {index + 1}
                              </span>
                              {req}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <AnimatePresence>
                        {assignment.feedback && (
                          <motion.div 
                            className="mb-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginBottom: 20 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h5 className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-2 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Instructor Feedback:
                            </h5>
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                              {assignment.feedback}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex flex-wrap gap-3 justify-end">
                        {(assignment.status === 'not_started' || assignment.status === 'in_progress') && (
                          <>
                            <motion.button 
                              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              {assignment.status === 'not_started' ? 'Start Assignment' : 'Continue Working'}
                            </motion.button>
                            
                            <motion.button 
                              className="px-5 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Submit Assignment
                            </motion.button>
                          </>
                        )}
                        
                        {assignment.status === 'submitted' && (
                          <motion.button 
                            className="px-5 py-2.5 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Awaiting Grading
                            </span>
                          </motion.button>
                        )}
                        
                        {assignment.status === 'graded' && (
                          <motion.button 
                            className="px-5 py-2.5 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              View Submission & Feedback
                            </span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CourseAssignments; 