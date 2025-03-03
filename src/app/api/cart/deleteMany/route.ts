import { deletManyCartItems } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { cartItemsIds } = await request.json();

        await deletManyCartItems(cartItemsIds);

        return NextResponse.json({
            success: true,
            message: "Cart Items deleted.",
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error occurred while deleting cart items. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while deleting cart items. " + error.message,
        }, { status: 500 })
    }
}