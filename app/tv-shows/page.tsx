import { getAllTvShows } from "@/lib/api"
import BasicHeroSlider from "@/components/basic-hero-slider"
import MediaCarousel from "@/components/media-carousel"
import { TV_SHOW_GENRES } from "@/lib/genres" // Import defined genres

export default async function TvShowsPage() {
  const tvShows = await getAllTvShows()

  const heroTvShows = tvShows.slice(0, 5)

  return (
    <div>
      <BasicHeroSlider trailers={heroTvShows} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Browse TV Shows</h1>
        {TV_SHOW_GENRES.map((genre) => {
          const showsInGenre = tvShows.filter((show) => show.genres?.includes(genre))
          if (showsInGenre.length === 0) return null
          return (
            <MediaCarousel
              key={genre}
              title={genre}
              items={showsInGenre.slice(0, 12)}
              // Optional: seeMoreLink={`/tv-shows/genre/${genre.toLowerCase().replace(/ /g, "-")}`}
            />
          )
        })}
        {tvShows.length === 0 && <p>No TV shows found.</p>}
      </section>
    </div>
  )
}
