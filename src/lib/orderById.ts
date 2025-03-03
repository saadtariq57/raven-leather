export async function getOrderById(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get/orderById?orderId=${id}`);
    const data = await response.json();
    console.log("data: ", data);
    
    return data.order; // Assuming the data structure has user orders
}