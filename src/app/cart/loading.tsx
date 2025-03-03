"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Cart Header Skeleton */}
      <Skeleton className="h-10 w-1/3 mb-2" />
      {/* Separator Skeleton */}
      <Skeleton className="h-[1px] w-full mb-8" />

      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
        {/* Left Side: Cart Table Skeleton */}
        <div className="w-full lg:w-2/3 space-y-4">
          {/* Delete Button Area Skeleton (if any) */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="bg-gray-50 rounded-xl overflow-hidden">
            {/* Table Header Skeleton */}
            <div className="bg-gray-200 px-4 py-2 flex items-center">
              {/* Checkbox Header */}
              <Skeleton className="h-6 w-6 mr-4" />
              {/* Product Header */}
              <Skeleton className="h-6 w-32 mr-4" />
              {/* Price Header (Desktop) */}
              <Skeleton className="h-6 w-16 mr-4 hidden md:block" />
              {/* Quantity Header (Desktop) */}
              <Skeleton className="h-6 w-20 mr-4 hidden md:block" />
              {/* Total Header (Desktop) */}
              <Skeleton className="h-6 w-20 hidden md:block" />
            </div>

            {/* Table Rows Skeleton */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-t px-4 py-4 flex flex-col md:flex-row md:items-center">
                {/* Checkbox Cell */}
                <div className="flex items-center justify-center md:pr-4">
                  <Skeleton className="h-6 w-6" />
                </div>
                {/* Product Details Cell */}
                <div className="flex flex-col md:flex-row md:items-center flex-1">
                  {/* Image Skeleton */}
                  <Skeleton className="h-20 w-20 rounded-md mr-4" />
                  {/* Text Skeletons */}
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                {/* Desktop: Price, Quantity, Total */}
                <div className="hidden md:flex items-center space-x-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary Skeleton */}
        <div className="w-full lg:w-1/3 h-fit bg-gray-50 rounded-2xl border py-4 px-6 space-y-4">
          {/* Order Summary Header */}
          <Skeleton className="h-8 w-40" />
          {/* Order Details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          {/* Checkout Button Skeleton */}
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
