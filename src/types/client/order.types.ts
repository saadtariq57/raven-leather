import { ProductInterface } from "./product.types";

export interface TodayOrders {
    orderCount: number
}

export interface MonthOrders {
    orderCount: number
}

interface OrderItemWithProduct {
    id: number;
    order_id: number;
    product_id: number;
    product: ProductInterface;
    quantity: number;
    size?: string;
}

export interface OrderWithOrderItemsAndProduct {
    id: number;
    customerName: string;
    address: string;
    email: string;
    phoneNo: string;
    city: string;
    countryRegion: string;
    placedOn: Date;
    totalAmount: number;
    paymentStatus: string;
    user_id?: number; // Optional field
    orderStatus: string;
    orderItems: OrderItemWithProduct[];
}

