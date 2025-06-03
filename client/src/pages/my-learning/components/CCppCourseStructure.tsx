import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lecture {
  id: string;
  title: string;
  videoUrl: string;
  duration: number; // in minutes
  completed?: boolean;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
  expanded?: boolean;
}

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

interface CCppCourseStructureProps {
  onSelectLecture?: (lectureId: string) => void;
  currentLectureId?: string;
  externalSections?: Section[];
  videos: VideoData[];
  sections: { id: string; title: string; order: number }[];
  activeVideoId: string;
  onSelectVideo: (video: VideoData) => void;
}

const CCppCourseStructure: React.FC<CCppCourseStructureProps> = ({ 
  onSelectLecture, 
  currentLectureId,
  externalSections,
  videos,
  sections,
  activeVideoId,
  onSelectVideo
}) => {
  // Define course sections and lectures with the 50 videos
  const defaultCourseSections: Section[] = [
    {
      id: 'section1',
      title: 'Introduction to C Programming',
      lectures: [
        {
          id: 'lec1_1',
          title: 'Introduction to C Programming',
          videoUrl: 'https://www.youtube.com/watch?v=HspM4qB8U0s',
          duration: 15,
          completed: true
        },
        {
          id: 'lec1_2',
          title: 'Setting Up Your Development Environment',
          videoUrl: 'https://www.youtube.com/watch?v=nYiKufR2LVc',
          duration: 12,
          completed: true
        },
        {
          id: 'lec1_3',
          title: 'Understanding C Program Structure',
          videoUrl: 'https://www.youtube.com/watch?v=-K9oyqqcl8s',
          duration: 18,
          completed: true
        },
        {
          id: 'lec1_4',
          title: 'Variables and Data Types',
          videoUrl: 'https://www.youtube.com/watch?v=IYd6jH33tY8',
          duration: 22,
          completed: false
        },
        {
          id: 'lec1_5',
          title: 'Input and Output Basics',
          videoUrl: 'https://www.youtube.com/watch?v=WwRSJV9oDF4',
          duration: 14,
          completed: false
        }
      ],
      expanded: true
    },
    {
      id: 'section2',
      title: 'Control Flow in C',
      lectures: [
        {
          id: 'lec2_1',
          title: 'Conditional Statements (if-else)',
          videoUrl: 'https://www.youtube.com/watch?v=ZEULHT823ak',
          duration: 16,
          completed: false
        },
        {
          id: 'lec2_2',
          title: 'Switch Case Statements',
          videoUrl: 'https://www.youtube.com/watch?v=XUJE3SETgYw',
          duration: 13,
          completed: false
        },
        {
          id: 'lec2_3',
          title: 'Loops in C (for, while, do-while)',
          videoUrl: 'https://www.youtube.com/watch?v=BBRXBQXU3jw',
          duration: 20,
          completed: false
        },
        {
          id: 'lec2_4',
          title: 'Break and Continue Statements',
          videoUrl: 'https://www.youtube.com/watch?v=rYaHi01ffsc',
          duration: 11,
          completed: false
        },
        {
          id: 'lec2_5',
          title: 'Nested Loops and Control Structures',
          videoUrl: 'https://www.youtube.com/watch?v=mGvN0p9GapE',
          duration: 18,
          completed: false
        }
      ]
    },
    {
      id: 'section3',
      title: 'Functions and Modular Programming',
      lectures: [
        {
          id: 'lec3_1',
          title: 'Introduction to Functions',
          videoUrl: 'https://www.youtube.com/watch?v=Qg7Ez51HanM',
          duration: 17,
          completed: false
        },
        {
          id: 'lec3_2',
          title: 'Function Parameters and Return Values',
          videoUrl: 'https://www.youtube.com/watch?v=WEo_XDOvXZ4',
          duration: 19,
          completed: false
        },
        {
          id: 'lec3_3',
          title: 'Recursion in C',
          videoUrl: 'https://www.youtube.com/watch?v=RJjb2cq145k',
          duration: 22,
          completed: false
        },
        {
          id: 'lec3_4',
          title: 'Storage Classes in C',
          videoUrl: 'https://www.youtube.com/watch?v=SIERpBmdeEY',
          duration: 15,
          completed: false
        },
        {
          id: 'lec3_5',
          title: 'Header Files and Modular Programming',
          videoUrl: 'https://www.youtube.com/watch?v=TBVK2BdbYfU',
          duration: 20,
          completed: false
        }
      ]
    },
    {
      id: 'section4',
      title: 'Arrays and Strings',
      lectures: [
        {
          id: 'lec4_1',
          title: 'Introduction to Arrays',
          videoUrl: 'https://www.youtube.com/watch?v=bJk8llXVwvo',
          duration: 16,
          completed: false
        },
        {
          id: 'lec4_2',
          title: 'Multidimensional Arrays',
          videoUrl: 'https://www.youtube.com/watch?v=TInH3dkQuBg',
          duration: 18,
          completed: false
        },
        {
          id: 'lec4_3',
          title: 'String Handling in C',
          videoUrl: 'https://www.youtube.com/watch?v=kw6vjui4LOM',
          duration: 21,
          completed: false
        },
        {
          id: 'lec4_4',
          title: 'String Functions in C',
          videoUrl: 'https://www.youtube.com/watch?v=FYBGCkiNt1g',
          duration: 19,
          completed: false
        },
        {
          id: 'lec4_5',
          title: 'Array Sorting and Searching Algorithms',
          videoUrl: 'https://www.youtube.com/watch?v=1cQ43n5QXlE',
          duration: 24,
          completed: false
        }
      ]
    },
    {
      id: 'section5',
      title: 'Pointers and Memory Management',
      lectures: [
        {
          id: 'lec5_1',
          title: 'Introduction to Pointers',
          videoUrl: 'https://www.youtube.com/watch?v=dOuNSW9Bqkw',
          duration: 22,
          completed: false
        },
        {
          id: 'lec5_2',
          title: 'Pointers and Arrays',
          videoUrl: 'https://www.youtube.com/watch?v=JUhO2A3NFlE',
          duration: 19,
          completed: false
        },
        {
          id: 'lec5_3',
          title: 'Dynamic Memory Allocation',
          videoUrl: 'https://www.youtube.com/watch?v=hg3nbdyk3Xo',
          duration: 23,
          completed: false
        },
        {
          id: 'lec5_4',
          title: 'Memory Management Best Practices',
          videoUrl: 'https://www.youtube.com/watch?v=50JkN2y453U',
          duration: 18,
          completed: false
        },
        {
          id: 'lec5_5',
          title: 'Common Memory Issues and Debugging',
          videoUrl: 'https://www.youtube.com/watch?v=S1NbDI5E48k',
          duration: 20,
          completed: false
        }
      ]
    },
    {
      id: 'section6',
      title: 'Structures and Unions',
      lectures: [
        {
          id: 'lec6_1',
          title: 'Introduction to Structures',
          videoUrl: 'https://www.youtube.com/watch?v=hqG7ncGUWFM',
          duration: 17,
          completed: false
        },
        {
          id: 'lec6_2',
          title: 'Nested Structures and Arrays of Structures',
          videoUrl: 'https://www.youtube.com/watch?v=XdLr6QP7hwc',
          duration: 19,
          completed: false
        },
        {
          id: 'lec6_3',
          title: 'Pointers to Structures',
          videoUrl: 'https://www.youtube.com/watch?v=9MIT51WWU_A',
          duration: 16,
          completed: false
        },
        {
          id: 'lec6_4',
          title: 'Unions in C',
          videoUrl: 'https://www.youtube.com/watch?v=EEKzIslZ5sY',
          duration: 14,
          completed: false
        },
        {
          id: 'lec6_5',
          title: 'Typedef and Enumerated Types',
          videoUrl: 'https://www.youtube.com/watch?v=TThcNNSGmCI',
          duration: 18,
          completed: false
        }
      ]
    },
    {
      id: 'section7',
      title: 'File Handling in C',
      lectures: [
        {
          id: 'lec7_1',
          title: 'Introduction to File Handling',
          videoUrl: 'https://www.youtube.com/watch?v=UnKRgXK-ZJw',
          duration: 18,
          completed: false
        },
        {
          id: 'lec7_2',
          title: 'Reading and Writing Text Files',
          videoUrl: 'https://www.youtube.com/watch?v=Z9SlKleTFXI',
          duration: 20,
          completed: false
        },
        {
          id: 'lec7_3',
          title: 'Binary File Operations',
          videoUrl: 'https://www.youtube.com/watch?v=_m5hVCP2RnI',
          duration: 22,
          completed: false
        },
        {
          id: 'lec7_4',
          title: 'Random Access File Operations',
          videoUrl: 'https://www.youtube.com/watch?v=l5HlubjFUlg',
          duration: 19,
          completed: false
        },
        {
          id: 'lec7_5',
          title: 'Error Handling in File Operations',
          videoUrl: 'https://www.youtube.com/watch?v=G7Z_E-z1l4Y',
          duration: 16,
          completed: false
        }
      ]
    },
    {
      id: 'section8',
      title: 'Introduction to C++',
      lectures: [
        {
          id: 'lec8_1',
          title: 'C++ Overview and Differences from C',
          videoUrl: 'https://www.youtube.com/watch?v=ylOSx4d3C7A',
          duration: 21,
          completed: false
        },
        {
          id: 'lec8_2',
          title: 'C++ Development Environment Setup',
          videoUrl: 'https://www.youtube.com/watch?v=h1nlHQoGKV4',
          duration: 15,
          completed: false
        },
        {
          id: 'lec8_3',
          title: 'Object-Oriented Programming Concepts',
          videoUrl: 'https://www.youtube.com/watch?v=pgEGhtPYcic',
          duration: 24,
          completed: false
        },
        {
          id: 'lec8_4',
          title: 'C++ Input/Output Streams',
          videoUrl: 'https://www.youtube.com/watch?v=4DcKPDxDIPY',
          duration: 18,
          completed: false
        },
        {
          id: 'lec8_5',
          title: 'C++ String Class and Operations',
          videoUrl: 'https://www.youtube.com/watch?v=7elChkEiGnE',
          duration: 19,
          completed: false
        }
      ]
    },
    {
      id: 'section9',
      title: 'C++ Classes and Objects',
      lectures: [
        {
          id: 'lec9_1',
          title: 'Classes and Objects Fundamentals',
          videoUrl: 'https://www.youtube.com/watch?v=_qSSooJHoFA',
          duration: 22,
          completed: false
        },
        {
          id: 'lec9_2',
          title: 'Constructors and Destructors',
          videoUrl: 'https://www.youtube.com/watch?v=I-MxTa6qY6c',
          duration: 20,
          completed: false
        },
        {
          id: 'lec9_3',
          title: 'Access Modifiers and Encapsulation',
          videoUrl: 'https://www.youtube.com/watch?v=rRaICURDeBI',
          duration: 18,
          completed: false
        },
        {
          id: 'lec9_4',
          title: 'Member Functions and Friend Functions',
          videoUrl: 'https://www.youtube.com/watch?v=5IgSpS-vQbs',
          duration: 21,
          completed: false
        },
        {
          id: 'lec9_5',
          title: 'Static Members and Constant Members',
          videoUrl: 'https://www.youtube.com/watch?v=5Zs-gZZDaTo',
          duration: 19,
          completed: false
        }
      ]
    },
    {
      id: 'section10',
      title: 'Advanced C++ Concepts',
      lectures: [
        {
          id: 'lec10_1',
          title: 'Inheritance and Polymorphism',
          videoUrl: 'https://www.youtube.com/watch?v=sSO1CUB6HPk',
          duration: 25,
          completed: false
        },
        {
          id: 'lec10_2',
          title: 'Exception Handling',
          videoUrl: 'https://www.youtube.com/watch?v=k4BjmyyYakA',
          duration: 20,
          completed: false
        },
        {
          id: 'lec10_3',
          title: 'Templates and Generic Programming',
          videoUrl: 'https://www.youtube.com/watch?v=i2R2EFU2DRE',
          duration: 23,
          completed: false
        },
        {
          id: 'lec10_4',
          title: 'STL (Standard Template Library)',
          videoUrl: 'https://www.youtube.com/watch?v=eXyRxTsdkHE',
          duration: 26,
          completed: false
        },
        {
          id: 'lec10_5',
          title: 'Modern C++ Features and Best Practices',
          videoUrl: 'https://www.youtube.com/watch?v=sYUSAjjs8k0',
          duration: 28,
          completed: false
        }
      ]
    }
  ];

  // Use the sections and videos props when available, otherwise use defaults
  const [courseSections, setCourseSections] = useState<Section[]>(
    externalSections || defaultCourseSections
  );
  
  // Add a useEffect to organize videos by section when using the video/sections props
  useEffect(() => {
    if (videos && sections) {
      // Create a mapping of sections with their videos
      const organizedSections = sections.map(section => {
        const sectionVideos = videos
          .filter(video => video.sectionId === section.id)
          .map(video => ({
            id: video.id,
            title: video.title,
            videoUrl: video.videoUrl,
            duration: Math.floor(video.duration / 60), // Convert seconds to minutes
            completed: video.completed
          }));
        
        return {
          id: section.id,
          title: section.title,
          lectures: sectionVideos,
          expanded: true // Default to expanded
        };
      });
      
      setCourseSections(organizedSections);
    }
  }, [videos, sections]);

  // State to manage expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>(['section1']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSections, setFilteredSections] = useState<Section[]>(courseSections);

  // Calculate course progress
  const totalLectures = courseSections.flatMap(section => section.lectures).length;
  const completedLectures = courseSections.flatMap(section => section.lectures).filter(lecture => lecture.completed).length;
  const progressPercentage = Math.round((completedLectures / totalLectures) * 100);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredSections(courseSections);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = courseSections.map(section => {
      const filteredLectures = section.lectures.filter(lecture => 
        lecture.title.toLowerCase().includes(query)
      );
      
      return {
        ...section,
        lectures: filteredLectures
      };
    }).filter(section => section.lectures.length > 0);

    setFilteredSections(filtered);
    
    // Auto-expand sections with search results
    const sectionsWithResults = filtered.map(section => section.id);
    setExpandedSections(sectionsWithResults);
  }, [searchQuery]);

  // Handle lecture selection
  const handleLectureClick = (sectionId: string, lectureId: string) => {
    // Find the selected video from the videos array
    const selectedVideo = videos?.find(v => v.id === lectureId);
    
    if (selectedVideo && onSelectVideo) {
      onSelectVideo(selectedVideo);
    } else if (onSelectLecture) {
      onSelectLecture(lectureId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header with Progress Bar */}
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">C/C++ Programming</h2>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          {completedLectures} of {totalLectures} lectures completed
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lectures..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Course Sections and Lectures */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-220px)] overflow-y-auto">
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">No lectures match your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredSections.map((section) => (
            <div key={section.id} className="border-0 border-l-4 border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform mr-3 ${
                      expandedSections.includes(section.id) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">
                    {section.lectures.filter(l => l.completed).length}/{section.lectures.length}
                  </span>
                  <span className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <span 
                      className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full block transition-all duration-300" 
                      style={{ 
                        width: `${(section.lectures.filter(l => l.completed).length / section.lectures.length) * 100}%` 
                      }}
                    ></span>
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800/50">
                      {section.lectures.map((lecture, idx) => (
                        <motion.button
                          key={lecture.id}
                          onClick={() => handleLectureClick(section.id, lecture.id)}
                          className={`flex items-center w-full py-3 px-4 pl-12 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            (activeVideoId || currentLectureId) === lecture.id
                              ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500'
                              : 'border-l-4 border-transparent'
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className={`mr-3 flex-shrink-0 ${
                            lecture.completed ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                          }`}>
                            {lecture.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <div className="text-sm text-gray-900 dark:text-white truncate">
                              {lecture.title}
                            </div>
                          </div>
                          <div className="ml-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {lecture.duration} min
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
      
      {/* Course Details Footer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex justify-between items-center">
          <span>50 lectures • 19 hours total</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last updated: June 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCppCourseStructure; 