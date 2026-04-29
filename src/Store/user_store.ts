import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @file user_store.ts
 * @description Global state management for user profile, authentication state, and order history.
 */

export interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
  image: string; 
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

export interface UserPreferences {
  allergies: string[]; 
  healthGoals: string[];
  diet: string | null;
  lifestyle: string[];
}

export interface SavedLocation {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
}

interface UserState {
  displayName: string;
  email: string;
  primaryCity: string;
  avatarUrl: string;
  baskets: Basket[];
  isAuthenticated: boolean;
  preferences: UserPreferences;
  locations: SavedLocation[];
  isSmartLocationActive: boolean;
  
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setPrimaryCity: (city: string) => void;
  setAvatarUrl: (url: string) => void;
  
  addBasket: (basket: Basket) => void; 
  login: () => void;
  logout: () => void;

  toggleAllergy: (allergy: string) => void;
  toggleHealthGoal: (goal: string) => void;
  setDiet: (diet: string | null) => void;
  toggleLifestyle: (item: string) => void;

  toggleSmartLocation: () => void;
  setDefaultLocation: (id: string) => void;
  deleteLocation: (id: string) => void;
}

const COLORS = ["#EC5800", "#4ADE80", "#3B82F6", "#A855F7", "#D946EF", "#EAB308"];

const mockProducts: Product[] = [
  { 
    id: 101, 
    name: "Ribeye Steak 500g", 
    price: 15.50, 
    emoji: "🥩", 
    image: "https://images.unsplash.com/photo-1546248136-3363e74482ca?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 102, 
    name: "BBQ Sauce", 
    price: 4.20, 
    emoji: "🥫", 
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 103, 
    name: "Charcoal 5kg", 
    price: 22.80, 
    emoji: "🔥", 
    image: "https://images.unsplash.com/photo-1533653139366-231a409f5820?auto=format&fit=crop&w=800&q=80" 
  },
];

const INITIAL_BASKETS: Basket[] = [
  { id: 1, name: "Order #8042", date: "Oct 18", price: 42.50, items: mockProducts, stores: ["Сільпо", "NOVUS"], color: "#EC5800" },
  { id: 2, name: "Order #4091", date: "Oct 12", price: 68.20, items: [], stores: ["ATB", "Le Silpo"], color: "#4ADE80" },
  { id: 3, name: "Order #1024", date: "Oct 05", price: 15.90, items: [], stores: ["Metro"], color: "#3B82F6" },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: "Sofiia M.",
      email: "sofia@knu.ua",
      primaryCity: "Kyiv",
      avatarUrl: "/user.svg",
      baskets: INITIAL_BASKETS,
      isAuthenticated: true,

      preferences: {
        allergies: [],
        healthGoals: [],
        diet: null,
        lifestyle: [],
      },

      locations: [
        { id: "1", title: "Гуртожиток", address: "Київ, вул. Ломоносова", isDefault: true },
        { id: "2", title: "Університет", address: "Київ, пр-т Глушкова (KNU)", isDefault: false },
      ],
      isSmartLocationActive: false,

      setDisplayName: (name) => set({ displayName: name }),
      setEmail: (email) => set({ email: email }),
      setPrimaryCity: (city) => set({ primaryCity: city }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      
      addBasket: (basket) => set((state) => ({ 
        baskets: [basket, ...state.baskets] 
      })),
      
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),

      toggleAllergy: (allergy) => set((state) => {
        const exists = state.preferences.allergies.includes(allergy);
        return {
          preferences: {
            ...state.preferences,
            allergies: exists 
              ? state.preferences.allergies.filter((a) => a !== allergy)
              : [...state.preferences.allergies, allergy]
          }
        };
      }),

      toggleHealthGoal: (goal) => set((state) => {
        const exists = state.preferences.healthGoals.includes(goal);
        return {
          preferences: {
            ...state.preferences,
            healthGoals: exists 
              ? state.preferences.healthGoals.filter((g) => g !== goal)
              : [...state.preferences.healthGoals, goal]
          }
        };
      }),

      setDiet: (diet) => set((state) => ({
        preferences: { ...state.preferences, diet }
      })),

      toggleLifestyle: (item) => set((state) => {
        const exists = state.preferences.lifestyle.includes(item);
        return {
          preferences: {
            ...state.preferences,
            lifestyle: exists 
              ? state.preferences.lifestyle.filter((l) => l !== item)
              : [...state.preferences.lifestyle, item]
          }
        };
      }),
      toggleSmartLocation: () => set((state) => ({ isSmartLocationActive: !state.isSmartLocationActive })),
      setDefaultLocation: (id) => set((state) => ({
        locations: state.locations.map(loc => ({ ...loc, isDefault: loc.id === id }))
      })),
      deleteLocation: (id) => set((state) => ({
        locations: state.locations.filter(loc => loc.id !== id)
      })),
    }),
    {
      name: 'dankoss-user-storage',
    }
  )
);