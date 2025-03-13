import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: "bag"
            },
            include: {
                images: true,
                sizes: true,
            },
            orderBy: {
                id: "desc"
            }
        })

        if (products) {
            return NextResponse.json({
                success: true,
                message: "All Bags fetched.",
                products
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while fetching Bags. " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching Bags. " + error.message,
        }, { status: 500 })
    }
}