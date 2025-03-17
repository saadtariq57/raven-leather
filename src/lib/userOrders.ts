import { getOrdersByUserId } from "@/controllers/orderController";

export async function getUserOrder(userId: number) {    
    const userOrders: any = await getOrdersByUserId(userId);
    return userOrders;
}