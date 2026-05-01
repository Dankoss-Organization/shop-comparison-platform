/**
 * @file use_cart_store.ts
 * @description Global state management for the shopping cart using Zustand.
 * @pattern Singleton: Ensures a single source of truth for cart state across the app.
 * @pattern Facade: Provides a simplified interface for complex cart operations.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DealCard as DealCardType } from '@/Data/home_data';

export interface CartItem extends DealCardType {
  cartQuantity: number;
  selectedStoreId?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: DealCardType | CartItem) => void;
  removeItem: (id: string) => void; // Змінили title на id
  updateQuantity: (id: string, delta: number) => void; // Змінили title на id
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === product.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, cartQuantity: i.cartQuantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, cartQuantity: 1 } as CartItem] });
        }
      },

      removeItem: (id) => set({
        items: get().items.filter((i) => i.id !== id)
      }),

      updateQuantity: (id, delta) => set({
        items: get().items.map((i) =>
          i.id === id ? { ...i, cartQuantity: Math.max(1, i.cartQuantity + delta) } : i
        )
      }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((acc, item: any) => {
          const activeOffer = item.selectedStoreId 
            ? item.offers?.find((o: any) => o.store_id === item.selectedStoreId) 
            : item.offers?.sort((a: any, b: any) => a.pricing.current_price - b.pricing.current_price)[0];
            
          const price = activeOffer ? activeOffer.pricing.current_price : 0;
          
          return acc + (price * item.cartQuantity);
        }, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.cartQuantity, 0);
      },
    }),
    { name: 'dankoss-cart-storage' },
  )
);