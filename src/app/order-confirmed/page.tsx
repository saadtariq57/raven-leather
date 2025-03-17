"use client";

import React, { useEffect, useState } from "react";
import OrderConfirmed from "@/components/order/OrderConfirmed";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";
import OrderByIdSkeleton from "./loading";

export default function OrderConfirmationCard() {
    const searchParams = useSearchParams();
    const orderId = Number(searchParams.get("orderId"));

    const [order, setOrder] = useState<OrderWithOrderItemsAndProduct | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get/orderById?orderId=${orderId}`);
            setOrder(response.data.order);
        }
        fetchOrder();
    }, [])


    return order ? <OrderConfirmed order={order} /> : <OrderByIdSkeleton />;

}

