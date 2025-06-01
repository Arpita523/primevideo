import type { MediaItem } from "@/types/kinocheck"
import { extractYouTubeVideoId } from "@/lib/youtube-utils"

// Helper to generate a placeholder image URL if actual image is missing
const getImageUrl = (providedImage: string | undefined, videoId: string | null): string => {
  if (providedImage && providedImage.startsWith("http")) return providedImage
  if (videoId) return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
  return "/placeholder.svg?width=300&height=170" // Fallback placeholder
}

const rawTvShowData = [
  {
    video_link: "https://www.youtube.com/watch?v=uQx8jKiIDTI",
    image: "https://i.ytimg.com/vi/uQx8jKiIDTI/hq720.jpg",
    name: "Wednesday: Season 2 | Official Teaser Trailer | Netflix",
    description: "She's back. Watch the first official teaser",
    genres: ["Fantasy", "Comedy", "Mystery"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=Q3EASLgzOcM",
    image: "https://i.ytimg.com/vi/Q3EASLgzOcM/hq720.jpg",
    name: "HOLLYWOOD | Official Trailer | Netflix",
    description: "What if you could rewrite the story? Official",
    genres: ["Drama", "History"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=WpW36ldAqnM",
    image: "https://i.ytimg.com/vi/WpW36ldAqnM/hq720.jpg",
    name: "Marvel Television's Ironheart | Official Trailer | Disney+",
    description: "Iconic #Ironheart, Marvel",
    genres: ["Action", "Sci-Fi", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=oFkbsEKaoSE",
    image: "https://i.ytimg.com/vi/oFkbsEKaoSE/hq720.jpg",
    name: "Predator: Badlands | Teaser Trailer",
    description: "The director of Prey welcomes you to a world of hurt.",
  }, // Note: Image was missing in provided data, using movie one
  {
    video_link: "https://www.youtube.com/watch?v=YBwoSa3n8Yc",
    image: "https://i.ytimg.com/vi/YBwoSa3n8Yc/hq720.jpg",
    name: "Dirty Angels (2024) Official Trailer - Eva Green",
    description: "Dirty Angels - Watch the",
  }, // Note: Image was missing, using a placeholder logic if needed or find one
  {
    video_link: "https://www.youtube.com/watch?v=xRWYNpg5YRA",
    image: "https://i.ytimg.com/vi/xRWYNpg5YRA/hq720.jpg",
    name: "The Home (2025) Official Trailer - Pete Davidson",
    description: "The Home - Watch the",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=6HG-wsRsg8s",
    image: "https://i.ytimg.com/vi/6HG-wsRsg8s/hq720.jpg",
    name: "IT: Welcome to Derry | Official Teaser | HBO Max",
    description: "Get ready to go back to where IT all began...",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=tbbveDpUZv4",
    image: "https://i.ytimg.com/vi/tbbveDpUZv4/hq720.jpg",
    name: "Willow | Official Teaser Trailer | Disney+",
    description: "This fall, a new adventure begins. ✨ Watch the teaser",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=V0jHMoDHmZw",
    image: "https://i.ytimg.com/vi/V0jHMoDHmZw/hq720.jpg",
    name: "Wednesday: Season 2 | Official Teaser Trailer | Netflix",
    description: "She's back. Watch the first official teaser",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=7Rg0y7NT1gU",
    image: "https://i.ytimg.com/vi/7Rg0y7NT1gU/hq720.jpg",
    name: "SEE — Official Trailer | Apple TV+",
    description: "SEE — Official Trailer | Apple TV+",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=qKGgw7Ob5f4",
    image: "https://i.ytimg.com/vi/qKGgw7Ob5f4/hq720.jpg",
    name: "MobLand | Official Trailer | Paramount+",
    description: "New",
  },// Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=nxSpZ9khchU",
    image: "https://i.ytimg.com/vi/nxSpZ9khchU/hq720.jpg",
    name: "Sirens | Official Trailer | Netflix",
    description: "Sirens | Official Trailer | Netflix",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=9KVG_X_7Naw",
    image: "https://i.ytimg.com/vi/9KVG_X_7Naw/hq720.jpg",
    name: "Tron: Ares | Official Trailer",
    description: "Tron: Ares | Official Trailer",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=LIk-Nemp-Y8",
    image: "https://i.ytimg.com/vi/LIk-Nemp-Y8/hq720.jpg", // Assuming image if not specified
    name: "The Traitors - Official Trailer | Prime Video India",
    description: "Prime Video India Presents The Traitors Official",
    genres: ["Reality"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=OpThntO9ixc",
    image: "https://i.ytimg.com/vi/OpThntO9ixc/hq720.jpg",
    name: "Weapons | Official Trailer",
    description: "Weapons | Official Trailer",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=kQdEHQLHDAI",
    image: "https://i.ytimg.com/vi/kQdEHQLHDAI/hq720.jpg",
    name: "YOU: Season 5 | Official Trailer | Netflix",
    description: "All eyes on you, Joe Goldberg. The killer final",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=_zHPsmXCjB0",
    image: "https://i.ytimg.com/vi/_zHPsmXCjB0/hq720.jpg",
    name: "The Last of Us Season 2 | Official Trailer | Max",
    description: "The Last of Us Season 2 | Official Trailer | Max",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=Wk5OxqtpBR4",
    image: "https://i.ytimg.com/vi/Wk5OxqtpBR4/hq720.jpg",
    name: "Adolescence | Official Trailer | Netflix",
    description: "Adolescence | Official Trailer | Netflix",
  }, // Note: Image was missing
  {
    video_link: "https://www.youtube.com/watch?v=4A_kmjtsJ7c",
    image: "https://i.ytimg.com/vi/4A_kmjtsJ7c/hq720.jpg",
    name: "Materialists | Official Trailer HD | A24",
    description: "Materialists | Official Trailer HD | A24",
  }, // Note: Image was missing
  // New Apple TV+ Data
  {
    video_link: "https://www.youtube.com/watch?v=bdX456spjeA",
    thumbnail: "https://i.ytimg.com/vi/bdX456spjeA/hq720.jpg",
    title: "Smoke — Official Trailer | Apple TV+",
    description: "Mysterious arsons unravel a city's balance of power.",
    genres: ["Drama", "Thriller", "Crime"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=vEioDeOiqEs",
    thumbnail: "https://i.ytimg.com/vi/vEioDeOiqEs/hq720.jpg",
    title: "Murderbot — Official Trailer | Apple TV+",
    description: "A rogue security android that would rather watch TV.",
    genres: ["Sci-Fi", "Action", "Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=5bMCpnEi4k0",
    thumbnail: "https://i.ytimg.com/vi/5bMCpnEi4k0/hq720.jpg",
    title: "Foundation — Season 3 Official Teaser | Apple TV+",
    description: "Intricate world-building and stunning visuals.",
    genres: ["Sci-Fi", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=72oB_zVF_6o",
    thumbnail: "https://i.ytimg.com/vi/72oB_zVF_6o/hq720.jpg",
    title: "Stick — Official Trailer | Apple TV+",
    description: "Owen Wilson as an over-the-hill, ex-pro golfer.",
    genres: ["Comedy", "Drama", "Sports"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=-wivhNHtkMo",
    thumbnail: "https://i.ytimg.com/vi/-wivhNHtkMo/hq720.jpg",
    title: "Not A Box — Official Trailer | Apple TV+",
    description: "Animated series about imagination.", // Assuming based on title
    genres: ["Animation", "Kids", "Family"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=EIQuE7JGXU8",
    thumbnail: "https://i.ytimg.com/vi/EIQuE7JGXU8/hq720.jpg",
    title: "The Studio — Official Trailer | Apple TV+",
    description: "Hollywood plays itself, starring Seth Rogen.",
    genres: ["Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=ktzAq7wjJgs",
    thumbnail: "https://i.ytimg.com/vi/ktzAq7wjJgs/hq720.jpg",
    title: "Loot — Official Trailer | Apple TV+",
    description: "Molly Novak figures out what to do with her $87 billion settlement.",
    genres: ["Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=IZNDMHe4Ydw",
    thumbnail: "https://i.ytimg.com/vi/IZNDMHe4Ydw/hq720.jpg",
    title: "Severance Season 3 | Trailer | Apple TV +",
    description: "Continuation of the mystery thriller series.",
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=1gB9h0ELEf0",
    thumbnail: "https://i.ytimg.com/vi/1gB9h0ELEf0/hq720.jpg",
    title: "Fountain of Youth — Official Trailer | Apple TV+",
    description: "Adventure film with John Krasinski, Natalie Portman.",
    genres: ["Adventure", "Action"], // Could be movie, but listed under series here
  },
  {
    video_link: "https://www.youtube.com/watch?v=gyu1UAtbwAo",
    thumbnail: "https://i.ytimg.com/vi/gyu1UAtbwAo/hq720.jpg",
    title: "Long Way Home — Official Trailer | Apple TV+",
    description: "Ewan and Charley ride vintage motorbikes.",
    genres: ["Documentary", "Adventure"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=-VIAsu_G7so",
    thumbnail: "https://i.ytimg.com/vi/-VIAsu_G7so/hq720.jpg",
    title: "Chief of War — Official Teaser | Apple TV+",
    description: "Epic saga of Hawaiʻi's untold story.",
    genres: ["Drama", "History", "Action"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=xEQP4VVuyrY",
    thumbnail: "https://i.ytimg.com/vi/xEQP4VVuyrY/hq720.jpg",
    title: "Severance — Official Trailer | Apple TV+",
    description: "Perfect work/life balance mystery.",
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=7Rg0y7NT1gU",
    thumbnail: "https://i.ytimg.com/vi/7Rg0y7NT1gU/hq720.jpg",
    title: "SEE — Official Trailer | Apple TV+",
    description: "Future where humankind is blind, starring Jason Momoa.",
    genres: ["Sci-Fi", "Action", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=9SSHhQRsYcM",
    thumbnail: "https://i.ytimg.com/vi/9SSHhQRsYcM/hq720.jpg",
    title: "Shantaram — Official Trailer | Apple TV+",
    description: "Escaped convict Lin Ford in 1980s Bombay.",
    genres: ["Drama", "Crime", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=ZNSY3lMioHs",
    thumbnail: "https://i.ytimg.com/vi/ZNSY3lMioHs/hq720.jpg",
    title: "Presumed Innocent — Official Trailer | Apple TV+",
    description: "Legal thriller series.",
    genres: ["Drama", "Crime", "Thriller", "Mystery"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=N4cgw8aOJBw",
    thumbnail: "https://i.ytimg.com/vi/N4cgw8aOJBw/hq720.jpg",
    title: "Highest 2 Lowest — Official Teaser | Apple TV+",
    description: "Music mogul targeted with a ransom.",
    genres: ["Drama", "Thriller", "Music"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=3_y2j72Cfe4",
    thumbnail: "https://i.ytimg.com/vi/3_y2j72Cfe4/hq720.jpg",
    title: "Drops of God — Official Trailer | Apple TV+",
    description: "Series about oenology and inheritance.",
    genres: ["Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=4w1xZA7pX2c",
    thumbnail: "https://i.ytimg.com/vi/4w1xZA7pX2c/hq720.jpg",
    title: "The Crowded Room — Official Trailer | Apple TV+",
    description: "Psychological thriller with Tom Holland.",
    genres: ["Drama", "Thriller", "Crime"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=iVRFMd6dEOE",
    thumbnail: "https://i.ytimg.com/vi/iVRFMd6dEOE/hq720.jpg",
    title: "Your Friends & Neighbors — Official Trailer | Apple TV+",
    description: "Jon Hamm stars in this drama.",
    genres: ["Drama", "Comedy"],
  },
]

export const tvShows: MediaItem[] = rawTvShowData
  .map((show, index) => {
    const videoId = extractYouTubeVideoId(show.video_link)
    // Use 'title' if present (from new data), otherwise 'name' (from old data)
    const title = (show as any).title || (show as any).name
    const thumbnail = (show as any).thumbnail || (show as any).image

    return {
      id: videoId || `tvshow-${index}`,
      youtube_video_id: videoId || "",
      youtube_thumbnail: getImageUrl(thumbnail, videoId),
      title: title,
      description: show.description,
      genres: show.genres || ["Drama"], // Default genres
      categories: ["Trailer"],
      resource_type: "series",
    }
  })
  .filter((show) => show.youtube_video_id && show.title)
