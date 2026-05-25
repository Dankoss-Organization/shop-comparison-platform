"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/Lib/utils";
import type { useCatalogFacade } from "@/Lib/use_catalog_facade";
import { 
  BaseFilterDrawer, 
  FilterPriceCap, 
  FilterRating, 
  FilterDiscount 
} from "@/Components/UI/base_filter_drawer";

type FacadeReturn = ReturnType<typeof useCatalogFacade>;

export interface CatalogFilterDrawerProps {
  isOpen: boolean;
  state: FacadeReturn["state"];
  actions: FacadeReturn["actions"];
  onClose: () => void;
}

export default function CatalogFilterDrawer({ isOpen, state, actions, onClose }: CatalogFilterDrawerProps) {
  const [isStoresOpen, setIsStoresOpen] = useState(false);

  return (
    <BaseFilterDrawer 
      isOpen={isOpen} 
      onClose={onClose} 
      onReset={actions.handleResetFilters}
      title="Refine catalog"
    >
      <FilterPriceCap 
        maxPrice={state.maxPrice} 
        setMaxPrice={(val) => actions.handleMaxPriceChange(val)} 
        priceBounds={state.priceBounds} 
      />
      <FilterRating 
        minRating={state.minRating} 
        setMinRating={actions.handleMinRatingChange} 
      />
      <FilterDiscount 
        minDiscount={state.minDiscount} 
        setMinDiscount={actions.handleMinDiscountChange} 
        hasBorder={true}
      />

      <div className="px-4 py-4">
        <button
          type="button"
          onClick={() => setIsStoresOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 rounded-[1rem] bg-bg-elevated px-3.5 py-3 text-left transition-all duration-300 hover:bg-bg-highest"
        >
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">Stores</p>
            <span className="rounded-full bg-bg-surface px-3 py-1 text-xs font-bold text-text-main">
              {state.selectedMarkets.length > 0 ? state.selectedMarkets.length : state.availableMarkets.length}
            </span>
          </div>
          <span className={cn("flex h-7 w-7 items-center justify-center rounded-full bg-bg-surface text-text-primary transition-all duration-300", isStoresOpen ? "rotate-180 text-brand-orange" : "")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        isActive ? "bg-brand-orange/10 text-brand-orange" : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main"
                      )}
                    >
                      <span>{market}</span>
                      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-all duration-300", isActive ? "bg-brand-orange text-white" : "border border-glass/10 bg-bg-surface text-transparent")}>
                        {"\u2713"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </BaseFilterDrawer>
  );
}