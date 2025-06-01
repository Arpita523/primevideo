"use client"

import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "@/types/kinocheck"
import { getShortTitle } from "@/lib/api"
import { PlayCircle } from "lucide-react"

interface MediaCardProps {
  item: MediaItem
}

export default function MediaCard({ item }: MediaCardProps) {
  const shortTitle = getShortTitle(item.title)

  return (
    <Link
      href={`/watch/${item.youtube_video_id}`}
      className="block group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <Image
        src={item.youtube_thumbnail || "/placeholder.svg?width=300&height=170"}
        alt={shortTitle}
        width={300}
        height={170}
        className="object-cover w-full aspect-video"
      />
      {/* Overlay for play icon */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PlayCircle className="h-16 w-16 text-white/80" />
      </div>
      {/* Info overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-sm font-semibold truncate">{shortTitle}</h3>
      </div>
    </Link>
  )
}
