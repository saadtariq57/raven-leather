"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignupSkeleton() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 px-5 md:px-0">
      <div className="w-full max-w-sm mt-12 p-6 bg-white rounded-md shadow-md">
        {/* Title */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="h-8 w-3/4" />
        </div>
        
        <div className="space-y-4">
          {/* Full Name */}
          <Skeleton className="h-10 w-full" />

          {/* Email */}
          <Skeleton className="h-10 w-full" />

          {/* Password */}
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Sign Up Button */}
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Already have an account */}
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-5 w-2/3" />
        </div>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <Skeleton className="h-px w-full" />
          </div>
          <div className="relative flex justify-center text-sm text-gray-500 bg-white">
            <Skeleton className="h-5 w-10" />
          </div>
        </div>

        {/* Continue with Google */}
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
