import React, { useState, useRef, useEffect } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  width?: string;
  height?: string;
  showThumbnailFirst?: boolean;
  channelId?: string;
  subscribeBtnText?: string;
  onSubscribe?: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  className = '',
  width = '100%',
  height = '0',
  showThumbnailFirst = false,
  channelId,
  subscribeBtnText = 'Subscribe',
  onSubscribe,
}) => {
  const [showVideo, setShowVideo] = useState<boolean>(!showThumbnailFirst);
  const [aspectRatio, setAspectRatio] = useState<string>('aspect-video'); // 16:9 by default
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // YouTube embed URL with parameters to:
  // - Autoplay (1)
  // - Hide controls (0)
  // - Hide related videos (0)
  // - Hide YouTube logo (1)
  // - Hide video title (0)
  // - Mute (1)
  // - Disable keyboard controls (0)
  // - Hide fullscreen button (0)
  // - Hide annotations (3)
  // - Hide info cards (3)
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&mute=1&disablekb=0&fs=0&iv_load_policy=3&cc_load_policy=0&playsinline=1&enablejsapi=1`;

  // YouTube thumbnail URL (high quality)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleThumbnailClick = () => {
    setShowVideo(true);
  };

  const handleSubscribe = () => {
    if (channelId) {
      window.open(`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`, '_blank');
    }
    if (onSubscribe) {
      onSubscribe();
    }
  };

  // Update aspect ratio if needed
  useEffect(() => {
    // You can customize this if needed
    setAspectRatio('aspect-video'); // 16:9 ratio
  }, []);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div 
        ref={containerRef}
        className={`relative w-full ${aspectRatio} bg-black overflow-hidden rounded-lg shadow-lg`}
      >
        {showThumbnailFirst && !showVideo ? (
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={handleThumbnailClick}
          >
            <img 
              src={thumbnailUrl} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition duration-300">
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={playerRef}
            title={`YouTube video player for ${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
          ></iframe>
        )}
      </div>
      
      {/* Custom Subscribe Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubscribe}
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition duration-300 flex items-center gap-2 shadow-md"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          {subscribeBtnText}
        </button>
      </div>
    </div>
  );
};

export default YouTubePlayer; 