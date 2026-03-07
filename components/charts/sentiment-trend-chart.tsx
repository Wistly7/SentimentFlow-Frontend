"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

const mockData = [
  { date: "Jan 1", sentiment: 0.2, articles: 45 },
  { date: "Jan 8", sentiment: 0.35, articles: 52 },
  { date: "Jan 15", sentiment: 0.15, articles: 38 },
  { date: "Jan 22", sentiment: 0.45, articles: 67 },
  { date: "Jan 29", sentiment: 0.28, articles: 41 },
  { date: "Feb 5", sentiment: 0.52, articles: 73 },
  { date: "Feb 12", sentiment: 0.38, articles: 59 },
  { date: "Feb 19", sentiment: 0.65, articles: 84 },
  { date: "Feb 26", sentiment: 0.42, articles: 61 },
  { date: "Mar 5", sentiment: 0.78, articles: 92 },
]

interface SentimentTrendChartProps {
  title?: string
  description?: string
  data?: typeof mockData
}

export function SentimentTrendChart({
  title = "Sentiment Trend",
  description = "Average sentiment score over time",
  data = mockData,
}: SentimentTrendChartProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sentiment: {
              label: "Sentiment Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#a0a0a0" fontSize={12} />
              <YAxis stroke="#a0a0a0" fontSize={12} domain={[-1, 1]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#8a2be2"
                strokeWidth={3}
                dot={{ fill: "#8a2be2", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#8a2be2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
