"use client";

import { Inter } from "next/font/google";
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
    
});

import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import axios from "axios";
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ViewProduct({ product }: { product: ProductWithImagesAndSizes }) {
        
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || "");
    const router = useRouter();
    const { setCartItemsCount } = useCart();

    console.log("Product sizes: ", product.sizes);
    
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const addToCart = async () => {
        setIsAddingToCart(true);
        try {
            const response = await axios.post('/api/cart/item/add', { product_id: product.id, quantity, size: selectedSize });
            if(response.data.status === "new"){
                // Only increment the cart if a new item is added not if an item quantity is incremented
                setCartItemsCount( (prevCount) => prevCount + 1 )
            }
        } catch (error) {
            console.log("Error adding cart item: ", error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    const buyNow = async () => {
        setIsBuying(true);
        try {
            console.log("size: ", selectedSize);
            if(selectedSize === ""){
                router.push(`/cart/checkout?productId=${product.id}&productQuantity=${quantity}`);
            } else {
                router.push(`/cart/checkout?productId=${product.id}&productQuantity=${quantity}&productSize=${selectedSize}`);
            }
            
        } catch (error) {
            console.log("Error adding cart item: ", error);
        }
    };
    
    const formattedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1) + "s";

    return (
        <div className="max-w-7xl mx-auto p-2 md:p-6 space-y-3 min-h-screen">
            <Breadcrumb className="mt-3 ml-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/category/${product.category + "s"}`}>{formattedCategory}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="cursor-pointer">
                        <BreadcrumbLink>
                            {product.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="flex flex-col lg:flex-row gap-3 overflow-hidden ">
                {/* Product Image */}
                <div className="w-full lg:w-2/3">
                    <Carousel>
                        <CarouselContent className="flex gap-4">
                            {product.images.map((image) => (
                                <CarouselItem key={image.public_id}>
                                    <Image
                                        src={image.url}
                                        className="w-full object-cover"
                                        alt="Product Image" 
                                        width={500} 
                                        height={500}
                                        priority={true}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                            <span>&lt;</span>
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                            <span>&gt;</span>
                        </CarouselNext>
                    </Carousel>
                </div>

                <div className="w-full lg:w-1/2 space-y-5 px-4">
                    <h1 className={`text-xl md:text-2xl font-semibold lg:mt-6 ${inter.className}`}>
                        {product.name}
                    </h1>

                    <div>
                        <p className={`text-sm font-medium ${inter.className}`}>Price:</p>
                        <span className={`text-xl font-bold text-gray-700 ${inter.className}`}>Rs. </span>
                        <span className={`text-2xl font-bold ${inter.className}`}>
                            {Number(product.price).toLocaleString("en-PK")}
                        </span>
                    </div>

                    <div>
                        <span className={`text-sm font-medium ${inter.className}`}>Color: </span>
                        <span className={`text-sm font-bold ${inter.className}`}>{product.color}</span>
                    </div>

                    <div className="flex items-center gap-6 mt-4">
                        {/* Size Selector */}
                        { product.sizes.length > 0 ? 
                        <div className="space-y-2">
                            <label className={`text-sm block font-medium ${inter.className}`}>Size:</label>
                            <Select onValueChange={(value) => setSelectedSize(value) } defaultValue={selectedSize}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select your size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Size</SelectLabel>
                                        {product.sizes.map((size) => (
                                            <SelectItem key={size.id} value={size.size}>
                                                {size.size}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div> : ""
                        }

                        {/* Quantity Selector */}
                        <div className="space-y-2">
                            <label className={`text-sm block font-medium ${inter.className}`}>Quantity:</label>
                            <div className="flex items-center rounded-lg w-28">
                                <Button variant="outline" className="w-1/3 rounded-md text-lg" onClick={decrementQuantity}>
                                    <FiMinus />
                                </Button>

                                <div className="flex-1 text-center text-lg font-medium">{quantity}</div>

                                <Button variant="outline" className="w-1/3 rounded-md text-2xl" onClick={incrementQuantity}>
                                    <FiPlus />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-normal gap-6 pt-3 md:pr-6 pb-6 mb-4 md:pb-0">
                        <Button variant="default" className="px-6 w-1/2" onClick={buyNow} disabled={isBuying}>
                        { isBuying ? <ButtonLoadingSpinner /> : "Buy Now"}
                        </Button>
                        <Button variant="outline" className={ isAddingToCart ? `px-6 w-1/2 bg-slate-500`: `px-6 w-1/2`} onClick={addToCart} disabled={isAddingToCart}>
                            { isAddingToCart ? <ButtonLoadingSpinner /> : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="description" className={`space-y-6 py-6 ${inter.className}`}>
                <TabsList className="flex space-x-4 border-b">
                    <TabsTrigger value="description" className="md:text-lg font-medium">
                        Description
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                    <p className={`text-gray-700 text-md leading-relaxed ${inter.className}`}>
                        {product.description}
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
