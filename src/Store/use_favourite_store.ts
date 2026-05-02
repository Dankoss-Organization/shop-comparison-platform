/**
 * @file use_favourites_store.ts
 * @description Global state management for user's favorite products.
 * @pattern Singleton: Ensures a single global favorites list throughout the application life cycle.
 * @pattern Facade: Provides simple toggle and check methods, hiding the internal array manipulation and persistence logic.
 * @pattern Observer: Components using this hook automatically re-render when the favorite list changes.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

/**
 * Hook for managing the favorites state.
 * Handles adding/removing item IDs and persisting them to local storage.
 */

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      isFavorite: (id) => get().favoriteIds.includes(id),
      
      /**
       * Toggles the favorite status of a product.
       * Acts as a Facade for the underlying array filtering/pushing logic.
       * @param {string} id - The unique identifier of the product.
       */

      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favId) => favId !== id)
            : [...state.favoriteIds, id],
        })),

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: "dankoss-favorites-storage",
    }
  )
);