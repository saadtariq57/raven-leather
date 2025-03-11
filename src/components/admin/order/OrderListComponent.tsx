"use client";

import { Inter } from "next/font/google";
const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    style: ["normal", "italic"],
});

import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Circle } from "lucide-react";
import Image from "next/image";
import OrderDetailsDialog from "@/components/OrderDetailsDialog";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";

export default function OrderList( { orders, orderStatus }: { orders: OrderWithOrderItemsAndProduct[], orderStatus: string } ) {
  
    return (
        <div className={`flex h-screen ${inter.className}`}>
            <div className={`flex-1 px-8 bg-gray-100`}>
                <h2 className={`text-3xl font-bold mt-6 mb-3`}>{orderStatus} Orders</h2>
                <Separator className="mb-8 bg-gray-300" />

                <div className="border rounded-lg overflow-y-auto max-h-[70vh]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-black hover:bg-black">
                                <TableHead className="text-white">Order ID</TableHead>
                                <TableHead className="text-white">Customer</TableHead>
                                <TableHead className="text-white">Total</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Product</TableHead>
                                <TableHead className="text-white">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <OrderDetailsDialog
                                    key={order.id}
                                    order={order}
                                    trigger={
                                        <TableRow className="cursor-pointer hover:bg-gray-200">
                                            <TableCell className="font-semibold pl-5">#{order.id}</TableCell>
                                            <TableCell className="font-semibold">{order.customerName}</TableCell>
                                            <TableCell>{order.totalAmount}</TableCell>
                                            <TableCell className="space-x-2">
                                                <div className="flex items-center gap-2">
                                                    {order.paymentStatus === "PAID" ? (
                                                        <CheckCircle className="text-green-500 w-4 h-4" />
                                                    ) : (
                                                        <Circle className="text-gray-500 w-4 h-4" />
                                                    )}
                                                    <span>{order.paymentStatus}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="flex space-x-2">
                                                {order.orderItems.map((item, index) => (
                                                    <Image
                                                        key={index}
                                                        src={item.product.images[0].url}
                                                        alt={`Product ${index + 1}`}
                                                        width={30}
                                                        height={30}
                                                        className="rounded"
                                                    />
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(order.placedOn).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
