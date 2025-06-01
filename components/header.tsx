"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, UserCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import SearchModal from "./search-modal"
import CategoryMenu from "./category-menu"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv-shows", label: "TV shows" },
  { href: "/", label: "Live TV" }, // Points to home for now
]

const secondaryNavItems = [{ href: "/", label: "Prime" }] // Points to home for now

const profileUsers = [
  { name: "User 1", avatar: "/user-avatar.avif" }, // Using the provided avatar for all for now
  { name: "User 2", avatar: "/user-avatar.avif" },
  { name: "User 3", avatar: "/user-avatar.avif" },
  { name: "User 4", avatar: "/user-avatar.avif" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png"
              alt="Logo"
              width={90}
              height={28}
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <span className="text-muted-foreground">|</span>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <CategoryMenu />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user-avatar.avif" alt="User Profile" />
                  <AvatarFallback>
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-neutral-800 border-neutral-700 text-white p-2" align="end">
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-neutral-300">
                Choose profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-700" />
              <DropdownMenuGroup>
                {profileUsers.map((user) => (
                  <DropdownMenuItem
                    key={user.name}
                    className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer flex items-center gap-3 p-2"
                    onSelect={(e) => e.preventDefault()} // Prevent closing, do nothing on click
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/join-prime" passHref>
            <Button className="hidden md:inline-flex bg-sky-500 hover:bg-sky-600 text-white">Join Prime</Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-neutral-900 border-neutral-800">
              <nav className="flex flex-col gap-4 p-4">
                {navItems.concat(secondaryNavItems).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/join-prime" passHref>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white mt-4 w-full">Join Prime</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
