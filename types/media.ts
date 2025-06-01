// This file was renamed from types/kinocheck.ts
// The MediaItem interface remains largely the same as it's a good general structure.

import type { Genre } from "@/lib/genres" // Import Genre type

export interface MediaItem {
  id: string // Unique ID, can be youtube_video_id
  youtube_video_id: string
  youtube_thumbnail: string
  title: string
  description: string
  genres?: Genre[] // Updated to use the Genre type from lib/genres.ts
  categories: string[] // Example: ["Trailer", "Featured"]
  resource_type: "movie" | "series"
  url?: string // e.g., original source URL, not youtube link
  published?: string
  views?: number
}
