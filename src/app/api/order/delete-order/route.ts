import { deleteOrder } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const orderId = Number(request.nextUrl.searchParams.get("orderId"));
        const response = await deleteOrder(orderId);
        return NextResponse.json({
            success: true,
            message: "Order deleted successfully.",
            response,
        });
    }
    catch (error: any) {
        console.error("Error occurred while deleting order." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while deleting order." + error.message,
        }, { status: 500 })
    }
}