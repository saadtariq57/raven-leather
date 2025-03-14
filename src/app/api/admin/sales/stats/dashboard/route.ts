import { getCurrentMonthStats, getTodayStats } from "@/controllers/salesController";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { todayRevenue, todaySales } = await getTodayStats();
        const { monthRevenue, monthSales } = await getCurrentMonthStats();

        return NextResponse.json({
            success: true,
            message: "Dashboard sales stats fetched.",
            today: {
                sales: todaySales,
                revenue: todayRevenue,
            },
            month: {
                sales: monthSales,
                revenue: monthRevenue,
            },
        });
    } catch (error: any) {
        console.error("Error occurred while fetching dashboard sales stats: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching dashboard sales stats: " + error.message,
        }, { status: 500 });
    }
}
