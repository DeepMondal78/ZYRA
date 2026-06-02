"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";


export interface CartItem {
  id?: string | number;
  title?: string;
  name?: string;
  price: string | number;
  img?: string;
  [key: string]: unknown; 
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalPrice: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckoutOpen: boolean;
  openCheckout: (product?: CartItem | null) => void;
  closeCheckout: () => void;
  selectedProduct: CartItem | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const addToCart = (product: CartItem) => setCart((prev) => [...prev, product]);

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.length;

  const totalPrice = cart.reduce((total, item) => {
    const price = typeof item.price === "string"
      ? Number(item.price.replace(/[^0-9.-]+/g, ""))
      : Number(item.price);
    return total + price;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        cartCount,
        isCartOpen,      
        setIsCartOpen,   
        isCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        openCheckout: (product: CartItem | null = null) => { 
          setSelectedProduct(product);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => {
          setIsCheckoutOpen(false);
          setTimeout(() => setSelectedProduct(null), 300); 
        }
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};