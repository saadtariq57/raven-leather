import { deleteProduct } from "@/controllers/productController"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const response = await deleteProduct(Number(id));
        return response;
    } 
    catch (error: any) {
        console.error("Error occurred while deleting product." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while deleting product." + error.message,
        }, { status: 500 })
    }
}