/**
 * @file use_price_alerts_store.ts
 * @description Global state for price-watched products. Persisted to localStorage.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PriceAlert {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
}

interface PriceAlertsState {
  alerts: PriceAlert[];
  subscribe: (product: PriceAlert) => void;
  unsubscribe: (id: string) => void;
  isSubscribed: (id: string) => boolean;
}

export const usePriceAlertsStore = create<PriceAlertsState>()(
  persist(
    (set, get) => ({
      alerts: [],

      isSubscribed: (id) => get().alerts.some((a) => a.id === id),

      subscribe: (product) =>
        set((s) => ({
          alerts: s.alerts.some((a) => a.id === product.id)
            ? s.alerts
            : [...s.alerts, product],
        })),

      unsubscribe: (id) =>
        set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
    }),
    { name: "dankoss-price-alerts" }
  )
);