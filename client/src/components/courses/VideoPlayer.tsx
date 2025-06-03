import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  duration: number; // in seconds
  onTimeUpdate?: (currentTime: number) => void;
  initialTime?: number;
}

interface NoteType {
  id: string;
  content: string;
  timestamp: number;
  color: 'yellow' | 'blue' | 'green' | 'pink';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  duration,
  onTimeUpdate,
  initialTime = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState('');
  const [selectedNoteColor, setSelectedNoteColor] = useState<NoteType['color']>('yellow');
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle video seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };
  
  // Handle adding a new note
  const addNote = () => {
    if (newNote.trim() && videoRef.current) {
      const noteTimestamp = videoRef.current.currentTime;
      const newNoteItem: NoteType = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: noteTimestamp,
        color: selectedNoteColor,
      };
      setNotes(prevNotes => [...prevNotes, newNoteItem]);
      setNewNote('');
    }
  };
  
  // Jump to note timestamp
  const jumpToNoteTimestamp = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      if (!isPlaying) {
        togglePlay();
      }
    }
  };
  
  // Delete note
  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };
  
  // Handle time update event
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video) {
        setCurrentTime(video.currentTime);
        onTimeUpdate?.(video.currentTime);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('ended', handleEnded);
    
    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate]);
  
  // Set initial time when component mounts
  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime;
    }
  }, [initialTime]);
  
  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Handle auto-hide controls
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);
  
  return (
    <div className="w-full bg-neutral-900 rounded-lg overflow-hidden">
      {/* Video Container */}
      <div className="relative" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => isPlaying && setShowControls(false)}>
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          onClick={togglePlay}
          playsInline
        />
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button 
              onClick={togglePlay}
              className="bg-primary bg-opacity-80 rounded-full p-4 text-white"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </motion.div>
        )}
        
        {/* Video Controls */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Progress Bar */}
          <div className="flex items-center mb-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="text-white">
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Time Display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Playback Speed */}
              <div className="relative group">
                <button className="text-white text-sm">
                  {playbackRate}x
                </button>
                <div className="absolute bottom-full mb-2 right-0 bg-neutral-800 rounded p-1 hidden group-hover:block">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={`block px-3 py-1 text-sm text-white ${playbackRate === rate ? 'bg-primary rounded' : 'hover:bg-neutral-700 rounded'}`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add Note Button */}
              <button 
                onClick={() => videoRef.current?.pause()}
                className="text-white"
                title="Add Note"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              {/* Fullscreen Button */}
              <button onClick={toggleFullscreen} className="text-white">
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Notes Section */}
      <div className="bg-white p-4 rounded-b-lg">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note at current timestamp..."
            className="input flex-grow"
          />
          <div className="flex space-x-2">
            {(['yellow', 'blue', 'green', 'pink'] as const).map(color => (
              <button
                key={color}
                onClick={() => setSelectedNoteColor(color)}
                className={`w-6 h-6 rounded-full ${
                  color === 'yellow' ? 'bg-yellow-200' :
                  color === 'blue' ? 'bg-blue-200' :
                  color === 'green' ? 'bg-green-200' :
                  'bg-pink-200'
                } ${selectedNoteColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
              />
            ))}
          </div>
          <button 
            onClick={addNote}
            className="btn btn-primary"
            disabled={!newNote.trim()}
          >
            Add Note
          </button>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
        
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm">No notes yet. Add your first note while watching the video.</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {notes.map(note => (
              <div 
                key={note.id} 
                className={`p-3 rounded-lg ${
                  note.color === 'yellow' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                  note.color === 'blue' ? 'bg-blue-50 border-l-4 border-blue-400' :
                  note.color === 'green' ? 'bg-green-50 border-l-4 border-green-400' :
                  'bg-pink-50 border-l-4 border-pink-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm mb-1">{note.content}</p>
                    <button 
                      className="text-xs text-primary flex items-center"
                      onClick={() => jumpToNoteTimestamp(note.timestamp)}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      {formatTime(note.timestamp)}
                    </button>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-error"
                    onClick={() => deleteNote(note.id)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer; 