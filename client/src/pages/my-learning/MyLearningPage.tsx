import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import EnrolledCourseCard from './components/EnrolledCourseCard';
import CourseDetailView from './components/CourseDetailView';
import SearchAndFilter from './components/SearchAndFilter';
import NotificationsPanel from './components/NotificationsPanel';
import RecommendationsSection from './components/RecommendationsSection';
import AchievementsPanel from './components/AchievementsPanel';
import LearningAnalytics from './components/LearningAnalytics';
import LearningGoals from './components/LearningGoals';
import LearningPathProgress from './components/LearningPathProgress';
import CCppLearningContainer from './components/CCppLearningContainer';

// Types
interface CourseProgress {
  courseId: string;
  completedLectures: string[];
  completedQuizzes: string[];
  lastWatched: {
    lectureId: string;
    timestamp: Date;
    position: number;
  };
  totalProgress: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: string;
  description: string;
  enrolledDate: Date;
  tags: string[];
  totalLectures: number;
  totalDuration: number;
  ratings: {
    average: number;
    count: number;
  };
  progress: CourseProgress;
  lectures: { id: string; title: string; duration: number; videoUrl: string }[];
}

interface Notification {
  id: string;
  type: 'deadline' | 'update' | 'certificate' | 'achievement' | 'reminder';
  title: string;
  message: string;
  courseId?: string;
  time: Date;
  read: boolean;
}

// Mock data - would come from API in production
const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 'c6',
    title: 'Advance Java',
    instructor: 'Amit Verma',
    thumbnail: 'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg',
    category: 'Programming',
    level: 'Intermediate',
    description: 'Take your Java skills to the next level with advanced topics including JDBC, Servlets, JSP, Hibernate, Spring Framework, and microservices.',
    enrolledDate: new Date('2023-06-01'),
    tags: ['Java EE', 'Spring', 'Hibernate', 'JDBC', 'Servlets', 'JSP'],
    totalLectures: 95,
    totalDuration: 3420, // in minutes (57 hours)
    ratings: { average: 4.9, count: 1250 },
    progress: {
      courseId: 'c6',
      completedLectures: ['l1'],
      completedQuizzes: [],
      lastWatched: {
        lectureId: 'l1',
        timestamp: new Date('2023-06-02T10:15:00'),
        position: 180
      },
      totalProgress: 1
    },
    lectures: [
      { id: 'l1', title: 'Introduction to Advanced Java', duration: 60, videoUrl: 'https://drive.google.com/file/d/1JCqnLAmy4MB4IfgIUY5WadNmkN6U8xB_/view?usp=drive_link' },
      { id: 'l2', title: 'JDBC Fundamentals', duration: 75, videoUrl: 'https://drive.google.com/file/d/1aeUVGQxYCzaAAWkiwaVu3KR6LbHUZChl/view?usp=sharing' },
      { id: 'l3', title: 'Working with Databases', duration: 80, videoUrl: 'https://drive.google.com/file/d/1aeUVGQxYCzaAAWkiwaVu3KR6LbHUZChl/view?usp=sharing' },
      { id: 'l4', title: 'Java Servlets', duration: 65, videoUrl: 'https://drive.google.com/file/d/1MVQbYPRi6V6l8K9dQ9Ooni-O7j6bHWG_/view?usp=sharing' },
      { id: 'l5', title: 'JSP Basics', duration: 70, videoUrl: 'https://drive.google.com/file/d/12ZLj7l8Zc_wR61KHgrNp_w3X0SJzScBc/view?usp=sharing' }
    ]
  },
  {
    id: 'c5',
    title: 'Core Java',
    instructor: 'Rahul Sharma',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Programming',
    level: 'Beginner',
    description: 'Comprehensive guide to Java programming fundamentals including OOP concepts, data structures, and Java APIs.',
    enrolledDate: new Date('2023-05-15'),
    tags: ['Java', 'OOP', 'Programming'],
    totalLectures: 80,
    totalDuration: 2880, // in minutes (48 hours)
    ratings: { average: 4.8, count: 1560 },
    progress: {
      courseId: 'c5',
      completedLectures: ['l1', 'l2'],
      completedQuizzes: ['q1'],
      lastWatched: {
        lectureId: 'l2',
        timestamp: new Date('2023-05-16T18:30:00'),
        position: 245
      },
      totalProgress: 2
    },
    lectures: [
      { id: 'l1', title: 'Introduction to Java', duration: 45, videoUrl: 'https://youtu.be/NhMJFkHgcqQ' },
      { id: 'l2', title: 'Java Syntax and Basics', duration: 60, videoUrl: 'https://youtu.be/EJYpXYhWerM' },
      { id: 'l3', title: 'Object-Oriented Programming Concepts', duration: 75, videoUrl: 'https://youtu.be/3EuBYt-N2h0' },
      { id: 'l4', title: 'Java Collections Framework', duration: 65, videoUrl: 'https://youtu.be/ufDVF4pknZQ' },
      { id: 'l5', title: 'Exception Handling in Java', duration: 55, videoUrl: 'https://youtu.be/Mh1AK7aU-Mg' }
    ]
  },
  {
    id: 'c4',
    title: 'Complete C and C++ Programming Masterclass',
    instructor: 'Prof. Alex Thompson',
    thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    category: 'Programming',
    level: 'All Levels',
    description: 'Comprehensive guide to mastering C and C++ programming from fundamentals to advanced topics including memory management, data structures, algorithms, and modern C++ features.',
    enrolledDate: new Date('2023-05-10'),
    tags: ['C', 'C++', 'Programming', 'Data Structures', 'Algorithms'],
    totalLectures: 167,
    totalDuration: 7560, // in minutes (126 hours)
    ratings: { average: 4.9, count: 3254 },
    progress: {
      courseId: 'c4',
      completedLectures: ['l1', 'l2', 'l3', 'l4', 'l5'],
      completedQuizzes: ['q1'],
      lastWatched: {
        lectureId: 'l5',
        timestamp: new Date('2023-05-14T16:20:00'),
        position: 483
      },
      totalProgress: 3
    },
    lectures: [
      { id: 'l1', title: 'Introduction to C Programming', duration: 55, videoUrl: 'https://youtu.be/example1' },
      { id: 'l2', title: 'Variables and Data Types', duration: 65, videoUrl: 'https://youtu.be/example2' },
      { id: 'l3', title: 'Control Structures', duration: 60, videoUrl: 'https://youtu.be/example3' },
      { id: 'l4', title: 'Functions in C', duration: 70, videoUrl: 'https://youtu.be/example4' },
      { id: 'l5', title: 'Pointers and Memory Management', duration: 75, videoUrl: 'https://youtu.be/example5' }
    ]
  },
  {
    id: 'c1',
    title: 'Advanced JavaScript: Modern Techniques',
    instructor: 'Dr. Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Web Development',
    level: 'Intermediate',
    description: 'Master modern JavaScript techniques including ES6+, async programming, and advanced design patterns.',
    enrolledDate: new Date('2023-04-15'),
    tags: ['JavaScript', 'ES6', 'Web Development'],
    totalLectures: 24,
    totalDuration: 1080, // in minutes
    ratings: { average: 4.7, count: 1243 },
    progress: {
      courseId: 'c1',
      completedLectures: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'],
      completedQuizzes: ['q1', 'q2'],
      lastWatched: {
        lectureId: 'l7',
        timestamp: new Date('2023-05-10T14:30:00'),
        position: 342
      },
      totalProgress: 29
    },
    lectures: [
      { id: 'l1', title: 'Modern JavaScript Overview', duration: 50, videoUrl: 'https://youtu.be/example6' },
      { id: 'l2', title: 'ES6+ Features', duration: 55, videoUrl: 'https://youtu.be/example7' },
      { id: 'l3', title: 'Arrow Functions and Lexical Scope', duration: 45, videoUrl: 'https://youtu.be/example8' },
      { id: 'l4', title: 'Destructuring and Spread Syntax', duration: 40, videoUrl: 'https://youtu.be/example9' },
      { id: 'l5', title: 'Promises and Async/Await', duration: 60, videoUrl: 'https://youtu.be/example10' },
      { id: 'l6', title: 'Modules and Import/Export', duration: 35, videoUrl: 'https://youtu.be/example11' },
      { id: 'l7', title: 'Advanced Design Patterns', duration: 65, videoUrl: 'https://youtu.be/example12' }
    ]
  },
  {
    id: 'c2',
    title: 'React and Redux: Building Complex Applications',
    instructor: 'Mark Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Web Development',
    level: 'Advanced',
    description: 'Learn to build scalable, maintainable React applications using Redux, hooks, and modern best practices.',
    enrolledDate: new Date('2023-03-10'),
    tags: ['React', 'Redux', 'Frontend'],
    totalLectures: 36,
    totalDuration: 1620, // in minutes
    ratings: { average: 4.9, count: 876 },
    progress: {
      courseId: 'c2',
      completedLectures: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12'],
      completedQuizzes: ['q1', 'q2', 'q3'],
      lastWatched: {
        lectureId: 'l12',
        timestamp: new Date('2023-05-12T09:15:00'),
        position: 128
      },
      totalProgress: 33
    },
    lectures: [
      { id: 'l1', title: 'React Fundamentals', duration: 45, videoUrl: 'https://youtu.be/example13' },
      { id: 'l2', title: 'Components and Props', duration: 50, videoUrl: 'https://youtu.be/example14' },
      { id: 'l3', title: 'State and Lifecycle', duration: 55, videoUrl: 'https://youtu.be/example15' },
      { id: 'l4', title: 'Hooks Introduction', duration: 60, videoUrl: 'https://youtu.be/example16' },
      { id: 'l5', title: 'Custom Hooks', duration: 45, videoUrl: 'https://youtu.be/example17' },
      { id: 'l6', title: 'Context API', duration: 40, videoUrl: 'https://youtu.be/example18' },
      { id: 'l7', title: 'Redux Fundamentals', duration: 65, videoUrl: 'https://youtu.be/example19' },
      { id: 'l8', title: 'Actions and Reducers', duration: 50, videoUrl: 'https://youtu.be/example20' },
      { id: 'l9', title: 'Redux Middleware', duration: 55, videoUrl: 'https://youtu.be/example21' },
      { id: 'l10', title: 'Redux Toolkit', duration: 60, videoUrl: 'https://youtu.be/example22' },
      { id: 'l11', title: 'Performance Optimization', duration: 45, videoUrl: 'https://youtu.be/example23' },
      { id: 'l12', title: 'Testing React Applications', duration: 50, videoUrl: 'https://youtu.be/example24' }
    ]
  },
  {
    id: 'c3',
    title: 'Python for Data Science and Machine Learning',
    instructor: 'Dr. Robert Chen',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Data Science',
    level: 'Intermediate',
    description: 'A comprehensive guide to using Python for data analysis, visualization, and machine learning.',
    enrolledDate: new Date('2023-02-20'),
    tags: ['Python', 'Data Science', 'Machine Learning'],
    totalLectures: 48,
    totalDuration: 2160, // in minutes
    ratings: { average: 4.8, count: 1567 },
    progress: {
      courseId: 'c3',
      completedLectures: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12', 'l13', 'l14', 'l15', 'l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l22'],
      completedQuizzes: ['q1', 'q2', 'q3', 'q4', 'q5'],
      lastWatched: {
        lectureId: 'l22',
        timestamp: new Date('2023-05-11T18:45:00'),
        position: 756
      },
      totalProgress: 46
    },
    lectures: [
      { id: 'l1', title: 'Python Basics', duration: 40, videoUrl: 'https://youtu.be/example25' },
      { id: 'l2', title: 'Control Flow and Functions', duration: 45, videoUrl: 'https://youtu.be/example26' },
      { id: 'l3', title: 'Data Structures in Python', duration: 50, videoUrl: 'https://youtu.be/example27' },
      { id: 'l4', title: 'NumPy Fundamentals', duration: 55, videoUrl: 'https://youtu.be/example28' },
      { id: 'l5', title: 'Pandas Introduction', duration: 60, videoUrl: 'https://youtu.be/example29' },
      { id: 'l6', title: 'Data Cleaning with Pandas', duration: 50, videoUrl: 'https://youtu.be/example30' },
      { id: 'l7', title: 'Data Visualization with Matplotlib', duration: 45, videoUrl: 'https://youtu.be/example31' },
      { id: 'l8', title: 'Advanced Visualization with Seaborn', duration: 40, videoUrl: 'https://youtu.be/example32' },
      { id: 'l9', title: 'Statistical Analysis', duration: 55, videoUrl: 'https://youtu.be/example33' },
      { id: 'l10', title: 'Introduction to Machine Learning', duration: 65, videoUrl: 'https://youtu.be/example34' },
      { id: 'l11', title: 'Supervised Learning', duration: 60, videoUrl: 'https://youtu.be/example35' },
      { id: 'l12', title: 'Linear Regression', duration: 50, videoUrl: 'https://youtu.be/example36' },
      { id: 'l13', title: 'Logistic Regression', duration: 45, videoUrl: 'https://youtu.be/example37' },
      { id: 'l14', title: 'Decision Trees', duration: 55, videoUrl: 'https://youtu.be/example38' },
      { id: 'l15', title: 'Random Forests', duration: 50, videoUrl: 'https://youtu.be/example39' },
      { id: 'l16', title: 'Support Vector Machines', duration: 60, videoUrl: 'https://youtu.be/example40' },
      { id: 'l17', title: 'Unsupervised Learning', duration: 55, videoUrl: 'https://youtu.be/example41' },
      { id: 'l18', title: 'Clustering Algorithms', duration: 50, videoUrl: 'https://youtu.be/example42' },
      { id: 'l19', title: 'Dimensionality Reduction', duration: 45, videoUrl: 'https://youtu.be/example43' },
      { id: 'l20', title: 'Neural Networks Fundamentals', duration: 65, videoUrl: 'https://youtu.be/example44' },
      { id: 'l21', title: 'Deep Learning with TensorFlow', duration: 70, videoUrl: 'https://youtu.be/example45' },
      { id: 'l22', title: 'Model Deployment', duration: 55, videoUrl: 'https://youtu.be/example46' }
    ]
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'deadline',
    title: 'Assignment Due Tomorrow',
    message: 'Your React project submission is due tomorrow at 11:59 PM.',
    courseId: 'c2',
    time: new Date('2023-05-14T09:00:00'),
    read: false
  },
  {
    id: 'n2',
    type: 'update',
    title: 'New Lectures Added',
    message: 'Your Python course has been updated with 3 new lectures on Neural Networks.',
    courseId: 'c3',
    time: new Date('2023-05-13T14:30:00'),
    read: false
  },
  {
    id: 'n3',
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You\'ve completed 50% of the JavaScript course.',
    courseId: 'c1',
    time: new Date('2023-05-12T10:15:00'),
    read: true
  }
];

const MyLearningPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId?: string }>();
  
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses);
  const [filteredCourses, setFilteredCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isDetailView, setIsDetailView] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Check for courseId in URL and load the appropriate course
  useEffect(() => {
    if (courseId) {
      const course = enrolledCourses.find(c => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        setIsDetailView(true);
      } else {
        // Course not found, redirect to the main learning page
        navigate('/my-learning', { replace: true });
        toast.error('Course not found');
      }
    }
  }, [courseId, enrolledCourses, navigate]);

  // Calculate unread notifications
  useEffect(() => {
    setUnreadNotifications(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Filter courses based on search and filter criteria
  useEffect(() => {
    let result = [...enrolledCourses];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.instructor.toLowerCase().includes(query) || 
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(course => course.category === filterCategory);
    }
    
    // Apply sorting
    result = sortCourses(result, sortBy);
    
    setFilteredCourses(result);
  }, [enrolledCourses, searchQuery, filterCategory, sortBy]);

  // Sort courses function
  const sortCourses = (courses: EnrolledCourse[], criteria: string): EnrolledCourse[] => {
    const coursesCopy = [...courses];
    
    switch (criteria) {
      case 'recent':
        return coursesCopy.sort((a, b) => b.enrolledDate.getTime() - a.enrolledDate.getTime());
      case 'progress':
        return coursesCopy.sort((a, b) => b.progress.totalProgress - a.progress.totalProgress);
      case 'title-asc':
        return coursesCopy.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return coursesCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return coursesCopy;
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilterCategory(value);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Handle view course
  const handleViewCourse = (courseId: string) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsDetailView(true);
      
      // Update URL to include course ID for deep linking
      navigate(`/my-learning/${courseId}`);
    }
  };

  // Return to course list
  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedCourse(null);
    // Update URL back to base my-learning route
    navigate('/my-learning');
  };

  // Mark notification as read
  const handleNotificationRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get course that was last accessed
  const getLastAccessedCourse = (): EnrolledCourse | null => {
    if (enrolledCourses.length === 0) return null;
    
    return enrolledCourses.reduce((latest, course) => {
      if (!latest) return course;
      
      const latestDate = latest.progress.lastWatched.timestamp;
      const courseDate = course.progress.lastWatched.timestamp;
      
      return courseDate > latestDate ? course : latest;
    }, null as unknown as EnrolledCourse);
  };

  const lastAccessedCourse = getLastAccessedCourse();

  const renderCourseContent = () => {
    if (!selectedCourse) return null;
    
    // Special handling for C/C++ course
    if (selectedCourse.id === 'c4') {
      return <CCppLearningContainer />;
    }
    
    return (
      <CourseDetailView 
        course={selectedCourse} 
        onBack={handleBackToList} 
      />
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Page Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Track your progress and continue learning</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              <Link 
                to="/settings" 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </header>

          {/* Conditional render: detail view or course list */}
          {isDetailView && selectedCourse ? (
            renderCourseContent()
          ) : (
            <>
              {/* Continue Learning Section */}
              {lastAccessedCourse && (
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                    <h2 className="text-white text-xl font-semibold">Continue Learning</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className="w-full md:w-64 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={lastAccessedCourse.thumbnail} 
                          alt={lastAccessedCourse.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {lastAccessedCourse.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          by {lastAccessedCourse.instructor}
                        </p>
                        <div className="mt-3 flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${lastAccessedCourse.progress.totalProgress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            {lastAccessedCourse.progress.totalProgress}%
                          </span>
                        </div>
                        <div className="mt-4 flex items-start space-x-3">
                          <button
                            onClick={() => handleViewCourse(lastAccessedCourse.id)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                          >
                            Continue Learning
                          </button>
                          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Last viewed: {lastAccessedCourse.progress.lastWatched.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Search and Filter Section */}
              <SearchAndFilter 
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                searchQuery={searchQuery}
                filterCategory={filterCategory}
                sortBy={sortBy}
              />
              
              {/* Main Courses Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <EnrolledCourseCard 
                    key={course.id}
                    course={course}
                    onViewCourse={handleViewCourse}
                    formatDuration={formatDuration}
                  />
                ))}
                
                {filteredCourses.length === 0 && (
                  <div className="col-span-full p-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No courses found</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Try adjusting your search or filters</p>
                  </div>
                )}
              </section>
            </>
          )}

          {/* AI Recommendations Section - Only show on main list view */}
          {!isDetailView && (
            <RecommendationsSection />
          )}

          {/* Stats and Achievements - Only show on main list view */}
          {!isDetailView && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LearningAnalytics />
              <LearningPathProgress />
              <AchievementsPanel />
            </div>
          )}
        </div>
      </div>
      
      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel 
            notifications={notifications}
            onClose={toggleNotifications}
            onMarkAsRead={handleNotificationRead}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLearningPage; 