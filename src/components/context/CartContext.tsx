"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
  cartItemsCount: number;
  setCartItemsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, cartCount }: { children: ReactNode; cartCount: number }) {
  const [cartItemsCount, setCartItemsCount] = useState<number>(cartCount); // Initialize with cartCount

  useEffect(() => {
    setCartItemsCount(cartCount); // Update when cartCount changes
  }, [cartCount]);

  return <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
