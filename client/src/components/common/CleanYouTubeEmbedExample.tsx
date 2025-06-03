import React from 'react';
import CleanYouTubeEmbed from './CleanYouTubeEmbed';

const CleanYouTubeEmbedExample: React.FC = () => {
  // Example YouTube video ID
  const exampleVideoId = 'dQw4w9WgXcQ'; // Replace with your video ID

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Clean YouTube Embed</h2>
      
      {/* Basic usage */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Simple Embed</h3>
        <CleanYouTubeEmbed videoId={exampleVideoId} />
      </div>
      
      {/* With custom class and title */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">With Custom Title</h3>
        <CleanYouTubeEmbed 
          videoId={exampleVideoId} 
          title="Custom video title"
          className="rounded-lg shadow-lg"
        />
      </div>
      
      {/* Responsive grid layout */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Responsive Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CleanYouTubeEmbed videoId={exampleVideoId} />
          <CleanYouTubeEmbed videoId={exampleVideoId} />
        </div>
      </div>
    </div>
  );
};

export default CleanYouTubeEmbedExample; 