import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../contexts/AuthContext';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Components for dashboard sections
const WelcomeCard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{greeting}, {user?.name?.split(' ')[0] || 'User'}!</h1>
          <p className="opacity-90">
            Continue your learning journey and track your progress here.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/courses" className="btn bg-white text-primary hover:bg-gray-100 transition-colors">
            Resume Learning
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressCard: React.FC = () => {
  // Mock progress data
  const progress = {
    coursesCompleted: 3,
    coursesInProgress: 2,
    codingChallenges: 15,
    codingStreak: 7,
    totalHours: 42,
    skillsAcquired: 28
  };
  
  // Data for doughnut chart
  const skillsData = {
    labels: ['Frontend', 'Backend', 'DevOps', 'Data Science', 'Mobile'],
    datasets: [
      {
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="card"
    >
      <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.coursesCompleted}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Courses Completed</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.coursesInProgress}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Courses In Progress</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.codingChallenges}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Challenges Solved</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.codingStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Day Streak</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.totalHours}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Total Hours</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-primary">{progress.skillsAcquired}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Skills Acquired</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Learning Distribution</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg h-64">
            <Doughnut data={skillsData} options={chartOptions} />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Path Progress</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Next Steps:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Complete the "Advanced JavaScript" course module</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Practice 5 more coding challenges in Data Structures</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Join the upcoming "Web Performance" webinar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LearningStreakCard: React.FC = () => {
  // Mock data for learning streak calendar
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate calendar days for the current month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  
  // Mock activity data (1: light, 2: medium, 3: high activity, 0: no activity)
  const mockActivityData = Array.from({ length: daysInMonth }, () => 
    Math.floor(Math.random() * 4)
  );
  
  // Current streak calculation
  const currentStreak = 7; // Mock data
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Learning Streak</h2>
        <div className="flex items-center space-x-2">
          <span className="text-primary-600 font-semibold">{currentStreak} day streak</span>
          <span className="text-yellow-500 text-xl">🔥</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-base font-medium mb-2">{monthNames[currentMonth]} {currentYear}</h3>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day, index) => (
            <div key={`header-${index}`} className="text-xs text-center text-gray-500 font-medium py-1">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before the start of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8"></div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const activityLevel = mockActivityData[index];
            const isToday = day === today.getDate();
            
            // Determine color based on activity level
            let bgColor = 'bg-gray-100 dark:bg-gray-700';
            if (activityLevel === 1) bgColor = 'bg-green-200 dark:bg-green-900';
            if (activityLevel === 2) bgColor = 'bg-green-300 dark:bg-green-800';
            if (activityLevel === 3) bgColor = 'bg-green-500 dark:bg-green-700';
            
            return (
              <div 
                key={`day-${day}`} 
                className={`h-8 rounded-md flex items-center justify-center text-xs 
                  ${bgColor} 
                  ${isToday ? 'ring-2 ring-primary-500 font-bold' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mt-2">
        <div className="flex items-center space-x-1">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-700"></div>
          <span>More</span>
        </div>
        <span className="italic">Keep your streak going!</span>
      </div>
    </motion.div>
  );
};

const AIRecommendationsCard: React.FC = () => {
  // Mock AI recommendations
  const recommendations = [
    {
      type: 'course',
      title: 'Advanced React Patterns',
      reason: 'Based on your completion of React Fundamentals',
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      type: 'practice',
      title: 'Data Structures: Tree Traversal',
      reason: 'This will help strengthen your algorithm skills',
      icon: '💻',
      color: 'bg-green-500'
    },
    {
      type: 'event',
      title: 'Machine Learning Webinar',
      reason: 'Matches your interest in data science',
      icon: '📅',
      color: 'bg-purple-500'
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl mr-3">
          🤖
        </div>
        <h2 className="text-xl font-semibold">AI-Powered Recommendations</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Personalized recommendations based on your learning patterns, goals, and industry trends.
      </p>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
            className="flex p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all hover:translate-x-1"
          >
            <div className={`w-10 h-10 rounded-full ${rec.color} flex-shrink-0 flex items-center justify-center text-white`}>
              {rec.icon}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">{rec.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{rec.reason}</p>
              <div className="flex space-x-2 mt-2">
                <Link 
                  to={`/${rec.type}s/${rec.title.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Get Started
                </Link>
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:underline">
                  Save for Later
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        View All Recommendations
      </button>
    </motion.div>
  );
};

const CoursesContinueCard: React.FC = () => {
  // Mock course data
  const inProgressCourses = [
    {
      id: 1,
      title: 'React Fundamentals',
      progress: 65,
      lastLesson: 'Context API and Hooks',
      image: 'https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg',
      timeLeft: '2 hours left'
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      progress: 30,
      lastLesson: 'Binary Search Trees',
      image: 'https://img-c.udemycdn.com/course/240x135/2121018_9de5_4.jpg',
      timeLeft: '5 hours left'
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Continue Learning</h2>
        <Link to="/courses" className="text-sm text-primary hover:underline">View all courses</Link>
      </div>
      
      <div className="space-y-4">
        {inProgressCourses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`} className="flex p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <img src={course.image} alt={course.title} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Last lesson: {course.lastLesson}</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span className="text-xs text-gray-600">{course.progress}%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{course.timeLeft}</div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

const RecommendedCoursesCard: React.FC = () => {
  // Mock recommended courses
  const recommendedCourses = [
    {
      id: 3,
      title: 'Advanced JavaScript: From Fundamentals to Functional JS',
      instructor: 'Sarah Williams',
      rating: 4.8,
      students: 12845,
      image: 'https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'The Complete Node.js Developer Course',
      instructor: 'Andrew Mead',
      rating: 4.7,
      students: 24533,
      image: 'https://img-c.udemycdn.com/course/240x135/922484_52a1_8.jpg',
      level: 'All Levels'
    },
    {
      id: 5,
      title: 'TypeScript Masterclass',
      instructor: 'John Smith',
      rating: 4.9,
      students: 9876,
      image: 'https://img-c.udemycdn.com/course/240x135/3662354_2617_7.jpg',
      level: 'Intermediate'
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Link to="/courses" className="text-sm text-primary hover:underline">Browse all</Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {recommendedCourses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-medium line-clamp-2">{course.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">{course.rating}</span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3" fill={i < Math.floor(course.rating) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">({course.students.toLocaleString()} students)</span>
              </div>
              <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mt-2 inline-block">
                {course.level}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

const CertificationsCard: React.FC = () => {
  // Mock certifications
  const certificates = [
    {
      id: 1,
      title: 'Frontend Developer Certification',
      issueDate: '2023-05-15',
      image: 'https://img.icons8.com/?size=1x&id=55494&format=png'
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      issueDate: '2023-02-20',
      image: 'https://img.icons8.com/?size=1x&id=108784&format=png'
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Certifications</h2>
        <Link to="/certifications" className="text-sm text-primary hover:underline">View all</Link>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {certificates.map(cert => (
          <Link key={cert.id} to={`/certifications/${cert.id}`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-primary-50 p-3 rounded-lg mr-4">
              <img src={cert.image} alt="" className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-medium">{cert.title}</h3>
              <p className="text-xs text-gray-500">
                Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </Link>
        ))}
        
        <Link to="/certifications" className="flex items-center justify-center p-4 border rounded-lg border-dashed hover:bg-gray-50 transition-colors">
          <div className="text-center">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-sm font-medium text-primary">Earn new certification</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

const CommunityActivityCard: React.FC = () => {
  // Mock community activity
  const communityActivity = [
    {
      id: 1,
      user: 'Maria S.',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      action: 'replied to your question',
      content: 'How to implement authentication in React?',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Alex K.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      action: 'upvoted your answer',
      content: 'Understanding async/await in JavaScript',
      time: '1 day ago'
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Community Activity</h2>
        <Link to="/community" className="text-sm text-primary hover:underline">View all activity</Link>
      </div>
      
      {communityActivity.length > 0 ? (
        <div className="space-y-4">
          {communityActivity.map(activity => (
            <Link key={activity.id} to="/community" className="flex items-start p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <img src={activity.avatar} alt={activity.user} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-700 mt-1">{activity.content}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          <p className="text-gray-500 mb-3">No recent activity</p>
          <Link to="/community" className="text-primary hover:underline">Join the discussion</Link>
        </div>
      )}
    </motion.div>
  );
};

const DashboardPage: React.FC = () => {
  // Line chart data for weekly activity
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2.5, 3.8, 2.1, 4.2, 3.1, 5.4, 2.8],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Practice Sessions',
        data: [1.2, 2.3, 1.5, 3.0, 2.5, 2.8, 1.8],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Weekly Activity',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <WelcomeCard />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <ProgressCard />
        <LearningStreakCard />
        <AIRecommendationsCard />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <CoursesContinueCard />
        <RecommendedCoursesCard />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <CertificationsCard />
        <CommunityActivityCard />
      </div>
    </div>
  );
};

export default DashboardPage; 