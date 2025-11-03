"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full border-border bg-transparent hover:bg-secondary/50"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  )
}
