/**
 * @file use_favourites_store.ts
 * @description Global state management for user's favorite products.
 * @pattern Singleton: Ensures a single global favorites list throughout the application life cycle.
 * @pattern Facade: Provides simple toggle and check methods, hiding the internal array manipulation and persistence logic.
 * @pattern Observer: Components using this hook automatically re-render when the favorite list changes.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UsersApiClient } from "@/Lib/api/users_api.client";

const usersApi = new UsersApiClient({ 
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" 
});

interface FavoritesState {
  favoriteIds: string[];
  pendingCount: number;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  syncWithBackend: () => Promise<void>;
}

/**
 * Hook for managing the favorites state.
 * Handles adding/removing item IDs and persisting them to local storage.
 */

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      pendingCount: 0,

      isFavorite: (id) => get().favoriteIds.includes(id),

      /**
       * Toggles the favorite status of a product.
       * Acts as a Facade for the underlying array filtering/pushing logic.
       * @param {string} id - The unique identifier of the product.
       */
      
      toggleFavorite: async (id) => {
        console.log("toggleFavorite called with id:", id);
        const isFav = get().favoriteIds.includes(id);

        set((state) => ({
          favoriteIds: isFav
            ? state.favoriteIds.filter((fid) => fid !== id)
            : [...state.favoriteIds, id],
          pendingCount: state.pendingCount + 1,
        }));

        try {
          if (isFav) {
            await usersApi.removeFromFavorites(id);
          } else {
            await usersApi.addToFavorites(id);
          }
        } catch (e) {
          console.error("Failed to toggle favorite", e);
          set((state) => ({
            favoriteIds: isFav
              ? [...state.favoriteIds, id]
              : state.favoriteIds.filter((fid) => fid !== id),
          }));
        } finally {
          set((state) => ({ pendingCount: Math.max(0, state.pendingCount - 1) }));
        }
      },

      syncWithBackend: async () => {
        if (get().pendingCount > 0) return;

        try {
          const res = await usersApi.getMyFavorites();
          if (get().pendingCount > 0) return;

          const next = res.productIds;
          const current = get().favoriteIds;
          if (JSON.stringify([...current].sort()) !== JSON.stringify([...next].sort())) {
            set({ favoriteIds: next });
          }
        } catch (e) {
          console.error("Failed to sync favorites", e);
        }
      },

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: "dankoss-favorites-storage",
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    }
  )
);