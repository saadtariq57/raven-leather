"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import { Inter } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";
// Remove LoadingSpinner import if no longer needed
// import LoadingSpinner from "../LoadingSpinner";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function Search() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<ProductWithImagesAndSizes[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reference for the container (if needed)
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fetch products on search query change
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${searchQuery}`);
        const data = await res.json();
        console.log("Search results:", data);
        setResults(data.searchResult);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDropdownOpen(true);
  };

  const handleShowMore = () => {
    router.push(`/search?query=${searchQuery}`);
    setDropdownOpen(false);
  };

  const handleSearchButton = () => {
    router.push(`/search?query=${searchQuery}`);
    setDropdownOpen(false);
  };

  // If the user presses Enter, navigate to the search page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim().length > 0) {
      router.push(`/search?query=${searchQuery}`);
      setDropdownOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="rounded-r-none outline-none w-full px-4 py-2 bg-gray-200 rounded-l-md focus:bg-white focus:border-slate-400 focus-visible:ring-0 customFocus"
        />
        <Button
          variant="outline"
          className="rounded-l-none"
          onClick={handleSearchButton}
        >
          <Image src="/assets/search.svg" alt="search" width={22} height={22} />
        </Button>
      </div>

      {/* When the dropdown is open, render an overlay to intercept taps */}
      {isDropdownOpen && (
        <>
          {/* Overlay that covers the viewport */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(false);
            }}
            className="fixed inset-0 z-40"
            style={{ background: "transparent" }}
          />
          {/* Dropdown for search results (above overlay) */}
          <div
            className={`absolute left-0 top-full mt-1 w-full bg-white shadow-md rounded ${inter.className} z-50`}
          >
            {loading ? (
              <div className="p-4 space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {results.slice(0, 3).map((product) => (
                  <Link
                    href={`/category/${product.category}s/${product.slug}`}
                    key={product.id}
                    onClick={() => {
                      setDropdownOpen(false);
                      setSearchQuery("");
                    }}
                    className="block hover:bg-gray-100 px-4 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.images?.[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-gray-500">
                            {product.color}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        Rs. {Number(product.price).toLocaleString("en-PK")}
                      </div>
                    </div>
                  </Link>
                ))}
                {results.length > 3 && (
                  <div className="flex justify-center p-2">
                    <Button variant="secondary" onClick={handleShowMore}>
                      Show More
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 p-4">
                No results found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
