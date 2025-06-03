import React, { useState, useEffect, useRef, JSX } from 'react';

interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

interface InteractiveTranscriptProps {
  segments: TranscriptSegment[];
  currentTime: number;
  onSegmentClick: (startTime: number) => void;
  searchQuery?: string;
}

const InteractiveTranscript: React.FC<InteractiveTranscriptProps> = ({
  segments,
  currentTime,
  onSegmentClick,
  searchQuery = ''
}) => {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [highlightedSegments, setHighlightedSegments] = useState<string[]>([]);
  const activeSegmentRef = useRef<HTMLDivElement>(null);
  
  // Find the active segment based on current video time
  useEffect(() => {
    const activeSegment = segments.find(
      segment => currentTime >= segment.startTime && currentTime <= segment.endTime
    );
    
    if (activeSegment) {
      setActiveSegmentId(activeSegment.id);
    } else {
      setActiveSegmentId(null);
    }
  }, [currentTime, segments]);
  
  // Scroll to active segment
  useEffect(() => {
    if (activeSegmentId && activeSegmentRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeSegmentId]);
  
  // Handle search highlighting
  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightedSegments([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const matches = segments
      .filter(segment => segment.text.toLowerCase().includes(query))
      .map(segment => segment.id);
    
    setHighlightedSegments(matches);
  }, [searchQuery, segments]);
  
  const handleSegmentClick = (startTime: number) => {
    onSegmentClick(startTime);
  };
  
  // Get speaker color
  const getSpeakerColor = (speaker?: string): string => {
    if (!speaker) return 'bg-gray-600';
    
    // Simple hash function for consistent colors
    let hash = 0;
    for (let i = 0; i < speaker.length; i++) {
      hash = speaker.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 
      'bg-yellow-600', 'bg-red-600', 'bg-pink-600',
      'bg-indigo-600', 'bg-teal-600'
    ];
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  // Highlight search matches in text
  const highlightText = (text: string, query: string): JSX.Element => {
    if (!query.trim()) return <>{text}</>;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-300 dark:bg-yellow-800 text-black dark:text-white font-normal px-1 rounded">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-[500px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transcript</h3>
      
      {segments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <p className="mt-2 text-gray-600 dark:text-gray-400">No transcript available for this video</p>
        </div>
      ) : (
        <div className="space-y-4">
          {segments.map((segment) => {
            const isActive = segment.id === activeSegmentId;
            const isHighlighted = highlightedSegments.includes(segment.id);
            
            return (
              <div
                key={segment.id}
                ref={isActive ? activeSegmentRef : null}
                className={`p-3 rounded-lg cursor-pointer transition-colors border-l-4 ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500' 
                    : isHighlighted
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                      : 'bg-gray-50 dark:bg-gray-750 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleSegmentClick(segment.startTime)}
              >
                <div className="flex items-center mb-1">
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {formatTimestamp(segment.startTime)}
                  </div>
                  
                  {segment.speaker && (
                    <div className="ml-2 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 ${getSpeakerColor(segment.speaker)}`}></div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {segment.speaker}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-gray-800 dark:text-gray-200">
                  {searchQuery ? highlightText(segment.text, searchQuery) : segment.text}
                </div>
              </div>
            );
          })}
          
          {highlightedSegments.length > 0 && searchQuery && (
            <div className="sticky bottom-0 left-0 right-0 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm">
              Found {highlightedSegments.length} matches for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Format timestamp to MM:SS
const formatTimestamp = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default InteractiveTranscript; 