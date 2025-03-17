"use client";

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

import { useEffect, useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import AdminProfileButton from "./AdminProfileButton";
import Image from "next/image";

export default function AdminSidebar() {
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [adminUsername, setAdminUsername] = useState("");
  useEffect(() => {
    async function fetchAdminUsername() {
      try {
        const response = await axios.get("/api/admin/getUsername");
        setAdminUsername(response.data.username);
      } catch (error: any) {
        console.error("Error fetching admin username:", error.message);
      }
    }
    fetchAdminUsername();

    async function fetchPendingOrderCount() {
      try {
        const response = await axios.get("/api/admin/orders/get/pendingOrderCount");
        setPendingOrderCount(response.data.orderCount);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPendingOrderCount();

  }, [])

  return (
    <div className={`w-52 h-screen bg-black text-white flex flex-col ${inter.className} `}>
      {/* Logo */}
      <h1 className={`text-2xl font-medium my-6 mx-4 ${newsreader.className}`}>Raven</h1>

      {/* Sidebar Menu */}
      <div className="flex flex-col space-y-1 mb-auto text-sm">
        {/* Dashboard */}
        <Link href="/admin/dashboard">
          <div className="pl-4 flex items-center gap-3 cursor-pointer hover:bg-[#292828] py-2 transition duration-100">
            <Image src="/assets/dashboard.png" width={50} height={50} className="w-5 h-5" alt="Dashboard" />
            <span>Dashboard</span>
          </div>
        </Link>

        {/* Products Dropdown */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="pl-4 flex items-center justify-between cursor-pointer hover:bg-[#292828] py-2 transition duration-100">
              <div className="flex items-center gap-3">
                <Image src="/assets/product.png" width={50} height={50} className="w-5 h-5" alt="Products" />
                <span>Products</span>
              </div>
              <ChevronDown className="h-4 w-4 mr-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-12 space-y-2 py-1">
            <Link href="/admin/products/jackets"><div className="cursor-pointer hover:text-gray-300 transition py-1">Jackets</div></Link>
            <Link href="/admin/products/wallets"><div className="cursor-pointer hover:text-gray-300 transition py-1">Wallets</div></Link>
            <Link href="/admin/products/belts"><div className="cursor-pointer hover:text-gray-300 transition py-1">Belts</div></Link>
            <Link href="/admin/products/bags"><div className="cursor-pointer hover:text-gray-300 transition py-1">Bags</div></Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Orders Dropdown */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="pl-4 flex items-center justify-between cursor-pointer hover:bg-[#292828] py-2 transition duration-100">
              <div className="flex items-center gap-3">
                <Image src="/assets/orders.png" width={50} height={50} className="w-5 h-5" alt="Orders" />
                <span>Orders</span>
              </div>
              <ChevronDown className="h-4 w-4 mr-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-12 space-y-2 py-1">
            <Link href="/admin/orders/pending"><div className="cursor-pointer hover:text-gray-300 transition py-1">Pending <span className="text-xs">({pendingOrderCount})</span></div></Link>
            <Link href="/admin/orders/completed"><div className="cursor-pointer hover:text-gray-300 transition py-1">Completed</div></Link>
            <Link href="/admin/orders/cancelled"><div className="cursor-pointer hover:text-gray-300 transition py-1">Cancelled</div></Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Customers */}
        <Link href="/admin/customers">
          <div className="pl-4 flex items-center gap-3 cursor-pointer hover:bg-[#292828] py-2 transition duration-100">
            <Image src="/assets/customers.png" width={50} height={50} className="w-5 h-5" alt="Customers" />
            <span>Customers</span>
          </div>
        </Link>

        {/* Sales */}
        <Link href="/admin/sales">
          <div className="pl-4 flex items-center gap-3 cursor-pointer hover:bg-[#292828] py-2 transition duration-100">
            <Image src="/assets/sales.png" width={50} height={50} className="w-5 h-5" alt="Sales" />
            <span>Sales</span>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="my-3 mx-6 w-full">
        <AdminProfileButton adminUsername={adminUsername} />
      </div>
    </div>
  );
}
