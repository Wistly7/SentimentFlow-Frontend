"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, TrendingUp, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Avatar } from "./ui/avatar"
export function LiquidGlassNavbar() {
  const { authData, handleSignOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="size-4 max-md:h-8 max-md:w-8 text-accent" />
            <span className=" text-md max-md:text-xl font-bold text-foreground mr-1">SentimentFlow</span>
          </Link>



          <div className="flex items-center space-x-3">

            {!authData.token ?
              (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-accent max-sm:p-1 text-accent max-sm:text-xs hover:bg-accent hover:text-accent-foreground bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-primary max-sm:p-1 max-sm:text-xs hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
                  </Link>
                </>) : (
                <>
                  <Avatar className="bg-white text-black flex justify-center items-center font-bold">{authData.userData?.name.slice(0, 1)}</Avatar>
                  <Button onClick={()=>handleSignOut()}>
                    <LogOut/>
                  </Button>
                </>


              )}
            
          </div>
        </div>
      </div>
    </nav>
  )
}
