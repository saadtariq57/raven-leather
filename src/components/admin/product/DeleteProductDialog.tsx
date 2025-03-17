"use client";

import { useState } from "react";
import axios from "axios";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ButtonLoadingSpinner from "../../ButtonLoadingSpinner";

export default function DeleteProductDialog({ productId }: { productId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.post(`/api/admin/product/delete-product?id=${productId}`);
      if (response.data.success) {
        
        window.location.reload();
      } else {
        console.error("Deletion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false); // Close dialog after completion
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        // Prevent closing dialog while deletion is in progress
        if (!newOpen && isDeleting) return;
        setOpen(newOpen);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the selected product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <ButtonLoadingSpinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}