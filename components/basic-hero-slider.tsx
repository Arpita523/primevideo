"use client"

import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "@/types/kinocheck"
import { getShortTitle } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface BasicHeroSliderProps {
  trailers: MediaItem[]
}

export default function BasicHeroSlider({ trailers }: BasicHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayTrailers = trailers.slice(0, 5) // Max 5 slides

  useEffect(() => {
    console.log("BasicHeroSlider mounted. Received trailers:", displayTrailers)
    if (!displayTrailers || displayTrailers.length === 0) {
      console.warn("BasicHeroSlider: No trailers to display.")
    }
  }, [displayTrailers])

  useEffect(() => {
    if (displayTrailers.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayTrailers.length)
    }, 6000) // Change slide every 6 seconds
    return () => clearInterval(timer)
  }, [displayTrailers.length])

  if (!displayTrailers || displayTrailers.length === 0) {
    return (
      <div className="w-full h-[50vh] md:h-[65vh] bg-neutral-800 flex items-center justify-center text-neutral-400">
        No featured content available.
      </div>
    )
  }

  const currentTrailer = displayTrailers[currentIndex]

  if (!currentTrailer) {
    return (
      <div className="w-full h-[50vh] md:h-[65vh] bg-neutral-800 flex items-center justify-center text-neutral-400">
        Error loading current slide.
      </div>
    )
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[65vh] text-white overflow-hidden">
      {/* Background Image */}
      {currentTrailer.youtube_thumbnail ? (
        <Image
          key={currentTrailer.id} // Add key to force re-render on change
          src={currentTrailer.youtube_thumbnail || "/placeholder.svg"}
          alt={`Background for ${getShortTitle(currentTrailer.title)}`}
          fill
          priority
          className="object-cover transition-opacity duration-1000 ease-in-out"
          sizes="100vw"
          onError={(e) => console.error(`Image load error for ${currentTrailer.youtube_thumbnail}:`, e)}
        />
      ) : (
        <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
          <p>Image not available for {getShortTitle(currentTrailer.title)}</p>
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent md:w-3/4 lg:w-2/3 z-[1]"></div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-16 max-w-xl lg:max-w-2xl z-[2]">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 line-clamp-2 drop-shadow-lg">
          {getShortTitle(currentTrailer.title)}
        </h1>
        <p className="text-sm md:text-base text-neutral-200 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 drop-shadow-sm">
          {currentTrailer.description || "Watch the latest trailer now."}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-black hover:bg-neutral-200 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold"
        >
          <Link href={`/watch/${currentTrailer.youtube_video_id}`}>
            <PlayCircle className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            Watch Now
          </Link>
        </Button>
      </div>

      {/* Simple Dots for Navigation (optional) */}
      {displayTrailers.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[3] flex space-x-2">
          {displayTrailers.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                idx === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
