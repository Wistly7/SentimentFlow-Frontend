import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import QueryProvider from "@/lib/queryProvider"
import { AuthProvider } from "@/context/AuthContext"
import { cookies } from "next/headers"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "SentimentFlow - Startup Sentiment Analysis",
  description: "AI-powered media sentiment tracking for Indian startups",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <QueryProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
          <Toaster/>
        </QueryProvider>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async />
      </body>
    </html>
  )
}
