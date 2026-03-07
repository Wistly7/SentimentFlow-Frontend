"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Search, TrendingUp, Settings, User, Bell, BookOpen, Filter, Home, X, LogOut, Newspaper, Loader, Image,  } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const sidebarItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Companies ", href: "/dashboard/search", icon: Search },
  { name: "All News", href: "/dashboard/all-news", icon: Newspaper },
  { name: "Upload Images", href: "/dashboard/upload-image", icon: Image },

]

interface ResponsiveSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ResponsiveSidebar({ isOpen, onClose }: ResponsiveSidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false);
  const authData=useAuth();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.getElementById("mobile-sidebar")
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onClose()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isOpen, onClose])
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg: flex-col fixed left-0 top-0 h-[calc(100vh)] w-64 bg-sidebar/90 backdrop-blur-md border-r border-sidebar-border z-40">
        <Link href="/" className="flex items-center space-x-2 pt-5 justify-center">
          <TrendingUp className="h-8 w-8 " />
          <span className="text-xl font-bold text-foreground">SentimentFlow</span>
        </Link>
        <div className="p-4">
          <nav className="space-y-2">
            {authData.authData.userData?sidebarItems.filter((item)=>{
              if(authData.authData.userData?.roleId==1 && item.name==="Upload Images"){
                return false;
              }
              return true;
            }).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
                
              )
            }):
            <Loader className="animate-spin  m-auto h-full "></Loader>
            }
            
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div
            id="mobile-sidebar"
            className="fixed left-0 top-0 h-full w-64 bg-sidebar/95 backdrop-blur-md border-r border-sidebar-border transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <h2 className="text-lg font-semibold text-sidebar-foreground">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-sidebar-foreground">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <nav className="space-y-2">
                {authData.authData.userData?.roleId? sidebarItems.filter((item)=>{
                  if(authData.authData.userData?.roleId!==2 && item.name==="Upload Images"){
                    return false;
                  }
                  return true;
                  
                }).map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                    
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                }): 
                <Loader className="animate-spin text-purple-300 m-auto"></Loader>
                }
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
