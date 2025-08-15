import { createContext } from "react";
import type { CartItem } from "./CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    id: number,
    quantity: number,
    price: number,
    name: string
  ) => void;
  removeFromCart: (id: number) => void;
  totalAmount: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);
