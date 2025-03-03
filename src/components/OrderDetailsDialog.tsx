import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CancelOrderAlertDialog from "./CancelOrderAlertDialog";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";
import axios from "axios";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";
import { useState } from "react";

interface OrderDetailsDialogProps {
    order: OrderWithOrderItemsAndProduct;
    trigger: React.ReactNode; // A React node to trigger the dialog (e.g., table row)
}

export default function OrderDetailsDialog({ order, trigger }: OrderDetailsDialogProps) {
    const [isCompleting, setIsCompleting] = useState(false);

    //Complete Order
    async function completeOrder(orderId: number) {
        setIsCompleting(true);
        try {
            const data = {
                orderId,
                orderStatus: "completed",
            };
            const response = await axios.post('/api/admin/order/change-orderStatus', data)
            console.log("response: ", response.data);
            if (response.data.success) {
                setIsCompleting(false);
                window.location.reload();
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] p-6 flex flex-col overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
                </DialogHeader>
                {order && (
                    <div className="flex flex-col flex-grow space-y-6 overflow-y-auto">
                        {/* Order Information */}
                        <div className="text-sm space-y-2">
                            <p><strong>Order ID:</strong> #{order.id}</p>
                            <p>
                                <strong>Placed on:</strong>{" "}
                                {new Date(order.placedOn).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </p>
                            <p><strong>Customer's Name:</strong> {order.customerName}</p>
                            <p><strong>Phone No.:</strong> {order.phoneNo}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>City:</strong> {order.city}</p>
                            <p><strong>Country/Region:</strong> {order.countryRegion}</p>
                        </div>

                        <Separator />

                        {/* Order Summary */}
                        <div className="space-y-4">
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
                                                        width={30}
                                                        height={30}
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
                            <div>
                                <p className="font-semibold text-lg">Total: {Number(order.totalAmount).toLocaleString("en-PK")}</p>
                                <p className=" font-semibold">
                                    Payment Status: <span className={order.paymentStatus === "PAID" ? "text-green-500" : "text-gray-500"}>{order.paymentStatus}</span>
                                </p>
                            </div>
                        </div>


                        {/* Action Buttons */}
                        {order.orderStatus == "pending" ?
                            <>
                                <Separator />
                                <div className="flex justify-between mt-auto">
                                    <CancelOrderAlertDialog orderId={order.id} />
                                    <Button type="submit" className="px-6 py-2" size="lg" disabled={isCompleting} onClick={() => completeOrder(order.id)}>
                                        {isCompleting ? <ButtonLoadingSpinner /> : "Complete Order"}
                                    </Button>
                                </div>
                            </>
                            : ""
                        }
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
