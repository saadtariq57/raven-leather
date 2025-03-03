import { getAddressByUser } from "@/controllers/addressController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = Number(request.nextUrl.searchParams.get("userId"));

        const address = await getAddressByUser(userId);
        return NextResponse.json({
            success: true,
            message: "Address fetched successfully.",
            address,
        });
    } catch (error: any) {
        console.error("Error occurred while fetching address: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching address: " + error.message,
        }, { status: 500 });
    }
}
