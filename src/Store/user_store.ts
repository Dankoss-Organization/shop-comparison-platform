import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Basket {
  id: number;
  name: string;
  date: string;
  price: number;
  items: number;
  stores: string[];
  color: string;
}

interface UserState {
  displayName: string;
  email: string;
  primaryCity: string;
  avatarUrl: string;
  baskets: Basket[]; 
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setPrimaryCity: (city: string) => void;
  setAvatarUrl: (url: string) => void;
  addBasket: (basket: Basket) => void;
}

const INITIAL_BASKETS: Basket[] = [
  { id: 1, name: "Weekend BBQ Party", date: "2 days ago", price: 42.50, items: 18, stores: ["Сільпо", "NOVUS"], color: "#EC5800" },
  { id: 2, name: "Healthy Week Prep", date: "1 week ago", price: 68.20, items: 24, stores: ["ATB", "Le Silpo"], color: "#4ADE80" },
  { id: 3, name: "Office Snacks", date: "Oct 12", price: 15.90, items: 5, stores: ["Metro"], color: "#3B82F6" },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: "Sofiia M.",
      email: "sofia@knu.ua",
      primaryCity: "Kyiv",
      avatarUrl: "/user.svg",
      baskets: INITIAL_BASKETS, 

      setDisplayName: (name) => set({ displayName: name }),
      setEmail: (email) => set({ email: email }),
      setPrimaryCity: (city) => set({ primaryCity: city }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      addBasket: (basket) => set((state) => ({ baskets: [basket, ...state.baskets] })),
    }),
    {
      name: 'dankoss-user-storage',
    }
  )
);