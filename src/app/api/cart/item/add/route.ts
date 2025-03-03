import { addCartItem } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const response = await addCartItem(request);

        if (response) {
            return NextResponse.json({
                success: true,
                message: "Cart item added.",
                cartItem: response.cartItem,
                status: response.status
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while adding cart item. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while adding cart item. " + error.message,
        }, { status: 500 })
    }
}