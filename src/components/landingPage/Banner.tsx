"use client"; // This is a Client Component
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full lg:h-auto overflow-hidden mb-20 xl:flex">
      <Carousel plugins={[Autoplay({ delay: 5000 })]}>
        <CarouselContent className="flex gap-4">
          <CarouselItem>
            <picture>
              {/* Image for large screens */}
              <source srcSet="/images/banner.webp" media="(min-width: 1440px)" />
              {/* Default image for smaller screens */}
              <Image
                src="/images/jackets-cropped.webp"
                alt="Banner"
                width={1440}
                height={600}
                className="w-full h-[60vh] object-cover mb-4"
              />
            </picture>
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/belt-new.webp"
              className="w-full h-[60vh] object-cover mb-4"
              alt="Banner"
              width={1440}
              height={600}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/jacket-new.webp"
              alt="Banner"
              className="w-full h-[60vh] object-cover mb-4"
              width={1440}
              height={600}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden lg:flex">
          <span>&lt;</span>
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden lg:flex">
          <span>&gt;</span>
        </CarouselNext>
      </Carousel>
    </div>
  );
}
