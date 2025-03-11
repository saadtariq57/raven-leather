import { getProduct } from "@/controllers/productController"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get("id");
        const response = await getProduct(Number(id));
        return response;
    } 
    catch (error: any) {
        console.error("Error occurred while fetching product." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching product." + error.message,
        }, { status: 500 })
    }
}