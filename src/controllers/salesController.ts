import { prisma } from "../../DB/db.config";

export async function getTodayStats() {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const startOfNextDay = new Date(startOfDay);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1);

    const stats = await prisma.sales.aggregate({
        _sum: { revenue: true, sales: true },
        where: {
            date: {
                gte: startOfDay,
                lt: startOfNextDay
            }
        }
    });

    return {
        todayRevenue: stats._sum.revenue || 0,
        todaySales: stats._sum.sales || 0
    };
}

export async function getCurrentMonthStats() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const stats = await prisma.sales.aggregate({
        _sum: { revenue: true, sales: true },
        where: {
            date: {
                gte: firstDayOfMonth,
                lt: firstDayOfNextMonth
            }
        }
    });

    return {
        monthRevenue: stats._sum.revenue || 0,
        monthSales: stats._sum.sales || 0
    };
}

export async function getCurrentYearStats() {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const firstDayOfNextYear = new Date(currentDate.getFullYear() + 1, 0, 1);

    const stats = await prisma.sales.aggregate({
        _sum: { revenue: true, sales: true },
        where: {
            date: {
                gte: firstDayOfYear,
                lt: firstDayOfNextYear
            }
        }
    });

    return {
        yearRevenue: stats._sum.revenue || 0,
        yearSales: stats._sum.sales || 0
    };
}

export async function getAllTimeStats() {
    const stats = await prisma.sales.aggregate({
        _sum: { revenue: true, sales: true }
    });

    return {
        allTimeRevenue: stats._sum.revenue || 0,
        allTimeSales: stats._sum.sales || 0
    };
}

export async function getAllSalesRecords() {
    const sales = await prisma.sales.findMany();
    return sales;
}