"use client"


import { useRouter } from "next/navigation"
import { Card, CardContent, } from "@/components/ui/card"
import { BarChart3, ExternalLink } from "lucide-react"
import { NewsPaginatedDataType, } from "@/types/types"
import { getAvgScore, } from "@/lib/helper"

import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Separator } from "./ui/separator"




interface SearchResultsProps {
    results: NewsPaginatedDataType[]
    loading: boolean
}

export function NewsResults({ results, loading }: SearchResultsProps) {
    const router = useRouter()
    const handleStartupClick = (startupId: string, startupName: string) => {
        router.push(`/dashboard/company/${startupId}`)
    }
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 max-sm:py-2">
                {/* Use Array(3) to render three skeleton cards */}
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="w-full border-l-4 border-t-2 animate-pulse">
                        <CardContent className="w-full grid lg:grid-cols-4">

                            {/* === Left Side: 3/4 Width (News Title, Content, Link) === */}
                            <div className="lg:col-span-3 flex flex-col px-4 gap-3">
                                {/* Skeleton for Title (responsive width to mimic font size change) */}
                                <Skeleton className="h-6 w-full max-w-[90%] lg:max-w-[70%] xl:max-w-[60%]" />

                                {/* Skeleton for Content (multiple lines) */}
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-[95%]" />
                                    <Skeleton className="h-4 w-[90%]" />
                                    <Skeleton className="h-4 w-[98%] hidden lg:block" />
                                </div>

                                {/* Skeleton for Published Date (hidden on mobile, visible on lg) */}
                                <Skeleton className="h-3 w-40 mt-1 hidden lg:inline-block" />

                                {/* Skeleton for Read Full News Link (hidden on mobile, visible on lg) */}
                                <div className="pt-2 hidden lg:block">
                                    <Skeleton className="h-8 w-40 rounded-lg" />
                                </div>
                            </div>

                            {/* === Right Side: 1/4 Width (Companies Mentioned) === */}
                            <div className="col-span-1 px-4">
                                {/* Skeleton for "Companies Mentioned" header */}
                                <Skeleton className="h-4 w-48 mt-2" />

                                {/* Skeleton for Accordions (mimicking the list of companies) */}
                                <div className="flex flex-col gap-3 mt-4">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="h-12 w-full bg-gray-600/50 rounded-2xl p-2 flex flex-col justify-center">
                                            {/* Mimics the company name and sector inside the trigger */}
                                            <Skeleton className="h-3 w-3/4 mb-1" />
                                            <Skeleton className="h-2 w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === Mobile Link & Separator (hidden on lg, visible on mobile) === */}
                            <Separator className="mt-2 block lg:hidden" />
                            <div className="pt-4 block lg:hidden px-4">
                                <Skeleton className="h-8 w-full max-w-40 rounded-lg" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (results.length === 0) {
        return (
            <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search query or filters to find more startups.</p>
                </CardContent>
            </Card>
        )
    }
    const getAccordianTriggerColor = (sentiment: string) => {
        if (sentiment === 'positive') {
            return "from-green-800/70 to-green-600/60 border-green-500/30 hover:border-green-500/60  "
        } else if (sentiment === 'negative') {
            return "from-red-800/70 to-red-600/60  border-red-500/30 hover:border-red-500/60"
        } else {
            return "from-amber-800/70 to-amber-600/60 border-cyan-500/30 hover:border-cyan-500/60"
        }
    }
    const getAccordianContentColor = (sentiment: string) => {
        if (sentiment === 'positive') {
            return "from-green-600/60 to-green-400/50 hover:border-green-500/60  "
        } else if (sentiment === 'negative') {
            return "from-red-600/60 to-red-400/50 border-red-500/30 hover:border-red-500/60"
        } else {
            return "from-amber-600/60 to-amber-400/50 border-cyan-500/30 hover:border-cyan-500/60"
        }
    }
    return (
        <div className="grid shadow-amber-300   grid-cols-1 gap-6 max-sm:py-2 ">
            {results.map((news) => (
                <Card key={news.id} className="w-full border-l-4 border-t-2 hover:shadow-lg hover:shadow-blue-300/70 transition-shadow duration-300">
                    <CardContent className="w-full grid lg:grid-cols-4">
                        <div className="lg:col-span-3 flex flex-col px-4 gap-3">
                            <div className="text-left text-white font-bold text-md lg:text-lg xl:text-xl ">
                                {news.title}
                            </div>
                            <div className="text-sm lg:text-md flex-1 line-clamp-4 lg:line-clamp-6">
                                {news.content}
                            </div>
                            <span className=" text-xs hidden lg:inline-block">
                                Published {formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })}
                            </span>
                            <div className="pt-2  hidden lg:block">
                                <Link
                                    href={news.url}
                                    className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-lg text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/60 transition-all duration-300 group/link"
                                >
                                    <span className="text-sm font-semibold">Read Full News</span>
                                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1 px-4">
                            <span className="text-sm mt-2 text-shadow-amber-200">Companies Mentioned </span>
                            <div className="flex flex-col gap-3">
                                {news.ArticlesSentiment.length === 0 && (
                                    <div className="text-xs text-muted-foreground mt-2">No companies mentioned in this news article.</div>
                                )}
                                {news.ArticlesSentiment.map((startups) => (
                                    <Accordion type="single" collapsible key={startups.id} >
                                        <AccordionItem value={startups.Startups.id} >
                                            <AccordionTrigger className={`${getAccordianTriggerColor(startups.sentiment)} bg-gradient-to-b p-2 rounded-t-2xl rounded-b-none font-mono`}>
                                                <div className="flex flex-col gap-1">
                                                    <span>{startups.Startups.name}</span>
                                                    <span className="text-xs">{startups.Startups.sector.name}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className={`flex  flex-col gap-2 p-2 bg-gradient-to-b rounded-b-2xl ${getAccordianContentColor(startups.sentiment)}`}>
                                                <div className="flex justify-between text-xs " >
                                                    <div >Sentiment:</div>
                                                    <span className="inline-block text-xs">{startups.sentiment.toUpperCase()}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span >Sentiment Score:</span>  {getAvgScore(startups.sentiment, startups.positiveScore, startups.negativeScore, startups.neutralScore)}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                        <Separator className="mt-2 block lg:hidden" />
                        <div className="pt-4 border-t border-cyan-500/10 block lg:hidden">
                            <Link
                                href={news.url}
                                className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/60 transition-all duration-300 group/link"
                            >
                                <span className="text-sm font-semibold">Read Full News</span>
                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}

        </div>
    )
}
