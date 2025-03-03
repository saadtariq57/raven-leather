import { incrementCartItemQuantity } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cartItem_id = Number( request.nextUrl.searchParams.get("id") );
        const cartItemIncremented = await incrementCartItemQuantity(cartItem_id);
        
        if (cartItemIncremented) {
            return NextResponse.json({
                success: true,
                message: "Cart item incremented.",
                cartItem: cartItemIncremented
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while incrementing cart item. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while incrementing cart item. " + error.message,
        }, { status: 500 })
    }
}