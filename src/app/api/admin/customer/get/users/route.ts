import { getAllUsers } from "@/controllers/UserController";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const users = await getAllUsers();
        return NextResponse.json({
            success: true,
            message: "All users fetched.",
            users,
        });
    }
    catch (error: any) {
        console.error("Error occurred while all users." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while all users." + error.message,
        }, { status: 500 })
    }
}