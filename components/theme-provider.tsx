"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem storageKey="jeev-theme" {...props}>
      {children}
    </NextThemesProvider>
  )
}
