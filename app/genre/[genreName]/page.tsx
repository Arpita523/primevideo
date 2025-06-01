import { getAllMovies, getAllTvShows } from "@/lib/api"
import type { MediaItem } from "@/types/media"
import BasicHeroSlider from "@/components/basic-hero-slider"
import MediaCard from "@/components/media-card"
import { ALL_GENRES } from "@/lib/genres"
import { notFound } from "next/navigation"

interface GenrePageProps {
  params: { genreName: string }
}

// Helper to format genre name for display and comparison
const formatGenreName = (slug: string): string => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

export async function generateStaticParams() {
  // Generate paths for all known genres
  return ALL_GENRES.map((genre) => ({
    genreName: encodeURIComponent(genre.toLowerCase().replace(/ /g, "-")),
  }))
}

export default async function GenrePage({ params }: GenrePageProps) {
  const decodedGenreName = decodeURIComponent(params.genreName)
  const targetGenre = formatGenreName(decodedGenreName)

  // Validate if the genre is known
  const isValidGenre = ALL_GENRES.some((g) => g.toLowerCase() === targetGenre.toLowerCase())
  if (!isValidGenre) {
    notFound() // Show 404 if genre is not in our list
  }

  const movies = await getAllMovies()
  const tvShows = await getAllTvShows()
  const allMedia: MediaItem[] = [...movies, ...tvShows]

  const itemsInGenre = allMedia.filter((item) =>
    item.genres?.some((genre) => genre.toLowerCase() === targetGenre.toLowerCase()),
  )

  if (itemsInGenre.length === 0) {
    // Or a more specific message like "No items found in this genre."
    // notFound();
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold mb-4">Genre: {targetGenre}</h1>
        <p className="text-xl text-neutral-400">No movies or TV shows found in the "{targetGenre}" genre.</p>
        <p className="mt-4">Please ensure items in your data files have this genre assigned.</p>
      </div>
    )
  }

  const heroItems = itemsInGenre.slice(0, 5) // Use top 5 from this genre for hero

  return (
    <div>
      <BasicHeroSlider trailers={heroItems} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">{targetGenre}</h1>
        {itemsInGenre.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {itemsInGenre.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>No items found in the "{targetGenre}" genre.</p>
        )}
      </section>
    </div>
  )
}
