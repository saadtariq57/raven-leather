"use client";
import { useEffect, useState } from "react";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";
import OrderList from "@/components/admin/order/OrderListComponent";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PendingOrders() {
    const [orders, setOrders] = useState<OrderWithOrderItemsAndProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrderDetails() {
            const response = await axios.get('/api/admin/orders/get/cancelledOrders');
            setOrders(response.data.orders);
            setIsLoading(false);
        }
        fetchOrderDetails();
    }, [])

    return (
        <>
        
            {/* Table or Loading / No Bag Found */}
            {isLoading ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                    <LoadingSpinner />
                </div>
            ) : orders.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                    No Cancelled orders found.
                </div>
            ) : (
                <OrderList orders={orders} orderStatus="Cancelled" />
            )
            }
        </>
    );

}
