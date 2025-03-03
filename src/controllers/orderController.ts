import { NextRequest } from "next/server";
import { prisma } from "../../DB/db.config";
import SendOrderConfirmationEmail from "@/utils/email/orderConfirmationEmail";

export async function createOrder(request: NextRequest) {
  const formData = await request.formData();

  const customerName = formData.get("customerName") as string;
  const phoneNo = formData.get("phoneNo") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const countryRegion = formData.get("countryRegion") as string;
  const paymentStatus = formData.get("paymentStatus") as string;
  const totalAmount = Number(formData.get("totalAmount") as string);
  console.log("$Total Amount: " + totalAmount);
  
  const user_id = formData.get("user_id")
    ? Number(formData.get("user_id") as string)
    : null; // If no user_id is passed, set it to null

  //* Parsing order items
  const orderItems = JSON.parse(formData.get("orderItems") as string) as {
    productId: number;
    size: string;
    quantity: number;
  }[];
  console.log("Parsed items: " + orderItems);
  console.log("Array: " + Array.isArray(orderItems));

  //* Calculating total quantity of items, it will be used to track sales
  const totalQuantity = orderItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  console.log("Total Quantity: " + totalQuantity);

  // //* Calculating total amount
  // // Fetch product prices from DB
  // const productIds = orderItems.map(
  //   (item: { productId: number }) => item.productId
  // );
  // const products = await prisma.product.findMany({
  //   where: { id: { in: productIds } },
  //   select: { id: true, price: true },
  // });

  // // Create a map of productId -> price
  // const productPriceMap = new Map(
  //   products.map((product) => [product.id, product.price])
  // );

  // // Calculate total amount using fetched prices
  // const totalAmount = orderItems.reduce((acc, item) => {
  //   const price = Number(productPriceMap.get(item.productId));
  //   return acc + price * item.quantity;
  // }, 0);

  //* Creating new order
  const newOrder = await prisma.order.create({
    data: {
      customerName,
      address,
      email,
      phoneNo,
      city,
      countryRegion,
      placedOn: new Date(Date.now()),
      totalAmount,
      paymentStatus,
      user_id,
      orderItems: {
        create: orderItems.map(
          (item: { productId: number; quantity: number; size: string }) => ({
            quantity: item.quantity,
            size: item.size ? item.size : undefined,
            product: {
              connect: {
                id: item.productId,
              },
            },
          })
        ),
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (newOrder) {
    //* Sending order confirmation email
    await SendOrderConfirmationEmail(newOrder.email, newOrder);

    //* After the order is created, update the product stock and sales
    //? Updating product stock and sales in parallel with Promise.all
    await Promise.all(
      orderItems.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            sizes: item.size
              ? {
                updateMany: {
                  where: { size: item.size },
                  data: {
                    quantity: { decrement: item.quantity },
                  },
                },
              }
              : undefined,
            quantity: item.size ? undefined : { decrement: item.quantity },
            allTimeSales: { increment: item.quantity },
          },
        })
      )
    );

    //* Updating sales record
    const currentDate = new Date();
    // Create a new date object that represents the start of the day (ignoring time)
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    await prisma.sales.updateMany({
      where: {
        date: {
          equals: startOfDay,
        },
      },
      data: {
        sales: { increment: totalQuantity },
        revenue: { increment: totalAmount },
      },
    });

    return newOrder;
  }
}

export async function change_orderStatus(request: NextRequest) {
  const { orderId, orderStatus } = await request.json();

  // Fetch the order to check if it is already cancelled cause we don't want to update the stock and sales again
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  const updated_order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // If order is cancelled, increment the product stock and decrement the allTimeSales accordingly
  if (orderStatus === "cancelled" && order?.orderStatus !== "cancelled") {
    await Promise.all(
      updated_order.orderItems.map(async (item) => {
        await prisma.product.update({
          where: {
            id: item.product_id,
          },
          data: {
            sizes: item.size
              ? {
                updateMany: {
                  where: { size: item.size },
                  data: { quantity: { increment: item.quantity } },
                },
              }
              : undefined,
            quantity: item.size ? undefined : { increment: item.quantity },
            allTimeSales: { decrement: item.quantity },
          },
        });
      })
    );

    //* Updating sales record
    const currentDate = new Date();
    // Create a new date object that represents the start of the day (ignoring time)
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    //Calculating total quantity and amount of items, so it will be used to track sales
    const totalQuantity = updated_order.orderItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalAmount = updated_order.totalAmount;

    const salesUpdate = await prisma.sales.updateMany({
      where: {
        date: {
          equals: startOfDay,
        },
      },
      data: {
        sales: { decrement: totalQuantity },
        revenue: { decrement: totalAmount },
      },
    });

    return { updated_order, salesUpdate };
  }

  return updated_order;
}

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export async function getOrderById(orderId: number) {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(orderId),
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });

  return order;
}

export async function getOrdersByUserId(userId: number) {
  const orders = await prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });

  return orders;
}

export async function getPendingOrdersCount() {
  const orderCount = await prisma.order.count({
    where: {
      orderStatus: "pending",
    },
  });

  return orderCount;
}

export async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      orderStatus: "pending",
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });

  return orders;
}

export async function getCompletedOrders() {
  const orders = await prisma.order.findMany({
    where: {
      orderStatus: "completed",
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });

  return orders;
}

export async function getCancelledOrders() {
  const orders = await prisma.order.findMany({
    where: {
      orderStatus: "cancelled",
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });

  return orders;
}

export async function deleteOrder(orderId: number) {
  const deletedOrder = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });

  if (deletedOrder) {
    return true;
  }
}

export async function getTodayOrdersCount() {
  const currentDate = new Date();
  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const startOfNextDay = new Date(startOfDay);
  startOfNextDay.setDate(startOfNextDay.getDate() + 1);

  const ordersCount = await prisma.order.count({
    where: {
      placedOn: {
        gte: startOfDay, // Start of today (00:00:00)
        lt: startOfNextDay, // Start of tomorrow (00:00:00), excludes future orders
      },
    },
  });

  return ordersCount;
}

export async function getCurrentMonthOrdersCount() {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const firstDayOfNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

  const ordersCount = await prisma.order.count({
    where: {
      placedOn: {
        gte: firstDayOfMonth, // Greater than or equal to the first day of the month
        lt: firstDayOfNextMonth, // Less than the first day of next month (ensures only current month orders)
      },
    },
  });

  return ordersCount;
}
