import { AuthProvider } from "@/context/AuthContext"
import type React from "react"
import { redirect } from "next/navigation";
import { TwinklingStars } from "@/components/twinkling-stars";
import { fetchUserDataFromServer } from "../actions/auth";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await fetchUserDataFromServer();
  
  if(!userData?.userInfo){
    return redirect('/login')
  }
  return <AuthProvider initialUserData={userData}>
    {children}</AuthProvider>


}
