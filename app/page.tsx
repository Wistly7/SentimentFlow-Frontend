"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WaterflowBackground } from "@/components/waterflow-background"
import { LiquidGlassNavbar } from "@/components/liquid-glass-navbar"
import { TwinklingStars } from "@/components/twinkling-stars"
import { FairyLights } from "@/components/fairy-lights"
import { TrendingUp, BarChart3, Search, Zap, Globe } from "lucide-react"
import { AuthProvider } from "@/context/AuthContext"

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
        )

        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 30, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.5,
          },
        )

        gsap.fromTo(
          ".stat-item",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 1,
          },
        )
      })
    }
  }, [])

  return (
    <>
    <AuthProvider><LiquidGlassNavbar/></AuthProvider>
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <TwinklingStars />
      <FairyLights />
      <WaterflowBackground />
      

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 px-4 relative z-20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Track <span className="text-accent">Startup Sentiment</span> in Real-Time
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
              Harness the power of AI to analyze media sentiment for Indian startups. Make data-driven decisions with
              quantifiable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg bg-transparent"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Startups
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 px-4 relative z-20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Why Choose <span className="text-accent">SentimentFlow</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border feature-card">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
                <p className="text-muted-foreground">
                  Get instant insights with live sentiment tracking and comprehensive analytics dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border feature-card">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced FinBERT model analyzes news sentiment with high accuracy and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border feature-card">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Indian Startup Focus</h3>
                <p className="text-muted-foreground">
                  Specialized coverage of the Indian startup ecosystem with curated data sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-4 bg-secondary/20 relative z-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Startups Tracked</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <div className="text-muted-foreground">Articles Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Real-Time Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative z-20">
        <div className="container mx-auto text-center">
          <Card className="bg-card border-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join the future of startup sentiment analysis. Make informed decisions with real data.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border relative z-20">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SentimentFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}
