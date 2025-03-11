import { getCurrentMonthOrdersCount } from "@/controllers/orderController";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const orderCount = await getCurrentMonthOrdersCount();
        return NextResponse.json({
            success: true,
            message: "Current month's orders count fetched.",
            orderCount: { orderCount },
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching current month's orders count." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching current month's orders count." + error.message,
        }, { status: 500 })
    }
}