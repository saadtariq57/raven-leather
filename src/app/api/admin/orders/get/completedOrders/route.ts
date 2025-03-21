import { getCompletedOrders } from "@/controllers/orderController";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const orders = await getCompletedOrders();
        return NextResponse.json({
            success: true,
            message: "Completed Orders fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching completed Orders." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching completed Orders." + error.message,
        }, { status: 500 })
    }
}