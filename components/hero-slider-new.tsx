"use client"

import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "@/types/kinocheck"
import { getShortTitle } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { PlayCircle, Plus, Info, VolumeX, ChevronLeft, ChevronRight } from "lucide-react" // Added VolumeX
import { useEffect } from "react"

interface HeroSliderProps {
  trailers: MediaItem[]
}

export default function HeroSliderNew({ trailers }: HeroSliderProps) {
  useEffect(() => {
    console.log("HeroSliderNew mounted. Received trailers:", trailers)
    if (!trailers || trailers.length === 0) {
      console.warn("HeroSliderNew: No trailers to display.")
    }
  }, [trailers])

  const displayTrailers = trailers.slice(0, 5) // Take first 5 for the hero

  if (!displayTrailers || displayTrailers.length === 0) {
    return (
      <div className="w-full h-[55vh] md:h-[70vh] bg-neutral-800 flex items-center justify-center text-neutral-400">
        No featured content available.
      </div>
    )
  }

  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] text-white">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {displayTrailers.map((trailer, index) => (
            <CarouselItem key={trailer.id || `hero-trailer-${index}`} className="h-full basis-full">
              <div className="relative w-full h-full overflow-hidden">
                {/* Background Image */}
                {trailer.youtube_thumbnail ? (
                  <Image
                    src={trailer.youtube_thumbnail || "/placeholder.svg"}
                    alt={`Background for ${getShortTitle(trailer.title)}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                    onError={(e) => console.error(`Image load error for ${trailer.youtube_thumbnail}:`, e)}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                    <p>Image not available</p>
                  </div>
                )}

                {/* Gradient Overlays for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent md:w-3/4 lg:w-2/3 z-[1]"></div>

                {/* Content Overlay: Title, Description, Buttons */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-16 max-w-xl lg:max-w-2xl z-[2]">
                  {/* Optional: Small "prime" logo or category indicator */}
                  {/* <Image src="/path/to/prime-small-logo.png" alt="Prime" width={60} height={20} className="mb-2 opacity-90" /> */}

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 line-clamp-2 drop-shadow-lg">
                    {getShortTitle(trailer.title)}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-200 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 drop-shadow-sm">
                    {trailer.description || "Watch the latest trailer now."}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-black hover:bg-neutral-200 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold"
                    >
                      <Link href={`/watch/${trailer.youtube_video_id}`}>
                        <PlayCircle className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                        Watch Now
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="iconLg" // Assuming a larger icon button style
                      className="bg-black/30 hover:bg-black/50 border-neutral-500 text-white rounded-full p-3"
                      aria-label="Add to Watchlist"
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="iconLg"
                      className="bg-black/30 hover:bg-black/50 border-neutral-500 text-white rounded-full p-3"
                      aria-label="More Info"
                    >
                      <Info className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-400 mt-4">Available with Prime</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons for Carousel */}
        {displayTrailers.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-[3] bg-black/40 hover:bg-black/60 text-white p-2 rounded-full hidden md:flex">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-[3] bg-black/40 hover:bg-black/60 text-white p-2 rounded-full hidden md:flex">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </>
        )}
      </Carousel>

      {/* Optional: Top-right controls like Mute */}
      <div className="absolute top-4 right-4 z-[3] flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 text-white rounded-full p-2"
          aria-label="Mute/Unmute"
        >
          <VolumeX className="h-5 w-5" />
        </Button>
      </div>

      {/* Optional: Bottom-right age rating */}
      <div className="absolute bottom-4 right-4 z-[3] bg-black/60 text-white text-xs px-2 py-1 rounded">U/A 16+</div>
    </div>
  )
}
