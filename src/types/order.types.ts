import { OrderItem, Product } from "@prisma/client";
import { OrderWithOrderItemsAndProduct } from "./client/order.types";

export type Order = {
    orderId: string
    customerName: string
    address: string
    phoneNo: string
    city: string
    countryRegion: string
    placedOn: Date
    totalAmount: number
    paymentStatus: string
  };
