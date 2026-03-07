import {
  fetchDashboardData,
  fetchTrendingStartups,
} from "@/app/actions/dashboardAnalytics";

export type CompanyIntroType ={
  companyOverview: {
    sector: {
      name: string;
      id: number;
    };
  } & {
    id: string;
    name: string;
    sectorId: number;
    description: string;
    imageUrl: string;
  };
  avgSentiment: number;
}|null
export type CompanySentimentInfoType = {
  sentimentStats:{
      sentiment: string;
      sentimentCount: number;
  }[]
};
export interface sentimentTrendAvg {
  sentiments:{
    "companyId":string;
    "companyName":string;
    "stats":{
      "time_bucket":Date;
      "avgSentiment":number;
    }[]
  }[]
}
export interface StartupResult {
  id: string;
  name: string;
  sector: { name: string };
  description: string;
  total_articles: number | null;
  avg_sentiment_score: number;
  imageUrl: string | null;
}
export interface StartupInfo {
  id: string;
  name: string;
}
export interface NewsPaginatedDataType {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  url: string;
  ArticlesSentiment: {
    id: string;
    sentiment: string;
    positiveScore: number;
    negativeScore:number;
    neutralScore:number;
    Startups: {
      id: string;
      name: string;
      sector: {
        name: string;
      };
    };
  }[];
}

export type TrendingStartupsFetchType = Awaited<
  ReturnType<typeof fetchTrendingStartups>
>;
export type dashboardAnalyticsFetchType = Awaited<
  ReturnType<typeof fetchDashboardData>
>;
