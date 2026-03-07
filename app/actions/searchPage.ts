"use server";

import { api } from "@/lib/constants";
import { NewsPaginatedDataType, StartupResult} from "@/types/types";
import axios from "axios";

export async function getPaginatedCompanies({
  page = 1,
  limit = 50,
  userToken,
  searchQuery,
  industry,
  sentiment,
  sentimentScoreLimit,
}: {
  page?: number;
  limit?: number;
  userToken: string;
  searchQuery?: string;
  industry?: string;
  sentiment?: string;
  sentimentScoreLimit?: number;
}): Promise<{
        status:'failed'|'success'
      startups?:StartupResult[] ,
      meta?: {
        total: number,
        page: number,
        limit: number,
        totalPages: number
      },
      error?:string
    }> {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (industry) params.append("industry", industry);
    if (sentiment) params.append("sentiment", sentiment);
    if (sentimentScoreLimit)
      params.append("sentimentScoreLimit", sentimentScoreLimit.toString());
    const response = await axios.get(
      `${api}/searchQuery/fetch-company-data?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return {
      status: "success",
      ...response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Failed to apply filters.";
      // Throw a new, simple error with that specific message
      console.log(backendError);
      console.error(backendError)
      return{
        status:'failed',
        error:backendError
      }
    }
    return {status:'failed', error:"Unexpected error occured"}
  }
}
export async function getPaginatedNews({
  page = 1,
  limit = 50,
  userToken,
  searchQuery,
  industry,
  sentiment,
  sentimentScoreLimit,
  companyId,
}: {
  page?: number;
  limit?: number;
  userToken: string;
  searchQuery?: string;
  industry?: string;
  sentiment?: string;
  sentimentScoreLimit?: number;
  companyId?:string;
}): Promise<{
      status:'failed'|'success'
      paginatedNews?:NewsPaginatedDataType[] ,
      paginationInfo?: {
        totalItems: number,
        pageNumber: number,
        itemsLength: number,
        totalPages: number
      },
      error?:string
    }> {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (industry) params.append("industry", industry);
    if (sentiment) params.append("sentiment", sentiment);
    if (sentimentScoreLimit)
      params.append("sentimentScoreLimit", sentimentScoreLimit.toString());
    if (companyId) params.append("companyId", companyId);
    const response = await axios.get(
      `${api}/searchQuery/fetch-news-data?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return {
      status: "success",
      ...response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Failed to apply filters.";
      // Throw a new, simple error with that specific message
      console.log(backendError);
      console.error(backendError)
      return{
        status:'failed',
        error:backendError
      }
    }
    return {status:'failed', error:"Unexpected error occured"}
  }
}
