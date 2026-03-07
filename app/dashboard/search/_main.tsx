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
import { SearchResults } from "@/components/search-results"
import { Factory, Filter, IconNode, LoaderPinwheel, NotebookText, Search, SlidersHorizontal, TrendingUp } from "lucide-react"
import { ResponsiveDashboardHeader } from "@/components/responsive-dashboard-header"
import { FairyLights } from "@/components/fairy-lights"
import { useAuth } from "@/context/AuthContext"
// import { useFilters } from "./_use-submission"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPaginatedCompanies } from "../../actions/searchPage"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useFilters } from "@/hooks/_use-submission"
import { calculatePaginationWindow } from "@/lib/helper"

export const SearchPage = () => {
  const { authData } = useAuth();
  //use custom hook for filter management
  const {
    filters,
    getApiParams,
    setIndustry,
    setLimit,
    setPage,
    setSentiment,
    setSearch,
    clearFilters
  } = useFilters()
  const { data: companiesListResponse, isRefetching, isLoading } = useQuery({
    queryKey: ['paginatedCompanies', getApiParams()],
    queryFn: () => getPaginatedCompanies({ userToken: authData.token, ...getApiParams() }),
    enabled: !!authData.token,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,

  });
  const companies = companiesListResponse?.startups || [];
  const paginationInfo = companiesListResponse?.meta;

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
  { value: 'EdTech', label: 'EdTech' },
  { value: 'HealthTech', label: 'HealthTech' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'AI', label: 'AI' },
  { value: 'AgriTech', label: 'AgriTech' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'EV', label: 'EV' },
  { value: 'Gaming', label: 'Gaming' },
  { value: 'Biotech', label: 'Biotech' },
  { value: 'CleanTech', label: 'CleanTech' },
  { value: 'Media', label: 'Media' },
  { value: 'D2C', label: 'D2C' },
  { value: 'RetailTech', label: 'RetailTech' },
  { value: 'HRTech', label: 'HRTech' },
  { value: 'MarTech', label: 'MarTech' },
  { value: 'Web3', label: 'Web3' },
  { value: 'Blockchain', label: 'Blockchain' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Enterprise Software', label: 'Enterprise Software' },       
  { value: 'Mobility', label: 'Mobility' },
  { value: 'SpaceTech', label: 'SpaceTech' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'DroneTech', label: 'DroneTech' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'FoodTech', label: 'FoodTech' },
  { value: 'Quick Commerce', label: 'Quick Commerce' },
  { value: 'PropTech', label: 'PropTech' }
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
  const getPagesList = useMemo(() => {
    if(!paginationInfo)return[1];
    return calculatePaginationWindow(filters.page, paginationInfo.totalPages ? paginationInfo.totalPages : 1);
  }, [filters.page, paginationInfo]);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollConatinerRef = useRef<HTMLDivElement>(null);

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

      <div className="lg:ml-64">
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
              <SearchResults results={companies} loading={isLoading} />
              {!isLoading && <Pagination className="flex items-center justify-center space-y-4 overflow-x-auto">
                <PaginationContent >
                  {<PaginationItem>
                    <Button disabled={filters.page == 1} onClick={(e) => {
                      e.preventDefault();

                      handlePageChange('dec');
                    }}>
                      {"<"}
                    </Button>

                  </PaginationItem>
                  }
                  <div className=" flex" ref={scrollConatinerRef}>
                    {getPagesList.map((pageNo) => (
                      <PaginationItem key={pageNo} onClick={() => setPage(pageNo)}  >
                        <PaginationLink className={`${filters.page === pageNo && "bg-white/30 font-extrabold"}`}  >
                          {pageNo}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </div>


                  <PaginationItem>
                    <Button disabled={filters.page >= (totalPages ? totalPages : 1)} onClick={(e) => {
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
