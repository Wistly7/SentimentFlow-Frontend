"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Search, TrendingUp, Settings, User, Bell, BookOpen, Filter, Home } from "lucide-react"

const sidebarItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Search", href: "/search", icon: Search },
  
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-[calc(100vh)] w-64 bg-slate-900/95 backdrop-blur-md border-r border-cyan-500/20 z-40">
      <Link href="/" className="flex items-center space-x-2 pt-5 justify-center">
          <TrendingUp className="h-8 w-8 " />
          <span className="text-xl font-bold text-foreground">SentimentFlow</span>
        </Link>
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 shadow-lg border border-cyan-500/30"
                    : "text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-200 hover:border-cyan-500/20 border border-transparent",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
