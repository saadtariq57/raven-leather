import { updateAddress } from "@/controllers/addressController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const updatedAddress = await updateAddress(request);
        return NextResponse.json({
            success: true,
            message: "Address updated successfully.",
            updatedAddress,
        });
    } catch (error: any) {
        console.error("Error occurred while updating address: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while updating address: " + error.message,
        }, { status: 500 });
    }
}
