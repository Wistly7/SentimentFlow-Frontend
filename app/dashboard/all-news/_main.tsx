"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { WaterflowBackground } from "@/components/waterflow-background"
import { FilterSelect } from "@/components/search-filters"
import { Factory, Filter, IconNode, LoaderPinwheel, NotebookText, Search, SlidersHorizontal, TrendingUp } from "lucide-react"
import { ResponsiveDashboardHeader } from "@/components/responsive-dashboard-header"
import { FairyLights } from "@/components/fairy-lights"
import { useAuth } from "@/context/AuthContext"
// import { useFilters } from "./_use-submission"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPaginatedCompanies, getPaginatedNews } from "../../actions/searchPage"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { NewsResults } from "@/components/news-list"
import { useFilters } from "@/hooks/_use-submission"
import { calculatePaginationWindow } from "@/lib/helper"

export const SearchPage = () => {
  const { authData } = useAuth();
  //use custom hook for filter management
  const {
    filters,
    debouncedSearch,
    hasActiveFilters,
    getApiParams,
    setIndustry,
    setLimit,
    setPage,
    setSentiment,
    setSentimentLimit,
    setSearch,
    clearFilters
  } = useFilters()
  const { data: companiesListResponse, isRefetching, isLoading } = useQuery({
    queryKey: ['paginatedNews', getApiParams()],
    queryFn: () => getPaginatedNews({ userToken: authData.token, ...getApiParams() }),
    enabled: !!authData.token,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    
  });
  const newsList = companiesListResponse?.paginatedNews || [];
  const paginationInfo = companiesListResponse?.paginationInfo;
  const getPagesList = useMemo(() => {
        if(!companiesListResponse)return[1];
        return calculatePaginationWindow(filters.page, companiesListResponse.paginationInfo?.totalPages ? companiesListResponse.paginationInfo?.totalPages : 1);
      }, [filters.page,companiesListResponse]);
  //handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, [setSearch]);
  const handleSemtimentChange = useCallback((value: string) => {
    setSentiment(value)
  }, [setSentiment]);
  
  const handleIndustryChange = useCallback((value: string) => {
    setIndustry(value)
  }, [setIndustry]);
  const handlePageChange = useCallback((purpose: 'inc' | 'dec') => {
    if (purpose === 'inc') setPage((filters.page + 1))
    else setPage(filters.page - 1)
  }, [setPage]);
  const industryOptions = useMemo(() => [
    { value: 'all', label: 'All Industries' },
    { value: 'Fintech', label: 'Fintech' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Medical', label: 'Medical' }
  ], [])
  const setimentOptions = useMemo(() => [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'PostiveSentiment' },
    { value: 'negative', label: 'Negative Sentiment' },
    { value: 'neutral', label: 'Neutral Sentiment' }
  ], []);
  const limitOptions = useMemo(
    () => [
      { value: "5", label: "5" },
      { value: "10", label: "10" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "100", label: "100" },
    ],
    []
  );
  const totalPages = paginationInfo?.totalPages;

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        gsap.fromTo(
          contentRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        )
      })
    }
  }, [])





  return (
    <div className="min-h-screen bg-background text-foreground">
      <WaterflowBackground />
      <FairyLights />

      <div className="md:ml-64">
        <ResponsiveDashboardHeader
          title="Dashboard Overview"
          subtitle="Real-time sentiment analysis for Indian startups"
        />
        <main className="p-6 max-sm:p-3 w-full" ref={contentRef}>
          {/* Search Bar */}
          <div className="mb-6 w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for startups (e.g., Zomato, Paytm, Swiggy...)"
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="pl-10 h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                />
              </div>
              {/* <div className="flex gap-2">
                <Button
                  onClick={}
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground sm:hidden"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div> */}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full ">
            {/* Filters Sidebar */}
            <Card className=" border-none lg:col-span-4 bg-white/0">
              <CardHeader className=" p-2 rounded-lg w-auto bg-card">
                <div className="flex items-center gap-7 justify-between">
                  <CardTitle className="flex items-center space-x-2 ">
                    <Filter className="h-5 w-5 text-accent" />
                    <span>Filter</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {isRefetching && <LoaderPinwheel className="animate-spin" />}
                    <Button variant="secondary" size="sm" onClick={clearFilters} className="text-muted-foreground">
                      Clear All
                    </Button>
                    {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent className={`space-x-6 space-y-6 flex max-sm:flex-col  max-sm:justify-center max-sm:items-start `}>
                {/* Sentiment Filter */}
                <FilterSelect Icon={<TrendingUp className="h-4 w-4 text-accent" />} placeholder="Sentiment Type" options={setimentOptions} value={filters.sentiment} onValueChange={handleSemtimentChange} className="p-2 rounded-lg bg-input  border-border text-foreground w-[150px] flex justify-center" />
                <FilterSelect Icon={<Factory className="h-4 w-4 text-accent" />} placeholder={"Industry Type"} options={industryOptions} value={filters.industry} onValueChange={handleIndustryChange} className="p-2 rounded-lg bg-input  border-border text-foreground w-[150px] flex justify-center  " />
                <FilterSelect Icon={<NotebookText className="h-4 w-4 text-accent" />} placeholder={"Paper Limit"} options={limitOptions} value={String(filters.limit)} onValueChange={setLimit} className="p-2 rounded-lg bg-input  border-border text-foreground  flex justify-center" />


              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="lg:col-span-4 flex flex-col gap-6 ">
              {/* <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                </h2>
              </div> */}
              <NewsResults results={newsList} loading={isLoading} />
              {!isLoading && <Pagination className="flex items-center justify-center space-y-4 overflow-x-auto">
                <PaginationContent>
                  {<PaginationItem>
                    <Button disabled={filters.page==1} onClick={(e) => {
                      e.preventDefault();

                      handlePageChange('dec');
                    }}>
                      {"<"}
                    </Button>

                  </PaginationItem>
                  }
                  {getPagesList.map((value, index:number) => (
                    // The 'key' prop is essential for lists in React
                    <PaginationItem key={index + 1} onClick={() => setPage(value + 1)} >
                      <PaginationLink className={`${filters.page === value && "bg-white/30 font-extrabold"}`} >
                        {value}
                      </PaginationLink>
                    </PaginationItem>
                  ))}


                  <PaginationItem>
                    <Button disabled={filters.page >= totalPages! } onClick={(e) => {
                      e.preventDefault(); handlePageChange('inc');
                    }}>
                      {">"}
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              }
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
