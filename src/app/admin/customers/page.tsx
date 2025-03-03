"use client";
import { Inter } from "next/font/google";
const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    style: ["normal", "italic"],
});

import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Customer {
    fullName: string;
    email: string;
    address: Address[];
}

export default function CompletedOrders() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            const response = await axios.get('/api/admin/customer/get/users');
            setCustomers(response.data.users);
            console.log(response.data);
            setIsLoading(false);
        }
        fetchCustomers();
    }, [])

    return (
        <>
        {isLoading ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                    <LoadingSpinner />
                </div>
            ) : customers.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                    No customer found.
                </div>
            ) : (
            <div className={`flex h-screen ${inter.className}`}>
                {/* Main Content */}
                <div className={`flex-1 px-8 bg-gray-100`}>
                    <h2 className={`text-3xl font-bold mt-6 mb-3`}>Customers</h2>
                    <Separator className="mb-8 bg-gray-300" />

                    <div className="border rounded-lg overflow-y-auto max-w-5xl max-h-[70vh]">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-black hover:bg-black">
                                    <TableHead className="text-white">Customer Name</TableHead>
                                    <TableHead className="text-white">Email</TableHead>
                                    <TableHead className="text-white">Phone#</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow className="cursor-pointer hover:bg-gray-200" key={customer.email}>
                                        <TableCell className="font-semibold py-3">{customer.fullName}</TableCell>
                                        <TableCell className="font-semibold py-3">{customer.email}</TableCell>
                                        <TableCell className="font-semibold py-3">{customer.address[0].phoneNo || "-"}</TableCell>
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
