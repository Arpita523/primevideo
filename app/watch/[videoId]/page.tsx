"use client" // Make this a client component to use useRouter

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import VideoPlayer from "@/components/video-player"
import { getItemById, getShortTitle } from "@/lib/api"
import type { MediaItem } from "@/types/kinocheck"
import Link from "next/link"
import { ArrowLeft, DoorClosedIcon as CloseIcon, Home } from "lucide-react" // Changed CloseIcon for better visual
import { Button } from "@/components/ui/button"

interface WatchPageProps {
  params: { videoId: string }
}

export default function WatchPage({ params }: WatchPageProps) {
  const router = useRouter() // Initialize useRouter
  const { videoId } = params
  const [trailerDetails, setTrailerDetails] = useState<MediaItem | null>(null)
  const [title, setTitle] = useState<string>("Video Player")

  useEffect(() => {
    async function fetchDetails() {
      console.log("WatchPage: Fetching details for videoId:", videoId)
      const details = await getItemById(videoId)
      console.log("WatchPage: Fetched details:", details)
      if (details) {
        setTrailerDetails(details)
        setTitle(getShortTitle(details.title))
      } else {
        console.warn("WatchPage: No details found for videoId:", videoId)
        setTitle("Video Not Found")
      }
    }
    if (videoId) {
      fetchDetails()
    }
  }, [videoId])

  const handleBack = () => {
    router.back() // Use router.back()
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {trailerDetails ? (
        <VideoPlayer videoId={trailerDetails.youtube_video_id} title={title} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-xl">
          {title === "Video Player" ? "Loading..." : title}
        </div>
      )}
      <div className="absolute top-4 right-4 z-[100] flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
          onClick={handleBack} // Use onClick handler
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
          asChild
          aria-label="Close Player"
        >
          <Link href="/">
            <CloseIcon className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
          asChild
          aria-label="Go Home"
        >
          <Link href="/">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
