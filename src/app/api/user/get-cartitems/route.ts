import { get_user_cartItems } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user_id = Number( request.nextUrl.searchParams.get("userId") );
        const cartItems = await get_user_cartItems(user_id);

        if (cartItems) {
            return NextResponse.json({
                success: true,
                message: "User Cart items fetched.",
                cartItems
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while fetching user cart items. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching user cart items. " + error.message,
        }, { status: 500 })
    }
}