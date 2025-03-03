import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../DB/db.config";

export async function GET(request: NextRequest){
    try {
        const query = request.nextUrl.searchParams.get("query")?.toString();
        const searchResult = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                }
            },
            include: {
                images: true,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Search result fetched successfully.",
            searchResult,
        });
    }
    catch (error: any) {
        console.error("Error occurred while fetching search results." + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching search results." + error.message,
        }, { status: 500 })
    }
}