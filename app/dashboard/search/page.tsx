import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WaterflowBackground } from "@/components/waterflow-background"
import { LiquidGlassNavbar } from "@/components/liquid-glass-navbar"
import { ResponsiveDashboardHeader } from "@/components/responsive-dashboard-header"
import { GSAPStagger, GSAPHover } from "@/components/gsap-animations"
import { TrendingUp, TrendingDown, Activity, Users, BarChart3, AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchDashboardData, fetchTrendingStartups } from "../../actions/dashboardAnalytics"
import { cookies } from "next/headers"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { dashboardAnalyticsFetchType, TrendingStartupsFetchType } from "@/types/types"
import { SearchPage } from "./_main"

const mockData = {
  totalStartups: 247,
  positiveArticles: 1834,
  negativeArticles: 456,
  neutralArticles: 892,
  avgSentiment: 0.34,
  trendingStartups: [
    { name: "Zomato", sentiment: 0.78, change: "+12%" },
    { name: "Swiggy", sentiment: 0.65, change: "+8%" },
    { name: "Paytm", sentiment: -0.23, change: "-15%" },
    { name: "Byju's", sentiment: -0.45, change: "-22%" },
  ],
}
export default async function SearchMain() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('user-token');
  if (!token || !token.value) {
    return redirect('/login')
  }
  return (

    <>
      <AuthProvider> <SearchPage /></AuthProvider>
    </>
  )
}
