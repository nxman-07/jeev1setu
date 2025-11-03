import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import ThemeProvider from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JEEV-1-SETU - Health Management ERP",
  description: "Universal patient health records with FHIR-based interoperability",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} antialiased bg-background text-foreground`}>
        <Suspense fallback={null}>
          <ThemeProvider>{children}</ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
