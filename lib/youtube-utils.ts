export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null
  let videoId = null
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
      if (urlObj.pathname === "/watch") {
        videoId = urlObj.searchParams.get("v")
      } else if (urlObj.pathname.startsWith("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1].split("?")[0]
      } else if (urlObj.pathname.startsWith("/shorts/")) {
        videoId = urlObj.pathname.split("/shorts/")[1].split("?")[0]
      }
    } else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1).split("?")[0]
    } else if (url.includes("i.ytimg.com/vi/")) {
      // For thumbnail URLs if needed
      const parts = url.split("/vi/")
      if (parts.length > 1) {
        videoId = parts[1].split("/")[0]
      }
    }
  } catch (e) {
    // Fallback for non-URL strings or malformed URLs, try regex
  }

  if (!videoId) {
    // Regex patterns to find video ID from various YouTube URL formats
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct ID
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        videoId = match[1]
        break
      }
    }
  }
  return videoId
}
