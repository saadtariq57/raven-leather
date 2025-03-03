import { get_guest_cartItems } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session_id = String( request.nextUrl.searchParams.get("sessionId") );
        const cartItems = await get_guest_cartItems(session_id);

        if (cartItems) {
            return NextResponse.json({
                success: true,
                message: "Guest Cart items fetched.",
                cartItems
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while fetching guest cart items. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching guest cart items. " + error.message,
        }, { status: 500 })
    }
}