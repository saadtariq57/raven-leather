import { getAllSalesRecords, getAllTimeStats, getCurrentMonthStats, getCurrentYearStats, getTodayStats } from "@/controllers/salesController";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { todayRevenue, todaySales } = await getTodayStats();
        const { monthRevenue, monthSales } = await getCurrentMonthStats();
        const { yearRevenue, yearSales } = await getCurrentYearStats();
        const { allTimeRevenue, allTimeSales } = await getAllTimeStats();
        const allSalesRecords = await getAllSalesRecords();

        return NextResponse.json({
            success: true,
            message: "All sales stats fetched.",
            today: {
                sales: todaySales,
                revenue: todayRevenue,
            },
            month: {
                sales: monthSales,
                revenue: monthRevenue,
            },
            year: {
                sales: yearSales,
                revenue: yearRevenue,
            },
            allTime: {
                sales: allTimeSales,
                revenue: allTimeRevenue,
            },
            allSalesRecords
        });
    } catch (error: any) {
        console.error("Error occurred while fetching all sales stats: " + error.message);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching all sales stats: " + error.message,
        }, { status: 500 });
    }
}
