import { Image, Size } from "@prisma/client";

export interface ProductInterface {
    id: number;
    name: string;
    color: string;
    price: number;
    sizes: Size[]; // Assuming `Size` is another interface
    quantity?: number;
    images: Image[]; // Assuming `Image` is another interface
    description: string;
    status: boolean;
    category: string;
    allTimeSales?: number;
  }

export interface BestSellingProducts {
    id: number;
    name: string;
    color: string;
    price: number;
    images: Image[];
    description: string;
    status: boolean;
    category: string;
    allTimeSales?: number;
}

export interface ProductWithImagesAndSizes {
    id: number;
    name: string;
    slug: string | null;
    color: string;
    price: number;
    quantity: number | null;
    description: string;
    status: boolean;
    category: string;
    allTimeSales: number | null;
    images: Image[];
    sizes: Size[];
}