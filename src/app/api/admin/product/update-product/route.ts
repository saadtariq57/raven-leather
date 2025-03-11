import { updateProduct } from "@/controllers/productController"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get("id");
        const response = await updateProduct(Number(id), request);
        return response;
    } 
    catch (error: any) {
        console.error("Error occurred while updating product." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while updating product." + error.message,
        }, { status: 500 })
    }
}