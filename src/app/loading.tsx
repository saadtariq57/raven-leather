"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function BannerSkeleton() {
  return (
    <div className="relative w-full lg:h-auto overflow-hidden mb-20 xl:flex">
      {/* Mimics the Banner carousel image */}
      <Skeleton className="w-full h-[60vh] rounded mb-4" />
    </div>
  );
}

function NewArrivalsSkeleton() {
  return (
    <section className="max-w-7xl sm:w-5/6 xl:w-full m-auto">
      {/* Header */}
      <Skeleton className="h-8 w-40 mx-auto mb-6" />
      {/* Carousel mimic */}
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="bg-[#F3F3F3] p-4 rounded">
              {/* Image placeholder */}
              <Skeleton className="w-full h-[200px] rounded mb-2" />
              {/* Product Name */}
              <Skeleton className="h-4 w-3/4 mb-1" />
              {/* Color */}
              <Skeleton className="h-4 w-1/2 mb-1" />
              {/* Price */}
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategorySectionSkeleton() {
  return (
    <section>
      {/* Header */}
      <Skeleton className="h-8 w-48 mx-auto mb-6" />
      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 max-w-3xl m-auto mb-20">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-48 md:h-[50vh] xl:h-[70vh] rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen mx-auto space-y-12">
      <BannerSkeleton />
      <NewArrivalsSkeleton />
      <CategorySectionSkeleton />
    </div>
  );
}
