import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getTotal: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (productId) => {
        const { favoriteIds } = get();
        const isFav = favoriteIds.includes(productId);
        
        if (isFav) {
          set({ favoriteIds: favoriteIds.filter((id) => id !== productId) });
        } else {
          set({ favoriteIds: [...favoriteIds, productId] });
        }
      },

      isFavorite: (productId) => {
        return get().favoriteIds.includes(productId);
      },

      getTotal: () => get().favoriteIds.length,
    }),
    {
      name: 'dankoss-favorites-storage', 
    }
  )
);