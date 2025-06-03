import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'document' | 'video' | 'image' | 'archive';
  fileSize: string;
  downloadUrl: string;
  description?: string;
  uploadDate: Date;
  featured?: boolean;
}

interface CourseResourcesProps {
  courseId: string;
  lectureId: string;
}

const CourseResources: React.FC<CourseResourcesProps> = ({ courseId, lectureId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  // Mock resources data
  const resources: Resource[] = [
    {
      id: 'r1',
      title: 'Lecture Slides.pdf',
      type: 'pdf',
      fileSize: '2.4 MB',
      downloadUrl: '#',
      description: 'Complete slide deck from the lecture with annotations',
      uploadDate: new Date('2023-04-15'),
      featured: true
    },
    {
      id: 'r2',
      title: 'Example Code.zip',
      type: 'archive',
      fileSize: '1.8 MB',
      downloadUrl: '#',
      description: 'Source code examples demonstrated during the lecture',
      uploadDate: new Date('2023-04-15')
    },
    {
      id: 'r3',
      title: 'Additional Reading.pdf',
      type: 'pdf',
      fileSize: '4.2 MB',
      downloadUrl: '#',
      description: 'Supplementary reading materials for deeper understanding',
      uploadDate: new Date('2023-04-10')
    },
    {
      id: 'r4',
      title: 'Practice Problems.pdf',
      type: 'pdf',
      fileSize: '1.5 MB',
      downloadUrl: '#',
      description: 'Additional practice problems with solutions',
      uploadDate: new Date('2023-04-18'),
      featured: true
    },
    {
      id: 'r5',
      title: 'Reference Implementation.zip',
      type: 'archive',
      fileSize: '3.7 MB',
      downloadUrl: '#',
      description: 'Complete reference implementation of the project',
      uploadDate: new Date('2023-04-20')
    },
    {
      id: 'r6',
      title: 'Cheat Sheet.pdf',
      type: 'pdf',
      fileSize: '0.8 MB',
      downloadUrl: '#',
      description: 'Quick reference guide for key concepts',
      uploadDate: new Date('2023-04-12')
    }
  ];

  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  // Filter resources based on search query and type
  const filteredResources = resources.filter(resource => {
    // Filter by type
    if (selectedType !== 'all' && resource.type !== selectedType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        (resource.description && resource.description.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Featured resources
  const featuredResources = resources.filter(r => r.featured);
  
  // Get icon for resource type
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
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
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'archive':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
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
            Course Resources
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
          </span>
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Download lecture slides, code examples, and additional materials to enhance your learning experience.
        </motion.p>
      </div>
      
      {featuredResources.length > 0 && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-sm uppercase tracking-wide font-semibold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Featured Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource, idx) => (
              <motion.div 
                key={resource.id}
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-5 border border-indigo-100 dark:border-indigo-800 hover:shadow-md transition-all group"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
              >
                <div className="flex">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center mr-4 shadow-sm">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{resource.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{resource.fileSize}</span>
                      <span className="mx-2">•</span>
                      <span>Added {resource.uploadDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={resource.downloadUrl} 
                    className="inline-flex items-center p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Search and filter */}
      <motion.div 
        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className={`relative flex-grow ${isSearchFocused ? 'ring-2 ring-indigo-500 rounded-lg' : ''}`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 absolute left-3 top-2.5 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF Documents</option>
            <option value="code">Code Files</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="archive">Archives</option>
          </select>
        </div>
      </motion.div>
      
      {/* Resources list */}
      <AnimatePresence>
        {filteredResources.length === 0 ? (
          <motion.div 
            className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">No resources found</p>
            <p className="mt-2 text-gray-500 dark:text-gray-500 max-w-md mx-auto">We couldn't find any resources that match your search criteria. Try adjusting your filters.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="space-y-4">
              {filteredResources.map((resource, idx) => (
                <motion.div
                  key={resource.id} 
                  className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                  whileHover={{ backgroundColor: 'rgba(238, 242, 255, 1)', borderColor: 'rgba(165, 180, 252, 1)' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{resource.title}</h4>
                      {resource.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{resource.description}</p>
                      )}
                      <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{resource.fileSize}</span>
                        <span className="mx-2">•</span>
                        <span>Added {resource.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-auto">
                    <a 
                      href={resource.downloadUrl} 
                      className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 dark:group-hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Upload section - for instructors */}
      <motion.div 
        className="mt-8 p-6 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h4 className="text-base font-medium text-gray-900 dark:text-gray-200 mb-2">Are you an instructor?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
            Upload additional resources for your students. You can drag and drop files here or use the upload button.
          </p>
          <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            Upload Resources
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseResources; 