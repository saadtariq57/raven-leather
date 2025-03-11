import { Inter } from "next/font/google";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { OrderWithOrderItemsAndProduct } from "@/types/client/order.types";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Address } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";


export default function Account({ orders, address }: { orders: OrderWithOrderItemsAndProduct[], address: Address }) {

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className={`text-2xl text-center mb-10 ${inter.className}`}>MY ACCOUNT</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
      <div className="flex flex-col-reverse md:flex-row gap-6 ">
        {/* My Orders */}
        <div className="md:col-span-2 w-2/3">
          <h2 className={`text-lg font-medium mb-4 ${inter.className}`}>My Orders</h2>
          <ScrollArea className="w-[90vw] md:w-auto space-y-4 px-2 py-2 md:h-[60vh]">
            <div className="flex flex-col gap-3">
              {
                orders.length === 0 ? <p className="text-center text-gray-500">No orders found</p>
                  : orders.reverse().map(order => {
                    return (
                      <div key={order.id} className="bg-gray-100 p-2 rounded-lg " >
                        <h1 className="ml-4 my-1 ">Order #{order.id}</h1>
                        <div className="p-2 w-full flex flex-col gap-2 ">
                          {
                            order.orderItems.map(item => {
                              return (
                                <div key={item.id} className="flex overflow-hidden bg-white shadow-md rounded-lg border">
                                  <Image
                                    src={item.product.images[0].url}
                                    width={100}
                                    height={100}
                                    alt={item.product.name}
                                    className="w-20 h-20 md:w-28 md:h-28 object-cover"
                                    loading="lazy"
                                  />
                                  <div className="flex-1 ml-4 mt-3">
                                    <h3 className={`md:text-base font-semibold text-[10px] ${inter.className}`}>{item.product.name}</h3>
                                    <p className={`md:text-sm text-[10px] text-gray-500 font-semibold ${inter.className}`}>{(item.product.color) + (item.size ? (", " + item.size) : "")}</p>
                                  </div>
                                  <div className="text-right my-3 mr-4 flex flex-col justify-between">
                                    <p className={`font-bold text-xs md:text-base mr-1 ${inter.className}`}>Rs. {Number(item.product.price).toLocaleString("en-PK")}</p>
                                    <p>Quantity: {item.quantity}</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>

                        <div className={`w-full flex justify-end gap-1 px-5 py-1 ${inter.className}`}>
                          <span>Total: </span>
                          <span className="font-semibold">Rs. {order.totalAmount.toLocaleString("en-PK")}</span>
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          </ScrollArea>
        </div>

        {/* Separator */}
        <div>
          <Separator orientation="vertical" />
        </div>

        {/* My Address */}
        <div>
          <h2 className={`text-lg font-medium mb-4 ${inter.className}`}>My Address</h2>
          {address ? (
            <div className="bg-gray-100 shadow-md rounded-lg p-4 flex justify-between items-start min-w-[20vw]">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.email}</p>
                <p className="text-sm text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.countryRegion}</p>
                <p className="text-sm text-gray-600">{address.phoneNo}</p>
              </div>
              <Link href='/account/address/update'>
                <button className="mt-2 text-gray-500 hover:text-gray-700">
                  <Image
                    src="/assets/pencil.svg"
                    alt="edit"
                    width="20"
                    height="20"
                  />
                </button>
              </Link>
            </div>
          ) :
            <Button className="mb-4" variant="default" asChild><Link href='/account/address/add'>Add Address</Link></Button>
          }
        </div>
      </div >
    </div >
  );
};

