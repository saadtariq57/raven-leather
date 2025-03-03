export async function getUserOrder(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get/orderByUserId?userId=${id}`);
    const data = await response.json();
    console.log("data: ", data);
    
    return data.orders; // Assuming the data structure has user orders
}