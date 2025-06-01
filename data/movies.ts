import type { MediaItem } from "@/types/kinocheck"
import { extractYouTubeVideoId } from "@/lib/youtube-utils"

// Helper to generate a placeholder image URL if actual image is missing
const getImageUrl = (providedImage: string | undefined, videoId: string | null): string => {
  if (providedImage && providedImage.startsWith("http")) return providedImage
  if (videoId) return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
  return "/placeholder.svg?width=300&height=170" // Fallback placeholder
}

const rawMovieData = [
  {
    video_link: "https://www.youtube.com/watch?v=fsQgc9pCyDU",
    image: "https://i.ytimg.com/vi/fsQgc9pCyDU/hq720.jpg",
    name: "Mission: Impossible – The Final Reckoning | Official Trailer (2025 Movie) - Tom Cruise",
    description:
      "Every choice, every mission, has all led to this. #Mission Impossible – The Final Reckoning. May 23, 2025.",
    genres: ["Action", "Adventure", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=oFkbsEKaoSE",
    image: "https://i.ytimg.com/vi/oFkbsEKaoSE/hq720.jpg",
    name: "Predator: Badlands | Teaser Trailer",
    description:
      "The director of Prey welcomes you to a world of hurt. Experience Predator: Badlands on the big screen, in theaters and IMAX.",
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=9KVG_X_7Naw",
    image: "https://i.ytimg.com/vi/9KVG_X_7Naw/hq720.jpg",
    name: "Tron: Ares | Official Trailer",
    description: "This October, worlds will collide. Tron: Ares. Only in theaters 10.10.25",
    genres: ["Sci-Fi", "Action", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=UWMzKXsY9A4",
    image: "https://i.ytimg.com/vi/UWMzKXsY9A4/hq720.jpg",
    name: "Final Destination Bloodlines | Official Trailer",
    description:
      "Death is a relentless son of a *****. #FinalDestination #Bloodlines - Only in Theaters and IMAX May 16.",
    genres: ["Horror", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=Ox8ZLF6cGM0",
    image: "https://i.ytimg.com/vi/Ox8ZLF6cGM0/hq720.jpg",
    name: "Superman | Official Trailer | DC",
    description:
      "Your choices, your actions, that's what makes you who you are. #Superman - Only In Theaters and @Imax July 11",
    genres: ["Action", "Sci-Fi", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=WpW36ldAqnM",
    image: "https://i.ytimg.com/vi/WpW36ldAqnM/hq720.jpg",
    name: "Marvel Television's Ironheart | Official Trailer | Disney+",
    description:
      "Iconic #Ironheart, Marvel Television's all-new series from executive producer Ryan Coogler, launches with a 3-episode.",
    genres: ["Action", "Sci-Fi", "Superhero"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=xRWYNpg5YRA",
    image: "https://i.ytimg.com/vi/xRWYNpg5YRA/hq720.jpg",
    name: "The Home (2025) Official Trailer - Pete Davidson",
    description: "The Home (2025) Official Trailer - Pete Davidson",
    genres: ["Horror", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=2XNL2_P3QM8",
    image: "https://i.ytimg.com/vi/2XNL2_P3QM8/hq720.jpg",
    name: "Predator: Badlands | Hindi Teaser Trailer | In Cinemas November 7, 2025",
    description:
      "The director of Prey welcomes you to a world of hurt. Experience Predator: Badlands on the big screen, in theaters and IMAX.",
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/shorts/rhd3iPgPqgc",
    image: "https://i.ytimg.com/vi/rhd3iPgPqgc/hq720.jpg",
    name: "Kajol in a Horror Movie, MAA Movie Trailer Review #shorts",
    description: "Kajol in a Horror Movie, MAA Movie Trailer Review #shorts #kajol #maamovie #bollywood #horror",
    genres: ["Horror"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=-E3lMRx7HRQ",
    image: "https://i.ytimg.com/vi/-E3lMRx7HRQ/hq720.jpg",
    name: "Now You See Me: Now You Don’t (2025) Official Trailer",
    description: "Now You See Me: Now You Don’t (2025) Official Trailer",
    genres: ["Thriller", "Crime"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=2woCZg5QdVE",
    image: "https://i.ytimg.com/vi/2woCZg5QdVE/hq720.jpg",
    name: "Superman | Official Trailer",
    description:
      "Your choices, your actions, that's what makes you who you are. #Superman - Only In Theaters and Imax July 11",
    genres: ["Action", "Sci-Fi", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=6HG-wsRsg8s",
    image: "https://i.ytimg.com/vi/6HG-wsRsg8s/hq720.jpg",
    name: "IT: Welcome to Derry | Official Teaser | HBO Max",
    description: "Get ready to go back to where IT all began... #ITWelcometoDerry is coming this fall to HBO Max.",
    genres: ["Horror", "Thriller", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=jan5CFWs9ic",
    image: "https://i.ytimg.com/vi/jan5CFWs9ic/hq720.jpg",
    name: "Jurassic World Rebirth | Official Trailer",
    description: "Jurassic World Rebirth | Official Trailer",
    genres: ["Sci-Fi", "Action", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=xo4rkcC7kFc",
    image: "https://i.ytimg.com/vi/xo4rkcC7kFc/hq720.jpg",
    name: "Zootopia 2 | Teaser Trailer",
    description: "Zootopia 2 | Teaser Trailer",
    genres: ["Animation", "Adventure", "Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=b9Rr9ygb-ac",
    image: "https://i.ytimg.com/vi/b9Rr9ygb-ac/hq720.jpg",
    name: "From the World of John Wick: Ballerina (2025) Final Trailer – Ana de Armas, Keanu Reeves",
    description: "From the World of John Wick: Ballerina (2025) Final Trailer – Ana de Armas, Keanu Reeves",
    genres: ["Action", "Thriller", "Crime"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=8J646zM7UM8",
    image: "https://i.ytimg.com/vi/8J646zM7UM8/hq720.jpg",
    name: "Heads of State - Official Trailer | Prime Video",
    description:
      "Two heads are better than one. Idris Elba and John Cena are Heads of State, coming to Prime Video July 2.",
    genres: ["Action", "Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=w2v6PEo9Zqw",
    image: "https://i.ytimg.com/vi/w2v6PEo9Zqw/hq720.jpg",
    name: "सुपरमैन (Superman) | Official Hindi Trailer",
    description: "तुम्हारे फैसले, तुम्हारे कर्म, यही असल में बतातें हैं की तुम कौन हो।",
    genres: ["Action", "Sci-Fi", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=OWEq2Pf8qpk",
    image: "https://i.ytimg.com/vi/OWEq2Pf8qpk/hq720.jpg",
    name: "How To Train Your Dragon | IMAX Trailer",
    description:
      "How To Train Your Dragon - In Theaters June 13 From three-time Oscar® nominee and Golden Globe winner Dean DeBlois.",
    genres: ["Animation", "Adventure", "Fantasy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=OpThntO9ixc",
    image: "https://i.ytimg.com/vi/OpThntO9ixc/hq720.jpg",
    name: "Weapons | Official Trailer",
    description: "There's something wrong in Maybrook. #WeaponsMovie - only in theaters August 8.",
    genres: ["Horror", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=pAsmrKyMqaA",
    image: "https://i.ytimg.com/vi/pAsmrKyMqaA/hq720.jpg",
    name: "The Fantastic Four: First Steps | Official Trailer | Only in Theaters July 25",
    description: "Together. As a family. Marvel Studios' The Fantastic Four: First Steps arrives in theaters July 25.",
    genres: ["Action", "Sci-Fi", "Superhero"],
  },
  // New Apple TV+ Movie Data
  {
    video_link: "https://www.youtube.com/watch?v=KsBNOAAXiCY",
    thumbnail: "https://i.ytimg.com/vi/KsBNOAAXiCY/hq720.jpg",
    movie_name: "F1 — Official Trailer | Apple TV+",
    description: "Formula 1 racing movie.",
    genres: ["Action", "Drama", "Sports"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=rUSdnuOLebE",
    thumbnail: "https://i.ytimg.com/vi/rUSdnuOLebE/hq720.jpg",
    movie_name: "The Gorge — Official Trailer | Apple TV+",
    description: "Thriller with Miles Teller and Anya Taylor-Joy.",
    genres: ["Thriller", "Action"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=vEioDeOiqEs", // Note: This was also in TV shows, assuming it's a movie here
    thumbnail: "https://i.ytimg.com/vi/vEioDeOiqEs/hq720.jpg",
    movie_name: "Murderbot — Official Trailer | Apple TV+",
    description: "Based on the award-winning, best-selling series by Martha Wells.",
    genres: ["Sci-Fi", "Action", "Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=1gB9h0ELEf0", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/1gB9h0ELEf0/hq720.jpg",
    movie_name: "Fountain of Youth — Official Trailer | Apple TV+",
    description: "Adventure film with John Krasinski, Natalie Portman.",
    genres: ["Adventure", "Action", "Fantasy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=KQiZ5zMhliw",
    thumbnail: "https://i.ytimg.com/vi/KQiZ5zMhliw/hq720.jpg",
    movie_name: "Echo Valley — Official Trailer | Apple TV+",
    description: "Thriller with Julianne Moore.",
    genres: ["Thriller", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=xEQP4VVuyrY", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/xEQP4VVuyrY/hq720.jpg",
    movie_name: "Severance — Official Trailer | Apple TV+", // Assuming this is a movie version for this list
    description: "Work/life balance mystery.",
    genres: ["Sci-Fi", "Thriller", "Mystery"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=EIQuE7JGXU8", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/EIQuE7JGXU8/hq720.jpg",
    movie_name: "The Studio — Official Trailer | Apple TV+",
    description: "Hollywood plays itself, starring Seth Rogen.",
    genres: ["Comedy"],
  },
  {
    video_link: "https://www.youtube.com/shorts/F6tH_L0a688",
    thumbnail: "https://i.ytimg.com/vi/F6tH_L0a688/hq720_2.jpg",
    movie_name: "🔥 Smoke | Official Series Trailer | Apple TV+ #smokeseries", // This is a series, but listed under movies
    description: "High-profile arsons unravel balance of power.",
    genres: ["Drama", "Crime", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=SIAG8mCnIMs",
    thumbnail: "https://i.ytimg.com/vi/SIAG8mCnIMs/hq720.jpg",
    movie_name: "THE GORGE Trailer (2025) Apple TV+",
    description: "Action thriller.",
    genres: ["Action", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=-BLM1naCfME",
    thumbnail: "https://i.ytimg.com/vi/-BLM1naCfME/hq720.jpg",
    movie_name: "Tetris — Official Trailer | Apple TV+",
    description: "Story behind the iconic game.",
    genres: ["Drama", "Biography", "History"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=bdX456spjeA", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/bdX456spjeA/hq720.jpg",
    movie_name: "Smoke — Official Trailer | Apple TV+",
    description: "Created by Dennis Lehane.",
    genres: ["Drama", "Crime", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=N4cgw8aOJBw", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/N4cgw8aOJBw/hq720.jpg",
    movie_name: "Highest 2 Lowest — Official Teaser | Apple TV+",
    description: "Music mogul targeted with a ransom.",
    genres: ["Drama", "Thriller", "Music"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=gyu1UAtbwAo", // Also in TV shows
    thumbnail: "https://i.ytimg.com/vi/gyu1UAtbwAo/hq720.jpg",
    movie_name: "Long Way Home — Official Trailer | Apple TV+",
    description: "Ewan and Charley ride vintage motorbikes.",
    genres: ["Documentary", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=Nnn02jJf5ys",
    thumbnail: "https://i.ytimg.com/vi/Nnn02jJf5ys/hq720.jpg",
    movie_name: "Platonic — Official Trailer | Apple TV+",
    description: "Comedy with Seth Rogen and Rose Byrne.",
    genres: ["Comedy", "Romance"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=wLJUPjiRbAM",
    thumbnail: "https://i.ytimg.com/vi/wLJUPjiRbAM/hq720.jpg",
    movie_name: "WOLFS — Official Trailer | Apple TV+",
    description: "George Clooney and Brad Pitt reunite.",
    genres: ["Action", "Comedy", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=hltnbv3DDqA",
    thumbnail: "https://i.ytimg.com/vi/hltnbv3DDqA/hq720.jpg",
    movie_name: "Elite Snipers VS. Monsters - THE GORGE Trailer (2025)",
    description: "Action monster movie.",
    genres: ["Action", "Horror", "Sci-Fi"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=-7S28bH8iDs",
    thumbnail: "https://i.ytimg.com/vi/-7S28bH8iDs/hq720.jpg",
    movie_name: "Fountain of Youth — Official Trailer 2 | Apple TV+",
    description: "Adventure film.",
    genres: ["Adventure", "Action", "Fantasy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=2QP-xrG0kZk",
    thumbnail: "https://i.ytimg.com/vi/2QP-xrG0kZk/hq720.jpg",
    movie_name: "Extrapolations — Official Trailer | Apple TV+",
    description: "Drama about the near future.",
    genres: ["Drama", "Sci-Fi"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=RePjWY4ESyQ",
    thumbnail: "https://i.ytimg.com/vi/RePjWY4ESyQ/hq720.jpg",
    movie_name: "Dope Thief — Official Trailer | Apple TV+",
    description: "Friends pose as DEA agents.",
    genres: ["Crime", "Drama", "Thriller"],
  },
]

export const movies: MediaItem[] = rawMovieData
  .map((movie, index) => {
    const videoId = extractYouTubeVideoId(movie.video_link)
    // Use 'movie_name' or 'title' if present, otherwise 'name'
    const title = (movie as any).movie_name || (movie as any).title || (movie as any).name
    const thumbnail = (movie as any).thumbnail || (movie as any).image

    return {
      id: videoId || `movie-${index}`,
      youtube_video_id: videoId || "",
      youtube_thumbnail: getImageUrl(thumbnail, videoId),
      title: title,
      description: movie.description,
      genres: movie.genres || ["Drama"], // Default genres
      categories: ["Trailer"],
      resource_type: "movie",
    }
  })
  .filter((movie) => movie.youtube_video_id && movie.title)
