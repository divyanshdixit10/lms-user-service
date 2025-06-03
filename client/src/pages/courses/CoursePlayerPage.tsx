import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../../components/courses/VideoPlayer';

// Mock data types
interface Lecture {
  id: number;
  title: string;
  videoUrl: string;
  duration: number; // in seconds
  resources: Resource[];
  description: string;
}

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'code' | 'link';
  url: string;
}

interface CourseSection {
  id: number;
  title: string;
  lectures: Lecture[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  sections: CourseSection[];
  description: string;
}

const CoursePlayerPage: React.FC = () => {
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showResources, setShowResources] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'discussions' | 'questions'>('overview');
  const [completion, setCompletion] = useState<Record<number, boolean>>({});
  const [lastPlaybackPosition, setLastPlaybackPosition] = useState<Record<number, number>>({});
  
  // Mock course data - would be fetched from API in a real app
  const mockCourse: Course = {
    id: 1,
    title: "React Fundamentals: Building Modern Web Applications",
    instructor: "Sarah Williams",
    description: "Master the core concepts of React to build powerful, interactive web applications. This comprehensive course covers everything from basic components to advanced patterns like context, hooks, and more.",
    sections: [
      {
        id: 101,
        title: "Getting Started with React",
        lectures: [
          {
            id: 1001,
            title: "Introduction to React",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 360, // 6 minutes
            resources: [
              { id: 10001, title: "React Cheat Sheet", type: "pdf", url: "#" },
              { id: 10002, title: "Course GitHub Repository", type: "link", url: "https://github.com/example/react-course" }
            ],
            description: "In this lecture, we'll cover what React is, why it's popular, and how it compares to other frameworks. We'll also set up our development environment and create our first React application."
          },
          {
            id: 1002,
            title: "Components and JSX",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 480, // 8 minutes
            resources: [
              { id: 10003, title: "JSX Syntax Reference", type: "pdf", url: "#" },
              { id: 10004, title: "Component Example Code", type: "code", url: "#" }
            ],
            description: "Learn about JSX, the syntax extension for JavaScript that looks similar to HTML, and how to create functional and class components in React."
          }
        ]
      },
      {
        id: 102,
        title: "State and Props",
        lectures: [
          {
            id: 1003,
            title: "Understanding Props",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 420, // 7 minutes
            resources: [
              { id: 10005, title: "Props vs State Comparison", type: "pdf", url: "#" }
            ],
            description: "This lecture explains how to pass data between components using props, and the best practices for working with props."
          },
          {
            id: 1004,
            title: "State Management",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 540, // 9 minutes
            resources: [
              { id: 10006, title: "State Management Code Examples", type: "code", url: "#" },
              { id: 10007, title: "React State Article", type: "link", url: "#" }
            ],
            description: "Learn how to manage state within components, update state correctly, and the importance of immutability when working with React state."
          }
        ]
      },
      {
        id: 103,
        title: "Hooks and Effects",
        lectures: [
          {
            id: 1005,
            title: "Intro to React Hooks",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 390, // 6.5 minutes
            resources: [
              { id: 10008, title: "Hooks API Reference", type: "pdf", url: "#" }
            ],
            description: "This lecture introduces React Hooks, a feature that allows you to use state and other React features without writing a class component."
          },
          {
            id: 1006,
            title: "useEffect Hook",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            duration: 450, // 7.5 minutes
            resources: [
              { id: 10009, title: "useEffect Examples", type: "code", url: "#" },
              { id: 10010, title: "Side Effects in React", type: "link", url: "#" }
            ],
            description: "Learn how to perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM, using the useEffect hook."
          }
        ]
      }
    ]
  };
  
  // Find the first lecture in a course
  const findFirstLecture = (course: Course): Lecture | null => {
    if (course.sections.length > 0 && course.sections[0].lectures.length > 0) {
      return course.sections[0].lectures[0];
    }
    return null;
  };
  
  // Find a specific lecture by ID
  const findLectureById = (course: Course, lectureId: number): { lecture: Lecture | null, sectionId: number | null } => {
    for (const section of course.sections) {
      const lecture = section.lectures.find(l => l.id === lectureId);
      if (lecture) {
        return { lecture, sectionId: section.id };
      }
    }
    return { lecture: null, sectionId: null };
  };
  
  // Find the next lecture in sequence
  const findNextLecture = (course: Course, currentLectureId: number): Lecture | null => {
    let foundCurrent = false;
    
    for (const section of course.sections) {
      for (const lecture of section.lectures) {
        if (foundCurrent) {
          return lecture;
        }
        
        if (lecture.id === currentLectureId) {
          foundCurrent = true;
        }
      }
    }
    
    return null;
  };
  
  // Set up the course and active lecture when the component mounts or params change
  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setCourse(mockCourse);
      
      if (lectureId) {
        const parsedLectureId = parseInt(lectureId, 10);
        const { lecture, sectionId } = findLectureById(mockCourse, parsedLectureId);
        
        if (lecture) {
          setActiveLecture(lecture);
          setActiveSectionId(sectionId);
        } else {
          // If lecture not found, use the first lecture
          const firstLecture = findFirstLecture(mockCourse);
          setActiveLecture(firstLecture);
          if (firstLecture && mockCourse.sections.length > 0) {
            setActiveSectionId(mockCourse.sections[0].id);
          }
        }
      } else {
        // If no lecture ID specified, use the first lecture
        const firstLecture = findFirstLecture(mockCourse);
        setActiveLecture(firstLecture);
        if (firstLecture && mockCourse.sections.length > 0) {
          setActiveSectionId(mockCourse.sections[0].id);
        }
      }
      
      setIsLoading(false);
    }, 800);
  }, [courseId, lectureId]);
  
  // Handle lecture selection
  const handleLectureSelect = (lecture: Lecture, sectionId: number) => {
    setActiveLecture(lecture);
    setActiveSectionId(sectionId);
    // In a real app, you would update URL here
  };
  
  // Handle video time update
  const handleTimeUpdate = (currentTime: number) => {
    if (activeLecture) {
      // Save playback position for the active lecture
      setLastPlaybackPosition(prev => ({
        ...prev,
        [activeLecture.id]: currentTime
      }));
      
      // Mark lecture as completed if watched over 90% of the duration
      if (currentTime > activeLecture.duration * 0.9) {
        setCompletion(prev => ({
          ...prev,
          [activeLecture.id]: true
        }));
      }
    }
  };
  
  // Handle video end
  const handleVideoEnd = () => {
    if (activeLecture && course) {
      // Mark the current lecture as completed
      setCompletion(prev => ({
        ...prev,
        [activeLecture.id]: true
      }));
      
      // Find the next lecture
      const nextLecture = findNextLecture(course, activeLecture.id);
      
      if (nextLecture) {
        // Automatically navigate to next lecture
        const { sectionId } = findLectureById(course, nextLecture.id);
        if (sectionId) {
          handleLectureSelect(nextLecture, sectionId);
        }
      }
    }
  };
  
  // Calculate course progress
  const calculateProgress = (): number => {
    if (!course) return 0;
    
    let totalLectures = 0;
    let completedLectures = 0;
    
    course.sections.forEach(section => {
      section.lectures.forEach(lecture => {
        totalLectures++;
        if (completion[lecture.id]) {
          completedLectures++;
        }
      });
    });
    
    return totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  // Render 404 state if course or lecture not found
  if (!course || !activeLecture) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course or Lecture Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the course or lecture you're looking for.</p>
          <Link to="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Course Header */}
        <div className="mb-6">
          <Link to={`/courses/${courseId}`} className="flex items-center text-primary mb-2 hover:underline">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course Overview
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-600">Instructor: {course.instructor}</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Player Section */}
          <div className="lg:w-3/4">
            <div className="card p-0 overflow-hidden mb-6">
              <VideoPlayer
                videoUrl={activeLecture.videoUrl}
                title={activeLecture.title}
                duration={activeLecture.duration}
                onTimeUpdate={handleTimeUpdate}
                initialTime={lastPlaybackPosition[activeLecture.id] || 0}
              />
            </div>
            
            {/* Lecture Info Section */}
            <div className="card mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{activeLecture.title}</h2>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                    <span>{formatDuration(activeLecture.duration)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{completion[activeLecture.id] ? 'Completed' : 'In Progress'}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowDescription(!showDescription)}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    {showDescription ? 'Hide Description' : 'Show Description'}
                  </button>
                  <button 
                    onClick={() => setShowResources(!showResources)}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    {showResources ? 'Hide Resources' : 'Show Resources'}
                  </button>
                </div>
              </div>
              
              {/* Description */}
              {showDescription && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-md font-medium mb-2">Lecture Description</h3>
                  <p className="text-gray-600">{activeLecture.description}</p>
                </div>
              )}
              
              {/* Resources */}
              {showResources && activeLecture.resources.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Resources</h3>
                  <div className="space-y-2">
                    {activeLecture.resources.map(resource => (
                      <a 
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex-shrink-0 p-2 rounded-full bg-primary/10 text-primary mr-3">
                          {resource.type === 'pdf' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : resource.type === 'code' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          )}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-gray-500 capitalize">{resource.type}</div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Tabs Section */}
            <div className="card p-0 overflow-hidden">
              <div className="tabs px-6">
                <button 
                  className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab ${activeTab === 'notes' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('notes')}
                >
                  Notes
                </button>
                <button 
                  className={`tab ${activeTab === 'discussions' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('discussions')}
                >
                  Discussions
                </button>
                <button 
                  className={`tab ${activeTab === 'questions' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('questions')}
                >
                  Questions
                </button>
              </div>
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About This Course</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Course Progress</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${calculateProgress()}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {calculateProgress()}% complete
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notes' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Course Notes</h3>
                    <p className="text-gray-600">Your notes from the video player will appear here.</p>
                    {/* Additional note-taking functionality would go here */}
                  </div>
                )}
                
                {activeTab === 'discussions' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Discussions</h3>
                    <p className="text-gray-600">Join the conversation with other students taking this course.</p>
                    {/* Discussions functionality would go here */}
                  </div>
                )}
                
                {activeTab === 'questions' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
                    <p className="text-gray-600">Have a question about this lecture? Ask the instructor or get help from other students.</p>
                    {/* Q&A functionality would go here */}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Course Content Sidebar */}
          <div className="lg:w-1/4">
            <div className="card p-0 overflow-hidden sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold">Course Content</h3>
                <div className="text-sm text-gray-600 mt-1">
                  {course.sections.reduce((total, section) => total + section.lectures.length, 0)} lectures • {calculateTotalDuration(course)}
                </div>
              </div>
              
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {course.sections.map(section => (
                  <div key={section.id} className="border-b border-gray-200 last:border-b-0">
                    <button
                      className="w-full p-4 flex justify-between items-center hover:bg-gray-50 text-left"
                      onClick={() => setActiveSectionId(activeSectionId === section.id ? null : section.id)}
                    >
                      <h4 className="font-medium">{section.title}</h4>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${activeSectionId === section.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeSectionId === section.id && (
                      <div className="bg-gray-50">
                        {section.lectures.map(lecture => (
                          <button 
                            key={lecture.id}
                            onClick={() => handleLectureSelect(lecture, section.id)}
                            className={`w-full py-2 px-4 flex items-start text-left hover:bg-gray-100 ${activeLecture.id === lecture.id ? 'bg-primary/10' : ''}`}
                          >
                            <div className="flex-shrink-0 mt-1 mr-3">
                              {completion[lecture.id] ? (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              ) : activeLecture.id === lecture.id ? (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">
                                  <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${activeLecture.id === lecture.id ? 'text-primary font-medium' : 'text-gray-800'}`}>
                                {lecture.title}
                              </p>
                              <span className="text-xs text-gray-500">{formatDuration(lecture.duration)}</span>
                            </div>
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
      </div>
    </div>
  );
};

// Utility function to format duration from seconds to MM:SS or H:MM:SS
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate total course duration
const calculateTotalDuration = (course: Course): string => {
  let totalSeconds = 0;
  
  course.sections.forEach(section => {
    section.lectures.forEach(lecture => {
      totalSeconds += lecture.duration;
    });
  });
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

export default CoursePlayerPage; 