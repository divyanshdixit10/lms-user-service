import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

// SVG Icons as components instead of using react-icons
const StarIcon = ({ filled = false, size = 16 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={filled ? "#FBBF24" : "none"}
    stroke={filled ? "none" : "#D1D5DB"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-star"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CheckCircleIcon = ({ color = "currentColor", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-check-circle"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const PlayIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-play"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const UserIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-users"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TeacherIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-book-open"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const CloseIcon = ({ color = "currentColor", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const BookmarkIcon = ({ color = "currentColor", size = 20, filled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : "none"}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-bookmark"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ShareIcon = ({ color = "currentColor", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-share-2"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

interface CoursePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    instructor: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    discountEnds?: string;
    duration: string;
    sessions: number;
    sessionsPerWeek: number;
    hoursPerSession: number;
    quizzes: number;
    students: number;
    description: string;
    whoShouldTake: string[];
    deliverables: string[];
    outcomes: string[];
    previewVideo?: string;
    previewImage?: string;
    relatedCourses: Array<{
      id: string;
      title: string;
      price: number;
      image: string;
    }>;
  };
}

const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({ isOpen, onClose, course }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState('');
  
  // Handle direct enrollment
  const handleEnroll = () => {
    navigate(`/enquiry?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${encodeURIComponent(`$${course.price}`)}`);
  };
  
  // Handle wishlist toggle
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  
  // Share course
  const handleShare = (e: React.MouseEvent, platform?: string) => {
    e.stopPropagation();
    if (platform) {
      // Handle sharing to specific platform
      console.log(`Sharing to ${platform}`);
      setShowShareOptions(false);
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };
  
  // Update countdown timer if discount is available
  useEffect(() => {
    if (course.discountEnds) {
      const interval = setInterval(() => {
        const now = new Date();
        const endDate = course.discountEnds ? new Date(course.discountEnds) : new Date();
        const diff = endDate.getTime() - now.getTime();
        
        if (diff <= 0) {
          clearInterval(interval);
          setCountdownTimer('Offer expired');
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setCountdownTimer(`${days}d ${hours}h ${minutes}m`);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [course.discountEnds]);

  if (!isOpen) return null;

  // Modal transition variants
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="inline-block w-full max-w-5xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-xl shadow-2xl dark:bg-gray-800 sm:my-8 sm:align-middle"
            >
              <div className="relative">
                {/* Preview Video/Image Banner */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-700">
                  {!isVideoPlaying && course.previewImage && (
                    <img 
                      src={course.previewImage} 
                      alt={course.title} 
                      className="object-cover w-full h-full"
                    />
                  )}
                  
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="flex items-center justify-center w-16 h-16 text-white transition-transform transform bg-primary-600 rounded-full hover:bg-primary-700 hover:scale-110"
                      >
                        <span className="ml-1 flex items-center justify-center">
                          <PlayIcon color="white" size={24} />
                        </span>
                      </button>
                    </div>
                  )}
                  
                  {isVideoPlaying && course.previewVideo && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={course.previewVideo}
                      title={`${course.title} preview`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  
                  {/* Action buttons on top of banner */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={toggleWishlist}
                      className={`p-2 rounded-full ${
                        isWishlisted 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-white bg-opacity-90 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <BookmarkIcon color="currentColor" size={20} filled={isWishlisted} />
                    </button>
                    <div className="relative">
                      <button
                        onClick={(e) => handleShare(e)}
                        className="p-2 bg-white bg-opacity-90 rounded-full text-gray-700 hover:bg-gray-100"
                      >
                        <ShareIcon color="currentColor" size={20} />
                      </button>
                      {showShareOptions && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg dark:bg-gray-700 z-10">
                          {['Facebook', 'Twitter', 'LinkedIn', 'Email'].map(platform => (
                            <button
                              key={platform}
                              onClick={(e) => handleShare(e, platform)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 bg-white bg-opacity-90 rounded-full text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:bg-opacity-90 dark:text-white"
                    >
                      <CloseIcon color="currentColor" size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                          <span className="mr-1 flex items-center justify-center">
                            <TeacherIcon color="currentColor" size={16} />
                          </span>
                          {course.instructor}
                        </span>
                        <span>{course.category}</span>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span className="mr-1 text-yellow-400 flex items-center">
                                <StarIcon filled={i < Math.floor(course.rating)} />
                              </span>
                            ))}
                          </div>
                          <span className="ml-1">{course.rating} ({course.reviews} Reviews)</span>
                        </div>
                        <span className="flex items-center">
                          <span className="mr-1 flex items-center justify-center">
                            <UserIcon color="currentColor" size={16} />
                          </span>
                          {course.students} students
                        </span>
                      </div>
                    </div>
                    
                    {/* Price and CTA section */}
                    <div className="w-full md:w-auto md:min-w-[220px] bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="text-center">
                        {course.originalPrice && (
                          <div className="mb-1">
                            <span className="text-lg line-through text-gray-500">${course.originalPrice}</span>
                            <span className="ml-2 text-sm px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 rounded-full">
                              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                        )}
                        
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                          ${course.price}
                        </div>
                        
                        {course.discountEnds && (
                          <div className="text-sm text-red-600 dark:text-red-400 mb-3">
                            Offer ends in: <span className="font-medium">{countdownTimer}</span>
                          </div>
                        )}
                        
                        <button
                          onClick={handleEnroll}
                          className="w-full py-3 px-6 mb-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
                          aria-label={`Enroll now in ${course.title}`}
                        >
                          Enroll Now
                        </button>
                        
                        <Link
                          to="/gift-course"
                          className="w-full py-2 px-4 border border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 block text-center text-sm"
                        >
                          Gift this course
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
                      {['overview', 'curriculum', 'instructor', 'reviews', 'faq'].map((tab) => (
                        <motion.button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`${
                            activeTab === tab
                              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tab}
                        </motion.button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="prose dark:prose-invert max-w-none"
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="animate-fade-in">
                          <h3 className="text-lg font-semibold mb-3">Course Summary</h3>
                          <div className="text-gray-600 dark:text-gray-300 space-y-3">
                            {course.description.split('\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                        </div>

                        <div className="animate-fade-in-delay-1">
                          <h3 className="text-lg font-semibold mb-3">Who Should Take This Course?</h3>
                          <ul className="list-none space-y-3">
                            {course.whoShouldTake.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-0.5 flex items-center justify-center">
                                  <CheckCircleIcon color="currentColor" size={20} />
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Job-Oriented Deliverables</h3>
                            <ul className="list-none space-y-3">
                              {course.deliverables.map((item, index) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index }}
                                >
                                  <span className="text-green-500 mr-2 mt-0.5 flex items-center justify-center">
                                    <CheckCircleIcon color="currentColor" size={20} />
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3">Outcomes of the Course</h3>
                            <ul className="list-none space-y-3">
                              {course.outcomes.map((item, index) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index }}
                                >
                                  <span className="text-primary-500 mr-2 mt-0.5 flex items-center justify-center">
                                    <CheckCircleIcon color="currentColor" size={20} />
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Course Features</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
                              <div className="text-lg font-semibold">{course.duration}</div>
                            </motion.div>
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Sessions</div>
                              <div className="text-lg font-semibold">{course.sessions}</div>
                            </motion.div>
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Sessions per Week</div>
                              <div className="text-lg font-semibold">{course.sessionsPerWeek}</div>
                            </motion.div>
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Hours per Session</div>
                              <div className="text-lg font-semibold">{course.hoursPerSession}</div>
                            </motion.div>
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Quizzes</div>
                              <div className="text-lg font-semibold">{course.quizzes}</div>
                            </motion.div>
                            <motion.div 
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="text-sm text-gray-500 dark:text-gray-400">Students</div>
                              <div className="text-lg font-semibold">{course.students}</div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'curriculum' && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Course Curriculum</h3>
                        <div className="space-y-4">
                          {/* Example curriculum sections */}
                          {[1, 2, 3].map((section) => (
                            <div key={section} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-between items-center">
                                <h4 className="font-medium">Section {section}: Getting Started with Fundamentals</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">4 lectures • 45 min</span>
                              </div>
                              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {[1, 2, 3, 4].map((lecture) => (
                                  <div key={lecture} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-primary-500 flex items-center">
                                        <PlayIcon color="currentColor" size={16} />
                                      </span>
                                      <span>Lecture {lecture}: Introduction to Core Concepts</span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">10:30</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          <div className="text-center mt-6">
                            <span className="text-gray-600 dark:text-gray-400">
                              + 15 more sections (42 lectures in total)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'instructor' && (
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src="https://randomuser.me/api/portraits/men/32.jpg" 
                              alt={course.instructor}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                            <p className="text-primary-600 dark:text-primary-400 mb-3">Senior Developer & Instructor</p>
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex items-center">
                                <span className="mr-1 text-yellow-400 flex items-center">
                                  <StarIcon filled={true} />
                                </span>
                                <span>4.8 Instructor Rating</span>
                              </div>
                              <div>
                                <span className="font-medium">15,342</span> Students
                              </div>
                              <div>
                                <span className="font-medium">12</span> Courses
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              John is a senior developer with 10+ years of experience in building enterprise applications
                              and teaching programming concepts. He specializes in React, Node.js, and modern JavaScript.
                              His teaching approach focuses on practical, job-ready skills backed by real-world examples.
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {['React', 'JavaScript', 'Node.js', 'TypeScript', 'Redux'].map(skill => (
                                <span 
                                  key={skill} 
                                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Experience</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">10+ years in software development</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">5 years teaching experience</p>
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Languages</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">English (Native)</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Spanish (Intermediate)</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">{course.rating}</div>
                            <div className="flex justify-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <span className="mr-1 text-yellow-400 flex items-center">
                                  <StarIcon filled={i < Math.floor(course.rating)} />
                                </span>
                              ))}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">{course.reviews} reviews</div>
                          </div>
                          
                          <div className="w-full md:w-2/3 space-y-4">
                            {/* Rating distribution */}
                            {[5, 4, 3, 2, 1].map(stars => (
                              <div key={stars} className="flex items-center gap-4">
                                <div className="w-16 text-sm font-medium flex items-center">
                                  <span>{stars}</span>
                                  <span className="mr-1 text-yellow-400 flex items-center">
                                    <StarIcon filled={stars <= Math.floor(course.rating)} />
                                  </span>
                                </div>
                                <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-400" 
                                    style={{ width: `${stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : stars === 2 ? 1 : 1}%` }}
                                  ></div>
                                </div>
                                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                  {stars === 5 ? '75%' : stars === 4 ? '18%' : stars === 3 ? '5%' : stars === 2 ? '1%' : '1%'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-6 mt-6">
                          {/* Example reviews */}
                          {[
                            { name: "Emma Parker", rating: 5, date: "2 weeks ago", comment: "Excellent course! The instructor explains complex concepts in an easy-to-understand way. The practical examples were very helpful for building real-world applications." },
                            { name: "Michael Chen", rating: 4, date: "1 month ago", comment: "Great course with detailed explanations. I would have liked more exercises, but overall the content is very comprehensive and well-structured." },
                            { name: "Sofia Rodriguez", rating: 5, date: "2 months ago", comment: "This course exceeded my expectations. I was able to apply what I learned immediately at work. Looking forward to more courses from this instructor!" }
                          ].map((review, idx) => (
                            <div key={idx} className="py-6 first:pt-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100 flex items-center justify-center mr-3">
                                    {review.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{review.name}</p>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                      <span>{review.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span className="mr-1 text-yellow-400 flex items-center">
                                      <StarIcon filled={i < review.rating} />
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-center mt-6">
                          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Load More Reviews
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'faq' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                          {[
                            {
                              question: "Do I need prior programming experience for this course?",
                              answer: "While some basic programming knowledge is helpful, this course is designed to be accessible for beginners. We start with fundamentals and gradually progress to more advanced topics."
                            },
                            {
                              question: "How long do I have access to the course materials?",
                              answer: "Once enrolled, you have lifetime access to all course materials, including future updates and improvements."
                            },
                            {
                              question: "Is there a certification upon completion?",
                              answer: "Yes, you will receive a certificate of completion once you finish all course modules and pass the final assessment."
                            },
                            {
                              question: "What if I'm not satisfied with the course?",
                              answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 30 days of purchase."
                            },
                            {
                              question: "How is this course different from other similar courses?",
                              answer: "This course focuses on practical, job-ready skills with real-world projects. You'll build a portfolio of work while learning, and our instructor provides personalized feedback on your progress."
                            }
                          ].map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                              <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 dark:bg-gray-700">
                                  <h4 className="font-medium text-gray-900 dark:text-white">{faq.question}</h4>
                                  <span className="ml-6 flex-shrink-0 text-gray-500">
                                    <svg className="h-5 w-5 transform transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </span>
                                </summary>
                                <div className="p-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                                  <p>{faq.answer}</p>
                                </div>
                              </details>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Related Courses */}
                  <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {course.relatedCourses.map((relatedCourse) => (
                        <motion.div
                          key={relatedCourse.id}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={`/courses/${relatedCourse.id}`}
                            className="block group h-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            onClick={onClose}
                          >
                            <div className="relative rounded-t-lg overflow-hidden">
                              <img
                                src={relatedCourse.image}
                                alt={relatedCourse.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                                <span className="text-white font-medium">View Details</span>
                              </div>
                              <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Best Seller
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 line-clamp-2 h-12">
                                {relatedCourse.title}
                              </h4>
                              <div className="flex items-center justify-between mt-2">
                                <p className="flex items-center justify-between mt-2">
                                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                                    ${relatedCourse.price}
                                  </span>
                                  <div className="flex items-center">
                                    <span className="mr-1 text-yellow-400 flex items-center">
                                      <StarIcon filled={true} />
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">4.8</span>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sticky CTA for mobile */}
                  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-lg">
                    <div>
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">${course.price}</div>
                      {course.originalPrice && (
                        <div className="text-sm line-through text-gray-500">${course.originalPrice}</div>
                      )}
                    </div>
                    <button
                      onClick={handleEnroll}
                      className="px-6 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CoursePreviewModal; 