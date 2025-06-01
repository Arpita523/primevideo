import type React from "react"

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</> // This layout will not include the main Header
}
