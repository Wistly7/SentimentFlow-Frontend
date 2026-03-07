"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, ArrowRight } from "lucide-react"
import { StartupResult, } from "@/types/types"
import { getSentiment, getSentimentBadgeColor, getSentimentColor } from "@/lib/helper"
import { getSentimentIcon } from "./sentiment-Icon"
import { Avatar } from "./ui/avatar"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { neutralLimit } from "@/lib/constants"




interface SearchResultsProps {
  results: StartupResult[]
  loading: boolean
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  const router = useRouter()
  const handleStartupClick = (startupId: string, startupName: string) => {
    router.push(`/dashboard/company/${startupId}`)
  }
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card/80 backdrop-blur-sm border-border animate-pulse">
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-full" />
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />

            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
          <p className="text-muted-foreground">Try adjusting your search query or filters to find more startups.</p>
        </CardContent>
      </Card>
    )
  }
  const getCardBorder = (sentimentScores: number) => {
    if (sentimentScores >= neutralLimit) {
      return "border-l-green-400"
    } else if (sentimentScores <= -neutralLimit) {
      return "border-l-red-400"
    } else {
      return "border-l-amber-400"
    }
  }
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-6 max-sm:py-2 ">
      {results.map((result) => (
        
        <Card
          key={result.id}
          className={` backdrop-blur-sm   border-l-6 ${getCardBorder(result.avg_sentiment_score)} transition-all duration-200 group cursor-pointer`}
          onClick={() => handleStartupClick(result.id, result.name)}
        >
          <CardHeader>
            <Avatar className="m-auto xl:size-30 size-20  bg-blue-200 rounded-lg" >
              <Image src={result.imageUrl!=null ?result.imageUrl!:"/company-default.jpg"} alt={result.name} fill className="w-full h-full" />
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex  items-center space-x-2 text-foreground group-hover:text-accent transition-colors">
                  <span className="xl:text-lg lg:text-md text-sm">{result.name}</span>
                  {getSentimentIcon(result?.avg_sentiment_score!)}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-muted-foreground">{result?.sector.name}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getSentimentBadgeColor(result?.avg_sentiment_score!)}>{getSentiment(result?.avg_sentiment_score!)}</Badge>
                <span className={`text-sm font-medium ${getSentimentColor(result?.avg_sentiment_score!)}`}>
                  {result?.avg_sentiment_score! > 0 ? "+" : ""}
                  {result?.avg_sentiment_score!.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="text-neutral-400 line-clamp-6">
              {result.description}

            </div>
          </CardContent>


        </Card>
      ))}
    </div>
  )
}
