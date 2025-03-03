"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header Skeleton */}
      <Skeleton className={`h-10 w-1/2 mx-auto mb-10 ${inter.className}`} />

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Orders Skeleton */}
        <div className="md:col-span-2 w-2/3">
          {/* "My Orders" title skeleton */}
          <Skeleton className={`h-6 w-32 mb-4 ${inter.className}`} />
          <ScrollArea className="w-[90vw] md:w-auto space-y-4 px-2 py-2 md:h-[60vh]">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, orderIndex) => (
                <div key={orderIndex} className="bg-gray-100 p-2 rounded-lg">
                  {/* Order Header Skeleton (Order ID) */}
                  <Skeleton className="h-4 w-1/3 ml-4 my-1" />
                  <div className="p-2 w-full flex flex-col gap-2">
                    {Array.from({ length: 2 }).map((_, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex overflow-hidden bg-white shadow-md rounded-lg border p-2"
                      >
                        {/* Product Image Skeleton */}
                        <Skeleton className="w-20 h-20 md:w-28 md:h-28 rounded" />
                        <div className="flex-1 ml-4 mt-3">
                          {/* Product Name Skeleton */}
                          <Skeleton className={`h-4 w-32 mb-1 ${inter.className}`} />
                          {/* Product Color/Size Skeleton */}
                          <Skeleton className={`h-3 w-20 ${inter.className}`} />
                        </div>
                        <div className="text-right my-3 mr-4 flex flex-col justify-between">
                          {/* Price Skeleton */}
                          <Skeleton className={`h-4 w-16 mb-2 ${inter.className}`} />
                          {/* Quantity Skeleton */}
                          <Skeleton className={`h-4 w-12 ${inter.className}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Order Total Skeleton */}
                  <div className={`w-full flex justify-end gap-1 px-5 py-1 ${inter.className}`}>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Vertical Separator */}
        <div>
          <Separator orientation="vertical" />
        </div>

        {/* Address Skeleton */}
        <div>
          {/* "My Address" title skeleton */}
          <Skeleton className={`h-6 w-32 mb-4 ${inter.className}`} />
          <div className="bg-gray-100 shadow-md rounded-lg p-4 flex justify-between items-start min-w-[20vw]">
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="ml-2">
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
