import { createProduct } from "@/controllers/productController"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const response = await createProduct(request);
        return response;
    }
    catch (error: any) {
        console.error("Error occurred while adding product." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while adding product." + error.message,
        }, { status: 500 })
    }
}