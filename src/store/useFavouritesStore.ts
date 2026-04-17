/**
 * @file use_favourites_store.ts
 * @description Global state management for user's favorite products.
 * @pattern Singleton: Ensures a single global favorites list throughout the application life cycle.
 * @pattern Facade: Provides simple toggle and check methods, hiding the internal array manipulation and persistence logic.
 * @pattern Observer: Components using this hook automatically re-render when the favorite list changes.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getTotal: () => number;
}

/**
 * Hook for managing the favorites state.
 * Handles adding/removing item IDs and persisting them to local storage.
 */

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      /**
       * Toggles the favorite status of a product.
       * Acts as a Facade for the underlying array filtering/pushing logic.
       * @param {string} id - The unique identifier of the product.
       */

      toggleFavorite: (productId) => {
        const { favoriteIds } = get();
        const isFav = favoriteIds.includes(productId);
        
        if (isFav) {
          set({ favoriteIds: favoriteIds.filter((id) => id !== productId) });
        } else {
          set({ favoriteIds: [...favoriteIds, productId] });
        }
      },

      /**
       * Checks if a product is in the favorites list.
       * @param {string} id - Product ID to check.
       * @returns {boolean}
       */

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