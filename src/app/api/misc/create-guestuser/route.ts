import { create_guestUser } from "@/controllers/guestUserController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session_id = request.nextUrl.searchParams.get("sessionId");

        if (!session_id) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const guestUser = await create_guestUser(session_id);

        if (guestUser) {
            return NextResponse.json({
                success: true,
                message: "Guest User created.",
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while creating guest user. " + error.message);
        return NextResponse.json({
            success: true,
            message: "Error occurred while creating guest user. " + error.message,
        }, { status: 500 })
    }
}