"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

interface NewArrivalsProps {
  newArrivals: ProductWithImagesAndSizes[];
}

export default function NewArrivals({ newArrivals }: NewArrivalsProps) {
  return (
    <section className="max-w-7xl sm:w-5/6 xl:w-full m-auto">
      <h2 className="xl:text-3xl md:text-2xl text-xl font-medium mb-6 text-center">New Arrivals</h2>
      <Carousel
        className="md:w-full"
        opts={{ align: "start" }}
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent className="flex md:gap-4 gap-2">
          {newArrivals.map((product, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-[#F3F3F3] w-full h-[290px] md:h-[320px] lg:h-[370px] xl:h-[470px] ">
                <Link href={`/category/${product.category}s/${product.slug}`} className="h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="w-full bg-white overflow-hidden aspect-square md:aspect-[4/5]">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={600}
                        height={400}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col p-2 md:p-3">
                      <div className="h-[40px] md:h-[48px] mb-1">
                        <h3 className={`text-sm md:text-base font-semibold line-clamp-2 ${inter.className}`}>{product.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500">{product.color}</p>
                      <p className={`text-base md:text-lg font-semibold ${inter.className}`}>
                        Rs. {Number(product.price).toLocaleString("en-PK")}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden lg:flex">
          <span>&lt;</span>
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden lg:flex">
          <span>&gt;</span>
        </CarouselNext>
      </Carousel>
    </section>
  );
}