import { getOrders } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const orders = await getOrders();
        return NextResponse.json({
            success: true,
            message: "All Orders fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching all orders." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching all orders." + error.message,
        }, { status: 500 })
    }
}