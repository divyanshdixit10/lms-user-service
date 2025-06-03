import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import InteractiveTranscript from './InteractiveTranscript';
import AdvancedCourseNotes from './AdvancedCourseNotes';
import CourseDiscussions from './CourseDiscussions';
import CCppCourseStructure from './CCppCourseStructure';
import CCppProgrammingExercises from './CCppProgrammingExercises';
import CourseResources from './CourseResources';
import CourseMCQs from './CourseMCQs';
import CourseAssignments from './CourseAssignments';
import CCppLearningContainer from './CCppLearningContainer';

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
  lectures?: {
    id: string;
    title: string;
    duration: number;
    videoUrl: string;
  }[];
}

interface CourseDetailViewProps {
  course: EnrolledCourse;
  onBack: () => void;
}

// Mock course content data
const mockCourseSections = [
  {
    id: 's1',
    title: 'Introduction',
    lectures: [
      { id: 'l1', title: 'Course Overview', duration: 8, type: 'video', completed: true },
      { id: 'l2', title: 'Setting Up Your Environment', duration: 15, type: 'video', completed: true },
      { id: 'q1', title: 'Environment Setup Quiz', type: 'quiz', completed: true }
    ]
  },
  {
    id: 's2',
    title: 'Core Concepts',
    lectures: [
      { id: 'l3', title: 'Basic Principles', duration: 12, type: 'video', completed: true },
      { id: 'l4', title: 'Advanced Techniques', duration: 18, type: 'video', completed: true },
      { id: 'l5', title: 'Common Patterns', duration: 14, type: 'video', completed: true },
      { id: 'r1', title: 'Reading: Design Patterns', type: 'reading', completed: true }
    ]
  },
  {
    id: 's3',
    title: 'Practical Applications',
    lectures: [
      { id: 'l6', title: 'Building Your First Project', duration: 22, type: 'video', completed: true },
      { id: 'l7', title: 'Advanced Project Structure', duration: 20, type: 'video', completed: true },
      { id: 'q2', title: 'Project Structure Quiz', type: 'quiz', completed: true }
    ]
  },
  {
    id: 's4',
    title: 'Performance Optimization',
    lectures: [
      { id: 'l8', title: 'Identifying Performance Issues', duration: 16, type: 'video', completed: false },
      { id: 'l9', title: 'Optimization Techniques', duration: 19, type: 'video', completed: false },
      { id: 'l10', title: 'Measuring Performance Improvements', duration: 14, type: 'video', completed: false }
    ]
  },
  {
    id: 's5',
    title: 'Advanced Topics',
    lectures: [
      { id: 'l11', title: 'Integration with External Systems', duration: 25, type: 'video', completed: false },
      { id: 'l12', title: 'Security Best Practices', duration: 22, type: 'video', completed: false },
      { id: 'a1', title: 'Final Project Assignment', type: 'assignment', completed: false }
    ]
  }
];

// Mock data for CCppCourseStructure component
const mockVideos = [
  {
    id: 'v1',
    title: 'Introduction to C Programming',
    description: 'Learn the basics of C programming language and its importance in the world of software development.',
    duration: 1245, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
    completed: false,
    section: 'C Programming Fundamentals',
    sectionId: 's1',
    order: 1
  },
  {
    id: 'v2',
    title: 'Variables and Data Types in C',
    description: 'Understanding variables, data types, and memory allocation in C programming.',
    duration: 953, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=h1oAK8skdO0',
    completed: false,
    section: 'C Programming Fundamentals',
    sectionId: 's1',
    order: 2
  },
  {
    id: 'v3',
    title: 'Control Flow - Loops and Conditions',
    description: 'Learn how to control the flow of your C programs using loops and conditional statements.',
    duration: 1120, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=qMlnFwYdqIw',
    completed: false,
    section: 'C Programming Fundamentals',
    sectionId: 's1',
    order: 3
  }
];

const mockSections = [
  { id: 's1', title: 'C Programming Fundamentals', order: 1 },
  { id: 's2', title: 'Intermediate C Programming', order: 2 },
  { id: 's3', title: 'C++ Fundamentals', order: 3 }
];

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLecture, setCurrentLecture] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([mockCourseSections[0].id]);
  const [activeTab, setActiveTab] = useState('content');
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [transcriptSearchQuery, setTranscriptSearchQuery] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [courseLectures, setCourseLectures] = useState<any[]>([]);
  
  // Function to load YouTube API
  const loadYouTubeAPI = useCallback(() => {
    // Check if API is already loaded
    if (window.YT) return;
    
    // Create YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    // Define callback for when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      console.log('YouTube API ready');
    };
  }, []);
  
  // Initialize YouTube API when component mounts
  useEffect(() => {
    loadYouTubeAPI();
  }, [loadYouTubeAPI]);
  
  // Effect to handle quality setting when lecture changes
  useEffect(() => {
    if (currentLecture?.type === 'video' && currentLecture?.videoUrl) {
      // Small delay to ensure iframe is loaded
      setTimeout(() => {
        const iframe = document.getElementById(`youtube-player-${currentLecture.id}`) as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          // Set high quality
          iframe.contentWindow.postMessage('{"event":"command","func":"setPlaybackQuality","args":["hd1080"]}', '*');
        }
      }, 1000);
    }
  }, [currentLecture]);

  // Initialize course lectures and current lecture
  useEffect(() => {
    if (course.lectures && course.lectures.length > 0) {
      // Map course lectures to the format expected by the component
      const mappedLectures = course.lectures.map((lecture, index) => ({
        id: lecture.id,
        title: lecture.title,
        duration: lecture.duration,
        type: 'video',
        completed: course.progress.completedLectures.includes(lecture.id),
        videoUrl: lecture.videoUrl
      }));
      
      // Create a section structure for the mapped lectures
      const lectureSection = {
        id: 's1',
        title: course.title,
        lectures: mappedLectures
      };
      
      setCourseLectures([lectureSection]);
      setExpandedSections([lectureSection.id]);
      setCurrentLecture(mappedLectures[0]);
    } else {
      // Fallback to mock data if no lectures are available
      setCourseLectures(mockCourseSections);
      setCurrentLecture(mockCourseSections[0].lectures[0]);
    }
  }, [course]);

  // Mock transcript data - would come from API in production
  const [transcriptSegments] = useState([
    { id: 's1', startTime: 0, endTime: 10.5, text: "Welcome to this lecture on advanced design patterns.", speaker: "Instructor" },
    { id: 's2', startTime: 10.6, endTime: 18.2, text: "In today's session, we'll cover three key patterns that are essential for scalable applications.", speaker: "Instructor" },
    { id: 's3', startTime: 18.3, endTime: 28.1, text: "The first pattern we'll discuss is the Factory Method Pattern, which provides an interface for creating objects but allows subclasses to alter the type of objects that will be created.", speaker: "Instructor" },
    { id: 's4', startTime: 28.2, endTime: 42.5, text: "This pattern is particularly useful when a class cannot anticipate the type of objects it must create, or when a class wants its subclasses to specify the objects it creates.", speaker: "Instructor" },
    { id: 's5', startTime: 42.6, endTime: 60.0, text: "Let's look at a concrete example of how this would be implemented in a real-world application.", speaker: "Instructor" },
    { id: 's6', startTime: 60.1, endTime: 75.3, text: "As you can see on the screen, we begin by defining an abstract Product interface or class, followed by concrete Product implementations.", speaker: "Instructor" },
    { id: 's7', startTime: 75.4, endTime: 90.2, text: "Then we create an abstract Creator class with a factory method that returns a Product object.", speaker: "Instructor" },
    { id: 's8', startTime: 90.3, endTime: 110.5, text: "Finally, we implement concrete Creator subclasses that override the factory method to return a specific type of Product.", speaker: "Instructor" },
    { id: 's9', startTime: 110.6, endTime: 125.8, text: "This pattern helps to promote loose coupling by eliminating the need to bind application-specific classes into your code.", speaker: "Instructor" },
    { id: 's10', startTime: 125.9, endTime: 140.0, text: "Now, let's move on to the second pattern: the Observer Pattern.", speaker: "Instructor" }
  ]);
  
  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Select a lecture to play
  const selectLecture = (lecture: any) => {
    setCurrentLecture(lecture);
    // Find section index
    const sectionIndex = mockCourseSections.findIndex(section => 
      section.lectures.some(l => l.id === lecture.id)
    );
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex);
    }
    
    // Reset video time
    setCurrentVideoTime(0);
  };
  
  // Handle video time update
  const handleVideoTimeUpdate = (time: number) => {
    setCurrentVideoTime(time);
  };
  
  // Handle seeking to specific timestamp
  const handleSeekToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentVideoTime(time);
  };

  // Format duration from minutes to MM:SS
  const formatDuration = (minutes: number): string => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Get icon for lecture type
  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'quiz':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'reading':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'assignment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  // Check if this is the C/C++ course
  const isCCppCourse = course.id === 'c4';

  // Render video player or placeholder for the current lecture
  const renderVideoPlayer = () => {
    if (!currentLecture) return null;
    
    if (currentLecture.type === 'video' && currentLecture.videoUrl) {
      // Check if it's a Google Drive link
      if (currentLecture.videoUrl.includes('drive.google.com')) {
        // Extract file ID from Google Drive URL
        const getGoogleDriveFileId = (url: string) => {
          const regex = /[-\w]{25,}/;
          const match = url.match(regex);
          return match ? match[0] : '';
        };
        
        const fileId = getGoogleDriveFileId(currentLecture.videoUrl);
        if (fileId) {
          // Create direct embed URL
          const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
          
          return (
            <div className="aspect-video bg-black relative w-full" style={{ maxHeight: 'calc(100vh - 250px)' }}>
              <iframe 
                className="w-full h-full"
                src={embedUrl}
                title={currentLecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%', aspectRatio: '16/9' }}
              ></iframe>
            </div>
          );
        }
      }
      
      // Handle YouTube videos (existing code)
      // Extract video ID from YouTube URL
      const getYouTubeVideoId = (url: string) => {
        // Handle youtu.be format
        if (url.includes('youtu.be/')) {
          return url.split('youtu.be/')[1].split('?')[0];
        }
        // Handle youtube.com/watch?v= format
        if (url.includes('youtube.com/watch')) {
          const urlParams = new URLSearchParams(url.split('?')[1]);
          return urlParams.get('v');
        }
        // Handle youtube.com/embed/ format
        if (url.includes('youtube.com/embed/')) {
          return url.split('youtube.com/embed/')[1].split('?')[0];
        }
        return url; // Return as is if no match
      };
      
      const videoId = getYouTubeVideoId(currentLecture.videoUrl);
      
      return (
        <div className="aspect-video bg-black relative w-full" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0&fs=1&color=white&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}&widgetid=1&hd=1&vq=hd1080`}
            title={currentLecture.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ width: '100%', height: '100%', aspectRatio: '16/9' }}
            id={`youtube-player-${currentLecture.id}`}
          ></iframe>
          
          {/* Control buttons overlay */}
          <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
            {/* Quality button */}
            <button 
              onClick={() => {
                const iframe = document.getElementById(`youtube-player-${currentLecture.id}`) as HTMLIFrameElement;
                if (iframe) {
                  // Send postMessage to show quality selector and set high quality
                  iframe.contentWindow?.postMessage('{"event":"command","func":"setPlaybackQuality","args":["hd1080"]}', '*');
                  
                  // Try to make the iframe go fullscreen only after quality is set
                  setTimeout(() => {
                    if (iframe.requestFullscreen) {
                      iframe.requestFullscreen();
                    } else if ((iframe as any).webkitRequestFullscreen) {
                      (iframe as any).webkitRequestFullscreen();
                    } else if ((iframe as any).mozRequestFullScreen) {
                      (iframe as any).mozRequestFullScreen();
                    } else if ((iframe as any).msRequestFullscreen) {
                      (iframe as any).msRequestFullscreen();
                    }
                  }, 100);
                }
              }}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
    
    // Placeholder for non-video content or when video URL is missing
    return (
      <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="mb-6 bg-gray-800/60 p-6 rounded-full inline-block">
            {getLectureIcon(currentLecture.type)}
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">{currentLecture.title}</h3>
          <p className="mt-2 text-gray-300 mb-6">
            {currentLecture.type === 'quiz' && 'Complete the quiz to test your knowledge and reinforce key concepts.'}
            {currentLecture.type === 'reading' && 'Read the provided materials to deepen your understanding of the subject.'}
            {currentLecture.type === 'assignment' && 'Complete and submit the assignment for review and feedback.'}
          </p>
          <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30 font-medium">
            {currentLecture.type === 'quiz' && 'Start Quiz'}
            {currentLecture.type === 'reading' && 'Open Reading'}
            {currentLecture.type === 'assignment' && 'View Assignment'}
          </button>
        </div>
      </div>
    );
  };

  // If this is the C/C++ course, render our learning container
  if (isCCppCourse) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Header with back button */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 flex items-center">
          <button 
            onClick={onBack}
            className="mr-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
          </div>
        </div>
        
        <div className="p-2">
          <CCppLearningContainer />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header with back button */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
        </div>
      </div>
      
      {/* Course content */}
      <div className="flex flex-col lg:flex-row">
        {/* Video and content area */}
        <div className="lg:w-3/4">
          {/* Video player */}
          {renderVideoPlayer()}
          
          {/* Video controls */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs for content, notes, discussions */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex px-4 -mb-px">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === 'content'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === 'transcript'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Transcript
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === 'discussions'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Discussions
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-4">
            {activeTab === 'content' && (
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2>{currentLecture?.title || 'Lecture Content'}</h2>
                <p>
                  Welcome to this lecture in the {course.title} course. In this session, we'll explore the fundamentals and key concepts of the topic.
                </p>
                <p>
                  By the end of this lecture, you'll have a solid understanding of the material and be able to apply these concepts in practical scenarios.
                </p>
                <h3>Key Concepts</h3>
                <ul>
                  <li>Understanding core principles</li>
                  <li>Implementing best practices</li>
                  <li>Applying concepts to real-world scenarios</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'notes' && (
              <AdvancedCourseNotes
                courseId={course.id}
                lectureId={currentLecture?.id || ''}
                currentVideoTime={currentVideoTime}
                onNoteClick={handleSeekToTime}
              />
            )}
            
            {activeTab === 'transcript' && (
              <InteractiveTranscript
                segments={transcriptSegments}
                currentTime={currentVideoTime}
                onSegmentClick={handleSeekToTime}
                searchQuery={transcriptSearchQuery}
              />
            )}
            
            {activeTab === 'discussions' && (
              <CourseDiscussions
                courseId={course.id}
                lectureId={currentLecture?.id || ''}
                currentVideoTime={currentVideoTime}
                currentUser={{
                  id: 'u5',
                  name: 'You',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
                  role: 'student'
                }}
              />
            )}
          </div>
        </div>
        
        {/* Course curriculum sidebar */}
        <div className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Course Curriculum</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {course.progress.totalProgress}% complete
            </div>
          </div>
          
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {courseLectures.map((section, sectionIndex) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center justify-between w-full p-4 text-left ${
                    sectionIndex === currentSection ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </span>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {expandedSections.includes(section.id) && (
                  <div className="pl-4 pr-1 pb-2">
                    {section.lectures.map((lecture: any) => (
                      <button
                        key={lecture.id}
                        onClick={() => selectLecture(lecture)}
                        className={`flex items-center justify-between w-full p-3 rounded-lg text-left text-sm mb-1 ${
                          currentLecture && currentLecture.id === lecture.id 
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 text-gray-500 dark:text-gray-400">
                            {lecture.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              getLectureIcon(lecture.type)
                            )}
                          </div>
                          <div className="flex-1 mr-2 truncate">
                            {lecture.title}
                          </div>
                        </div>
                        {lecture.duration && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {lecture.duration} min
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView; 