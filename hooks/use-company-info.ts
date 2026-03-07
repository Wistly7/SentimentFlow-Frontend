'use client';
import {
  fetchAnalysisTrend,
  fetchCompanyInformation,
  fetchCompanyOverview,
  fetchRecentNews,
  fetchSentimentTrend,
} from "@/app/actions/companyInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  useEffect } from "react";
export const useCompanyInfo = (companyId: string | undefined) => {
  // Your hook logic here
  const queryClient = useQueryClient();
  const {
    data: companyInfoData,
    isLoading: companyDataLoading,
    isSuccess: isCompanyInfoSuccess,
  } = useQuery({
    queryKey: ["company-info", companyId],
    queryFn: () => fetchCompanyInformation(companyId!),
    enabled: !!companyId,
    select:(data)=> data.companyOverview
  });
  const {
    data: companySentimentInfo,
    isLoading: companySetimentLoading,
    isSuccess: isCompanySentimentSuccess,
  } = useQuery({
    queryKey: ["companySentimentInfo", companyId],
    queryFn: () => fetchCompanyOverview(companyId!),
    enabled: !!companyId,
  });
console.log(companySentimentInfo)
  useEffect(() => {
    if (isCompanyInfoSuccess && isCompanySentimentSuccess) {
      queryClient.prefetchQuery({
        queryKey: ["recent-news", companyId],
        queryFn: () => fetchRecentNews(companyId!),
      });
      queryClient.prefetchQuery({
        queryKey: ["sentimentTrend", companyId],
        queryFn: () => fetchSentimentTrend(companyId!),
      });
      queryClient.prefetchQuery({
        queryKey: ["analysisTrend", companyId],
        queryFn: () => fetchAnalysisTrend(companyId!),
      });
    }
  }, [companyId, isCompanyInfoSuccess, isCompanySentimentSuccess]);
  const { data: recentNewsData, isLoading:isRecentDataLoading } = useQuery({
    queryKey: ["recentNews", companyId],
    queryFn: () => fetchRecentNews(companyId!),
    enabled: !!companyId,
  });

  const { data: recentSentimentTrend,isLoading:isSentimentTrendLoading } = useQuery({
    queryKey: ["sentimentTrend", companyId],
    queryFn: () => fetchSentimentTrend(companyId!),
    enabled: !!companyId,
    select:(data)=> data.sentimentTrendOverPeriod
  });

  const { data: analysisTrend } = useQuery({
    queryKey: ["analysisTrend", companyId],
    queryFn: () => fetchAnalysisTrend(companyId!),
    enabled: !!companyId,
  });

  return {
    companyInfoData,
    companyDataLoading,
    companySentimentInfo,
    companySetimentLoading,
    recentNewsData,
    recentSentimentTrend,
    analysisTrend,    
    isRecentDataLoading,
    isSentimentTrendLoading
  };
};
