"use client"

interface VideoPlayerProps {
  videoId: string
  title?: string
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  // For a truly custom player UI as in the screenshot, you'd need to use the YouTube IFrame Player API
  // to control an unstyled player and build all controls (play/pause, volume, progress, fullscreen) manually.
  // This is a simplified version using a standard YouTube embed.
  return (
    <div className="w-full aspect-video bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`}
        title={title || "Video Player"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}
