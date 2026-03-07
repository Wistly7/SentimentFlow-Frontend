"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WaterflowBackground } from "@/components/waterflow-background"
import { ResponsiveDashboardHeader } from "@/components/responsive-dashboard-header"
import { GSAPStagger, GSAPHover } from "@/components/gsap-animations"
import { TrendingUp, TrendingDown, Activity, Users, BarChart3, AlertCircle, Loader } from "lucide-react"
import { TwinklingStars } from "@/components/twinkling-stars"
import { dashboardAnalyticsFetchType, TrendingStartups, TrendingStartupsFetchType } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import { fetchDashboardData, fetchTrendingStartups } from "../actions/dashboardAnalytics"
import { Fragment } from "react"


export const DashboardPage: React.FC<{ initalStartupsTrendingData: TrendingStartupsFetchType, token: string; initialDashBoardAnalyticsData: dashboardAnalyticsFetchType }> = ({ initalStartupsTrendingData, token, initialDashBoardAnalyticsData }) => {
  const { data: trendingStartupsData, isLoading: isStartupLoading, isFetching: isStartupFetching } = useQuery({
    queryFn: () => fetchTrendingStartups({ token: token }),
    queryKey: ['trendingStartups-stats'],
    staleTime: 5 * 60 * 1000,
    initialData:initalStartupsTrendingData?initalStartupsTrendingData:undefined,
    select: (data) => data ? data.trendingStartups : null
  });
  
  const { data: dashBoardData, isFetching: isDashboardFetching, isLoading: isDashboardLoading } = useQuery({
    queryFn: () => fetchDashboardData({ token: token }),
    queryKey: ['dashBoard-stats'],
    staleTime: 5 * 60 * 1000,
    initialData:initialDashBoardAnalyticsData?initialDashBoardAnalyticsData:undefined,
    select: (data) => data ? data.statsResult : null
  })
  const getPercentageValue = (initialValue: number, total: number) => {
    return Math.round(
      (initialValue /
        total) *
      100,
    )
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <WaterflowBackground />
      <TwinklingStars />

      <div className="md:ml-64">
        <ResponsiveDashboardHeader
          title="Dashboard Overview"
          subtitle="Real-time sentiment analysis for Indian startups"
        />

        <main className="p-4 md:p-6">
          {/* Key Metrics */}
          <GSAPStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <GSAPHover>
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Startups</CardTitle>
                  <Users className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashBoardData?.totalStartups}</div>
                  <p className="text-xs text-muted-foreground">{dashBoardData?.startUpAnalytics} from last month</p>
                </CardContent>
              </Card>
            </GSAPHover>

            <GSAPHover>
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Positive Articles</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  {!dashBoardData ? <div>
                    <Loader className="animate-spin" />
                  </div> : (<>
                    <div className="text-2xl font-bold text-foreground">{dashBoardData.statusGrouping?.postiveCount}</div>
                    <p className="text-xs text-muted-foreground">{dashBoardData.positiveTrendArticles >= 0 ? "+" + dashBoardData.positiveTrendArticles + "%" : dashBoardData.positiveTrendArticles + "%"} from last week</p>
                  </>)}
                </CardContent>
              </Card>
            </GSAPHover>

            <GSAPHover>
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Negative Articles</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  {!dashBoardData || isDashboardLoading ? <div>
                    <Loader className="animate-spin" />
                  </div> :
                    <>
                      <div className="text-2xl font-bold text-foreground">{dashBoardData.statusGrouping?.negativeCount}</div>
                      <p className="text-xs text-muted-foreground">{dashBoardData.negativeTrendArticles >= 0 ? "+" + dashBoardData.negativeTrendArticles.toFixed(2) : dashBoardData.negativeTrendArticles.toFixed(2)}% from last week</p>
                    </>
                  }
                </CardContent>
              </Card>
            </GSAPHover>

            <GSAPHover>
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Sentiment</CardTitle>
                  <Activity className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  {!dashBoardData || isDashboardLoading ? <div>
                    <Loader className="animate-spin" />
                  </div> :
                    <>
                      <div className="text-2xl font-bold text-foreground">
                        {dashBoardData?.avgSentiment > 0 ? "+" + dashBoardData?.avgSentiment.toFixed(2) : dashBoardData?.avgSentiment.toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground">Slightly {dashBoardData.avgSentiment > 0 ? "Positive" : "Negative"} trend</p>
                    </>}
                </CardContent>
              </Card>
            </GSAPHover>
          </GSAPStagger>

          {/* Charts and Analytics */}
          <GSAPStagger className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <GSAPHover className="h-fit">
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    <span>Sentiment Distribution</span>
                  </CardTitle>
                  <CardDescription>Article sentiment breakdown for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  {!dashBoardData ?
                    (<div className="flex justify-center items-center">
                      <Loader className="animate-spin" size={30} />
                    </div>
                    ) :
                    <Fragment>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Positive</span>
                          <span className="text-sm font-medium text-green-500">
                            {dashBoardData?.statusGrouping.postiveCount} (
                            {getPercentageValue(dashBoardData.statusGrouping.postiveCount, dashBoardData.statusGrouping.totalCount)}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${getPercentageValue(dashBoardData.statusGrouping.postiveCount, dashBoardData.statusGrouping.totalCount)}%` }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Neutral</span>

                          <span className="text-sm font-medium text-yellow-500">
                            {dashBoardData?.statusGrouping.neutralCount} (
                            {getPercentageValue(dashBoardData.statusGrouping.neutralCount, dashBoardData.statusGrouping.totalCount)}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${getPercentageValue(dashBoardData.statusGrouping.neutralCount, dashBoardData.statusGrouping.totalCount)}%` }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Negative</span>
                          <span className="text-sm font-medium text-red-500">
                            {dashBoardData.statusGrouping.negativeCount} (
                            {getPercentageValue(dashBoardData.statusGrouping.negativeCount, dashBoardData.statusGrouping.totalCount)}

                            %)
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${getPercentageValue(dashBoardData.statusGrouping.negativeCount, dashBoardData.statusGrouping.totalCount)}%` }}></div>
                        </div>
                      </div>
                    </Fragment>

                  }
                </CardContent>
              </Card>
            </GSAPHover>

            <GSAPHover>
              <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-accent flex" />
                    <span>Trending Startups</span>
                    {isStartupFetching && <Loader size={10} className="animate-spin" />}
                  </CardTitle>
                  <CardDescription>Most talked about startups this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isStartupLoading ?
                      <div className="flex justify-center items-center animate-spin">
                        <Loader className="animate-spin" size={30} />
                      </div> : trendingStartupsData?.length===0?
                      <div className="flex justify-center items-center text-center font-bold">
                        No new Startups Articles this week
                      </div>
                      :(
                        trendingStartupsData?.map((startup, index) => (
                          <div
                            key={startup.name + index.toString()}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/20"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <span className="text-sm font-bold text-accent">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{startup.name}</p>
                                <p className={`text-sm text-muted-foreground`}>
                                  Sentiment:{startup.current_sentiment > 0 && "+"}{startup.current_sentiment}
                                </p>
                              </div>
                            </div>
                            
                          </div>
                        ))
                      )}



                  </div>
                </CardContent>
              </Card>
            </GSAPHover>
          </GSAPStagger>

          {/* Recent Activity */}
          {/* <GSAPHover>
            <Card className="bg-card/80 backdrop-blur-sm border-border card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest sentiment analysis updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Positive sentiment spike detected for Zomato
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Negative coverage increase for Byju's</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/10">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">New startup added to tracking: Razorpay</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GSAPHover> */}
        </main>
      </div>
    </div>
  )
}
