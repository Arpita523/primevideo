import { getAllMovies } from "@/lib/api"
import BasicHeroSlider from "@/components/basic-hero-slider"
import MediaCarousel from "@/components/media-carousel"
import { MOVIE_GENRES } from "@/lib/genres" // Import defined genres

export default async function MoviesPage() {
  const movies = await getAllMovies()

  // Create a list of movies for the hero slider (e.g., first 5 or a specific selection)
  const heroMovies = movies.slice(0, 5)

  return (
    <div>
      <BasicHeroSlider trailers={heroMovies} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Browse Movies</h1>
        {MOVIE_GENRES.map((genre) => {
          const moviesInGenre = movies.filter((movie) => movie.genres?.includes(genre))
          if (moviesInGenre.length === 0) return null // Don't render empty carousels
          return (
            <MediaCarousel
              key={genre}
              title={genre}
              items={moviesInGenre.slice(0, 12)} // Show up to 12 per genre carousel
              // Optional: seeMoreLink={`/movies/genre/${genre.toLowerCase().replace(/ /g, "-")}`}
            />
          )
        })}
        {movies.length === 0 && <p>No movies found.</p>}
      </section>
    </div>
  )
}
