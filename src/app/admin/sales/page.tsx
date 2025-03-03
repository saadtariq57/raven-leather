"use client"
import { Newsreader } from "next/font/google";
const newsreader = Newsreader({
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'],     // Specify subsets like 'latin'
  style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
});

import { Inter } from "next/font/google";
const inter = Inter({
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'],     // Specify subsets like 'latin'
  style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
});

import { Rubik } from "next/font/google";
const rubik = Rubik({
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'],     // Specify subsets like 'latin'
  style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
});

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { AllTimeSales, MonthSales, TodaySales, YearSales } from "@/types/client/sales.types";
import { Sales as SalesType } from "@prisma/client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Sales() {
  const [isLoading, setIsLoading] = useState(true);

  const [todaySales, setTodaySales] = useState<TodaySales | null>(null);
  const [monthSales, setMonthSales] = useState<MonthSales | null>(null);
  const [yearSales, setYearSales] = useState<YearSales | null>(null);
  const [allTimeSales, setAllTimeSales] = useState<AllTimeSales | null>(null);
  const [allSalesRecords, setAllSalesRecords] = useState<SalesType[]>([]);


  useEffect(() => {
    async function fetchSalesDetails() {
      const response = await axios.get('/api/admin/sales/stats/all');
      setTodaySales(response.data.today)
      setMonthSales(response.data.month)
      setYearSales(response.data.year)
      setAllTimeSales(response.data.allTime)
      setAllSalesRecords(response.data.allSalesRecords)
      setIsLoading(false);
      console.log(response.data);
    }
    fetchSalesDetails();
  }, [])

  function formatNumber(num: number): string {
    if (num >= 1_000_000) {
      const millionValue = num / 1_000_000;
      return `${millionValue % 1 === 0 ? millionValue.toFixed(0) : millionValue.toFixed(1)}M`;
    } else if (num >= 1_000) {
      const thousandValue = num / 1_000;
      return `${thousandValue % 1 === 0 ? thousandValue.toFixed(0) : thousandValue.toFixed(1)}K`;
    } else {
      return num.toLocaleString("en-PK");
    }
  }


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          <LoadingSpinner />
        </div>
      ) : allSalesRecords.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          No Sales Data found.
        </div>
      ) : (
        <div className="flex h-screen">
          {/* Main Content */}
          <div className={`flex-1 px-8 bg-gray-100 ${inter.className}`}>
            <h2 className={`text-3xl font-bold mt-6 mb-3 ${inter.className}`}>Sales</h2>
            <Separator className="mb-8 bg-gray-300" />

            {/* Cards Section */}
            <div className="flex w-full gap-10 mb-8">
              <div className="w-[14vw] h-fit py-7 bg-black text-white rounded-xl flex pl-4 items-center">
                <div>
                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-normal ${inter.className}`}>{formatNumber(Number(todaySales?.revenue))}</span>
                  </div>
                  <p className="text-sm">Today</p>
                </div>
              </div>
              <div className="w-[14vw] h-fit py-7 bg-black text-white rounded-xl flex pl-4 items-center">
                <div>
                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-normal ${inter.className}`}>{formatNumber(Number(monthSales?.revenue))}</span>
                  </div>
                  <p className="text-sm">This Month</p>
                </div>
              </div>
              <div className="w-[14vw] h-fit py-7 bg-black text-white rounded-xl flex pl-4 items-center">
                <div>
                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-normal ${inter.className}`}>{formatNumber(Number(yearSales?.revenue))}</span>
                  </div>
                  <p className="text-sm">This Year</p>
                </div>
              </div>
              <div className="w-[14vw] h-fit py-7 bg-black text-white rounded-xl flex pl-4 items-center">
                <div>
                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-normal ${inter.className}`}>{formatNumber(Number(allTimeSales?.revenue))}</span>
                  </div>
                  <p className="text-sm">All Time</p>
                </div>
              </div>


            </div>

            {/* Best Selling Product List */}
            <div className="border rounded-lg overflow-y-auto max-w-3xl max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black hover:bg-black">
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Sales</TableHead>
                    <TableHead className="text-white">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allSalesRecords?.map((sale) => (
                    <TableRow className="cursor-pointer hover:bg-gray-200" key={sale.id}>
                      <TableCell className="font-semibold py-3">
                        {new Date(sale.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}</TableCell>
                      <TableCell className="font-semibold py-3">{sale.sales}</TableCell>
                      <TableCell className="font-semibold py-3">{sale.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
