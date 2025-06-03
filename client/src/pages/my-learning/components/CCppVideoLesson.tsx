import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CCppVideoPlayer from './CCppVideoPlayer';

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  completed: boolean;
  section: string;
  sectionId: string;
  order: number;
}

interface CCppVideoLessonProps {
  video: VideoData;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  nextVideo?: VideoData | null;
  prevVideo?: VideoData | null;
}

const CCppVideoLesson: React.FC<CCppVideoLessonProps> = ({
  video,
  onComplete,
  onNext,
  onPrevious,
  nextVideo,
  prevVideo
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toggle bookmark status
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real implementation, this would save to backend
  };
  
  // Dummy transcript data - would ideally be fetched based on the video
  const transcript = [
    { time: '0:00', text: 'In this lecture, we\'ll introduce the C programming language.' },
    { time: '0:15', text: 'C was developed in the early 1970s by Dennis Ritchie at Bell Labs.' },
    { time: '0:30', text: 'It was designed as a systems programming language for the Unix operating system.' },
    { time: '0:45', text: 'C is known for its efficiency, flexibility, and low-level memory access.' },
    { time: '1:00', text: 'Let\'s start by exploring the basic structure of a C program.' },
    { time: '1:15', text: 'Every C program must have a main function, which is the entry point of execution.' },
    { time: '1:30', text: 'Here\'s a simple "Hello, World!" program in C.' },
    { time: '1:45', text: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
    { time: '2:00', text: 'Let\'s break down each component of this program.' },
    { time: '2:15', text: 'The #include directive tells the compiler to include the stdio.h header file.' },
    { time: '2:30', text: 'The main function returns an integer value, which is the exit status of the program.' },
    { time: '2:45', text: 'The printf function is used to output text to the console.' },
    { time: '3:00', text: 'The return statement indicates successful execution of the program.' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Video player with improved controls */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <CCppVideoPlayer
          videoUrl={video.videoUrl}
          title={video.title}
          onComplete={onComplete}
        />
      </div>
      
      {/* Video info and navigation controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow p-5"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h1>
            <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {video.section}
              </span>
              <span className="mr-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Lesson {video.order}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {formatDuration(video.duration)}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full ${
                isBookmarked 
                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
              } hover:bg-opacity-80 transition-colors`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`p-2 rounded-full ${
                showTranscript 
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
              } hover:bg-opacity-80 transition-colors`}
              title={showTranscript ? "Hide Transcript" : "Show Transcript"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 3a1 1 0 100 2h12a1 1 0 100-2H4zm0 4a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
              </svg>
            </button>
            
            {!video.completed && onComplete && (
              <button
                onClick={onComplete}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Mark Complete
              </button>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
      </motion.div>
      
      {/* Video navigation */}
      <div className="flex justify-between items-center pt-2">
        <div>
          {prevVideo && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Previous: </span>
              <span className="truncate max-w-[100px] sm:max-w-[200px]">{prevVideo.title}</span>
            </button>
          )}
        </div>
        
        <div>
          {nextVideo && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors"
            >
              <span className="truncate max-w-[100px] sm:max-w-[200px]">{nextVideo.title}</span>
              <span className="hidden sm:inline">: Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Transcript (if enabled) */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 3a1 1 0 100 2h12a1 1 0 100-2H4zm0 4a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
                </svg>
                Lecture Transcript
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {transcript.map((item, index) => (
                  <div key={index} className="flex hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">{item.time}</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CCppVideoLesson; 