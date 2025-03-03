"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ArrowRight, Loader2 } from "lucide-react";
import { Inter } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CartItemWithProduct } from "@/types/client/cart.types";
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

interface CartProps {
  cartItems: CartItemWithProduct[];
}

export default function Cart({ cartItems }: CartProps) {
  const router = useRouter();

  // Use local state for the displayed cart items (so items can be removed after deletion).
  const [displayedCartItems, setDisplayedCartItems] = useState<CartItemWithProduct[]>(cartItems);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setCartItemsCount } = useCart();

  // Map each cart item’s id to its quantity.
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(() =>
    displayedCartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity ?? 1;
      return acc;
    }, {} as { [key: number]: number })
  );

  // Track loading state for each item (by id).
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>({});

  // Track selected items (by id) for deletion.
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  //* Increment quantity API call.
  const incrementQuantity = async (id: number) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axios.post(`/api/cart/item/increment?id=${id}`);
      const updatedQuantity = response.data.cartItem.quantity;
      setQuantities((prev) => ({
        ...prev,
        [id]: updatedQuantity,
      }));
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  //* Decrement quantity—but do not go below 1.
  const decrementQuantity = async (id: number) => {
    if (quantities[id] <= 1) return; // Prevent decrementing below 1.
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axios.post(`/api/cart/item/decrement?id=${id}`);
      const updatedQuantity = response.data.cartItem.quantity;
      setQuantities((prev) => ({
        ...prev,
        [id]: updatedQuantity,
      }));
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  //* Toggle selection for all items.
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(displayedCartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  //* Toggle selection for a single item.
  const toggleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  //* Delete the selected items via a multi-delete API call.
  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      await axios.post("/api/cart/item/delete", { ids: selectedItems });
      // Filter out the deleted items from UI.
      const newItems = displayedCartItems.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setIsDeleting(false);
      setCartItemsCount((prevCount) => Math.max(prevCount - selectedItems.length, 0))
      setDisplayedCartItems(newItems);
      // Remove deleted items from quantities.
      setQuantities((prev) => {
        const updated = { ...prev };
        selectedItems.forEach((id) => delete updated[id]);
        return updated;
      });
      // Clear the selection.
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  //* Calculate the order summary.
  const selectedCartItems = displayedCartItems.filter((item) => selectedItems.includes(item.id));

  // Calculate subtotal, shipping, and total for selected items only.
  const subtotal = selectedCartItems.reduce((acc, item) => {
    const price = Number(item.product.price);
    const qty = quantities[item.id] || 1;
    return acc + price * qty;
  }, 0);
  const shipping = 200;
  const total = subtotal + shipping;

  //* Checkout
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectError, setSelectError] = useState(false);
  async function checkout() {
    if(selectedItems.length === 0){
      setSelectError(true);
      return;
    } 
    setIsCheckingOut(true);
    let url = '/cart/checkout?items=';
    selectedItems.forEach(item => {
      url = url.concat(item.toString() + "+");
    })
    url = url.slice(0, -1)
    console.log(url);
    router.push(url);
  }

  return (
    <div className={`flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 ${inter.className}`}>
      {/* Left side: Cart table */}
      <div className="w-full lg:w-2/3">
        {selectedItems.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected} disabled={isDeleting} >
              {isDeleting ? <ButtonLoadingSpinner /> : "Delete Items"}
            </Button>
          </div>
        )}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          {selectError && <div className="text-red-500 text-sm text-center">Please select at least one item to checkout.</div>}
          { displayedCartItems.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Your cart is empty.
            </div>
          ) :
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                {/* Checkbox column header */}
                <th className="px-4 py-2 flex items-center justify-center">
                  <Checkbox
                    checked={
                      selectedItems.length === displayedCartItems.length &&
                      displayedCartItems.length > 0
                    }
                    onCheckedChange={(checked) => toggleSelectAll(checked === true)}
                  />
                </th>
                <th className="px-4 py-2 text-sm font-semibold">PRODUCT</th>
                <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">PRICE</th>
                <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">QUANTITY</th>
                <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {displayedCartItems.map((item) => {
                const price = Number(item.product.price);
                const qty = quantities[item.id] || 1;
                const totalPrice = price * qty;
                const imageUrl =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0].url
                    : "/default.jpg";
                return (
                  <tr key={item.id} className="border-t">
                    {/* Checkbox cell */}
                    <td className="pt-20 md:pt-8 flex items-center justify-center">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) =>
                          toggleSelectItem(item.id, checked === true)
                        }
                      />
                    </td>
                    {/* Product Details */}
                    <td className="p-4 md:p-0">
                      <div className="flex space-x-4 items-center">
                        <Image
                          src={imageUrl}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md md:rounded-none"
                          width={80}
                          height={80}
                          priority={true}
                        />
                        <div>
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <div className="text-sm text-gray-500">
                            <span >{item.product.color}</span>
                            <span>{item.size!.length > 0 ? (", " + item.size) : ""}</span>
                          </div>
                        </div>
                      </div>
                      {/* Mobile View: Price & Quantity */}
                      <div className="mt-4 flex justify-between items-center md:hidden">
                        <div className="text-sm font-semibold">Rs. {price.toLocaleString()}</div>
                        <div className="flex items-center space-x-2">
                          {loadingItems[item.id] ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <Button
                                variant="outline"
                                className="w-8"
                                size="sm"
                                onClick={() => decrementQuantity(item.id)}
                                disabled={qty <= 1}
                              >
                                <FiMinus />
                              </Button>
                              <span className="font-medium">{qty}</span>
                              <Button
                                variant="outline"
                                className="w-8"
                                size="sm"
                                onClick={() => incrementQuantity(item.id)}
                              >
                                <FiPlus />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Desktop View: Price */}
                    <td className="hidden md:table-cell text-sm xl:text-lg font-medium px-2 py-2">
                      Rs. {price.toLocaleString()}
                    </td>
                    {/* Desktop View: Quantity */}
                    <td className="hidden md:table-cell px-2 py-2">
                      <div className="flex items-center space-x-2">
                        {loadingItems[item.id] ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              className="w-8"
                              size="sm"
                              onClick={() => decrementQuantity(item.id)}
                              disabled={qty <= 1}
                            >
                              <FiMinus />
                            </Button>
                            <span className="font-medium">{qty}</span>
                            <Button
                              variant="outline"
                              className="w-8"
                              size="sm"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              <FiPlus />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                    {/* Desktop View: Total Price */}
                    <td className="hidden md:table-cell text-base xl:text-lg font-bold px-4 py-2">
                      Rs. {totalPrice.toLocaleString("en-PK")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          }
        </div>
      </div>

      {/* Right side: Order Summary */}
      <div className="w-full lg:w-1/3 h-fit bg-gray-50 rounded-2xl border py-4 px-6 space-y-4">
        <h2 className="text-xl font-bold pb-2">Order summary</h2>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="font-medium">Rs. {shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-3 pb-3">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
        <Button className="w-full flex justify-between px-4" variant="default" size="lg" onClick={checkout} disabled={isCheckingOut}>
          <span>Checkout</span>
          {isCheckingOut ? <ButtonLoadingSpinner /> : <ArrowRight className="text-2xl" />}
        </Button>
      </div>
    </div>
  );
}
