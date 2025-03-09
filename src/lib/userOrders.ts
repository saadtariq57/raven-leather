import { getOrdersByUserId } from "@/controllers/orderController";

export async function getUserOrder(userId: number) {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get/orderByUserId?userId=${userId}`);
    // const data = await response.json();
    // return data.orders; // Assuming the data structure has user orders
    
    const userOrders: any = await getOrdersByUserId(userId);
    return userOrders;
}