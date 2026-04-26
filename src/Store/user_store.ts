import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  displayName: string;
  email: string;
  primaryCity: string;
  avatarUrl: string; 
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setPrimaryCity: (city: string) => void;
  setAvatarUrl: (url: string) => void; 
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: "Sofiia M.",
      email: "sofia@knu.ua",
      primaryCity: "Kyiv",
      avatarUrl: "/user.svg", 
      setDisplayName: (name) => set({ displayName: name }),
      setEmail: (email) => set({ email: email }),
      setPrimaryCity: (city) => set({ primaryCity: city }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
    }),
    {
      name: 'dankoss-user-storage',
    }
  )
);