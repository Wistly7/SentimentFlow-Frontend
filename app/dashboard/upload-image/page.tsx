import { getStartupsWithoutImage } from "@/app/actions/image-upload";
import { FairyLights } from "@/components/fairy-lights";
import { ResponsiveDashboardHeader } from "@/components/responsive-dashboard-header";
import { UploadImage } from "@/components/upload-image";
import { WaterflowBackground } from "@/components/waterflow-background";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
export default async function UploadImageComponent() {
    const cookiesData =await cookies();
    const token = cookiesData.get('user-token');
    if (!token) {
        return redirect('/not-found')
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['startups-without-image'],
        queryFn: () => getStartupsWithoutImage({ token: token.value! })
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen bg-background text-foreground">
                <WaterflowBackground />
                <FairyLights />
                <div className="md:ml-64">
                    <ResponsiveDashboardHeader
                        title="Dashboard Overview"
                        subtitle="Real-time sentiment analysis for Indian startups"
                    />
                    <UploadImage />
                </div>
            </div>
        </HydrationBoundary>
    )
}