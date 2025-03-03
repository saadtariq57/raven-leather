import { getOrderById } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const orderId = Number(request.nextUrl.searchParams.get("orderId"));
        console.log("API: orderId", orderId);
        const order = await getOrderById(orderId);
        return NextResponse.json({
            success: true,
            message: "Order by Id fetched successfully.",
            order,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching order by Id." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching order by Id." + error.message,
        }, { status: 500 })
    }
}