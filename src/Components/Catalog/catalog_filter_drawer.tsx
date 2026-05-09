/**
 * @file catalog_filter_drawer.tsx
 * @description A sliding drawer component for refining catalog results based on price, rating, discount, and market availability.
 */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/Lib/utils";
import type { useCatalogFacade } from "@/Lib/use_catalog_facade";

type FacadeReturn = ReturnType<typeof useCatalogFacade>;

export interface CatalogFilterDrawerProps {
  isOpen: boolean;
  state: FacadeReturn["state"];
  actions: FacadeReturn["actions"];
  onClose: () => void;
}

const ratingOptions = [0, 4, 4.5, 4.8];
const discountOptions = [0, 10, 20, 30];

/**
 * @description Renders the filter drawer interface.
 * @param {CatalogFilterDrawerProps} props - The drawer state, facade state, actions, and close handler.
 * @returns {JSX.Element | null} The animated drawer or null.
 */
export default function CatalogFilterDrawer({
  isOpen,
  state,
  actions,
  onClose,
}: CatalogFilterDrawerProps) {
  const [isStoresOpen, setIsStoresOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0.7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-[80] flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-bg-surface shadow-[24px_0_60px_rgba(0,0,0,0.15)] dark:shadow-[24px_0_60px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between border-b border-glass/10 px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-primary/60">
                  Filters
                </p>
                <h3 className="mt-2 text-xl font-black text-text-main">Refine catalog</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    actions.handleResetFilters();
                    onClose();
                  }}
                  className="rounded-full bg-bg-elevated px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange transition-all duration-300 hover:bg-bg-highest hover:text-brand-orange"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated text-text-primary transition-all duration-300 hover:bg-bg-highest hover:text-text-main"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-[1.3rem] bg-bg-deep shadow-sm dark:shadow-xl border border-glass/5">
                <div className="border-b border-glass/10 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">
                        Price cap
                      </p>
                      <p className="mt-2 text-sm font-semibold text-text-main">
                        Up to ${state.maxPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs font-bold text-brand-orange">
                      ${state.priceBounds.min.toFixed(2)} – ${state.priceBounds.max.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={state.priceBounds.min}
                    max={state.priceBounds.max}
                    step={0.05}
                    value={state.maxPrice}
                    onChange={(e) => actions.handleMaxPriceChange(Number(e.target.value))}
                    className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-brand-orange"
                  />
                </div>

                <div className="border-b border-glass/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">
                    Minimum rating
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {ratingOptions.map((rating) => (
                      <button
                        key={`rating-${rating}`}
                        type="button"
                        onClick={() => actions.handleMinRatingChange(rating)}
                        className={cn(
                          "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                          state.minRating === rating
                            ? "bg-brand-orange text-white shadow-[0_4px_12px_rgb(var(--brand-orange)_/_0.3)]"
                            : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main",
                        )}
                      >
                        {rating === 0 ? "Any" : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-b border-glass/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">
                    Discount
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {discountOptions.map((discount) => (
                      <button
                        key={`discount-${discount}`}
                        type="button"
                        onClick={() => actions.handleMinDiscountChange(discount)}
                        className={cn(
                          "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                          state.minDiscount === discount
                            ? "bg-brand-orange text-white shadow-[0_4px_12px_rgb(var(--brand-orange)_/_0.3)]"
                            : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main",
                        )}
                      >
                        {discount === 0 ? "Any" : `${discount}%+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setIsStoresOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between gap-3 rounded-[1rem] bg-bg-elevated px-3.5 py-3 text-left transition-all duration-300 hover:bg-bg-highest"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">
                        Stores
                      </p>
                      <span className="rounded-full bg-bg-surface px-3 py-1 text-xs font-bold text-text-main">
                        {state.selectedMarkets.length > 0
                          ? state.selectedMarkets.length
                          : state.availableMarkets.length}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full bg-bg-surface text-text-primary transition-all duration-300",
                        isStoresOpen ? "rotate-180 text-brand-orange" : "",
                      )}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isStoresOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 grid gap-2 pb-1">
                          {state.availableMarkets.map((market) => {
                            const isActive = state.selectedMarkets.includes(market);
                            return (
                              <button
                                key={market}
                                type="button"
                                onClick={() => actions.handleMarketToggle(market)}
                                className={cn(
                                  "flex items-center justify-between rounded-[0.95rem] px-3.5 py-3 text-sm font-semibold transition-all duration-300",
                                  isActive
                                    ? "bg-brand-orange/10 text-brand-orange"
                                    : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main",
                                )}
                              >
                                <span>{market}</span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-all duration-300",
                                    isActive
                                      ? "bg-brand-orange text-white"
                                      : "bg-bg-surface text-transparent border border-glass/10",
                                  )}
                                >
                                  ✓
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}