import { NextResponse } from "next/server";

export async function GET() {
    try {
        const username = process.env.ADMIN_USERNAME;
        return NextResponse.json({
            success: true,
            message: "Admin username fetched successfully.",
            username
        })

    } catch (error: any) {
        console.error("Error occurred while fetching all sales stats: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching all sales stats: " + error.message,
        }, { status: 500 });
    }
}
