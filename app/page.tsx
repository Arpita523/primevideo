import { getTrendingItems, getAllMovies, getAllTvShows, getIndianMovies } from "@/lib/api"
import BasicHeroSlider from "@/components/basic-hero-slider" // Using the new basic slider
import MediaCarousel from "@/components/media-carousel"

export default async function HomePage() {
  const trendingItems = await getTrendingItems()
  const movies = await getAllMovies() // This now includes Indian movies
  const indianMovies = await getIndianMovies()
  const tvShows = await getAllTvShows()

  console.log("HomePage trendingItems for BasicHeroSlider:", trendingItems)

  return (
    <div>
      <BasicHeroSlider trailers={trendingItems} />
      <MediaCarousel
        title="Popular Movies"
        items={movies.filter((m) => !indianMovies.find((im) => im.id === m.id)).slice(0, 12)}
        seeMoreLink="/movies"
      />
      <MediaCarousel title="Indian Movies" items={indianMovies.slice(0, 12)} seeMoreLink="/movies#indian" />{" "}
      {/* Link to a section or filter */}
      <MediaCarousel title="Popular TV Shows" items={tvShows.slice(0, 12)} seeMoreLink="/tv-shows" />
    </div>
  )
}
