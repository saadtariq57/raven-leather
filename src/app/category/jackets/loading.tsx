import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
    return (
        <div className="container max-w-6xl mx-auto px-4 min-h-screen space-y-8 mt-10">
            {/* Page Title Skeleton */}

            {/* Filter Bar Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-40 mt-5" />
                <Skeleton className="h-8 w-40" />
            </div>

            {/* Separator */}
            <Skeleton className="h-[2px] w-full" />

            {/* Product Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
                        <Skeleton className="w-full aspect-square" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                        <Skeleton className="h-6 w-1/2 mt-2" />
                        <Skeleton className="h-4 w-1/3 mt-2" />
                    </div>
                ))}
            </div>

            {/* Load More Button Skeleton */}
            <Skeleton className="w-full h-10" />
        </div>
    );
}
