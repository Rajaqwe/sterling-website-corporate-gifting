"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  incrementCart: (amount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, initialCount }: { children: ReactNode; initialCount: number }) {
  const [cartCount, setCartCount] = useState(initialCount);

  // Sync with initialCount if it changes from server (after revalidatePath)
  React.useEffect(() => {
    setCartCount(initialCount);
  }, [initialCount]);

  const incrementCart = (amount: number) => {
    setCartCount((prev) => prev + amount);
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, incrementCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
