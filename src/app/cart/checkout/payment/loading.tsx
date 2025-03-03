"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen py-14">
      <div className="w-full max-w-[340px] mx-auto p-6">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-48 mx-auto mb-6" />

        {/* Payment Options Skeleton */}
        <div className="space-y-4">
          {/* Option 1: Credit/Debit Card Skeleton */}
          <div className="flex items-center justify-between px-3 py-3 border rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              {/* Checkbox placeholder */}
              <Skeleton className="h-4 w-4 rounded" />
              {/* Label placeholder */}
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center space-x-2">
              {/* Visa & MasterCard image placeholders */}
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>

          {/* Option 2: Cash on Delivery Skeleton */}
          <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            {/* Cash image placeholder */}
            <Skeleton className="h-6 w-6" />
          </div>
        </div>

        {/* Total Amount Section Skeleton */}
        <div className="mt-6 text-center space-y-2">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-6 w-32 mx-auto" />
        </div>

        {/* Next Button Skeleton */}
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}
