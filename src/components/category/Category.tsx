"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Import Google Fonts
import { Newsreader } from "next/font/google";
import { Inter } from "next/font/google";

const newsreader = Newsreader({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import { Skeleton } from "../ui/skeleton";

interface ProductsClientProps {
  initialProducts: ProductWithImagesAndSizes[];
  category: string;
  categoryName: string;
}

export default function Category({ initialProducts, category, categoryName }: ProductsClientProps) {

  // Products state with initial data from the server.
  const [products, setProducts] = useState<ProductWithImagesAndSizes[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(initialProducts.length === 20);

  // sortOption state controls the sorting/filtering.
  // "relevance" is defined as the latest products.
  const [sortOption, setSortOption] = useState<string>("relevance");

  const initialMount = useRef(true);


  // When the sort option changes, re-fetch the first page of sorted products.
  useEffect(() => {

    // The flag (initialMount.current) is true so the effect returns immediately without fetching, leaving the initial products intact and avoiding a loading state.
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    const fetchSortedProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/user/product/get/${category}?skip=0&limit=20&sort=${sortOption}`
        );
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          console.log("Sorted Products:", data.products);
          
          setProducts(data.products);
          setHasMore(data.products.length === 20);
        } else {
          setProducts([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching sorted products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSortedProducts();
  }, [sortOption]);

  // "Load More" functionality also passes the sort option so subsequent pages follow the same order.
  const loadMoreProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/user/product/get/${category}?skip=${products.length}&limit=20&sort=${sortOption}`
      );
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products]);
        if (data.products.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 pt-8 min-h-screen mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h1 className={`text-3xl sm:text-4xl mt-5 ${newsreader.className}`}>
          {categoryName}
        </h1>
        <div className="flex sm:flex-row flex-col sm:items-center justify-center gap-1 space-x-2">
          <span className={`text-xs md:text-sm font-semibold text-gray-500 ml-4 ${inter.className}`}>
            Sort by
          </span>
          {/* The Select component now controls the sortOption state */}
          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="low-to-high">Low to High</SelectItem>
              <SelectItem value="high-to-low">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-4">
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="h-4 w-3/4 mt-2" />
              <Skeleton className="h-6 w-1/2 mt-2" />
              <Skeleton className="h-4 w-1/3 mt-2" />
            </div>
          ))
          : products.map((product) => (

            //* Product Card
            <Link key={product.id} href={`/category/${category}/${product.slug}`}>
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Product Image */}
                {product.images && product.images.length > 0 && (
                  <div className="relative w-full aspect-square">

                    <Image
                      src={`${product.images[0].url}?q_auto,f_auto`}
                      alt={product.name}
                      className="w-full h-auto aspect-square object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      width={400}
                      height={400}
                      priority={true}
                    />
                  </div>
                )}
                {/* Product Info */}
                <div className="py-2 px-3">
                  <h2 className={`text-sm font-semibold truncate overflow-ellipsis ${inter.className}`}>
                    {product.name}
                  </h2>
                  <p className={`text-lg font-semibold mb-1 ${inter.className}`}>
                    Rs. {Number(product.price).toLocaleString("en-PK")}
                  </p>
                  <p className={`text-sm text-gray-500 ${inter.className}`}>
                    {product.color}
                  </p>
                </div>
              </div>
            </Link>

          ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center m-8">
          <Button
            onClick={loadMoreProducts}
            disabled={loading}
            className="rounded-full px-5 py-5 font-semibold"
          >
            {loading ? "Loading..." : (<><RefreshCcw className="mr-2" /> LOAD MORE...</>)}
          </Button>
        </div>
      )}
    </div>
  );
}
