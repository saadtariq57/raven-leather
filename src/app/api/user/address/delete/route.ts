import { deleteAddress } from "@/controllers/addressController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const addressId = Number(request.nextUrl.searchParams.get("addressId"));
        await deleteAddress(addressId);
        return NextResponse.json({
            success: true,
            message: "Address deleted successfully.",
        });
    } catch (error: any) {
        console.error("Error occurred while deleting address: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while deleting address: " + error.message,
        }, { status: 500 });
    }
}
