/**
 * @file price_watching_card.tsx
 * @description Displays the list of products the user is watching for price drops.
 * Used as a tab inside the Alerts Feed page.
 */

"use client";

import { usePriceAlertsStore } from "@/Store/use_price_alerts_store";
import SmartImage from "@/Components/UI/smart_image";
import { formatCurrency } from "@/Lib/utils";

export default function PriceWatchingCard() {
  const priceAlerts = usePriceAlertsStore((s) => s.alerts);
  const unsubscribe = usePriceAlertsStore((s) => s.unsubscribe);

  if (priceAlerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-text-muted/30">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <span className="text-[15px] text-text-muted">
          No products being watched yet. Tap 🔔 on any product card to start tracking.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl">
      {priceAlerts.map((a) => (
        <div
          key={a.id}
          className="flex items-center gap-4 rounded-2xl border border-glass/10 bg-bg-surface px-4 py-3 transition-all hover:border-glass/20"
        >
          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl">
            <SmartImage src={a.image} alt={a.title} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="line-clamp-1 text-[13px] font-semibold text-text-main">
              {a.title}
            </span>
            <span className="text-[11px] text-text-muted">
              Tracking from {formatCurrency(a.price, a.currency)}
            </span>
          </div>

          <button
            onClick={() => unsubscribe(a.id)}
            className="flex-shrink-0 rounded-full border border-glass/10 px-3 py-1.5 text-[11px] font-semibold text-text-muted transition-all hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5"
          >
            Unsubscribe
          </button>
        </div>
      ))}
    </div>
  );
}