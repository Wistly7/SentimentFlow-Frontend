"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, Settings, Menu, LogOut } from "lucide-react"
import { ResponsiveSidebar } from "./responsive-sidebar"
import { useAuth } from "@/context/AuthContext"

interface ResponsiveDashboardHeaderProps {
  title: string
  subtitle?: string
}

export function ResponsiveDashboardHeader({ title, subtitle }: ResponsiveDashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {handleSignOut}=useAuth();
  return (
    <>
      <header className="bg-card/80 backdrop-blur-md border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            
            
            <Button variant="ghost" size="icon" className="text-foreground hover:text-accent" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <ResponsiveSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}
