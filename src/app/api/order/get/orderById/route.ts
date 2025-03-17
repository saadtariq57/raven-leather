import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../DB/db.config";

export async function GET(request: NextRequest) {
    try {
        const orderId = Number(request.nextUrl.searchParams.get("orderId"));

        //! For the time being, we are not authenticating the user.

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: { images: true },
                        },
                    },
                },
            },
        })

        if (!order) {
            console.error("Order by id not found.");
            return NextResponse.json({
                success: false,
                message: "Order by id not found.",
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Order by Id fetched successfully.",
            order,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error occurred while fetching order by Id.", error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching order by Id." + error.message,
        }, { status: 500 });
    }
}