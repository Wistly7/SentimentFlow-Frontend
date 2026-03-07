"use client"

import { useEffect, useRef } from "react"
import { WaterflowBackground } from "@/components/waterflow-background"
import { LiquidGlassNavbar } from "@/components/liquid-glass-navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SentimentTrendChart } from "@/components/charts/sentiment-trend-chart"
import { SentimentDistributionChart } from "@/components/charts/sentiment-distribution-chart"
import { StartupComparisonChart } from "@/components/charts/startup-comparison-chart"
import { ArticleVolumeChart } from "@/components/charts/article-volume-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"
import { TwinklingStars } from "@/components/twinkling-stars"

export default function AnalyticsPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        gsap.fromTo(
          contentRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        )
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WaterflowBackground />
      
      <DashboardSidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Analytics Dashboard"
          subtitle="Comprehensive sentiment analysis and data visualization"
        />

        <main className="p-6" ref={contentRef}>
          {/* Controls */}
          <Card className="bg-card/80 backdrop-blur-sm border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analytics Controls</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-40 bg-input border-border text-foreground">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 3 Months</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-accent" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-input border-border text-foreground">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="foodtech">Foodtech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SentimentTrendChart />
            <SentimentDistributionChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <StartupComparisonChart />
            <ArticleVolumeChart />
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Startups</CardTitle>
                <CardDescription>Highest sentiment scores this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Zomato", score: 0.78, change: "+12%" },
                    { name: "Swiggy", score: 0.65, change: "+8%" },
                    { name: "Flipkart", score: 0.56, change: "+15%" },
                    { name: "Ola", score: 0.34, change: "+5%" },
                  ].map((startup, index) => (
                    <div key={startup.name} className="flex items-center justify-between p-2 rounded bg-secondary/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-accent">#{index + 1}</span>
                        <span className="text-sm text-foreground">{startup.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-500">+{startup.score}</div>
                        <div className="text-xs text-muted-foreground">{startup.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg">Most Active Sources</CardTitle>
                <CardDescription>Top news sources by article count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Economic Times", articles: 145 },
                    { name: "TechCrunch", articles: 98 },
                    { name: "YourStory", articles: 87 },
                    { name: "LiveMint", articles: 76 },
                  ].map((source, index) => (
                    <div key={source.name} className="flex items-center justify-between p-2 rounded bg-secondary/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-accent">#{index + 1}</span>
                        <span className="text-sm text-foreground">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{source.articles}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg">Sentiment Alerts</CardTitle>
                <CardDescription>Recent significant changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                    <div className="text-sm font-medium text-green-500">Positive Spike</div>
                    <div className="text-xs text-muted-foreground">Zomato +25% in 24h</div>
                  </div>
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                    <div className="text-sm font-medium text-red-500">Negative Trend</div>
                    <div className="text-xs text-muted-foreground">Byju's -18% this week</div>
                  </div>
                  <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                    <div className="text-sm font-medium text-yellow-500">Volume Alert</div>
                    <div className="text-xs text-muted-foreground">Paytm 3x normal coverage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
