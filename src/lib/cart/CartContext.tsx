"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  size: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: string | null }
  | { type: "REMOVE_ITEM"; slug: string; size: string | null }
  | { type: "UPDATE_QUANTITY"; slug: string; size: string | null; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.slug === action.product.slug && item.size === action.size
      );
      if (existing) {
        return {
          ...state,
          isCartOpen: true,
          items: state.items.map((item) =>
            item.product.slug === action.product.slug && item.size === action.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        isCartOpen: true,
        items: [...state.items, { product: action.product, size: action.size, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.slug === action.slug && item.size === action.size)
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.product.slug === action.slug && item.size === action.size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.slug === action.slug && item.size === action.size
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "OPEN_CART":
      return { ...state, isCartOpen: true };
    case "CLOSE_CART":
      return { ...state, isCartOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product, size: string | null) => void;
  removeItem: (slug: string, size: string | null) => void;
  updateQuantity: (slug: string, size: string | null, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isCartOpen: false });

  const addItem = useCallback((product: Product, size: string | null) => {
    dispatch({ type: "ADD_ITEM", product, size });
  }, []);

  const removeItem = useCallback((slug: string, size: string | null) => {
    dispatch({ type: "REMOVE_ITEM", slug, size });
  }, []);

  const updateQuantity = useCallback((slug: string, size: string | null, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", slug, size, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isCartOpen: state.isCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
