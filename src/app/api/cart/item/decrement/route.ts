import { decrementCartItemQuantity } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const id = Number( request.nextUrl.searchParams.get("id") );
        const cartItemDecremented = await decrementCartItemQuantity(id);

        if (cartItemDecremented) {
            return NextResponse.json({
                success: true,
                message: "Cart item incremented.",
                cartItem: cartItemDecremented
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while decrementing cart item. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while decrementing cart item. " + error.message,
        }, { status: 500 })
    }
}