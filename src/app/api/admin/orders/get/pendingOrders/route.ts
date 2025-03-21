import { getPendingOrders } from "@/controllers/orderController";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const orders = await getPendingOrders();
        return NextResponse.json({
            success: true,
            message: "Pending Orders fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching pending Orders." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching pending Orders." + error.message,
        }, { status: 500 })
    }
}