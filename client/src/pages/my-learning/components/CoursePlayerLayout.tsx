import React, { useState, useEffect } from 'react';
import YouTubePlayer from './YouTubePlayer';

interface Topic {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  completed?: boolean;
}

interface CourseSection {
  id: string;
  title: string;
  topics: Topic[];
}

interface CoursePlayerLayoutProps {
  title: string;
  courseSections: CourseSection[];
  initialTopicId?: string;
  onTopicComplete?: (topicId: string) => void;
  notes?: Array<{id: string; content: string; timestamp: number}>;
  mcqs?: Array<{id: string; question: string; options: string[]; answer: number}>;
  assignments?: Array<{id: string; title: string; description: string; dueDate?: string}>;
  resources?: Array<{id: string; title: string; type: string; url: string}>;
  onAddNote?: (note: {content: string; timestamp: number; topicId: string}) => void;
}

const CoursePlayerLayout: React.FC<CoursePlayerLayoutProps> = ({
  title,
  courseSections,
  initialTopicId,
  onTopicComplete,
  notes = [],
  mcqs = [],
  assignments = [],
  resources = [],
  onAddNote
}) => {
  // Find the first topic if no initialTopicId is provided
  const findFirstTopic = (): Topic | undefined => {
    if (courseSections.length > 0 && courseSections[0].topics.length > 0) {
      return courseSections[0].topics[0];
    }
    return undefined;
  };

  // Find a topic by its ID
  const findTopicById = (topicId: string): Topic | undefined => {
    for (const section of courseSections) {
      const topic = section.topics.find(t => t.id === topicId);
      if (topic) return topic;
    }
    return undefined;
  };

  // State
  const [currentTopic, setCurrentTopic] = useState<Topic | undefined>(
    initialTopicId ? findTopicById(initialTopicId) : findFirstTopic()
  );
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    // Initially expand all sections
    courseSections.reduce((acc, section) => {
      acc[section.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [playbackPosition, setPlaybackPosition] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'mcqs' | 'assignments' | 'resources'>('content');
  
  // Format time (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle topic selection
  const handleTopicSelect = (topic: Topic) => {
    setCurrentTopic(topic);
    // The video URL change will happen automatically since we pass it to YouTubePlayer
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Handle video progress
  const handleVideoProgress = (progress: { played: number; playedSeconds: number }) => {
    if (currentTopic) {
      setPlaybackPosition(prev => ({
        ...prev,
        [currentTopic.id]: progress.playedSeconds
      }));
    }
  };

  // Handle video completion
  const handleVideoEnd = () => {
    if (currentTopic && onTopicComplete) {
      onTopicComplete(currentTopic.id);
    }

    // Auto-navigate to next topic
    if (currentTopic) {
      let foundCurrentTopic = false;
      let nextTopic: Topic | undefined;
      
      for (const section of courseSections) {
        for (let i = 0; i < section.topics.length; i++) {
          if (foundCurrentTopic) {
            nextTopic = section.topics[i];
            break;
          }
          if (section.topics[i].id === currentTopic.id) {
            foundCurrentTopic = true;
            // Check if there's a next topic in this section
            if (i < section.topics.length - 1) {
              nextTopic = section.topics[i + 1];
              break;
            }
          }
        }
        if (nextTopic) break;
      }

      if (nextTopic) {
        setCurrentTopic(nextTopic);
      }
    }
  };

  // Handle adding a note for the current topic
  const handleAddNote = (note: {content: string; timestamp: number}) => {
    if (currentTopic && onAddNote) {
      onAddNote({
        ...note,
        topicId: currentTopic.id
      });
    }
  };

  // Filter notes, mcqs, etc. for the current topic
  const topicNotes = currentTopic ? notes.filter(note => note.id.includes(currentTopic.id)) : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Left side - Video Player */}
      <div className="lg:w-2/3">
        {currentTopic && (
          <div className="bg-black rounded-lg overflow-hidden">
            <YouTubePlayer
              videoUrl={currentTopic.videoUrl}
              title={currentTopic.title}
              initialTime={playbackPosition[currentTopic.id] || 0}
              onProgress={handleVideoProgress}
              onEnded={handleVideoEnd}
              notes={topicNotes}
              mcqs={mcqs}
              assignments={assignments}
              resources={resources}
              onAddNote={handleAddNote}
            />
          </div>
        )}
      </div>

      {/* Right side - Course Content and Tabs */}
      <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'content'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Course Content
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'notes'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'resources'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Resources
          </button>
        </div>

        {/* Tab Content */}
        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
          {/* Course Content Tab */}
          {activeTab === 'content' && (
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
              
              {courseSections.map((section) => (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">{section.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {section.topics.length} lessons
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${expandedSections[section.id] ? 'transform rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                  
                  {expandedSections[section.id] && (
                    <div className="mt-2 space-y-1 pl-2">
                      {section.topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicSelect(topic)}
                          className={`flex items-center w-full p-3 rounded-lg text-left ${
                            currentTopic?.id === topic.id
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                              : 'hover:bg-gray-50 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="flex-1 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              topic.completed
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                : currentTopic?.id === topic.id
                                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {topic.completed ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : currentTopic?.id === topic.id ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium truncate">{topic.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(topic.duration)}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Notes</h2>
              
              {notes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No notes yet. Add notes while watching the videos.</p>
              ) : (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                          {formatTime(note.timestamp)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {findTopicById(note.id.split('-')[0])?.title || 'Unknown topic'}
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Resources</h2>
              
              {resources.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No resources available for this course.</p>
              ) : (
                <div className="grid gap-4">
                  {resources.map((resource) => (
                    <a 
                      key={resource.id} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-3"
                    >
                      <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                        {resource.type === 'pdf' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'link' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'code' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="text-gray-800 dark:text-gray-200 font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{resource.type}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerLayout; 