# Distraction-Free YouTube Player Component

A clean, minimal YouTube video embed component for React applications that removes all YouTube branding, controls, and distractions.

## Features

- ✅ Completely removes YouTube controls, branding, and related videos
- ✅ Automatically mutes and autoplays videos
- ✅ Fully responsive for all screen sizes using Tailwind CSS
- ✅ Optional custom thumbnail with play button before loading
- ✅ Clean, modern "Subscribe" button below the player
- ✅ TypeScript support with proper interfaces
- ✅ Customizable via props

## Usage

```tsx
import YouTubePlayer from './components/common/YouTubePlayer';

// Basic usage
<YouTubePlayer videoId="dQw4w9WgXcQ" />

// With thumbnail first (click to play)
<YouTubePlayer 
  videoId="dQw4w9WgXcQ"
  showThumbnailFirst={true}
/>

// With channel subscription
<YouTubePlayer 
  videoId="dQw4w9WgXcQ"
  channelId="UCuAXFkgsw1L7xaCfnd5JJOw"
  subscribeBtnText="Subscribe Now"
  onSubscribe={() => console.log('Subscribe clicked')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoId` | string | (required) | The YouTube video ID |
| `className` | string | `''` | Additional CSS classes for the container |
| `width` | string | `'100%'` | Width of the player |
| `height` | string | `'0'` | Height of the player (uses aspect ratio by default) |
| `showThumbnailFirst` | boolean | `false` | Show thumbnail with play button before loading |
| `channelId` | string | `undefined` | YouTube channel ID for subscribe button |
| `subscribeBtnText` | string | `'Subscribe'` | Text for the subscribe button |
| `onSubscribe` | function | `undefined` | Callback for subscribe button click |

## Notes

- The component uses the YouTube Embed API to remove distractions
- Videos will autoplay only if they are muted (browser policy)
- To customize further, you can edit the YouTube parameters in the component
- The button links to YouTube's subscription page for the given channel ID

## Example

See `YouTubePlayerExample.tsx` for more usage examples. 