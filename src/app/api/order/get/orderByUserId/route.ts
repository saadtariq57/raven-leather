import { auth } from "@/auth";
import { getOrdersByUserId } from "@/controllers/orderController";
import { NextRequest, NextResponse } from "next/server"

export const GET = auth(async function GET(req){
    try {
        const session = req.auth;
        console.log("auth Session in route: ", session);        

        const userIdFromSession = Number(session?.user?.id);
        console.log("userIdFromSession: ", userIdFromSession);

        const userId = Number(req.nextUrl.searchParams.get("userId")); 
        
        if(userIdFromSession !== userId){
            console.error("Unauthorized access to orderByUserId API");
            return NextResponse.json({
                success: false,
                message: "Unauthorized access to orderByUserId API",
            }, { status: 403 });  // Forbidden
        }
              
        const orders = await getOrdersByUserId(userIdFromSession);
        return NextResponse.json({
            success: true,
            message: "Orders by userId fetched successfully.",
            orders,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching orders by userId." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching orders by userId." + error.message,
        }, { status: 500 })
    }
})