import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Student',
    joined: 'January 2023',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    bio: 'Frontend developer passionate about React and TypeScript. Currently learning advanced JavaScript patterns and Node.js.',
    skills: ['JavaScript', 'React', 'TypeScript', 'HTML/CSS', 'Node.js'],
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-8`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile */}
            <div className="md:w-1/3">
              <div className={`rounded-xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              }`}>
                {/* Profile Header */}
                <div className={`h-32 bg-gradient-to-r from-primary-500 to-amber-500`}></div>
                <div className="-mt-16 px-6 pb-6">
                  <div className="flex flex-col items-center">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-secondary-800 object-cover"
                    />
                    <h1 className={`mt-4 text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </h1>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.role}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <Link to="/settings" className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-secondary-700 hover:bg-secondary-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}>
                        Edit Profile
                      </Link>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white`}>
                        View Certificates
                      </button>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <h2 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        About
                      </h2>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.bio}
                      </p>
                    </div>
                    
                    <div>
                      <h2 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact
                      </h2>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className={`px-2 py-1 text-xs rounded-full ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Social Links
                      </h2>
                      <div className="flex space-x-3">
                        <a 
                          href={user.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${
                            theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-100'
                          } transition-colors`}
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                        <a 
                          href={user.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${
                            theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-100'
                          } transition-colors`}
                        >
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                          </svg>
                        </a>
                        <a 
                          href={user.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${
                            theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-100'
                          } transition-colors`}
                        >
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.029 10.029 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482c-4.09-.21-7.72-2.17-10.15-5.15a4.932 4.932 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06c0 2.37 1.7 4.36 3.95 4.8a4.96 4.96 0 01-2.22.08 4.92 4.92 0 004.6 3.42 9.88 9.88 0 01-7.29 2.04 14 14 0 007.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63a10.04 10.04 0 002.46-2.55z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Progress and Courses */}
            <div className="md:w-2/3">
              {/* Progress Stats */}
              <div className={`rounded-xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              } mb-6`}>
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Learning Progress
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-50'
                    }`}>
                      <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {user.coursesEnrolled}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Courses Enrolled
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-50'
                    }`}>
                      <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {user.coursesCompleted}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Courses Completed
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-50'
                    }`}>
                      <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round((user.coursesCompleted / user.coursesEnrolled) * 100)}%
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Completion Rate
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Overall Progress
                      </h3>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.coursesCompleted}/{user.coursesEnrolled} courses
                      </span>
                    </div>
                    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(user.coursesCompleted / user.coursesEnrolled) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* My Courses */}
              <div className={`rounded-xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                  : 'bg-white shadow-md'
              }`}>
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      My Courses
                    </h2>
                    <Link 
                      to="/courses"
                      className={`text-sm font-medium ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'} hover:underline`}
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Course Item */}
                    {[
                      { id: 1, title: 'React for Beginners', progress: 100, instructor: 'Jane Smith' },
                      { id: 2, title: 'Advanced JavaScript Patterns', progress: 75, instructor: 'John Doe' },
                      { id: 3, title: 'Node.js API Development', progress: 60, instructor: 'David Wilson' },
                    ].map((course) => (
                      <div 
                        key={course.id}
                        className={`p-4 rounded-lg ${
                          theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-50'
                        } hover:shadow-md transition-shadow`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {course.title}
                            </h3>
                            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Instructor: {course.instructor}
                            </p>
                          </div>
                          <span className={`text-sm font-medium ${
                            course.progress === 100
                              ? 'text-green-500'
                              : theme === 'dark' ? 'text-primary-400' : 'text-primary-500'
                          }`}>
                            {course.progress}%
                          </span>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Progress
                            </span>
                          </div>
                          <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${
                            theme === 'dark' ? 'bg-secondary-600' : 'bg-gray-200'
                          }`}>
                            <div 
                              className={`h-full rounded-full ${
                                course.progress === 100 ? 'bg-green-500' : 'bg-primary-500'
                              }`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link
                            to={`/courses/${course.id}`}
                            className={`px-3 py-1 text-xs rounded ${
                              theme === 'dark'
                                ? 'bg-primary-700 hover:bg-primary-600 text-white'
                                : 'bg-primary-500 hover:bg-primary-600 text-white'
                            }`}
                          >
                            Continue Learning
                          </Link>
                        </div>
                      </div>
                    ))}
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

export default ProfilePage; 