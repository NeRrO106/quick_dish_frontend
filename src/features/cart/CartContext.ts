import { createContext } from "react";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  totalAmount: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);
