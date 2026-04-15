/**
 * @file use_cart_store.ts
 * @description Global state management for the shopping cart using Zustand.
 * @pattern Singleton: Ensures a single source of truth for cart state across the app.
 * @pattern Facade: Provides a simplified interface for complex cart operations.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DealCard as DealCardType } from '@/Data/home_data';

interface CartItem extends DealCardType {
  cartQuantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: DealCardType) => void;
  removeItem: (title: string) => void;
  updateQuantity: (title: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
getTotalItems: () => number;
}


/**
 * Hook for managing the shopping cart state.
 * Encapsulates logic for adding, removing, and updating product quantities.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),

      /**
       * Adds a product to the cart or increments quantity if it exists.
       * @param {DealCard} product - The product object to add.
       */
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((i) => i.title === product.title);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.title === product.title ? { ...i, cartQuantity: i.cartQuantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, cartQuantity: 1 }] });
        }
      },

      removeItem: (title) => set({
        items: get().items.filter((i) => i.title !== title)
      }),

      updateQuantity: (title, delta) => set({
        items: get().items.map((i) =>
          i.title === title ? { ...i, cartQuantity: Math.max(1, i.cartQuantity + delta) } : i
        )
      }),

      clearCart: () => set({ items: [] }),

      /**
       * Calculates the total price of all items in the cart.
       * @returns {number} The formatted total price.
       */
      getTotalPrice: () => {
        return get().items.reduce((acc, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return acc + price * item.cartQuantity;
        }, 0);
      },
      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.cartQuantity, 0);
        },
    }),
    { name: 'dankoss-cart-storage' },
  )
);