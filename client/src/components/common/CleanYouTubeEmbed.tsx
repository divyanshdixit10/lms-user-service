import React from 'react';

interface CleanYouTubeEmbedProps {
  videoId: string;
  className?: string;
  title?: string;
}

const CleanYouTubeEmbed: React.FC<CleanYouTubeEmbedProps> = ({
  videoId,
  className = '',
  title = 'YouTube video player',
}) => {
  // YouTube embed URL with parameters:
  // - rel=0: Prevents showing related videos
  // - modestbranding=1: Reduces YouTube branding
  // - controls=0: Hides player controls
  // - showinfo=0: Hides video title and uploader info
  // - autohide=1: Hides video controls when playback begins
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=0&showinfo=0&autohide=1`;

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CleanYouTubeEmbed; 