"use server";
import { api } from "@/lib/constants";
import { dashboardAnalyticsType, TrendingStartups } from "@/types/types";
import axios from "axios";


export const fetchTrendingStartups = async ({
  token,
}: {
  token: string;
}): Promise<{
  trendingStartups:TrendingStartups[];
}|null> => {
  try {
    const response = await axios.get(`${api}/dashboard/trending-startups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as {
      trendingStartups: TrendingStartups[];
    }|null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Failed to fetch trending startups.";
      // Throw a new, simple error with that specific message
      console.log(backendError)
      console.error(backendError)
      return null
    }
    // For any other kind of error, just re-throw it
    console.log("An unexpected error occurred.");
    return null;
  }
};

export const fetchDashboardData = async ({
  token,
}: {
  token: string;
}): Promise<{
  statsResult:dashboardAnalyticsType;
}|null> => {
  try {
    const response = await axios.get(`${api}/dashboard/dashboard-analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as {
      statsResult:dashboardAnalyticsType
    }|null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Login failed due to a server error.";
      console.log(backendError)
      console.error(backendError)
      return null;
    }
    // For any other kind of error, just re-throw it
    return null;
  }
}