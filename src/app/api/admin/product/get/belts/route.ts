import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: "belt"
            },
            include: {
                images: true,
                sizes: true,
            }
        })

        if (products) {
            return NextResponse.json({
                success: true,
                message: "All Belts fetched.",
                products
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while fetching belts. " + error.message);
        return NextResponse.json({
            success: true,
            message: "Error occurred while fetching belts. " + error.message,
        }, { status: 500 })
    }
}