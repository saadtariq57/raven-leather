"use client";

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

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";

interface ProductsClientProps {
  products: ProductWithImagesAndSizes[];
  query: string;
}

export default function ShowMoreSearched({ products, query }: ProductsClientProps) {
    
  return (
    <div className="container max-w-6xl mx-auto px-4 pt-8 min-h-screen mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h1 className={`text-3xl sm:text-4xl mt-5 ${newsreader.className}`}>
          Searched results for &quot;{query}&quot;
        </h1>

      </div>

      <Separator className="mb-8" />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (

          //* Product Card
            <Link key={product.id} href={`/category/${product.category}s/${product.slug}`}>
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Product Image */}
            {product.images && product.images.length > 0 && (
              <Image
                src={product.images[0].url}
                alt={product.name}
                className="w-full object-cover"
                width={400}
                height={400}
              />
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

    </div>
  );
}
