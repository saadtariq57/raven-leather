import { getBestSellingProducts } from "@/controllers/productController"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try {
        const response = await getBestSellingProducts();
        return response;
    } 
    catch (error: any) {
        console.error("Error occurred while fetching most selling products." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching most selling products." + error.message,
        }, { status: 500 })
    }
}