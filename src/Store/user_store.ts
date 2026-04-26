import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

export interface Basket {
  id: number;
  name: string;
  date: string;
  price: number;
  items: Product[];
  stores: string[];
  color: string;
}

interface UserState {
  displayName: string;
  email: string;
  primaryCity: string;
  avatarUrl: string;
  activeItems: Product[]; 
  baskets: Basket[];
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setPrimaryCity: (city: string) => void;
  setAvatarUrl: (url: string) => void;
  addBasket: (basket: Basket) => void;
  reorderBasket: (basketId: number) => { success: boolean; message?: string };
}

const mockProducts: Product[] = [
  { id: 101, name: "Ribeye Steak 500g", price: 15.50, emoji: "🥩" },
  { id: 102, name: "BBQ Sauce", price: 4.20, emoji: "🥫" },
  { id: 103, name: "Charcoal 5kg", price: 22.80, emoji: "🔥" },
];

const INITIAL_BASKETS: Basket[] = [
  { id: 1, name: "Weekend BBQ Party", date: "Oct 18", price: 42.50, items: mockProducts, stores: ["Сільпо", "NOVUS"], color: "#EC5800" },
  { id: 2, name: "Healthy Week Prep", date: "Oct 12", price: 68.20, items: [], stores: ["ATB", "Le Silpo"], color: "#4ADE80" },
  { id: 3, name: "Office Snacks", date: "Oct 05", price: 15.90, items: [], stores: ["Metro"], color: "#3B82F6" },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      displayName: "Sofiia M.",
      email: "sofia@knu.ua",
      primaryCity: "Kyiv",
      avatarUrl: "/user.svg",
      activeItems: [], 
      baskets: INITIAL_BASKETS,

      setDisplayName: (name) => set({ displayName: name }),
      setEmail: (email) => set({ email: email }),
      setPrimaryCity: (city) => set({ primaryCity: city }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      addBasket: (basket) => set((state) => ({ baskets: [basket, ...state.baskets] })),
      
      reorderBasket: (basketId: number) => {
        const state = get();
        
        if (state.activeItems.length > 0) {
          return { 
            success: false, 
            message: "Your current basket is not empty. Please clear it before reordering." 
          };
        }

        const historicalBasket = state.baskets.find(b => b.id === basketId);
        if (historicalBasket) {
          set({ activeItems: historicalBasket.items });
          return { success: true };
        }
        
        return { success: false, message: "Basket not found." };
      },
    }),
    {
      name: 'dankoss-user-storage',
    }
  )
);