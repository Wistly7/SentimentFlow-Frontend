"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { BarChart3 } from "lucide-react"

const mockData = [
  { name: "Positive", value: 1834, color: "#22c55e" },
  { name: "Neutral", value: 892, color: "#eab308" },
  { name: "Negative", value: 456, color: "#ef4444" },
]

interface SentimentDistributionChartProps {
  title?: string
  description?: string
  data?: typeof mockData
}

export function SentimentDistributionChart({
  title = "Sentiment Distribution",
  description = "Article sentiment breakdown",
  data = mockData,
}: SentimentDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-accent" />
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
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} articles (${((value / total) * 100).toFixed(1)}%)`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(106, 13, 173, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#f0f0f0",
                }}
              />
              <Legend
                wrapperStyle={{ color: "#f0f0f0" }}
                formatter={(value) => <span style={{ color: "#f0f0f0" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.name} ({((item.value / total) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
