import type { MediaItem } from "@/types/kinocheck"
import { extractYouTubeVideoId } from "@/lib/youtube-utils"

// Helper to generate a placeholder image URL if actual image is missing
const getImageUrl = (providedImage: string | undefined, videoId: string | null): string => {
  if (providedImage && providedImage.startsWith("http")) return providedImage
  if (videoId) return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
  return "/placeholder.svg?width=300&height=170" // Fallback placeholder
}

const rawIndianMovieData = [
  {
    video_link: "https://www.youtube.com/watch?v=dK1W-AViQ-M",
    thumbnail: "https://i.ytimg.com/vi/dK1W-AViQ-M/hq720.jpg",
    title: "WAR 2 | Official Teaser | Hrithik Roshan | NTR | Kiara Advani",
    description: "YRF Spy Universe action thriller.",
    genres: ["Action", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=xGQuT1wm2qk",
    thumbnail: "https://i.ytimg.com/vi/xGQuT1wm2qk/hq720.jpg",
    title: "Housefull 5 | Official Trailer",
    description: "Comedy film with an ensemble cast.",
    genres: ["Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=8E_IeWynvnc",
    thumbnail: "https://i.ytimg.com/vi/8E_IeWynvnc/hq720.jpg",
    title: "Bhool Chuk Maaf | Official Trailer | Rajkummar R | Wamiqa G",
    description: "Romantic comedy about a wedding.",
    genres: ["Comedy", "Romance"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=nF31d_f4n_A",
    thumbnail: "https://i.ytimg.com/vi/nF31d_f4n_A/hq720.jpg",
    title: "Saiyaara | Official Teaser | Ahaan Panday | Aneet Padda",
    description: "Romantic drama by Mohit Suri.",
    genres: ["Romance", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=zsDSJRnoN7w",
    thumbnail: "https://i.ytimg.com/vi/zsDSJRnoN7w/hq720.jpg",
    title: "Chidiya - Official Trailer | Vinay Pathak | Amruta Subhash",
    description: "Drama film featuring Vinay Pathak.",
    genres: ["Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=r-7g08INMSI",
    thumbnail: "https://i.ytimg.com/vi/r-7g08INMSI/hq720.jpg",
    title: "KESARI CHAPTER 2 - OFFICIAL TRAILER | Akshay Kumar",
    description: "Historical action drama.",
    genres: ["Action", "Drama", "History"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=PoJ70Xxw1cY",
    thumbnail: "https://i.ytimg.com/vi/PoJ70Xxw1cY/hq720.jpg",
    title: "Toaster | Official Teaser | Rajkummar Rao, Sanya Malhotra",
    description: "Comedy drama on Netflix.",
    genres: ["Comedy", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=AEdb8sQp3qA",
    thumbnail: "https://i.ytimg.com/vi/AEdb8sQp3qA/hq720.jpg",
    title: "WAR 2 Official Teaser | Tamil",
    description: "Tamil version of the action thriller.",
    genres: ["Action", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=ALaTpllzI50",
    thumbnail: "https://i.ytimg.com/vi/ALaTpllzI50/hq720.jpg",
    title: "Stolen - Official Trailer | Prime Video India",
    description: "Thriller on Prime Video.",
    genres: ["Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=GoJXALuvP_g",
    thumbnail: "https://i.ytimg.com/vi/GoJXALuvP_g/hq720.jpg",
    title: "Thug Life - Hindi Trailer | Kamal Haasan | Mani Ratnam",
    description: "Action film by Mani Ratnam.",
    genres: ["Action", "Crime"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=LIk-Nemp-Y8",
    thumbnail: undefined, // Missing thumbnail in provided data
    title: "The Traitors - Official Trailer | Prime Video India",
    description: "Reality show on Prime Video.",
    genres: ["Reality"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=9Dve2VMOv5U",
    thumbnail: undefined,
    title: "WAR 2 Official Teaser | Telugu",
    description: "Telugu version of the action thriller.",
    genres: ["Action", "Thriller"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=d-dPJFzqU78",
    thumbnail: undefined,
    title: "Rana Naidu: Season 2 | Official Teaser | Netflix",
    description: "Action crime drama series.",
    genres: ["Action", "Crime", "Drama"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=e2eX1HGeBFE",
    thumbnail: undefined,
    title: "Housefull 5 | Official Teaser",
    description: "Teaser for the comedy film.",
    genres: ["Comedy"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=_R66K_KnNeg",
    thumbnail: undefined,
    title: "Kannappa (Official Teaser -2) Hindi | Vishnu Manchu | Prabhas",
    description: "Mythological epic film.",
    genres: ["Action", "Drama", "History"],
  },
  {
    video_link: "https://www.youtube.com/watch?v=6QudgN2wmv0",
    thumbnail: undefined,
    title: "Kapkapiii Official Trailer | Shreyas T, Tusshar K",
    description: "Horror comedy film.",
    genres: ["Horror", "Comedy"],
  },
]

export const indianMovies: MediaItem[] = rawIndianMovieData
  .map((movie, index) => {
    const videoId = extractYouTubeVideoId(movie.video_link)
    return {
      id: videoId || `indian-movie-${index}`,
      youtube_video_id: videoId || "",
      youtube_thumbnail: getImageUrl(movie.thumbnail, videoId),
      title: movie.title,
      description: movie.description,
      genres: movie.genres || ["Drama"], // Default genre if not specified
      categories: ["Trailer", "Indian Cinema"],
      resource_type: "movie",
    }
  })
  .filter((movie) => movie.youtube_video_id)
