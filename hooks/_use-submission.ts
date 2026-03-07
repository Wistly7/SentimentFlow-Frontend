"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface SubmissionFilters {
  page: number;
  limit: number;
  sentiment: string;
  sentimentScoreLimit: number;
  industry: string;
  search: string;
  companyId: string;
}
const DEFAULT_FILTERS: SubmissionFilters = {
  page: 1,
  search: "",
  limit: 10,
  sentiment: "all",
  sentimentScoreLimit: -1,
  industry: "all",
  companyId: "",
};
export const useFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializeFilters = useCallback((): SubmissionFilters => {
    return {
      page: Number(searchParams.get("page")) || DEFAULT_FILTERS.page,
      limit: Number(searchParams.get("limit")) || DEFAULT_FILTERS.limit,
      search: searchParams.get("search") || DEFAULT_FILTERS.search,
      sentiment: searchParams.get("sentiment") || DEFAULT_FILTERS.sentiment,
      sentimentScoreLimit:
        Number(searchParams.get("sentimentScoreLimit")) ||
        DEFAULT_FILTERS.sentimentScoreLimit,
      industry: searchParams.get("industry") || DEFAULT_FILTERS.industry,
      companyId:
        searchParams.get("companyId") || DEFAULT_FILTERS.companyId,
    };
  }, [searchParams]);
  //below is the good exmaple of loose initilization, react only runs the function on first render
  const [filters, setFilters] = useState<SubmissionFilters>(initializeFilters);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(
    filters.search
  );
  //update URL when filters change
  const updateURL = useCallback(
    (newFilters: SubmissionFilters) => {
      const url = new URL(window.location.href);

      // only add params that differ from defaults
      Object.entries(newFilters).forEach(([key, value]) => {
        const defaultValue = DEFAULT_FILTERS[key as keyof SubmissionFilters];
        if (value !== defaultValue && value !== "all" && value !== "") {
          url.searchParams.set(key, value.toString());
        } else {
          url.searchParams.delete(key);
        }
      });
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );
  //debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
      if (filters.search !== debouncedSearch) {
        const newFilters = { ...filters, page: 1 };
        // setFilters(newFilters);
        // updateURL(newFilters);
      }
      return () => clearTimeout(timer);
    }, 500);
  }, [filters.search, debouncedSearch, filters, updateURL]);
  const updateFilters = useCallback(
    (updates: Partial<SubmissionFilters>) => {
      const newUpdates = {  ...filters, ...updates };
      if ("page" in updates) {
        // Page change - don't reset page
      } else {
        newUpdates.page = 1;
      }
      setFilters(newUpdates);
      updateURL(newUpdates);
    },
    [filters, updateURL]
  );
  //inidividual setting
  const setSearch = useCallback(
    (search: string) => updateFilters({ search }),
    [updateFilters]
  );
  const setPage = useCallback(
    (page: number) => updateFilters({ page:page }),
    [updateFilters]
  );
  const setSentiment = useCallback(
    (sentiment: string) => updateFilters({ sentiment }),
    [updateFilters]
  );
  const setSentimentLimit = useCallback(
    (minSentiment: number) =>
      updateFilters({ sentimentScoreLimit: minSentiment }),
    [updateFilters]
  );
  const setLimit = useCallback(
    (limit: string) => updateFilters({ limit: parseInt(limit) }),
    [updateFilters]
  );
  const setIndustry = useCallback(
    (industry: string) => updateFilters({ industry: industry }),
    [updateFilters]
  );
  const setCompanyId = useCallback(
    (companyId: string) => updateFilters({ companyId: companyId }),
    [updateFilters]
  );
  const hasActiveFilters =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.industry !== DEFAULT_FILTERS.industry ||
    filters.sentiment !== DEFAULT_FILTERS.sentiment ||
    filters.sentimentScoreLimit !== DEFAULT_FILTERS.sentimentScoreLimit;

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setDebouncedSearch(DEFAULT_FILTERS.search);
    router.replace("/dashboard/search", { scroll: false });
  }, [router]);
  const getApiParams = useCallback(() => {
    const params: any = {
      page: filters.page,
      limit: filters.limit,
    };

    if (debouncedSearch.trim()) {
      params.searchQuery = debouncedSearch.trim();
    }
    if (filters.industry && filters.industry !== "all") {
      params.industry = filters.industry;
    }
    if (filters.sentiment && filters.sentiment !== "all") {
      params.sentiment =filters.sentiment;
    }
    if (filters.sentimentScoreLimit) {
      params.sentimentScoreLimit = filters.sentimentScoreLimit;
    }

    return params;
  }, [filters, debouncedSearch]);
  return {
    filters,
    debouncedSearch,
    hasActiveFilters,
    getApiParams,
    clearFilters,
    setSearch,
    setPage,
    setLimit,
    setIndustry,
    setSentimentLimit,
    setSentiment,
    setCompanyId,
  };

};
