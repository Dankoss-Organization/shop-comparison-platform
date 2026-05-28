/**
 * @file use_cart_store.ts
 * @description Global state management for the shopping cart using Zustand.
 * @pattern Singleton: Ensures a single source of truth for cart state across the app.
 * @pattern Facade: Provides a simplified interface for complex cart operations.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DealCard as DealCardType } from '@/Data/home_data';
import { getCartApi, getProductsApi } from "@/Lib/api"

export interface CartItem extends DealCardType {
  cartQuantity: number;
  selectedStoreId?: string;
  internalId?: string;
  isLocked?: boolean;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  fulfillmentType: "delivery" | "pickup";
  setOpen: (open: boolean) => void;
  setFulfillmentType: (type: "delivery" | "pickup") => void;
  addItem: (product: DealCardType | CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  updateSelectedStore: (itemId: string, storeId: string) => void;
  toggleItemLock: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  applyOptimizedCart: (optimizedItems: { itemId: string; storeId: string }[]) => void;
}

const isSameProduct = (a: CartItem | DealCardType, b: CartItem | DealCardType): boolean => {
  if (a.internalId && b.internalId) return a.internalId === b.internalId;
  return a.id === b.id;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      fulfillmentType: "delivery",
      
      setOpen: (isOpen) => set({ isOpen }),
      setFulfillmentType: (type) => set({ fulfillmentType: type }),

    addItem: (product) => {
      const { items } = get();
      const existingItem = items.find((i) => isSameProduct(i, product));
      const selectedOffer = (product as any).offers?.find(
        (o: any) => o.store_id === (product as any).selectedStoreId
      ) ?? (product as any).offers?.[0];

      if (selectedOffer?.offerId) {
        getCartApi().addCartItem({ offerId: selectedOffer.offerId, quantity: 1 }).catch(console.error);
      } else if (product.id) {
        getProductsApi().getProductCard(product.id).then(card => {
          const firstOffer = card.topOffers[0];
          if (firstOffer) {
            getCartApi().addCartItem({ offerId: firstOffer.id, quantity: 1 }).catch(console.error);
          }
        }).catch(console.error);
      }

      if (existingItem) {
        set({
          items: items.map((i) =>
            isSameProduct(i, product) ? { ...i, cartQuantity: i.cartQuantity + 1 } : i
          ),
        });
      } else {
        const initialStoreId = (product as any).selectedStoreId ?? (product as any).offers?.[0]?.store_id ?? "unknown";
        set({ 
          items: [...items, { ...product, selectedStoreId: initialStoreId, cartQuantity: 1, isLocked: false } as CartItem] 
        });
      }
    },

      removeItem: (id) => set({
        items: get().items.filter((i) => i.id !== id && i.internalId !== id)
      }),

      updateQuantity: (id, delta) => set({
        items: get().items.map((i) =>
          (i.id === id || i.internalId === id) ? { ...i, cartQuantity: Math.max(1, i.cartQuantity + delta) } : i
        )
      }),

      updateSelectedStore: (itemId, storeId) => set({
        items: get().items.map((i) =>
          (i.id === itemId || i.internalId === itemId)
            ? { ...i, selectedStoreId: storeId, isLocked: true } 
            : i
        )
      }),

      toggleItemLock: (itemId) => set({
        items: get().items.map((i) =>
          (i.id === itemId || i.internalId === itemId) ? { ...i, isLocked: !i.isLocked } : i
        )
      }),

      applyOptimizedCart: (optimizedItems) => set({
        items: get().items.map((i) => {
          const optItem = optimizedItems.find(o => o.itemId === i.id || o.itemId === i.internalId);
          if (!optItem) return i;
          
          return { 
            ...i, 
            selectedStoreId: optItem.storeId,
            isLocked: i.isLocked 
          };
        })
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