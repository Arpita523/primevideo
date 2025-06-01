"use client"

import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "@/types/kinocheck"
import { getShortTitle } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Info, PlusCircle, PlayCircle } from "lucide-react"
import { useEffect } from "react"

interface HeroSliderProps {
  trailers: MediaItem[]
}

export default function HeroSlider({ trailers }: HeroSliderProps) {
  useEffect(() => {
    console.log("HeroSlider mounted. Received trailers:", trailers)
    if (!trailers || trailers.length === 0) {
      console.warn("HeroSlider: No trailers to display.")
    }
  }, [trailers])

  if (!trailers || trailers.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center h-[50vh] md:h-[60vh] flex items-center justify-center bg-neutral-800">
        <p className="text-xl text-neutral-400">No featured content available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] bg-neutral-900">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="w-full h-full" // Carousel itself takes full dimensions
      >
        <CarouselContent className="h-full">
          {" "}
          {/* CarouselContent also takes full height */}
          {trailers.slice(0, 5).map((trailer, index) => {
            if (!trailer || !trailer.id) {
              console.error("HeroSlider: Invalid trailer data or missing ID at index", index, trailer)
              return null
            }
            return (
              <CarouselItem key={trailer.id} className="h-full basis-full">
                {/* This div is the direct child of CarouselItem and parent of Image. It MUST have dimensions. */}
                <div className="relative w-full h-full overflow-hidden bg-red-500/20">
                  {" "}
                  {/* Temporary BG for visibility */}
                  {trailer.youtube_thumbnail ? (
                    <Image
                      src={trailer.youtube_thumbnail || "/placeholder.svg"}
                      alt={getShortTitle(trailer.title)}
                      fill
                      priority={index === 0}
                      className="object-cover" // Crucial for `fill` to work as expected
                      sizes="100vw" // Important for responsive images with `fill`
                      onError={(e) =>
                        console.error(
                          `HeroSlider Image Error for ${trailer.title} (${trailer.youtube_thumbnail}):`,
                          (e.target as HTMLImageElement).src,
                        )
                      }
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                      <p className="text-white">Image not available for {getShortTitle(trailer.title)}</p>
                    </div>
                  )}
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:w-3/4 lg:w-1/2 z-[1]" />
                  {/* Text Content - ensure this is above gradients if needed, or gradients are subtle enough */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white max-w-md lg:max-w-lg z-[2]">
                    {/* Prime logo example - replace with actual if available */}
                    {/* <Image src="/prime-logo-small.png" alt="Prime" width={50} height={15} className="mb-2 opacity-80" /> */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 line-clamp-2">
                      {getShortTitle(trailer.title)}
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-200 mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                      {trailer.description || trailer.genres?.join(", ") || "Exciting new trailer"}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <Button
                        asChild
                        size="lg" // Made button larger like the example
                        className="bg-white text-black hover:bg-neutral-200 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold"
                      >
                        <Link href={`/watch/${trailer.youtube_video_id}`}>
                          <PlayCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Watch Now
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="iconLg" // Custom size or use existing if it matches
                        className="bg-black/40 hover:bg-black/60 border-neutral-600 hover:border-neutral-500 text-white rounded-full p-2.5 sm:p-3"
                      >
                        <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="sr-only">Add to Watchlist</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="iconLg"
                        className="bg-black/40 hover:bg-black/60 border-neutral-600 hover:border-neutral-500 text-white rounded-full p-2.5 sm:p-3"
                      >
                        <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="sr-only">More Info</span>
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-400 mt-3">Watch with a Prime membership</p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {trailers.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-[3] bg-black/40 hover:bg-black/60 text-white border-none hidden md:flex p-2 rounded-full" />
            <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-[3] bg-black/40 hover:bg-black/60 text-white border-none hidden md:flex p-2 rounded-full" />
          </>
        )}
      </Carousel>
      {/* Optional: Mute/Unmute and Age Rating like in example image */}
      <div className="absolute top-4 right-4 z-[3]">
        <Button variant="ghost" size="icon" className="bg-black/40 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="22" y1="9" x2="16" y2="15"></line>
            <line x1="16" y1="9" x2="22" y2="15"></line>
          </svg>
          <span className="sr-only">Mute/Unmute</span>
        </Button>
      </div>
      <div className="absolute bottom-4 right-4 z-[3] bg-black/60 text-white text-xs px-2 py-1 rounded">U/A 16+</div>
    </div>
  )
}
