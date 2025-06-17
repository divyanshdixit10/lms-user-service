import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import osopLogo from '../../assets/images/osop-logo.png';

// Mock notifications data
const notificationsData = [
  {
    id: 1,
    type: 'course',
    title: 'New Course Released',
    message: 'Check out our new AI Engineering course',
    time: '2 hours ago',
    read: false,
    link: '/courses/ai-engineering'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'You completed 5 courses. Keep it up!',
    time: '1 day ago',
    read: false,
    link: '/profile/achievements'
  },
  {
    id: 3,
    type: 'event',
    title: 'Upcoming Webinar',
    message: 'Join our webinar on Cloud Computing',
    time: '2 days ago',
    read: true,
    link: '/events/cloud-computing'
  }
];

// Real course categories with actual courses from the platform
const courseCategories = [
  {
    title: "Programming Languages",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    courses: [
      { name: "C for Beginners", path: "/courses/1", level: "Beginner", price: "₹4,999", tags: ["C Programming", "Fundamentals"] },
      { name: "OOPs in C++", path: "/courses/2", level: "Intermediate", price: "₹6,999", tags: ["C++", "OOP"] },
      { name: "DSA using C++", path: "/courses/5", level: "Advanced", price: "₹19,999", tags: ["Algorithms", "Data Structures"] },
      { name: "Java for Absolute Beginners", path: "/courses/7", level: "Beginner", price: "₹8,999", tags: ["Java", "Basics"] },
      { name: "Java for Developers", path: "/courses/8", level: "Intermediate", price: "₹18,999", tags: ["Java", "Advanced"] },
      { name: "Java Enterprise Edition", path: "/courses/6", level: "Advanced", price: "₹24,999", tags: ["Java EE", "Enterprise"] }
    ]
  },
  {
    title: "Data Science & Analytics",
    icon: "📊",
    color: "from-purple-500 to-pink-600",
    courses: [
      { name: "Data Science Course", path: "/courses/3", level: "Comprehensive", price: "₹34,999", tags: ["Python", "ML"] },
      { name: "Python for Data Science", path: "/courses/10", level: "Job-Oriented", price: "₹39,999", tags: ["Python", "Analytics"] },
      { name: "Data Analytics & Visualization", path: "/courses/11", level: "Business Analytics", price: "₹29,999", tags: ["Analytics", "Visualization"] },
      { name: "Complete Data Science", path: "/courses/14", level: "Complete Program", price: "₹44,999", tags: ["End-to-End", "Professional"] },
      { name: "Machine Learning Course", path: "/courses/13", level: "Advanced ML", price: "₹32,999", tags: ["ML", "AI"] }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: "🤖",
    color: "from-emerald-500 to-teal-600",
    courses: [
      { name: "AI Tools Mastery for Non-Tech", path: "/courses/15", level: "Beginner", price: "₹35,999", tags: ["AI Tools", "Productivity"] },
      { name: "Prompt Engineering Course", path: "/courses/16", level: "Intermediate", price: "₹28,999", tags: ["Prompting", "LLMs"] },
      { name: "Generative AI & LLMs", path: "/courses/18", level: "Advanced", price: "₹48,999", tags: ["GenAI", "LLMs"] },
      { name: "AI Product Management", path: "/courses/17", level: "Advanced", price: "₹42,999", tags: ["Product", "AI Strategy"] },
      { name: "AI Tools for Product Management", path: "/courses/19", level: "Intermediate", price: "₹32,999", tags: ["PM Tools", "AI"] }
    ]
  },
  {
    title: "DevOps & Database",
    icon: "⚙️",
    color: "from-orange-500 to-red-600",
    courses: [
      { name: "DevOps Course", path: "/courses/4", level: "Advanced", price: "₹29,999", tags: ["CI/CD", "Cloud"] },
      { name: "SQL for Beginners", path: "/courses/9", level: "Beginner", price: "₹7,999", tags: ["SQL", "Database"] }
    ]
  },
  {
    title: "Business Analysis",
    icon: "📈",
    color: "from-cyan-500 to-blue-600",
    courses: [
      { name: "AI-Powered Business Analysis", path: "/courses/12", level: "AI-Powered", price: "₹34,999", tags: ["Business", "AI Analytics"] }
    ]
  }
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "What is OSOP?", path: "/what-is-osop" },
  { name: "Placement", path: "/placement" },
  { name: "Hire from us", path: "/hire" },
  { name: "Enquiry", path: "/enquiry" }
];

// Navigation links for authenticated users (students/admins)
const authenticatedNavLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Learning", path: "/my-learning" },
  { name: "Code Practice", path: "/practice" },
  { name: "What is OSOP?", path: "/what-is-osop" }
];

// Admin specific links
const adminNavLinks = [
  { name: "Admin Panel", path: "/admin" },
  { name: "Manage Courses", path: "/admin/courses" },
  { name: "Manage Users", path: "/admin/users" }
];

// Helper functions for navigation tooltips
const getNavLinkTooltip = (linkName: string): string => {
  switch(linkName) {
    case "Dashboard": return "View your learning dashboard";
    case "My Learning": return "Track your course progress";
    case "Code Practice": return "Practice coding with interactive exercises";
    case "What is OSOP?": return "Learn about OSOP Coding and our mission";
    default: return "";
  }
};

const getAdminLinkTooltip = (linkName: string): string => {
  switch(linkName) {
    case "Admin Panel": return "Access admin controls";
    case "Manage Courses": return "Create and edit courses";
    case "Manage Users": return "Manage student accounts";
    default: return "";
  }
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Calculate unread notifications count
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);
  
  // Close the mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsCoursesMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);
  
  // Add scroll listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    // Navigate to home page is handled by the ProtectedRoute component
  };

  // Handle marking a notification as read
  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(n => ({ ...n, read: true }))
    );
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 
        'backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-xl border-b border-primary-200/50 dark:border-gray-700/50' : 
        'bg-gradient-to-r from-white/95 via-primary-50/30 to-white/95 dark:from-gray-900/95 dark:via-gray-800/30 dark:to-gray-900/95 backdrop-blur-lg border-b border-primary-300/30 dark:border-gray-700/30'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center group">
            <div className="rounded-xl relative overflow-hidden group-hover:scale-105 transition-all duration-300">
              <img 
                src={osopLogo} 
                alt="OSOP-CODING Logo" 
                className="h-12 w-auto object-contain relative z-10 transition-all duration-300"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                {/* Show authenticated user links */}
                {authenticatedNavLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    title={getNavLinkTooltip(link.name)}
                    className={({ isActive }) => 
                      `px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 text-white shadow-lg shadow-primary-500/25' 
                          : `${isScrolled ? 'text-gray-800 hover:bg-primary-50/80 hover:text-primary-700' : 'text-gray-700 hover:bg-primary-100/60 hover:text-primary-800'} dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-primary-400 font-semibold hover:shadow-md`
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Show admin specific links if user is admin */}
                {user?.role === 'ADMIN' && adminNavLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    title={getAdminLinkTooltip(link.name)}
                    className={({ isActive }) => 
                      `px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-red-500 via-pink-600 to-rose-500 text-white shadow-lg shadow-red-500/25' 
                          : `${isScrolled ? 'text-gray-800 hover:bg-red-50/80 hover:text-red-700' : 'text-gray-700 hover:bg-red-100/60 hover:text-red-800'} dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-red-400 font-semibold hover:shadow-md`
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </>
            ) : (
              <>
                {/* Show public navigation links */}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => 
                      `px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 text-white shadow-lg shadow-primary-500/25' 
                          : `${isScrolled ? 'text-gray-800 hover:bg-primary-50/80 hover:text-primary-700' : 'text-gray-700 hover:bg-primary-100/60 hover:text-primary-800'} dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-primary-400 font-semibold hover:shadow-md`
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </>
            )}
            
            {/* Enhanced Courses Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCoursesMenuOpen(true)}
              onMouseLeave={() => setIsCoursesMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                  isCoursesMenuOpen
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 text-white shadow-lg shadow-indigo-500/25'
                    : `${isScrolled ? 'text-gray-800 hover:bg-indigo-50/80 hover:text-indigo-700' : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'} dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-indigo-400 font-semibold hover:shadow-md`
                }`}
              >
                <span>Courses</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                        isCoursesMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
              </button>
              
              <AnimatePresence>
                {isCoursesMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`fixed left-1/2 transform -translate-x-1/2 top-20 z-50 rounded-3xl shadow-2xl border transition-all duration-300 max-h-[85vh] overflow-y-auto ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 border-gray-700/50 backdrop-blur-2xl'
                        : 'bg-gradient-to-br from-white/95 via-primary-50/20 to-white/95 border-primary-200/50 backdrop-blur-2xl'
                    }`}
                    style={{
                      width: 'min(calc(100vw - 2rem), 1200px)',
                      maxWidth: '1200px'
                    }}
                  >
                    <div className="p-3 sm:p-4 lg:p-6">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                        <div>
                          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Explore Our Courses
                          </h3>
                          <p className={`text-xs sm:text-sm mt-1 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Choose from {courseCategories.reduce((total, cat) => total + cat.courses.length, 0)}+ premium courses across multiple domains
                          </p>
                        </div>
                              <Link
                          to="/courses"
                          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                        >
                          View All Courses
                        </Link>
                      </div>

                      {/* Course Categories Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                        {courseCategories.map((category) => (
                          <div
                                key={category.title}
                            className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                                  theme === 'dark'
                                ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:from-gray-700/70 hover:to-gray-800/70'
                                : 'bg-gradient-to-br from-gray-50/50 to-white/50 border-gray-200/50 hover:from-gray-50/70 hover:to-white/70'
                            }`}
                          >
                            {/* Category Header */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-sm sm:text-base lg:text-lg`}>
                                {category.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className={`font-semibold text-xs sm:text-sm lg:text-base leading-tight ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                      {category.title}
                                    </h4>
                                    <p className={`text-xs ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {category.courses.length} courses
                                    </p>
                        </div>
                      </div>

                            {/* Course List - Show fewer on mobile */}
                            <div className="space-y-1 sm:space-y-2">
                              {category.courses.slice(0, 3).map((course) => (
                              <Link
                                  key={course.name}
                                  to={course.path}
                                  className={`block p-2 sm:p-3 rounded-md sm:rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                                  theme === 'dark'
                                      ? 'hover:bg-gray-600/50'
                                      : 'hover:bg-white/70'
                                  }`}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                      <h5 className={`font-medium text-xs sm:text-sm leading-tight truncate ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                      }`}>
                                        {course.name}
                                      </h5>
                                      <div className="flex items-center gap-1 sm:gap-2 mt-1">
                                        <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${
                                          course.level === 'Beginner' 
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : course.level === 'Intermediate'
                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                          {course.level}
                                  </span>
                                        <span className={`text-xs font-semibold ${
                                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`}>
                                          {course.price}
                                </span>
                          </div>
                                      <div className="hidden sm:flex flex-wrap gap-1 mt-2">
                                        {course.tags.slice(0, 2).map((tag) => (
                                          <span
                                            key={tag}
                                            className={`text-xs px-2 py-0.5 rounded-full ${
                                  theme === 'dark'
                                                ? 'bg-gray-600/50 text-gray-300'
                                                : 'bg-gray-200/50 text-gray-600'
                                            }`}
                                          >
                                            {tag}
                                  </span>
                                        ))}
                                      </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                              
                              <Link
                                to={`/courses?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`block text-center py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-colors ${
                                  theme === 'dark'
                                    ? 'text-blue-400 hover:bg-gray-600/30'
                                    : 'text-blue-600 hover:bg-blue-50'
                                }`}
                              >
                                View All ({category.courses.length})
                              </Link>
                          </div>
                        </div>
                        ))}
                    </div>

                      {/* Footer */}
                      <div className={`mt-3 sm:mt-4 lg:mt-6 pt-2 sm:pt-3 lg:pt-4 border-t text-center ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <p className={`text-xs sm:text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <span className="hidden sm:inline">🎯 Industry-relevant curriculum • 👨‍💻 Expert instructors • 🏆 Placement assistance</span>
                          <span className="sm:hidden">🎯 Industry curriculum • 👨‍💻 Expert instructors • 🏆 Placement support</span>
                        </p>
                        </div>
                      </div>
                  </motion.div>
            )}
              </AnimatePresence>
            </div>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 border shadow-lg hover:scale-105 ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-amber-50/80 border-amber-200/50 hover:text-amber-700 hover:shadow-amber-200/50' 
                  : 'text-gray-700 hover:bg-amber-100/60 border-amber-300/30 hover:text-amber-800 hover:shadow-amber-300/50'
              } dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50 dark:hover:text-amber-400 dark:hover:shadow-gray-800/50`}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`p-3 rounded-xl transition-all duration-300 relative border shadow-lg hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-800 hover:bg-blue-50/80 border-blue-200/50 hover:text-blue-700 hover:shadow-blue-200/50' 
                        : 'text-gray-700 hover:bg-blue-100/60 border-blue-300/30 hover:text-blue-800 hover:shadow-blue-300/50'
                    } dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50 dark:hover:text-blue-400 dark:hover:shadow-gray-800/50`}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                      />
                    </svg>
                    
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-lg animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 glass rounded-xl shadow-2xl overflow-hidden z-20"
                      >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold">Notifications</h3>
                          <button 
                            onClick={markAllAsRead}
                            className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            Mark all as read
                          </button>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                              No notifications
                            </div>
                          ) : (
                            notifications.map((notification) => (
                              <Link
                                key={notification.id}
                                to={notification.link}
                                className={`block p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-800/50 ${
                                  !notification.read ? 'bg-primary-50/30 dark:bg-primary-900/20' : ''
                                }`}
                                onClick={() => handleNotificationClick(notification.id)}
                              >
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{notification.title}</h4>
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                                <p className="text-sm mt-1">{notification.message}</p>
                              </Link>
                            ))
                          )}
                        </div>
                        
                        <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                          <Link 
                            to="/notifications" 
                            className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-md ${
                      isScrolled 
                        ? 'text-gray-800 hover:bg-primary-50/80 border border-primary-200/50 hover:text-primary-700 hover:shadow-primary-200/50' 
                        : 'text-gray-700 hover:bg-primary-100/60 border border-primary-300/30 hover:text-primary-800 hover:shadow-primary-300/50'
                    } dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50 dark:hover:text-primary-400 dark:hover:shadow-gray-800/50`}
                  >
                                          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 flex items-center justify-center text-white font-semibold shadow-lg">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    <span className="hidden sm:inline-block font-medium">
                      {user?.name || 'User'}
                    </span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-2xl overflow-hidden z-20"
                      >
                        <div className="py-2">
                          <Link 
                            to="/profile" 
                            className="block px-4 py-2 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            Your Profile
                          </Link>
                          <Link 
                            to="/my-learning" 
                            className="block px-4 py-2 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            My Learning
                          </Link>
                          <Link 
                            to="/enrolled-courses" 
                            className="block px-4 py-2 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            Enrolled Courses
                          </Link>
                          <Link 
                            to="/settings" 
                            className="block px-4 py-2 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            Settings
                          </Link>
                          {user?.role === 'ADMIN' && (
                            <Link 
                              to="/admin" 
                              className="block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 font-medium"
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <Link 
                            to="/support" 
                            className="block px-4 py-2 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            Help & Support
                          </Link>
                          <hr className="my-1 border-gray-200 dark:border-gray-700" />
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-white/20 dark:hover:bg-gray-800/50"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : null}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 border shadow-lg hover:scale-105 ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-primary-50/80 border-primary-200/50 hover:text-primary-700 hover:shadow-primary-200/50' 
                  : 'text-gray-700 hover:bg-primary-100/60 border-primary-300/30 hover:text-primary-800 hover:shadow-primary-300/50'
              } dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50 dark:hover:text-primary-400 dark:hover:shadow-gray-800/50`}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`lg:hidden mx-4 mb-4 rounded-2xl overflow-hidden shadow-2xl border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 border-gray-700/50 backdrop-blur-2xl'
                : 'bg-gradient-to-br from-white/95 via-primary-50/20 to-white/95 border-primary-200/50 backdrop-blur-2xl'
            }`}
          >
            <nav className="py-4">
              {isAuthenticated ? (
                <>
                  {/* Display authenticated nav links in mobile menu */}
                  {authenticatedNavLinks.map((link) => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Display admin links if user is admin */}
                  {user?.role === 'ADMIN' && adminNavLinks.map((link) => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      className="mobile-nav-link bg-purple-600 text-white mx-4 my-1 hover:bg-purple-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </>
              ) : (
                // Display public nav links for non-authenticated users
                navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))
              )}
              
              {/* Add Courses button for all users in mobile menu */}
              <Link 
                to="/courses"
                className="block mx-4 my-3 px-4 py-3 bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore All Courses
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;