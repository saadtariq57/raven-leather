import { auth } from "@/auth";
import { getGuestCartItems, getUserCartItems } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authjs_session = request.cookies.get("authjs.session-token")?.value;
        const session_id = request.cookies.get("session_id")?.value;

        console.log("Received session_id from cookies: ", session_id);
        console.log("Received authjs_session from cookies: ", authjs_session);

        if (authjs_session) {
            // Handle authenticated user
            console.log("authjs_session: ", authjs_session);
            const data = await auth();
            if (data?.user) {
                const cartItems = await getUserCartItems(Number(data.user.id));

                return NextResponse.json({
                    success: true,
                    message: "User Cart items fetched.",
                    cartItems
                }, { status: 200 })

            }
        }

        if (session_id && !authjs_session) {
            // Handle guest user
            console.log("session_id: ", session_id);
            
            const cartItems = await getGuestCartItems(session_id);

            return NextResponse.json({
                success: true,
                message: "Guest user Cart items fetched.",
                cartItems
            }, { status: 200 })

        }

        return NextResponse.json({
            success: false,
            message: "No session found",
        }, { status: 400 });

    } catch (error: any) {
        console.error("Error occurred while getting cart items. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while getting cart items. " + error.message,
        }, { status: 500 })
    }
}