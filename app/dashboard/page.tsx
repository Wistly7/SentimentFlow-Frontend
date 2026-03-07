
import { DashboardPage } from "./_main"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export default async function DashboardMain() {
  const cookieStore = await cookies();
  const token = cookieStore.get('user-token');
  if (!token || !token.value) {
    return redirect('/login')
  }
  // const intialStartupTrendindData:TrendingStartupsFetchType = await fetchTrendingStartups({ token: token.value });
  // const intialDashboardData:dashboardAnalyticsFetchType=await fetchDashboardData({ token: token.value });


  return (

    <>
      <DashboardPage initalStartupsTrendingData={null} initialDashBoardAnalyticsData={null} token={token.value} />
    </>
  )
}
