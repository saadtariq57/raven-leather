import { auth } from "@/auth";
import { getGuestCartItemsCount, getUserCartItemsCount } from "@/controllers/cartController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authjs_session = request.cookies.get("authjs.session-token")?.value;
        const session_id = request.cookies.get("session_id")?.value;

        if (authjs_session) {
            // Handle authenticated user
            console.log("authjs_session: ", authjs_session);
            const data = await auth();
            if (data?.user) {
                const cartItemsCount = await getUserCartItemsCount(Number(data.user.id));

                return NextResponse.json({
                    success: true,
                    message: "User Cart items count fetched.",
                    cartItemsCount
                }, { status: 200 })

            }
        }

        if (session_id && !authjs_session) {
            // Handle guest user
            console.log("session_id: ", session_id);
            
            const cartItemsCount = await getGuestCartItemsCount(session_id);

            return NextResponse.json({
                success: true,
                message: "Guest user Cart items count fetched.",
                cartItemsCount
            }, { status: 200 })

        }

        return NextResponse.json({
            success: false,
            message: "No session found",
        }, { status: 400 });

    } catch (error: any) {
        console.error("Error occurred while getting cart items count. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while getting cart items count. " + error.message,
        }, { status: 500 })
    }
}