"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText } from "lucide-react"

const mockData = [
  { date: "Jan 1", positive: 25, negative: 8, neutral: 12 },
  { date: "Jan 8", positive: 32, negative: 12, neutral: 18 },
  { date: "Jan 15", positive: 18, negative: 15, neutral: 25 },
  { date: "Jan 22", positive: 45, negative: 10, neutral: 22 },
  { date: "Jan 29", positive: 28, negative: 18, neutral: 15 },
  { date: "Feb 5", positive: 52, negative: 8, neutral: 28 },
  { date: "Feb 12", positive: 38, negative: 14, neutral: 31 },
  { date: "Feb 19", positive: 65, negative: 6, neutral: 23 },
  { date: "Feb 26", positive: 42, negative: 16, neutral: 19 },
  { date: "Mar 5", positive: 78, negative: 4, neutral: 18 },
]

interface ArticleVolumeChartProps {
  title?: string
  description?: string
  data?: typeof mockData
}

export function ArticleVolumeChart({
  title = "Article Volume",
  description = "Daily article count by sentiment",
  data = mockData,
}: ArticleVolumeChartProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-accent" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            positive: { label: "Positive", color: "#22c55e" },
            neutral: { label: "Neutral", color: "#eab308" },
            negative: { label: "Negative", color: "#ef4444" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#a0a0a0" fontSize={12} />
              <YAxis stroke="#a0a0a0" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
