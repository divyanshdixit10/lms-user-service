import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Add TypeScript declarations for YouTube Player API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: HTMLDivElement | string,
        options: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            rel?: number;
            showinfo?: number;
            modestbranding?: number;
            playsinline?: number;
            enablejsapi?: number;
            origin?: string;
            iv_load_policy?: number;
            disablekb?: number;
          };
          events?: {
            onReady?: (event: YT.PlayerEvent) => void;
            onStateChange?: (event: YT.OnStateChangeEvent) => void;
            onError?: (event: any) => void;
          };
        }
      ) => YT.Player;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

// Add YouTube namespace declaration
declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoLoadedFraction(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setPlaybackRate(rate: number): void;
    getPlaybackRate(): number;
    setPlaybackQuality(quality: string): void;
    getPlaybackQuality(): string;
    destroy(): void;
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent {
    target: Player;
    data: number;
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }
}

interface CCppVideoPlayerProps {
  videoUrl: string;
  title: string;
  onComplete?: () => void;
}

const CCppVideoPlayer: React.FC<CCppVideoPlayerProps> = ({ 
  videoUrl, 
  title,
  onComplete 
}) => {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };
  
  const videoId = getYouTubeId(videoUrl);
  
  // Load YouTube API
  useEffect(() => {
    // Create YouTube script if it doesn't exist
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    
    // Keep track of our initialization attempts
    let initializationAttempts = 0;
    const maxAttempts = 5;
    
    // Initialize player when API is ready
    const initializePlayer = () => {
      if (playerRef.current && videoId) {
        try {
          if (window.YT && window.YT.Player) {
            // Clear any existing content
            if (playerRef.current.firstChild) {
              playerRef.current.innerHTML = '';
            }
            
            const newPlayer = new window.YT.Player(playerRef.current, {
              videoId: videoId,
              playerVars: {
                autoplay: 0,
                controls: 0, // Hide default controls
                rel: 0,      // Disable related videos
                showinfo: 0,
                modestbranding: 1,
                playsinline: 1,
                enablejsapi: 1,
                origin: window.location.origin,
                iv_load_policy: 3, // Disable annotations
                disablekb: 0,     // Enable keyboard controls
              },
              events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: (e: any) => console.error('YouTube Player Error:', e),
              }
            });
            
            setPlayer(newPlayer);
            setIsLoading(true);
          } else {
            // YouTube API not yet loaded, try again
            initializationAttempts++;
            if (initializationAttempts < maxAttempts) {
              console.log(`Waiting for YouTube API (attempt ${initializationAttempts})...`);
              setTimeout(initializePlayer, 1000);
            } else {
              console.error('Failed to load YouTube API after multiple attempts');
              setIsLoading(false);
            }
          }
        } catch (error) {
          console.error('Error initializing YouTube player:', error);
          setIsLoading(false);
        }
      }
    };
    
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = initializePlayer;
    }
    
    // Cleanup
    return () => {
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (e) {
          console.error('Error destroying player:', e);
        }
      }
    };
  }, [videoId]);
  
  // Player event handlers
  const onPlayerReady = (event: YT.PlayerEvent) => {
    try {
      if (event.target && typeof event.target.getDuration === 'function') {
        const duration = event.target.getDuration();
        setDuration(duration || 0);
        
        // Update volume and mute state if methods are available
        if (typeof event.target.getVolume === 'function') {
          const playerVolume = event.target.getVolume();
          setVolume(playerVolume);
        }
        
        if (typeof event.target.isMuted === 'function') {
          setIsMuted(event.target.isMuted());
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error in onPlayerReady:', error);
      setIsLoading(false);
    }
  };
  
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    try {
      // YT.PlayerState: UNSTARTED (-1), ENDED (0), PLAYING (1), PAUSED (2), BUFFERING (3), CUED (5)
      switch (event.data) {
        case 1: // YT.PlayerState.PLAYING
          setIsPlaying(true);
          setIsLoading(false);
          break;
        case 2: // YT.PlayerState.PAUSED
          setIsPlaying(false);
          break;
        case 0: // YT.PlayerState.ENDED
          setIsPlaying(false);
          if (onComplete) {
            onComplete();
          }
          break;
        case 3: // YT.PlayerState.BUFFERING
          setIsLoading(true);
          break;
        case 5: // YT.PlayerState.CUED
          setIsLoading(false);
          break;
      }
    } catch (error) {
      console.error('Error in onPlayerStateChange:', error);
    }
  };
  
  // Update current time
  useEffect(() => {
    if (!player || !isPlaying) return;
    
    const interval = setInterval(() => {
      try {
        // Add null check and check if the player is ready
        if (player && typeof player.getCurrentTime === 'function') {
          const currentTime = player.getCurrentTime();
          setCurrentTime(currentTime);
          
          // Update buffered progress - also with safety check
          if (typeof player.getVideoLoadedFraction === 'function') {
            const bufferedFraction = player.getVideoLoadedFraction();
            setBuffered(bufferedFraction * duration);
          }
        }
      } catch (e) {
        console.error('Error updating player time:', e);
        // Don't let errors crash the component
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [player, isPlaying, duration]);
  
  // Control visibility timeout
  useEffect(() => {
    if (!showControls) return;
    
    // Clear existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // Set new timeout to hide controls
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);
  
  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    setShowControls(true);
  };
  
  // Player control functions
  const togglePlay = () => {
    if (!player || typeof player.playVideo !== 'function' || typeof player.pauseVideo !== 'function') return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player || !duration || typeof player.seekTo !== 'function') return;
    
    const newTime = parseFloat(e.target.value);
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player || typeof player.setVolume !== 'function') return;
    
    const newVolume = parseInt(e.target.value);
    player.setVolume(newVolume);
    setVolume(newVolume);
    
    if (newVolume === 0) {
      if (typeof player.mute === 'function') {
        player.mute();
      }
      setIsMuted(true);
    } else if (isMuted) {
      if (typeof player.unMute === 'function') {
        player.unMute();
      }
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (!player || typeof player.mute !== 'function' || typeof player.unMute !== 'function') return;
    
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };
  
  const toggleTheaterMode = () => {
    setIsTheaterMode(!isTheaterMode);
  };
  
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const handlePlaybackRateChange = (rate: number) => {
    if (!player || typeof player.setPlaybackRate !== 'function') return;
    
    player.setPlaybackRate(rate);
    setPlaybackRate(rate);
    setShowSettings(false);
  };
  
  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };
  
  const handleQualityChange = (quality: string) => {
    if (!player || typeof player.setPlaybackQuality !== 'function') return;
    
    switch (quality) {
      case 'auto':
        player.setPlaybackQuality('default');
        break;
      case '1080p':
        player.setPlaybackQuality('hd1080');
        break;
      case '720p':
        player.setPlaybackQuality('hd720');
        break;
      case '480p':
        player.setPlaybackQuality('large');
        break;
      case '360p':
        player.setPlaybackQuality('medium');
        break;
      case '240p':
        player.setPlaybackQuality('small');
        break;
      case '144p':
        player.setPlaybackQuality('tiny');
        break;
    }
    
    setQuality(quality);
    setShowSettings(false);
  };
  
  // Format time (seconds to MM:SS format)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative group bg-black w-full rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* YouTube Player Container with responsive aspect ratio */}
      <div className="youtube-player-container">
        <div 
          ref={playerRef} 
          id="youtube-player" 
          className="absolute top-0 left-0 w-full h-full"
          onClick={togglePlay}
        ></div>
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Play/Pause large button overlay (shown when paused) */}
      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-4 transition-all video-control-btn"
          onClick={togglePlay}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </button>
      )}
      
      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pt-16 pb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress bar */}
            <div className="group/progress relative h-1 bg-gray-600 rounded-full mb-3 cursor-pointer">
              {/* Buffered progress */}
              <div 
                className="absolute h-full bg-gray-500 rounded-full"
                style={{ width: `${(buffered / duration) * 100}%` }}
              ></div>
              
              {/* Played progress */}
              <div 
                className="absolute h-full bg-red-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              
              {/* Progress handle */}
              <div 
                className="absolute h-3 w-3 bg-red-600 rounded-full -top-1 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
              ></div>
              
              {/* Seek input (invisible but functional) */}
              <input
                type="range"
                min="0"
                max={duration}
                step="any"
                value={currentTime}
                onChange={handleProgress}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Play/Pause button */}
                <button className="p-2 rounded-full hover:bg-white/20 text-white" onClick={togglePlay}>
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                {/* Volume control */}
                <div className="flex items-center group/volume">
                  <button className="p-2 rounded-full hover:bg-white/20 text-white" onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : volume < 50 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 flex items-center pl-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Time display */}
                <span className="text-sm text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Playback speed */}
                <div className="relative">
                  <button 
                    className="p-2 rounded-full hover:bg-white/20 text-white text-sm font-medium"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    {playbackRate}x
                  </button>
                  
                  {/* Settings dropdown */}
                  {showSettings && (
                    <div className="absolute right-0 bottom-12 bg-black/90 rounded-lg overflow-hidden w-48 shadow-lg">
                      <div className="p-2 text-white text-sm font-medium border-b border-white/20">Playback Speed</div>
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(rate => (
                        <button
                          key={rate}
                          className={`block w-full text-left px-4 py-2 text-sm ${playbackRate === rate ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
                          onClick={() => handlePlaybackRateChange(rate)}
                        >
                          {rate}x
                        </button>
                      ))}
                      
                      <div className="p-2 text-white text-sm font-medium border-b border-white/20 mt-2">Quality</div>
                      {['auto', '1080p', '720p', '480p', '360p', '240p', '144p'].map(q => (
                        <button
                          key={q}
                          className={`block w-full text-left px-4 py-2 text-sm ${quality === q ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
                          onClick={() => handleQualityChange(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Captions toggle */}
                <button 
                  className={`p-2 rounded-full hover:bg-white/20 ${showCaptions ? 'text-white' : 'text-white/70'}`}
                  onClick={toggleCaptions}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </button>
                
                {/* Theater mode toggle */}
                <button 
                  className="p-2 rounded-full hover:bg-white/20 text-white"
                  onClick={toggleTheaterMode}
                >
                  {isTheaterMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </button>
                
                {/* Fullscreen toggle */}
                <button 
                  className="p-2 rounded-full hover:bg-white/20 text-white"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Video title overlay (only when controls are shown) */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent px-4 py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-white font-medium">{title}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CCppVideoPlayer; 