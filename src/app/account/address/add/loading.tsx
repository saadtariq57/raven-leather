"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddAddressPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      {/* Page Title */}
      <div className="mb-6 flex justify-center">
        <Skeleton className="h-10 w-[50vw]" />
      </div>

      {/* Full Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Address */}
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* City */}
      <div className="mt-4">
        {/* Although your actual form places City in a grid, since there’s only one field here, we use full width */}
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Country/Region */}
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Buttons: Update Address & Cancel */}
      <div className="flex gap-4 mt-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
