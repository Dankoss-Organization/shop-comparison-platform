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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),

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