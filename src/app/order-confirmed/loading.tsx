"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen sm:pt-10 p-4">
      <div className="w-full max-w-[400px] mx-auto sm:p-3 bg-gray-50 rounded-lg shadow">
        {/* Card Header Skeleton */}
        <div className="text-center p-4">
          <div className="flex justify-center items-center gap-3 mb-3">
            {/* Success Icon Skeleton */}
            <Skeleton className="w-14 h-14 rounded-full" />
            {/* Title Skeleton */}
            <Skeleton className="w-48 h-6" />
          </div>
          {/* Subtext Skeleton */}
          <Skeleton className="w-full h-4 mx-auto mb-4" />
        </div>

        {/* Card Content Skeleton */}
        <div className="space-y-2 p-4">
          {/* Order Details Skeleton */}
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <div className="flex items-center gap-1">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>

          {/* Order Summary Header */}
          <Skeleton className="w-32 h-5 mt-4" />

          {/* Order Summary Table Skeleton */}
          <div className="mt-2 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                {/* Quantity Skeleton */}
                <Skeleton className="w-8 h-4" />
                {/* Product Info Skeleton */}
                <div className="flex items-center space-x-3 flex-1">
                  <Skeleton className="w-10 h-10 rounded" />
                  <Skeleton className="w-24 h-4" />
                </div>
                {/* Price Skeleton */}
                <Skeleton className="w-16 h-4" />
              </div>
            ))}
          </div>

          {/* Continue Shopping Button Skeleton */}
          <Skeleton className="w-full h-10 mt-4" />
        </div>
      </div>
    </div>
  );
}
