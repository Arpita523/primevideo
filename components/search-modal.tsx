"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { MediaItem } from "@/types/kinocheck"
import { getAllMovies, getAllTvShows, getShortTitle } from "@/lib/api" // Assuming these are async now
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<MediaItem[]>([])
  const [allMedia, setAllMedia] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchAllMedia() {
      setIsLoading(true)
      try {
        const movies = await getAllMovies()
        const tvShows = await getAllTvShows()
        setAllMedia([...movies, ...tvShows])
      } catch (error) {
        console.error("Error fetching media for search:", error)
        setAllMedia([])
      }
      setIsLoading(false)
    }
    fetchAllMedia()
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredResults = allMedia.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setResults(filteredResults.slice(0, 10)) // Limit to 10 results
    } else {
      setResults([])
    }
  }, [searchTerm, allMedia])

  const handleResultClick = (videoId: string) => {
    router.push(`/watch/${videoId}`)
    onClose()
    setSearchTerm("")
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-center items-start pt-16 md:pt-24"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-neutral-800 w-full max-w-xl rounded-lg shadow-2xl mx-4 p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex items-center border-b border-neutral-700 p-3">
          <Search className="h-5 w-5 text-neutral-400 mr-3 ml-1" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search movies and TV shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-neutral-500 text-lg h-auto py-2"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchTerm("")}
              className="text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && searchTerm.length > 1 && (
            <p className="p-4 text-neutral-400 text-center">Loading search results...</p>
          )}
          {!isLoading && results.length === 0 && searchTerm.length > 1 && (
            <p className="p-4 text-neutral-400 text-center">No results found for "{searchTerm}"</p>
          )}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleResultClick(item.youtube_video_id)}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-700/70 transition-colors flex items-center gap-3"
                  >
                    <div className="relative w-16 h-9 rounded overflow-hidden shrink-0">
                      <Image
                        src={item.youtube_thumbnail || "/placeholder.svg"}
                        alt={getShortTitle(item.title)}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p className="text-white truncate font-medium">{getShortTitle(item.title)}</p>
                      <p className="text-neutral-400 text-xs truncate">{item.description}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && searchTerm.length <= 1 && (
            <p className="p-8 text-neutral-500 text-center text-sm">Type at least 2 characters to search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
