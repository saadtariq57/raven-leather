"use client"; // This is a Client Component
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
        <CarouselContent className="flex gap-4">
          {newArrivals.map((product, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-[#F3F3F3] w-[45vw] md:w-auto">
                <Link href={`/category/${product.category}s/${product.slug}`}>
                <CardContent className="p-0">
                  <div className="md:h-[60%] xl:h-[70%] bg-white">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      className="xl:w-full object-cover mb-2"
                      width={600}
                      height={400}
                      loading="lazy"
                      />
                  </div>
                  <h3 className={`md:text-base text-sm font-semibold ml-3 mr-1 ${inter.className}`}>{product.name}</h3>
                  <p className="md:text-sm text-xs text-gray-500 ml-3">{product.color}</p>
                  <p className={`text-lg font-semibold ${inter.className} mt-2 ml-3 mb-3`}>
                    Rs. {Number(product.price).toLocaleString("en-PK")}
                  </p>
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
