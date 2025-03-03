import { createOrder } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const newOrder = await createOrder(request);
        return NextResponse.json({
            success: true,
            message: "Order placed successfully.",
            newOrder,
        });
    }
    catch (error: any) {
        console.error("Error occurred while placing order." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while placing order." + error.message,
        }, { status: 500 })
    }
}