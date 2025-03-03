import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

export default function CancelOrderAlertDialog({ orderId }: { orderId: number }) {
  const [isCancelling, setIsCancelling] = useState(false);

  async function cancelOrder(orderId: number) {
    try {
      setIsCancelling(true);
      const data = {
        orderId,
        orderStatus: "cancelled",
      }
      const response = await axios.post('/api/order/change-orderStatus', data);
      console.log("response: ", response.data);
      if (response.data.success) {
        setIsCancelling(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setIsCancelling(false);
    }
  }

  return (
    <>
      {/* Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="lg" className="px-10">
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <Button type="submit" className="px-6 py-2" size="lg" disabled={isCancelling} onClick={() => cancelOrder(orderId)}>
              {isCancelling ? <ButtonLoadingSpinner /> : "Yes"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}