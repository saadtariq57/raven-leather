"use client"

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
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { MonthSales, TodaySales } from "@/types/client/sales.types";
import { MonthOrders, TodayOrders } from "@/types/client/order.types";
import { BestSellingProducts } from "@/types/client/product.types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [todaySales, setTodaySales] = useState<TodaySales | null>(null);
  const [monthSales, setMonthSales] = useState<MonthSales | null>(null);
  const [todayOrders, setTodayOrders] = useState<TodayOrders | null>(null);
  const [monthOrders, setMonthOrders] = useState<MonthOrders | null>(null);
  const [bestSellingProducts, setBestSellingProducts] = useState<BestSellingProducts[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        //Sales
        const salesResponse: any = await axios.get(`/api/admin/sales/stats/dashboard`);
        setTodaySales(salesResponse.data.today);
        setMonthSales(salesResponse.data.month);
        console.log("Sales: ", salesResponse.data);
        

        //Orders
        const todayOrdersResponse = await axios.get(`/api/admin/orders/stats/today`);
        setTodayOrders(todayOrdersResponse.data.orderCount);

        const monthOrdersResponse = await axios.get(`/api/admin/orders/stats/month`);
        setMonthOrders(monthOrdersResponse.data.orderCount);

        // Best Selling Products
        const response = await axios.get<{ products: BestSellingProducts[] }>(`/api/admin/product/best-selling`);
        setBestSellingProducts(response.data.products);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Dashboard data:", error);
      }
    }

    fetchDashboardData();

  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          <LoadingSpinner />
        </div>
      ) : bestSellingProducts.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          No Data found.
        </div>
      ) : (
        <div className="flex h-screen">

          {/* Main Content */}
          <div className={`flex-1 px-8 bg-gray-100 ${inter.className}`}>
            <h2 className={`text-3xl font-bold mt-6 mb-3 ${inter.className}`}>Dashboard</h2>
            <Separator className="mb-8 bg-gray-300" />

            {/* Cards Section */}
            <div className="flex w-[40vw] gap-10 mb-8">
              <Card className="bg-black text-white w-full md:w-[45%]">
                <CardHeader>
                  <CardTitle className={`${rubik.className}`}>Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-semibold ${inter.className}`}>{Number(todaySales?.revenue).toLocaleString("en-PK")}</span>
                  </div>
                  <p className="text-sm pb-4">Today</p>

                  <div>
                    <span className={`text-xl ${inter.className}`}>Rs. </span>
                    <span className={`text-3xl font-semibold ${inter.className}`}>{Number(monthSales?.revenue).toLocaleString("en-PK")}</span>
                  </div>
                  <p className="text-sm mb-4">This month</p>

                  <div className="w-full flex justify-end">
                    <Link href="/admin/sales">
                      <button className="flex justify-center items-center bg-gray-100 hover:bg-opacity-90 text-black rounded-full pl-3 pr-2 py-[1px] text-xs font-bold">
                        <span>View Details</span>
                        <span><ChevronRight className="w-4" /></span>
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black text-white w-full md:w-[45%]">
                <CardHeader>
                  <CardTitle className={`${rubik.className}`}>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <span className={`text-3xl font-semibold ${inter.className}`}>{todayOrders?.orderCount}</span>
                  </div>
                  <p className="text-sm pb-4">Today</p>

                  <div>
                    <span className={`text-3xl font-semibold ${inter.className}`}>{monthOrders?.orderCount}</span>
                  </div>
                  <p className="text-sm mb-4">This month</p>

                  <div className="w-full flex justify-end">
                    <Link href="/admin/orders/pending">
                      <button className="flex justify-center items-center bg-gray-100 hover:bg-opacity-90 text-black rounded-full pl-3 pr-2 py-[1px] text-xs font-bold">
                        <span>View Details</span>
                        <span><ChevronRight className="w-4" /></span>
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Best Selling Product List */}
            <div className="bg-white rounded-lg shadow w-[50vw]">
              <div className="px-4 py-2 bg-black text-white rounded-t-lg">
                <h3 className="font-semibold">Most Selling Products</h3>
              </div>
              <div className="divide-y">
                {bestSellingProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between py-2 pl-2 pr-4">
                    <div className="flex items-center space-x-4 cursor-pointer">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.color}</p>
                      </div>
                    </div>
                    <p className="font-medium">Rs. {Number(product.price).toLocaleString("en-PK")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
