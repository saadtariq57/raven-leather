import { getOrderById, getOrdersByUserId } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const userId = Number(request.nextUrl.searchParams.get("userId"));
        const orders = await getOrdersByUserId(userId);
        return NextResponse.json({
            success: true,
            message: "Orders by userId fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching orders by userId." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching orders by userId." + error.message,
        }, { status: 500 })
    }
}