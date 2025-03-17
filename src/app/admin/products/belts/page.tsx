"use client"

import { Inter } from "next/font/google";
const inter = Inter({
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'],     // Specify subsets like 'latin'
  style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
});

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";
import DeleteProductDialog from "@/components/admin/product/DeleteProductDialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditBeltDialog from "@/components/admin/product/updateProductDialogs/EditBeltDialog";
import AddBeltDialog from "@/components/admin/product/addProductDialogs/AddBeltDialog";

export default function Belts() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [belts, setBelts] = useState<ProductWithImagesAndSizes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching Bags
  useEffect(() => {
    async function fetchBelts() {
      try {
        const response = await axios.get<{ products: ProductWithImagesAndSizes[] }>("/api/admin/product/get/belts");
        setBelts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBelts();
  }, []);

  // Enforce single selection
  const toggleRow = (index: number) => {
    setSelectedRows((prev) => {
      // If the clicked row is already selected, unselect it.
      if (prev.includes(index)) {
        return [];
      }
      // Otherwise, select only this row (clear any previous selections)
      return [index];
    });
  };

  const isRowSelected = (index: number) => selectedRows.includes(index);

  return (
    <div className="flex max-h-screen overflow-hidden">
      {/* Main Content */}
      <div className={`flex-1 px-8 bg-gray-100 h-screen ${inter.className}`}>
        <div className="flex justify-between">
          <h2 className={`flex items-center gap-3 text-2xl font-bold mt-6 mb-6 ${inter.className}`}>
            <span>Products</span>
            <span><ChevronRight /></span>
            <span>Belts</span>
          </h2>
          <div className="flex items-center gap-2">
            <Input placeholder="Search" className="w-64 bg-gray-200 focus:bg-white" />
          </div>
        </div>
        <Separator className="mb-2 bg-gray-300" />

        <div className="px-6 pb-6">
          <div className="w-full flex justify-end p-4">
            <AddBeltDialog />
          </div>

          {/* Table Actions */}
          {selectedRows.length === 1 && (
            <div className="flex justify-between items-center mb-4 px-6 py-2 bg-gray-200 rounded-md">
              <div className="text-sm text-gray-600">
                1 item selected
              </div>
              <div className="flex gap-4">
                <EditBeltDialog productId={belts[selectedRows[0]].id} />
                <DeleteProductDialog productId={belts[selectedRows[0]].id} />
              </div>
            </div>
          )}

          {/* Table or Loading / No Bag Found */}
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              <LoadingSpinner />
            </div>
          ) : belts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              No belts found.
            </div>
          ) : (
            <div className="border rounded-lg overflow-y-auto max-h-[70vh]">
              <Table>
                {/* Table Header (only show when nothing is selected) */}
                {selectedRows.length === 0 && (
                  <TableHeader>
                    <TableRow className="bg-black hover:bg-black">
                      <TableHead className="w-12 text-center"></TableHead>
                      <TableHead className="text-white">Product Name</TableHead>
                      <TableHead className="text-white">Price</TableHead>
                      <TableHead className="text-white">Stock</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                )}

                {/* Table Body */}
                <TableBody>
                  {belts.map((belt, index) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      {/* Checkbox */}
                      <TableCell className="text-center">
                        <Checkbox
                          checked={isRowSelected(index)}
                          onCheckedChange={() => toggleRow(index)}
                          className="cursor-pointer w-4 h-4"
                        />
                      </TableCell>

                      {/* Product Information */}
                      <TableCell className="flex items-center gap-3">
                        <Image
                          src={belt.images[0].url}
                          alt={belt.name}
                          width={30}
                          height={30}
                          className="rounded-md"
                        />
                        <div>
                          <div className="font-medium">{belt.name}</div>
                          <div className="text-gray-500 text-sm">{belt.color}</div>
                        </div>
                      </TableCell>
                      <TableCell>{belt.price}</TableCell>
                      <TableCell>{belt.quantity}</TableCell>
                      <TableCell className="text-gray-500">{belt.status ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
