/**
 * @file use_locations_store.ts
 * * Zustand state management for the store locator feature.
 * Handles user filter selections, product search queries, and the currently selected store.
 * Automatically persists this state to `localStorage` via middleware.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocationsState = {
  filterBrand: string | null;
  filterOpenNow: boolean;
  filterCity: string | null;
  productSearch: string;
  selectedStoreId: string | null;
  setFilterBrand: (v: string | null) => void;
  setFilterOpenNow: (v: boolean) => void;
  setFilterCity: (v: string | null) => void;
  setProductSearch: (v: string) => void;
  setSelectedStoreId: (v: string | null) => void;
};

export const useLocationsStore = create<LocationsState>()(
  persist(
    (set) => ({
      filterBrand: null,
      filterOpenNow: false,
      filterCity: null,
      productSearch: "",
      selectedStoreId: null,
      setFilterBrand: (v) => set({ filterBrand: v }),
      setFilterOpenNow: (v) => set({ filterOpenNow: v }),
      setFilterCity: (v) => set({ filterCity: v }),
      setProductSearch: (v) => set({ productSearch: v }),
      setSelectedStoreId: (v) => set({ selectedStoreId: v }),
    }),
    { name: "locations-filters" }
  )
);