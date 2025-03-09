import { NextRequest, NextResponse } from 'next/server';
import { getPendingOrdersCount } from '@/controllers/orderController';

export async function GET(request: NextRequest){
    try {
        const orderCount = await getPendingOrdersCount();
        return NextResponse.json({
            success: true,
            message: "Pending Orders Count fetched.",
            orderCount,
        })
    }
    catch (error: any) {
        console.error("Error occurred while fetching Pending Orders Count." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching Pending Orders Count." + error.message,
        }, { status: 500 })
    }
}