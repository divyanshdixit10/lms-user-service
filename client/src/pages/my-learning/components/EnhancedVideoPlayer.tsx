import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoNote {
  id: string;
  timestamp: number;
  text: string;
  color: string;
}

interface VideoResolution {
  label: string;
  width: number;
  height: number;
  url: string;
}

interface EnhancedVideoPlayerProps {
  title: string;
  videoUrl: string;
  poster: string;
  onTimeUpdate?: (currentTime: number) => void;
  initialTime?: number;
  subtitlesUrl?: string;
  onComplete?: () => void;
  resolutions?: VideoResolution[];
}

const EnhancedVideoPlayer: React.FC<EnhancedVideoPlayerProps> = ({
  title,
  videoUrl,
  poster,
  onTimeUpdate,
  initialTime = 0,
  subtitlesUrl,
  onComplete,
  resolutions = []
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [notes, setNotes] = useState<VideoNote[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteColor, setNewNoteColor] = useState('#FFD700');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [showThumbnailPreview, setShowThumbnailPreview] = useState(false);
  const [currentResolution, setCurrentResolution] = useState<VideoResolution | null>(null);
  const [showResolutionOptions, setShowResolutionOptions] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  
  // Initialize resolution
  useEffect(() => {
    if (resolutions.length > 0) {
      // Find HD or the highest resolution available
      const hdResolution = resolutions.find(r => r.width === 1920 && r.height === 1080);
      setCurrentResolution(hdResolution || resolutions[resolutions.length - 1]);
    }
  }, [resolutions]);
  
  // Hide controls timeout
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isPlaying, showControls]);
  
  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = initialTime;
      
      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      };
      
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [initialTime, videoUrl]);
  
  // Change resolution
  const changeResolution = (resolution: VideoResolution) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      
      setCurrentResolution(resolution);
      
      // Re-initialize video with new resolution URL
      videoRef.current.src = resolution.url;
      videoRef.current.load();
      
      // Once loaded, restore playback state
      videoRef.current.onloadeddata = () => {
        videoRef.current!.currentTime = currentTime;
        if (wasPlaying) {
          videoRef.current!.play();
        }
      };
    }
  };
  
  // Toggle play/pause
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
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      if (onTimeUpdate) {
        onTimeUpdate(time);
      }
      
      // Check if video completed
      if (time >= duration - 0.5 && onComplete) {
        onComplete();
      }
    }
  };
  
  // Format time to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Seek in video
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const seekTime = pos * duration;
      
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  // Handle progress bar hover
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      setHoveredTime(pos * duration);
      setShowThumbnailPreview(true);
    }
  };
  
  // Handle progress bar mouse leave
  const handleProgressLeave = () => {
    setHoveredTime(null);
    setShowThumbnailPreview(false);
  };
  
  // Change volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };
  
  // Change playback rate
  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.error('Error attempting to exit fullscreen:', err);
        });
      }
    }
  };
  
  // Add note at current timestamp
  const addNote = () => {
    if (newNoteText.trim() === '') return;
    
    const newNote: VideoNote = {
      id: `note-${Date.now()}`,
      timestamp: currentTime,
      text: newNoteText,
      color: newNoteColor
    };
    
    setNotes([...notes, newNote]);
    setNewNoteText('');
    setShowAddNote(false);
  };
  
  // Seek to note timestamp
  const seekToNote = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };
  
  // Delete note
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  // Get marker position for a note
  const getNotePosition = (timestamp: number): string => {
    return `${(timestamp / duration) * 100}%`;
  };
  
  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group shadow-xl dark:shadow-indigo-900/20"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        src={currentResolution?.url || videoUrl}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
      >
        {subtitlesUrl && (
          <track 
            src={subtitlesUrl} 
            kind="subtitles" 
            srcLang="en" 
            label="English" 
            default={showSubtitles} 
          />
        )}
      </video>
      
      {/* Centered Play Button (visible when paused) */}
      {!isPlaying && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-indigo-600/30 backdrop-blur-md p-5 rounded-full hover:bg-indigo-600/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>
      )}
      
      {/* Video Title with dark gradient background */}
      <div 
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-white text-xl font-semibold truncate">{title}</h3>
      </div>
      
      {/* Video Controls with better dark gradient */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 pt-20 pb-3 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar and timestamp markers */}
        <div className="relative h-6 mb-1">
          {/* Note markers */}
          {showNotes && notes.map((note) => (
            <div
              key={note.id}
              className="absolute w-2 h-2 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 bottom-1/2 shadow-glow"
              style={{ 
                left: getNotePosition(note.timestamp),
                backgroundColor: note.color,
                boxShadow: `0 0 4px ${note.color}`
              }}
              onClick={() => seekToNote(note.timestamp)}
              title={note.text}
            ></div>
          ))}
          
          {/* Thumbnail preview on hover */}
          {showThumbnailPreview && hoveredTime !== null && (
            <div 
              className="absolute bottom-full mb-2 bg-gray-900/95 backdrop-blur-sm rounded-md p-2 transform -translate-x-1/2 border border-gray-700"
              style={{ left: `${(hoveredTime / duration) * 100}%` }}
            >
              <div className="text-white text-xs font-mono mb-1 text-center">
                {formatTime(hoveredTime)}
              </div>
              {/* This could be a real thumbnail if you have thumbnail generation */}
              <div className="w-32 h-18 bg-gray-800 flex items-center justify-center rounded">
                <span className="text-gray-400 text-xs">Preview</span>
              </div>
            </div>
          )}
          
          {/* Progress bar with better colors */}
          <div 
            ref={progressBarRef}
            className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700/80 rounded-full cursor-pointer transition-all hover:h-3"
            onClick={handleSeek}
            onMouseMove={handleProgressHover}
            onMouseLeave={handleProgressLeave}
          >
            <div 
              className="h-full bg-indigo-600 rounded-full relative overflow-hidden"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <div className="absolute right-0 -top-1 w-4 h-4 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
            </div>
          </div>
        </div>
        
        {/* Controls row with improved buttons */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            
            {/* Volume control - enhanced */}
            <div className="flex items-center">
              <button onClick={toggleMute} className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all">
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : volume > 0.5 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <div className="w-20 ml-2 hidden sm:block">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-indigo-500 bg-gray-700 h-1 rounded-full appearance-none"
                  style={{
                    background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
            
            {/* Time Display - enhanced */}
            <div className="text-white text-sm font-mono bg-gray-800/50 px-2 py-0.5 rounded">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Add Note Button */}
            <button 
              onClick={() => setShowAddNote(!showAddNote)} 
              className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all"
              title="Add Note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            {/* Toggle Notes Visibility */}
            <button 
              onClick={() => setShowNotes(!showNotes)} 
              className={`focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all ${showNotes ? 'text-indigo-400' : 'text-white hover:text-indigo-300'}`}
              title="Toggle Notes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            
            {/* Toggle Subtitles */}
            {subtitlesUrl && (
              <button 
                onClick={() => setShowSubtitles(!showSubtitles)} 
                className={`focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all ${showSubtitles ? 'text-indigo-400' : 'text-white hover:text-indigo-300'}`}
                title="Toggle Subtitles"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3.5" />
                </svg>
              </button>
            )}
            
            {/* Resolution Selector - enhanced with dark theme */}
            {resolutions.length > 0 && (
              <div className="relative">
                <button 
                  className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 text-sm font-mono bg-gray-800/50 transition-colors"
                  onMouseEnter={() => setShowResolutionOptions(true)}
                  onMouseLeave={() => setShowResolutionOptions(false)}
                >
                  {currentResolution ? `${currentResolution.height}p` : 'Auto'}
                </button>
                {showResolutionOptions && (
                  <div 
                    className="absolute right-0 bottom-full mb-2 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg p-2 w-32 z-50 border border-gray-700"
                    onMouseEnter={() => setShowResolutionOptions(true)}
                    onMouseLeave={() => setShowResolutionOptions(false)}
                  >
                    {resolutions.map(resolution => (
                      <button
                        key={`${resolution.width}x${resolution.height}`}
                        className={`block w-full text-left px-2 py-1 text-sm rounded ${
                          currentResolution?.width === resolution.width && currentResolution?.height === resolution.height
                            ? 'bg-indigo-600 text-white' 
                            : 'text-white hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          changeResolution(resolution);
                          setShowResolutionOptions(false);
                        }}
                      >
                        {resolution.label || `${resolution.height}p`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Playback Speed - enhanced with dark theme */}
            <div className="relative">
              <button 
                className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 text-sm font-mono bg-gray-800/50 transition-colors"
                onMouseEnter={() => setShowSpeedOptions(true)}
                onMouseLeave={() => setShowSpeedOptions(false)}
              >
                {playbackRate}x
              </button>
              {showSpeedOptions && (
                <div 
                  className="absolute right-0 bottom-full mb-2 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg p-2 w-24 z-50 border border-gray-700"
                  onMouseEnter={() => setShowSpeedOptions(true)}
                  onMouseLeave={() => setShowSpeedOptions(false)}
                >
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3].map(rate => (
                    <button
                      key={rate}
                      className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                        playbackRate === rate 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-white hover:bg-indigo-500/30'
                      }`}
                      onClick={() => handlePlaybackRateChange(rate)}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1 transition-all"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4H4v5h5zm0 6H4v5h5v-5zm6 0v5h5v-5h-5zm5-6h-5V4h5v5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Add Note Form - enhanced dark theme */}
      {showAddNote && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-4 right-4 bg-gray-900/95 backdrop-blur-md rounded-lg p-4 border border-gray-700 shadow-xl"
        >
          <h4 className="text-white text-sm font-semibold mb-2">Add note at {formatTime(currentTime)}</h4>
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Enter your note here..."
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            rows={2}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-white text-xs">Color:</span>
              {['#FFD700', '#7CFC00', '#FF6347', '#00BFFF', '#FF1493'].map(color => (
                <button
                  key={color}
                  className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${newNoteColor === color ? 'ring-2 ring-white' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewNoteColor(color)}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowAddNote(false)}
                className="px-3 py-1 text-sm text-white hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={addNote}
                disabled={newNoteText.trim() === ''}
                className={`px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors ${newNoteText.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Save Note
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Notes Panel - enhanced dark theme */}
      {showNotes && notes.length > 0 && (
        <div 
          ref={notesRef}
          className="absolute top-24 right-4 w-72 bg-gray-900/95 backdrop-blur-md rounded-lg p-4 border border-gray-700 max-h-64 overflow-y-auto shadow-xl"
        >
          <h4 className="text-white text-sm font-semibold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Video Notes
          </h4>
          <div className="space-y-2">
            {notes.sort((a, b) => a.timestamp - b.timestamp).map(note => (
              <div 
                key={note.id} 
                className="bg-gray-800 rounded-md p-2 flex items-start border-l-4 shadow-inner hover:bg-gray-750 transition-colors"
                style={{ borderLeftColor: note.color }}
              >
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-gray-300 text-xs font-mono cursor-pointer hover:text-indigo-400 flex items-center"
                    onClick={() => seekToNote(note.timestamp)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(note.timestamp)}
                  </div>
                  <p className="text-white text-sm mt-1">{note.text}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500 ml-2 transition-colors rounded-full hover:bg-gray-700 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedVideoPlayer; 