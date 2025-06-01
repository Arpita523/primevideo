"use client"

import type { MediaItem } from "@/types/kinocheck"
import MediaCard from "./media-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface MediaCarouselProps {
  title: string
  items: MediaItem[]
  seeMoreLink?: string
}

export default function MediaCarousel({ title, items, seeMoreLink }: MediaCarouselProps) {
  if (!items || items.length === 0) {
    return null // Don't render if no items
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          {seeMoreLink && (
            <Link href={seeMoreLink} className="text-sm text-sky-400 hover:text-sky-300 flex items-center">
              See more <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          )}
        </div>
        <Carousel opts={{ align: "start", slidesToScroll: "auto" }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id || index}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <MediaCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex disabled:hidden bg-black/50 hover:bg-black/70 text-white" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex disabled:hidden bg-black/50 hover:bg-black/70 text-white" />
        </Carousel>
      </div>
    </section>
  )
}
