"use client"
import { Inter } from "next/font/google";
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Image from "next/image";

export default function OrderConfirmed({ order }: { order: OrderWithOrderItemsAndProduct }) {
    return (
        <div className={`min-h-screen sm:pt-10 p-4 ${inter.className}`}>
            <Card className="w-full max-w-[400px] mx-auto sm:p-3 bg-gray-50 rounded-lg shadow ">
                {/* Header with Success Icon */}
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <Image src="/images/success.png" width={100} height={100} alt="success" className="w-14" />
                        <CardTitle className="text-lg font-semibold">Order successfully placed!</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">Order confirmation has been sent to your email</p>
                </CardHeader>

                {/* Order Details */}
                <CardContent className="space-y-2">
                    <p className="text-sm text-gray-800">
                        <strong>Order ID:</strong> #{order.id}
                    </p>
                    <p className="text-sm text-gray-800">
                        <strong>Total Amount:</strong> Rs. {Number(order.totalAmount).toLocaleString("en-PK")}

                    </p>
                    <div className="text-sm text-gray-800 flex items-center gap-1">
                        <strong>Payment Status:</strong>
                        <p className={order.paymentStatus === "PAID" ? "text-green-500" : "text-gray-500"} >{order.paymentStatus}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <Table>
                            <TableBody>
                                {order.orderItems.map((item, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.quantity}x</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src={item.product.images[0].url}
                                                    alt={item.product.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded"
                                                />
                                                <span>{item.product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>Rs. {Number(item.product.price).toLocaleString("en-PK")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Continue Shopping Button */}
                    <div className="pt-4">
                        <Button className="w-full flex justify-between px-4 mt-4" variant="default" size="lg" onClick={() => window.location.href = "/"}>
                            <span>Continue Shopping</span>
                            <ArrowRight className="text-2xl" />
                        </Button>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}
