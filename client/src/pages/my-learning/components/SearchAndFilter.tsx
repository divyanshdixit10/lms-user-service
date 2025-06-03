import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchAndFilterProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  searchQuery: string;
  filterCategory: string;
  sortBy: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearchChange,
  onFilterChange,
  onSortChange,
  searchQuery,
  filterCategory,
  sortBy
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // All possible categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Web Development', name: 'Web Development' },
    { id: 'Data Science', name: 'Data Science' },
    { id: 'Mobile Development', name: 'Mobile Development' },
    { id: 'Cloud Computing', name: 'Cloud Computing' },
    { id: 'DevOps', name: 'DevOps' },
    { id: 'AI/ML', name: 'AI/ML' },
    { id: 'Cybersecurity', name: 'Cybersecurity' }
  ];
  
  // Sorting options
  const sortOptions = [
    { id: 'recent', name: 'Recently Accessed' },
    { id: 'enrolled', name: 'Recently Enrolled' },
    { id: 'progress', name: 'Most Progress' },
    { id: 'title-asc', name: 'Title (A-Z)' },
    { id: 'title-desc', name: 'Title (Z-A)' }
  ];
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sort By */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</h4>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h4>
              <div className="space-y-2">
                {['In Progress', 'Not Started', 'Completed'].map((status) => (
                  <label key={status} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Duration Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</h4>
              <div className="space-y-2">
                {['0-5 hours', '5-10 hours', '10-20 hours', '20+ hours'].map((duration) => (
                  <label key={duration} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{duration}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Reset
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SearchAndFilter; 