import { createAddress } from "@/controllers/addressController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const newAddress = await createAddress(request);
        return NextResponse.json({
            success: true,
            message: "Address created successfully.",
            newAddress,
        });
    } catch (error: any) {
        console.error("Error occurred while creating address: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while creating address: " + error.message,
        }, { status: 500 });
    }
}
