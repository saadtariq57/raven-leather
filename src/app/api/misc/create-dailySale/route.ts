
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../DB/db.config";

export async function POST( request: NextRequest ) {
    try {
        const today = new Date();
        const onlyDate = new Date(today.setHours(0, 0, 0, 0));

        const sale = await prisma.sales.create({
            data: {
                date: onlyDate,
                sales: 0,
                revenue: 0,
            },
        });


        return NextResponse.json({ 
            success: true,
            message: "Daily sales record created",
            sale,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error occurred while creating daily sales record" + error.message);
        return NextResponse.json({ 
            success: false,
            message: "Error occurred while creating daily sales record" + error.message,
        }, { status: 500 });
    }
}
