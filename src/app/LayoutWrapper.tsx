"use client"

import { CartProvider } from "@/components/context/CartContext";
import { InnerLayout } from "./InnerLayout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const [cartCountState, setCartCountState] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('/api/cart/get-itemsCount');
        console.log("Response from get-itemsCount:", response.data);
        
        if (response.data.success) {
          console.log("Cart items count in Layout Wrapper:", response.data.cartItemsCount);
          
          setCartCountState(response.data.cartItemsCount);
        } else {
          setCartCountState(0);
        }
      } catch {
        setCartCountState(0);
      }
    };

    fetchCartCount();
    
  }, []);


  return (
    <CartProvider cartCount={cartCountState}>
      <InnerLayout>{children}</InnerLayout>
    </CartProvider>
  );
}

