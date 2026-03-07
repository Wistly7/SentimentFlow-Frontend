"use server"; 
import { api } from "@/lib/constants";
import {
  CompanyIntroType,
  CompanySentimentInfoType,
  sentimentTrendAvg,
} from "@/types/types";
import axios from "axios"; // or your preferred fetching library
import { cookies } from "next/headers";
// Assuming your API types are in a separate file

// Define your fetcher functions
export const fetchCompanyInformation = async (
  companyId: string
): Promise<CompanyIntroType> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("user-token")?.value;
  const response = await axios.get(`${api}/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data as  CompanyIntroType ;
};

export const fetchCompanyOverview = async (
  companyId: string
): Promise<CompanySentimentInfoType > => {
    const cookieStore =await cookies();

  const authToken = cookieStore.get("user-token")?.value;

  const response = await axios.get(`${api}/company/overview/${companyId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data as  CompanySentimentInfoType ;
};




export const fetchAnalysisTrend = async (
  sectorId: string,
  infoRangeType:"weekly"|"monthly"
): Promise<sentimentTrendAvg> => {
    const cookieStore = await cookies();
    const params = new URLSearchParams();
    params.append("infoRangeType", infoRangeType);
  const authToken = cookieStore.get("user-token")?.value;
  const response = await axios.get(
    `${api}/company/sentiment-trend/${sectorId}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${authToken} `,
      },
    }
  );
  return response.data as  sentimentTrendAvg;
};
