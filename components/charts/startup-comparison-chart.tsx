"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Building } from "lucide-react"

const mockData = [
  { name: "Zomato", sentiment: 0.78, articles: 45 },
  { name: "Swiggy", sentiment: 0.65, articles: 38 },
  { name: "Paytm", sentiment: -0.23, articles: 52 },
  { name: "Byju's", sentiment: -0.45, articles: 29 },
  { name: "Ola", sentiment: 0.34, articles: 33 },
  { name: "Flipkart", sentiment: 0.56, articles: 41 },
]

interface StartupComparisonChartProps {
  title?: string
  description?: string
  data?: typeof mockData
}

export function StartupComparisonChart({
  title = "Startup Comparison",
  description = "Sentiment scores across different startups",
  data = mockData,
}: StartupComparisonChartProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-accent" />
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
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#a0a0a0" fontSize={12} domain={[-1, 1]} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [`${value.toFixed(2)}`, "Sentiment Score"]}
              />
              <Bar
                dataKey="sentiment"
                fill={(entry: any) => (entry.sentiment > 0 ? "#22c55e" : "#ef4444")}
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.sentiment > 0 ? "#22c55e" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
