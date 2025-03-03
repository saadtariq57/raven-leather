"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 space-y-6 min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-40 rounded" />
      </div>

      {/* Product Card Skeleton */}
      <Card className="flex flex-col lg:flex-row gap-3 overflow-hidden p-4">
        {/* Image Carousel Skeleton */}
        <Skeleton className="w-full lg:w-2/3 h-96 rounded" />

        {/* Product Details Skeleton */}
        <div className="w-full lg:w-1/2 space-y-5 px-4">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4 rounded" />

          {/* Price Skeleton */}
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Color Skeleton */}
          <Skeleton className="h-4 w-32 rounded" />

          {/* Size and Quantity Selectors Skeleton */}
          <div className="flex items-center gap-6 mt-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-10 w-36 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="flex items-center rounded-lg w-28">
                <Skeleton className="h-10 w-10 rounded-l" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10 rounded-r" />
              </div>
            </div>
          </div>

          {/* Button Skeletons */}
          <div className="flex items-center gap-6 pt-3 md:pr-6 pb-6 mb-4 md:pb-0">
            <Skeleton className="h-10 w-28 rounded" />
            <Skeleton className="h-10 w-28 rounded" />
          </div>
        </div>
      </Card>

      {/* Tabs Skeleton */}
      <div className="space-y-6 py-6">
        {/* Tabs List Skeleton */}
        <div className="flex space-x-4 border-b">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
        {/* Tabs Content Skeleton */}
        <Skeleton className="h-20 w-full rounded" />
      </div>
    </div>
  );
}
