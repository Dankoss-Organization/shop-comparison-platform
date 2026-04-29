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
            className="fixed inset-0 z-[70] bg-[#120F12B8] backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0.7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-[80] flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-[#191519] shadow-[24px_0_60px_#00000042,inset_0_1px_0_#FFFFFF05]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                  Filters
                </p>
                <h3 className="mt-2 text-xl font-black text-white">Refine catalog</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    actions.handleResetFilters();
                    onClose();
                  }}
                  className="rounded-full bg-[#262026] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#EC5800] transition-all duration-300 hover:bg-[#2E262D] hover:text-[#FF9B58]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#262026] text-[#FFDEBA] transition-all duration-300 hover:bg-[#2E262D] hover:text-white"
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
              <div className="rounded-[1.3rem] bg-[#211C21] shadow-[0_16px_28px_#00000024]">
                <div className="border-t border-[#2F282F] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                        Price cap
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#FFDEBA]">
                        Up to ${state.maxPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#2A2120] px-3 py-1 text-xs font-bold text-[#EC5800]">
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
                    className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#171317] accent-[#EC5800]"
                  />
                </div>

                <div className="border-t border-[#2F282F] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
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
                            ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5E1F002F]"
                            : "bg-[#171317] text-[#FFDEBA]/75 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                        )}
                      >
                        {rating === 0 ? "Any" : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#2F282F] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
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
                            ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5E1F002F]"
                            : "bg-[#171317] text-[#FFDEBA]/75 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                        )}
                      >
                        {discount === 0 ? "Any" : `${discount}%+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#2F282F] px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setIsStoresOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between gap-3 rounded-[1rem] bg-[#171317] px-3.5 py-3 text-left transition-all duration-300 hover:bg-[#1D181D]"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                        Stores
                      </p>
                      <span className="rounded-full bg-[#241F24] px-3 py-1 text-xs font-bold text-[#FFDEBA]">
                        {state.selectedMarkets.length > 0
                          ? state.selectedMarkets.length
                          : state.availableMarkets.length}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full bg-[#241F24] text-[#FFDEBA]/70 transition-all duration-300",
                        isStoresOpen ? "rotate-180 text-[#EC5800]" : "",
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
                                    ? "bg-[#2A2120] text-[#FFDEBA]"
                                    : "bg-[#171317] text-[#FFDEBA]/72 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                                )}
                              >
                                <span>{market}</span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-all duration-300",
                                    isActive
                                      ? "bg-[#EC5800] text-white shadow-[0_0_0_1px_#EC580040]"
                                      : "bg-[#100D10] text-transparent shadow-[inset_0_0_0_1px_#FFFFFF14]",
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