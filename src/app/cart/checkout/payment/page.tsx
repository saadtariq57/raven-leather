"use client"

import { Inter } from "next/font/google";
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentSelection() {
    const router = useRouter();
    
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const amount = Number(localStorage.getItem("totalAmount"));
        setTotalAmount(amount);
    }, []);

    const [selectedOption, setSelectedOption] = useState<"card" | "cod">("cod");

    const handleOptionChange = (option: "card" | "cod") => {
            setSelectedOption(option);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit() {
        setIsSubmitting(true);
        try {
            const customerName = localStorage.getItem("customerName");
            const email = localStorage.getItem("email");
            const phoneNo = localStorage.getItem("phoneNo");
            const address = localStorage.getItem("address");
            const city = localStorage.getItem("city");
            const countryRegion = localStorage.getItem("countryRegion");
            const orderItems = localStorage.getItem("orderItems");
            const user_id = localStorage.getItem("user_id");

            const formData = new FormData();
            formData.append("customerName", customerName || "");
            formData.append("email", email || "");
            formData.append("phoneNo", phoneNo || "");
            formData.append("address", address || "");
            formData.append("city", city || "");
            formData.append("countryRegion", countryRegion || "");
            formData.append("orderItems", orderItems || "");
            formData.append("totalAmount", totalAmount.toString());
            formData.append("paymentStatus", selectedOption === "card" ? "PAID" : "COD");
            formData.append("user_id", user_id || "");
            console.log("paymentMethod", selectedOption.toString());

            //Creating order
            const response = await axios.post('/api/order/create-order', formData);
            console.log("response.data:", response.data);
            if (response.data.success) {
                //Deleting cart items
                const cartItemsIds = JSON.parse(localStorage.getItem("cartItemsIds") || "[]");
                console.log("cartItemsIds", cartItemsIds);
                if (cartItemsIds.length > 0) {
                    await axios.post('/api/cart/deleteMany', cartItemsIds);
                }
                localStorage.clear();
                router.replace(`/order-confirmed?orderId=${response.data.newOrder.id}`)

                // window.location.href = `/order-confirmed?orderId=${response.data.newOrder.id}`;

            }

        } catch (error: any) {
            setIsSubmitting(false);
            console.log("Error while submitting order:", error.message);
        }
    }

    const isDisabled = true; // or based on some condition


    return (

        <div className={`min-h-screen py-14 ${inter.className}`}>
            <Card className="w-full max-w-[340px] mx-auto p-6 ">
                {/* Title */}
                <h2 className="text-center text-lg font-semibold mb-6">Select Payment Option</h2>

                {/* Payment Options */}
                <CardContent className="space-y-4 px-0">
                    {/* Credit/Debit Card */}
                    <div
                        className={`flex items-center justify-between px-3 py-3 border rounded-lg 
                        ${isDisabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer"} 
                        ${selectedOption === "card" ? "border-black" : "border-gray-300"}`}
                        onClick={!isDisabled ? () => handleOptionChange("card") : undefined}
                    >
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={selectedOption === "card"}
                                onCheckedChange={() => handleOptionChange("card")}
                                className="pointer-events-none"
                            />
                            <Label className="text-sm">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Image src="/images/visa.png" alt="Visa" width={50} height={50} className="w-6" />
                            <Image src="/images/mastercard.png" alt="MasterCard" width={50} height={50} className="w-6" />
                        </div>
                    </div>

                    {/* Credit/Debit Card Original */}
                    {/* <div

                        className={`flex items-center justify-between px-3 py-3 border rounded-lg cursor-pointer ${selectedOption === "card" ? "border-black" : "border-gray-300"
                            }`}
                        onClick={() => handleOptionChange("card")}
                    >
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={selectedOption === "card"}
                                onCheckedChange={() => handleOptionChange("card")}
                                className="pointer-events-none"
                            />
                            <Label className="text-sm">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="/images/visa.png" alt="Visa" className="w-6" />
                            <img src="/images/mastercard.png" alt="MasterCard" className="w-6" />
                        </div>
                    </div> */}

                    {/* Cash on Delivery */}
                    <div
                        className={`w-full flex items-center justify-between p-3 border rounded-lg cursor-pointer ${selectedOption === "cod" ? "border-black" : "border-gray-300"
                            }`}
                        onClick={() => handleOptionChange("cod")}
                    >
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={selectedOption === "cod"}
                                onCheckedChange={() => handleOptionChange("cod")}
                                className="pointer-events-none"
                            />
                            <Label className="text-sm">Cash on Delivery</Label>
                        </div>
                        <Image src="/images/cod.png" alt="Cash" width={50} height={50} className="relative w-6" />
                    </div>
                </CardContent>

                {/* Total Amount Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-semibold">Rs. {totalAmount.toLocaleString("en-PK")}
                    </p>
                </div>

                {/* Next Button */}
                <Button className="w-full flex justify-between px-4 mt-4" variant="default" type="button" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                    <span>Next</span>
                    {isSubmitting ? <ButtonLoadingSpinner /> : <ArrowRight className="text-2xl" />}
                </Button>
            </Card>
        </div>
    );
}
