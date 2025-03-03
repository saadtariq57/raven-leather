"use client";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

export default function CategorySection() {
  const categories = [
    { img: "/images/jacket_c.webp", title: "Jackets", url: "/category/jackets" },
    { img: "/images/belt_c.webp", title: "Belts", url: "/category/belts" },
    { img: "/images/wallet_c.webp", title: "Wallets", url: "/category/wallets" },
    { img: "/images/bag_c.webp", title: "Bags", url: "/category/bags" },
  ];

  return (
    <section>
      <h2 className="xl:text-3xl md:text-2xl text-xl font-medium pt-10 mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 max-w-3xl m-auto mb-20">
        {categories.map((category, index) => (
          <Link key={index} href={category.url} rel="preload">
            <div className="relative h-48 md:h-[50vh] xl:h-[70vh] rounded-lg overflow-hidden group cursor-pointer mx-3 sm:mx-0">
              <Image
                src={category.img}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                width={800}
                height={600}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-white text-2xl">{category.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
