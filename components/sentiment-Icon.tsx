import { neutralLimit } from "@/lib/constants"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"

export const getSentimentIcon = (sentiment: number) => {
    if (sentiment > neutralLimit) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (sentiment < -neutralLimit) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-yellow-500" />
  }