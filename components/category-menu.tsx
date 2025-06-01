"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"
import Link from "next/link"
import { ALL_GENRES } from "@/lib/genres" // Using the main genre list

// Example featured collections, you can customize these
const featuredCollections = [
  { name: "New Releases", slug: "new-releases" },
  { name: "Critically Acclaimed", slug: "critically-acclaimed" },
  // Add more or fetch dynamically if needed
]

export default function CategoryMenu() {
  // Take a subset of genres for the dropdown or manage them differently if the list is too long
  const displayGenres = ALL_GENRES.slice(0, 10) // Display first 10 genres for example

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Categories</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96 bg-neutral-800 border-neutral-700 text-white p-0">
        <div className="flex">
          <div className="w-1/2 p-2">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-neutral-400 uppercase">
              Genres
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {displayGenres.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  asChild
                  className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer"
                >
                  <Link
                    href={`/genre/${encodeURIComponent(genre.toLowerCase().replace(/ /g, "-"))}`}
                    className="block px-2 py-1.5 text-sm"
                  >
                    {genre}
                  </Link>
                </DropdownMenuItem>
              ))}
              {ALL_GENRES.length > displayGenres.length && (
                <DropdownMenuItem asChild className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer">
                  <Link href={`/genres`} className="block px-2 py-1.5 text-sm text-sky-400">
                    View All Genres...
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </div>
          <div className="w-px bg-neutral-700 my-2"></div> {/* Vertical Separator */}
          <div className="w-1/2 p-2">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-neutral-400 uppercase">
              Featured Collections
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {featuredCollections.map((collection) => (
                <DropdownMenuItem
                  key={collection.name}
                  asChild
                  className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer"
                >
                  {/* Update this link if you create collection pages */}
                  <Link href={`/collection/${collection.slug}`} className="block px-2 py-1.5 text-sm">
                    {collection.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-neutral-700" />
        <div className="p-2 flex justify-center space-x-1.5">
          {/* Example pagination dots, can be made dynamic if content overflows */}
          <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
          <span className="h-1.5 w-1.5 bg-neutral-500 rounded-full"></span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
