import { NextRequest, NextResponse } from 'next/server';
import { change_orderStatus } from '@/controllers/orderController';

export async function POST(request: NextRequest){
    try {
        const order = await change_orderStatus(request);
        return NextResponse.json({
            success: true,
            message: "Order status changed successfully.",
            order,
        })
    }
    catch (error: any) {
        console.error("Error occurred while changing order status." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while changing order status." + error.message,
        }, { status: 500 })
    }
}