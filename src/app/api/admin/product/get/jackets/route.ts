import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: "jacket"
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
                message: "All Jackets fetched.",
                products
            }, { status: 200 })
        }

    } catch (error: any) {
        console.error("Error occurred while fetching Jackets. " + error.message);
        return NextResponse.json({
            success: true,
            message: "Error occurred while fetching Jackets. " + error.message,
        }, { status: 500 })
    }
}