import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET(request: NextRequest) {
    try {
        // Get the slug from the query params
        const slug = request.nextUrl.searchParams.get("slug")?.toString();
        

        // Check if the slug is valid (non-null and non-empty)
        if (!slug) {
            return NextResponse.json({
                success: false,
                message: "Slug is required.",
            }, { status: 400 });
        }

        // Fetch the product from the database
        const product = await prisma.product.findUnique({
            where: { slug }, // Using slug to find the product
            include: {
              images: true, // Including related images
              sizes: true,  // Including related sizes
            },
        });

        // If no product found, return a not found response
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Product fetched.",
            product,
        }, { status: 200 });

    } catch (error: unknown) {
        // Properly check the error type and log the message
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error occurred while fetching product:", errorMessage);

        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching product: " + errorMessage,
        }, { status: 500 });
    }
}
