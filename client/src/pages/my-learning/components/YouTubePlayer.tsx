import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';

// React-player doesn't have proper TypeScript types
// Define the minimal interface we need
interface ReactPlayerInstance {
  seekTo: (amount: number, type?: 'seconds' | 'fraction') => void;
}

interface YouTubePlayerProps {
  videoUrl: string;
  title: string;
  onProgress?: (progress: { played: number; playedSeconds: number }) => void;
  onEnded?: () => void;
  initialTime?: number;
  onReady?: () => void;
  resolutions?: {
    label: string;
    width: number;
    height: number;
    url: string;
  }[];
  showNotes?: boolean;
  showMCQs?: boolean;
  showAssignments?: boolean;
  showResources?: boolean;
  notes?: Array<{id: string; content: string; timestamp: number}>;
  mcqs?: Array<{id: string; question: string; options: string[]; answer: number}>;
  assignments?: Array<{id: string; title: string; description: string; dueDate?: string}>;
  resources?: Array<{id: string; title: string; type: string; url: string}>;
  onAddNote?: (note: {content: string; timestamp: number}) => void;
  courseContent?: Array<{
    id: string;
    title: string;
    topics: Array<{
      id: string;
      title: string;
      duration: number;
      videoUrl: string;
      completed?: boolean;
    }>;
  }>;
  onTopicSelect?: (topicId: string, videoUrl: string) => void;
  currentTopicId?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  title,
  onProgress,
  onEnded,
  initialTime = 0,
  onReady,
  resolutions = [],
  showNotes = true,
  showMCQs = true,
  showAssignments = true,
  showResources = true,
  notes = [],
  mcqs = [],
  assignments = [],
  resources = [],
  onAddNote,
  courseContent = [],
  onTopicSelect,
  currentTopicId
}) => {
  const playerRef = useRef<ReactPlayerInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // New state variables for additional features
  const [activeTab, setActiveTab] = useState<'notes' | 'mcqs' | 'assignments' | 'resources' | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [localNotes, setLocalNotes] = useState(notes);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Effect to hide controls after a few seconds
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

  // Handle ready event
  const handleReady = () => {
    setIsReady(true);
    if (initialTime > 0 && playerRef.current) {
      playerRef.current.seekTo(initialTime, 'seconds');
    }
    if (onReady) onReady();
  };

  // Handle progress updates
  const handleProgress = (progress: { played: number; playedSeconds: number }) => {
    setPlayedSeconds(progress.playedSeconds);
    if (onProgress) onProgress(progress);
  };

  // Handle duration change
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
  };

  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds');
    }
    setPlayedSeconds(time);
  };

  // React Player URL config
  const config = {
    youtube: {
      playerVars: {
        modestbranding: 1,
        rel: 0,
      },
    },
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
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
  };

  // Toggle theater mode
  const toggleTheaterMode = () => {
    setIsTheaterMode(!isTheaterMode);
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle quality change
  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    setShowQualityOptions(false);
    // In a real implementation, this would change the video quality
  };

  // Toggle captions
  const toggleCaptions = () => {
    setIsCaptionsEnabled(!isCaptionsEnabled);
    setShowSettings(false);
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    
    const note = {
      id: `note-${Date.now()}`,
      content: newNote,
      timestamp: playedSeconds
    };
    
    setLocalNotes([...localNotes, note]);
    setNewNote('');
    
    if (onAddNote) {
      onAddNote({ content: newNote, timestamp: playedSeconds });
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full bg-black rounded-lg overflow-hidden ${isTheaterMode ? 'h-[80vh]' : ''}`}
    >
      {/* Video Container */}
      <div 
        className="relative h-full"
        onMouseEnter={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <div className={`${isTheaterMode ? 'h-full' : 'aspect-video'} bg-black flex items-center justify-center overflow-hidden`}>
          {/* @ts-ignore - ReactPlayer doesn't have proper TypeScript types */}
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            playbackRate={playbackRate}
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  cc_load_policy: isCaptionsEnabled ? 1 : 0,
                  playsinline: 1,
                  vq: 'hd1080',
                  showinfo: 0,
                  iv_load_policy: 3, // disable annotations
                  disablekb: 0, // enable keyboard controls
                },
              },
            }}
            onReady={handleReady}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onBuffer={() => setIsBuffering(true)}
            onBufferEnd={() => setIsBuffering(false)}
            onEnded={onEnded}
          />
        </div>

        {/* Loading overlay */}
        {(!isReady || isBuffering) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Title Bar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-medium truncate">{title}</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleTheaterMode} 
                className="p-2 text-white hover:text-indigo-400 transition-colors"
                title={isTheaterMode ? "Exit Theater Mode" : "Theater Mode"}
              >
                {isTheaterMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7zm3 4a1 1 0 100 2h4a1 1 0 100-2h-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Play/Pause overlay */}
        {!isPlaying && isReady && !isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            <motion.div 
              className="bg-indigo-600 bg-opacity-80 rounded-full p-5 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* Video controls */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2 group">
            <span className="text-white text-xs min-w-[40px]">{formatTime(playedSeconds)}</span>
            <div className="flex-grow relative h-2 group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step="any"
                value={playedSeconds}
                onChange={handleSeek}
                className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 bg-gray-600 rounded-full">
                <div 
                  className="h-full bg-indigo-600 rounded-full" 
                  style={{ width: `${(playedSeconds / (duration || 100)) * 100}%` }}
                ></div>
              </div>
              <div className="absolute inset-0 scale-y-50 group-hover:scale-y-100 transition-transform bg-gray-600/40 rounded-full">
                <div className="h-full w-0 bg-indigo-600/40 rounded-full"></div>
              </div>
            </div>
            <span className="text-white text-xs min-w-[40px]">{formatTime(duration)}</span>
          </div>

          {/* Control buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Play/Pause button */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-indigo-400 transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Volume controls */}
              <div className="flex items-center group relative">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-indigo-400 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 ml-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-white hover:text-indigo-400 transition-colors"
                  title="Settings"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-48"
                    >
                      <div className="p-2 border-b border-gray-700">
                        <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Playback Speed</p>
                        <div className="grid grid-cols-3 gap-1">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handlePlaybackRateChange(rate)}
                              className={`text-sm py-1 px-2 rounded ${
                                playbackRate === rate 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-gray-700">
                        <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Quality</p>
                        <div className="space-y-1">
                          {['1080p', '720p', '480p', '360p', 'Auto'].map((quality) => (
                            <button
                              key={quality}
                              onClick={() => handleQualityChange(quality)}
                              className={`block w-full text-left text-sm py-1 px-2 rounded ${
                                selectedQuality === quality 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={toggleCaptions}
                          className="flex items-center justify-between w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-700"
                        >
                          <span className="text-gray-300">Captions</span>
                          <span className={`w-8 h-4 rounded-full relative ${isCaptionsEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}>
                            <span 
                              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transform transition-transform ${
                                isCaptionsEnabled ? 'right-0.5' : 'left-0.5'
                              }`} 
                            />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quality Selector */}
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setShowQualityOptions(!showQualityOptions)}
                  className="p-2 text-white hover:text-indigo-400 transition-colors"
                  title="Quality"
                >
                  <span className="text-xs font-medium mr-0.5">{selectedQuality}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showQualityOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-24"
                    >
                      {['1080p', '720p', '480p', '360p', 'Auto'].map((quality) => (
                        <button
                          key={quality}
                          onClick={() => handleQualityChange(quality)}
                          className={`block w-full text-left text-sm py-1 px-2 ${
                            selectedQuality === quality 
                              ? 'bg-indigo-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {quality}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Playback rate */}
              <div className="relative group hidden sm:block">
                <button className="text-white text-xs font-medium px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                  {playbackRate}x
                </button>
                <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded shadow-lg transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all origin-bottom-right">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={`block w-full text-left px-3 py-1 text-xs ${
                        playbackRate === rate ? 'text-indigo-400' : 'text-white'
                      } hover:bg-gray-700 rounded`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Fullscreen button */}
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-white hover:text-indigo-400 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3zm7-1a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section - Notes, MCQs, Assignments, Resources */}
      <div className="mt-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setActiveTab(activeTab === 'notes' ? null : 'notes');
              setShowFeatures(activeTab !== 'notes' || !showFeatures);
            }}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === 'notes'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Notes
          </button>
          
          <button
            onClick={() => {
              setActiveTab(activeTab === 'mcqs' ? null : 'mcqs');
              setShowFeatures(activeTab !== 'mcqs' || !showFeatures);
            }}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === 'mcqs'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            MCQs
          </button>
          
          <button
            onClick={() => {
              setActiveTab(activeTab === 'assignments' ? null : 'assignments');
              setShowFeatures(activeTab !== 'assignments' || !showFeatures);
            }}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === 'assignments'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Assignments
          </button>
          
          <button
            onClick={() => {
              setActiveTab(activeTab === 'resources' ? null : 'resources');
              setShowFeatures(activeTab !== 'resources' || !showFeatures);
            }}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === 'resources'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Resources
          </button>
        </div>
        
        {showFeatures && (
          <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg shadow">
            {activeTab === 'notes' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notes</h3>
                
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note at current timestamp..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {localNotes.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No notes yet. Add your first note above.</p>
                  ) : (
                    localNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                            {formatTime(note.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200">{note.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'mcqs' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Multiple Choice Questions</h3>
                {mcqs.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No MCQs available for this video.</p>
                ) : (
                  <div className="space-y-4">
                    {mcqs.map((mcq) => (
                      <div key={mcq.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">{mcq.question}</p>
                        <div className="space-y-2">
                          {mcq.options.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                id={`${mcq.id}-option-${idx}`} 
                                name={`mcq-${mcq.id}`}
                                className="text-indigo-600"
                              />
                              <label 
                                htmlFor={`${mcq.id}-option-${idx}`}
                                className="text-gray-700 dark:text-gray-300"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'assignments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Assignments</h3>
                {assignments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No assignments available for this video.</p>
                ) : (
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-gray-800 dark:text-gray-200 font-medium mb-1">{assignment.title}</h4>
                        {assignment.dueDate && (
                          <p className="text-sm text-red-600 dark:text-red-400 mb-2">Due: {assignment.dueDate}</p>
                        )}
                        <p className="text-gray-700 dark:text-gray-300">{assignment.description}</p>
                        <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Resources</h3>
                {resources.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No resources available for this video.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer; 