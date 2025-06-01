import type { MediaItem } from "@/types/media" // Updated import path
import { movies as generalMovies } from "@/data/movies"
import { tvShows } from "@/data/tv-shows"
import { indianMovies } from "@/data/indian-movies"

// Combine all movies
const allMoviesData = [...generalMovies, ...indianMovies]
const allMediaItems = [...allMoviesData, ...tvShows]

// Simple shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function getTrendingItems(): Promise<MediaItem[]> {
  // Ensure enough unique items for trending, or repeat if necessary
  const uniqueItems = Array.from(new Set(allMediaItems.map((item) => item.id)))
    .map((id) => allMediaItems.find((item) => item.id === id)!)
    .filter(Boolean) // Filter out undefined if any id was not found (should not happen)

  if (uniqueItems.length === 0) return Promise.resolve([])

  let trending = shuffleArray(uniqueItems)
  // If not enough unique items for 10 trending, allow duplicates by re-shuffling and adding
  while (trending.length < 10 && uniqueItems.length > 0) {
    trending = trending.concat(shuffleArray(uniqueItems).slice(0, 10 - trending.length))
  }
  return Promise.resolve(trending.slice(0, 10))
}

export async function getAllMovies(): Promise<MediaItem[]> {
  return Promise.resolve(allMoviesData)
}

export async function getIndianMovies(): Promise<MediaItem[]> {
  return Promise.resolve(indianMovies)
}

export async function getAllTvShows(): Promise<MediaItem[]> {
  return Promise.resolve(tvShows)
}

export async function getItemById(id: string): Promise<MediaItem | null> {
  const item = allMediaItems.find((item) => item.id === id || item.youtube_video_id === id)
  return Promise.resolve(item || null)
}

export function getShortTitle(fullTitle: string): string {
  if (!fullTitle) return "Untitled"
  const parts = fullTitle.split(/[:(]| Trailer | \|/)
  let short = parts[0].trim()
  // Further shorten if it's still too long, aiming for around 30-40 chars for cards
  if (short.length > 40) {
    const lastSpace = short.lastIndexOf(" ", 37)
    if (lastSpace > 0) {
      short = short.substring(0, lastSpace) + "..."
    } else {
      short = short.substring(0, 37) + "..."
    }
  }
  return short || "Untitled"
}
