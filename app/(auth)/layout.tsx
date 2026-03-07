import { AuthProvider } from "@/context/AuthContext"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import type React from "react"
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const cookie=await cookies();
    if(cookie.get('usertoken')?.value){
       redirect('/dashboard') 
    }
  return <AuthProvider>{children}</AuthProvider>
 
  
}
