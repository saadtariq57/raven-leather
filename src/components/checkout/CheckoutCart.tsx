"use client"
import { Newsreader } from "next/font/google";
const newsreader = Newsreader({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

import { Inter } from "next/font/google";
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItemWithProduct } from "@/types/client/cart.types";
import { Address } from "@prisma/client";
import { useSession } from "next-auth/react";
import AddressComponent from "./AddressComponent";
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import Image from "next/image";

//? This form is for Guest users, if the user is logged in, the address will be fetched from the database.
// ✅ Define Zod Schema
const checkoutSchema = z.object({
    fullName: z.string().min(3, "Full Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    phoneNo: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
    address: z.string().min(5, "Address is too short"),
    city: z.string().min(2, "City is required"),
    countryRegion: z.string().min(2, "Country/Region is required"),
});

interface CartProps {
    cartItems: CartItemWithProduct[];
    address: Address | null;
}

export default function CheckoutCart({ cartItems, address }: CartProps) {
    // console.log("address: ", address);

    const session = useSession();
    
    const router = useRouter();
    const searchParams = new URLSearchParams(window.location.search);
    const itemsPath = searchParams.toString();

    
    console.log("cartItems: ", cartItems);

    //* Calculate the order summary.
    const subtotal = cartItems.reduce((acc, item) => {
        const price = Number(item.product.price);
        const qty = item.quantity;
        return acc + price * qty;
    }, 0);
    const shipping = 200;
    const total = subtotal + shipping;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(checkoutSchema),
        mode: "onBlur",
        defaultValues: {
            fullName: "",
            email: "",
            phoneNo: "",
            address: "",
            city: "",
            countryRegion: "",
        },
    });

    async function handleContinueToPayment() {

        setIsSubmitting(true);
        try {
            //Storing the details in local storage, so they can be retrieved after payment.
            if (session.status === "authenticated") {
                localStorage.setItem("customerName", address?.fullName || "");
                localStorage.setItem("email", address?.email || "");
                localStorage.setItem("phoneNo", address?.phoneNo || "");
                localStorage.setItem("address", address?.address || "");
                localStorage.setItem("city", address?.city || "");
                localStorage.setItem("countryRegion", address?.countryRegion || "");
                localStorage.setItem("user_id", session.data.user.id || "");
                localStorage.setItem("totalAmount", total.toString());

                // Create an array like this [{"productId":2,"quantity":1, "size":"Small"},{"productId":1,"quantity":2}]
                const items = cartItems.map(item => {
                    return {
                        productId: item.product.id,
                        quantity: item.quantity,
                        size: item.size === "" ? null : item.size
                    }
                });
                const orderItems = JSON.stringify(items);
                localStorage.setItem("orderItems", orderItems);

                console.log("Saved to local storage: User");
            }

            if (session.status === "unauthenticated") {
                const isValid = await form.trigger();
                console.log("Form Valid: ", isValid);

                if (isValid) {
                    const formData = form.getValues();
                    localStorage.setItem("customerName", formData.fullName || "");
                    localStorage.setItem("email", formData.email || "");
                    localStorage.setItem("phoneNo", formData.phoneNo || "");
                    localStorage.setItem("address", formData.address || "");
                    localStorage.setItem("city", formData.city || "");
                    localStorage.setItem("countryRegion", formData.countryRegion || "");
                    localStorage.setItem("totalAmount", total.toString());

                    // Create an array like this [{"productId":2,"quantity":1, "size":"Small"},{"productId":1,"quantity":2}]
                    const items = cartItems.map(item => {
                        return {
                            productId: item.product.id,
                            quantity: item.quantity,
                            size: item.size === "" ? null : item.size
                        }
                    });
                    const orderItems = JSON.stringify(items);
                    localStorage.setItem("orderItems", orderItems);

                    console.log("Saved to local storage: Guest");
                }
            }

            //Saving cartItems ids in localStorage so that we can remove them from cart after order is placed.
            const cartItemsIds = JSON.stringify(cartItems.map(item => item.id));
            localStorage.setItem("cartItemsIds", cartItemsIds);

            router.push(`/cart/checkout/payment`);
            setTimeout(() => setIsSubmitting(false), 500);
        } catch (error) {
            setIsSubmitting(false);
            console.log("Error in handleContinueToPayment. ", error);
        }
    }


    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Cart Header */}
            <h1 className={`text-3xl md:text-4xl mb-2 ${newsreader.className}`}>Checkout</h1>
            <Separator className="mb-8" />

            {/* Main Content */}
            <div className={`flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 ${inter.className}`}>
                {/* Product Table */}
                <div className="w-full h-fit lg:w-2/3 overflow-hidden">
                    {
                        session.status === "unauthenticated" ?
                            <AddressComponent form={form} /> :
                            address ?
                                (<div className="mb-6 w-full border rounded-xl overflow-hidden">
                                    <div className="flex justify-between items-center px-4 py-2 bg-gray-200 ">
                                        <span>Shipping</span>
                                        <span>
                                            <img
                                                src="/assets/pencil.svg"
                                                className="size-5 cursor-pointer"
                                                onClick={() => router.push(`/account/address/update?redirect=${encodeURIComponent(`/cart/checkout?${itemsPath}`)}`)} />
                                        </span>
                                    </div>
                                    <div className="p-4 text-gray-500 bg-gray-50">
                                        <p>{address?.fullName}</p>
                                        <p>{address?.address}</p>
                                        <p>{address?.city}</p>
                                        <p>{address?.email}</p>
                                        <p>{address?.phoneNo}</p>
                                    </div>
                                </div>) : (
                                    <div className="mb-6 w-full border rounded-xl overflow-hidden">
                                        <div className="p-4 text-gray-500 bg-gray-50 flex justify-between items-center">
                                            <p className="text-sm">Please add an address to proceed with the checkout.</p>
                                            <Button
                                                variant="default"
                                                onClick={() => router.push(`/account/address/add?redirect=${encodeURIComponent(`/cart/checkout?${itemsPath}`)}`)} >
                                                Add Address
                                            </Button>
                                        </div>
                                    </div>
                                )
                    }

                    <div className="bg-gray-50 border rounded-xl overflow-hidden">
                        <table className={`w-full ${inter.className}`}>
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="px-4 py-2 text-sm font-semibold">PRODUCT</th>
                                    <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">PRICE</th>
                                    <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">QUANTITY</th>
                                    <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => {

                                    const totalPrice = Number(item.product.price) * item.quantity;
                                    return (
                                        <tr key={item.id} className="border-t">
                                            {/* Product Details */}
                                            <td className="p-4 md:p-0">
                                                <div className="flex space-x-4 items-center">
                                                    <Image
                                                        src={item.product.images[0].url}
                                                        alt={item.product.name}
                                                        className="w-20 h-20 object-cover rounded-md md:rounded-none"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold">{item.product.name}</h3>
                                                        <p className="text-sm text-gray-500">{item.product.color}{item.size ? (", " + item.size) : ""}</p>
                                                    </div>
                                                </div>
                                                {/* Mobile View Price & Quantity */}
                                                <div className="mt-4 flex justify-between items-center md:hidden">
                                                    <div className="text-base font-semibold md:font-medium">Rs. {Number(item.product.price).toLocaleString("en-PK")}</div>
                                                    <div className="flex items-center space-x-2">
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Desktop View Price */}
                                            <td className="hidden md:table-cell text-sm xl:text-lg font-medium px-2 py-2">Rs. {Number(item.product.price).toLocaleString("en-PK")}</td>
                                            {/* Desktop View Quantity */}
                                            <td className="hidden md:table-cell px-8">
                                                <div className="flex items-center space-x-2">
                                                    Qty: {item.quantity}
                                                </div>
                                            </td>
                                            {/* Desktop View Total */}
                                            <td className="hidden md:table-cell text-base xl:text-lg font-bold px-4 py-2">Rs. {Number(totalPrice).toLocaleString("en-PK")}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 h-fit bg-gray-50 rounded-2xl border py-4 px-6 space-y-4">
                    <h2 className="text-xl font-bold pb-2">Order summary</h2>
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium">Rs. {Number(subtotal).toLocaleString("en-PK")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span className="font-medium">Rs. {Number(shipping).toLocaleString("en-PK")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-3 pb-3">
                        <span>Total</span>
                        <span>Rs. {Number(total).toLocaleString("en-PK")}</span>
                    </div>
                    <Button className="w-full flex justify-between px-4" variant="default" size="lg" disabled={isSubmitting} onClick={handleContinueToPayment}>
                        <span>Continue to payment</span>
                        {isSubmitting ? <ButtonLoadingSpinner /> : <ArrowRight className="text-2xl" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
