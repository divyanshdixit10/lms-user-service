import React from 'react';
import YouTubePlayer from './YouTubePlayer';

const YouTubePlayerExample: React.FC = () => {
  // Example YouTube video ID
  const exampleVideoId = 'dQw4w9WgXcQ'; // Replace with your video ID
  
  // Optional: YouTube channel ID for subscribe button
  const exampleChannelId = 'UCuAXFkgsw1L7xaCfnd5JJOw'; // Replace with your channel ID
  
  const handleSubscribe = () => {
    console.log('Subscribe button clicked!');
    // You can add analytics or other logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Custom YouTube Player</h2>
      
      {/* Basic usage with autoplay and minimal UI */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Basic Player</h3>
        <YouTubePlayer 
          videoId={exampleVideoId}
          channelId={exampleChannelId}
          onSubscribe={handleSubscribe}
        />
      </div>
      
      {/* With custom thumbnail first (requires click to play) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">With Thumbnail First</h3>
        <YouTubePlayer 
          videoId={exampleVideoId}
          channelId={exampleChannelId}
          showThumbnailFirst={true}
          subscribeBtnText="Subscribe to Channel"
          onSubscribe={handleSubscribe}
        />
      </div>
      
      {/* With custom width in a grid layout */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Grid Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <YouTubePlayer 
            videoId={exampleVideoId}
            channelId={exampleChannelId}
            className="h-full"
          />
          <YouTubePlayer 
            videoId={exampleVideoId}
            channelId={exampleChannelId}
            showThumbnailFirst={true}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayerExample; 