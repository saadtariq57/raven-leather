import { getCancelledOrders } from "@/controllers/orderController";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const orders = await getCancelledOrders();
        return NextResponse.json({
            success: true,
            message: "Cancelled orders fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching cancelled orders." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching cancelled orders." + error.message,
        }, { status: 500 })
    }
}