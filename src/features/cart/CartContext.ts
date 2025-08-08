import { createContext } from "react";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: number, quantity: number, price: number) => void;
  removeFromCart: (id: number) => void;
  totalAmount: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);
