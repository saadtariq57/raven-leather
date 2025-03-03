import OrderConfirmed from "@/components/order/OrderConfirmed";
import { getOrderById } from "@/lib/orderById";

export default async function OrderConfirmationCard({ searchParams }: { searchParams: { orderId?: string } }) {

    //Fetching order by url
    const orderId = Number(searchParams.orderId)
    console.log("orderId", orderId);

    const order = await getOrderById(orderId);
    console.log("order: ", order);

    return (
        <OrderConfirmed order={order} />
    );
}
