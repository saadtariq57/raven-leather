import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc"
            },
            include:{
                images: true
            },
            take: 8
        });

        return NextResponse.json({
            success: true,
            message: "New Arrivals fetched.",
            products
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error occurred while fetching new arrivals. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching new arrivals. " + error.message,
        }, { status: 500 })
    }
}