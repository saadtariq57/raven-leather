import { getTodayOrdersCount } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const orderCount = await getTodayOrdersCount();
        return NextResponse.json({
            success: true,
            message: "Today's orders count fetched.",
            orderCount: { orderCount },
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching today's orders count." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching today's orders count." + error.message,
        }, { status: 500 })
    }
}