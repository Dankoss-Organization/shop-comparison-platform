"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn, formatCurrency } from "@/Lib/utils";
import { ReactNode } from "react";

interface BaseFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  title?: string;
  children: ReactNode;
}

export function BaseFilterDrawer({ isOpen, onClose, onReset, title = "Refine catalog", children }: BaseFilterDrawerProps) {
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
                <h3 className="mt-2 text-xl font-black text-text-main">{title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onReset();
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
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-[1.3rem] border border-glass/5 bg-bg-deep shadow-sm dark:shadow-xl">
                {children}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function FilterPriceCap({ maxPrice, setMaxPrice, priceBounds }: { maxPrice: number, setMaxPrice: (val: number) => void, priceBounds: { min: number, max: number } }) {
  return (
    <div className="border-b border-glass/10 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">Price cap</p>
          <p className="mt-2 text-sm font-semibold text-text-main">Up to {formatCurrency(maxPrice)}</p>
        </div>
        <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs font-bold text-brand-orange">
          {formatCurrency(priceBounds.min)} - {formatCurrency(priceBounds.max)}
        </span>
      </div>
      <input
        type="range"
        min={priceBounds.min}
        max={priceBounds.max}
        step={10}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-brand-orange"
      />
    </div>
  );
}

const ratingOptions = [0, 4, 4.5, 4.8];
export function FilterRating({ minRating, setMinRating }: { minRating: number, setMinRating: (val: number) => void }) {
  return (
    <div className="border-b border-glass/10 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">Minimum rating</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {ratingOptions.map((rating) => (
          <button
            key={`rating-${rating}`}
            type="button"
            onClick={() => setMinRating(rating)}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
              minRating === rating
                ? "bg-brand-orange text-white shadow-[0_4px_12px_rgb(var(--brand-orange)_/_0.3)]"
                : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main"
            )}
          >
            {rating === 0 ? "Any" : `${rating}+`}
          </button>
        ))}
      </div>
    </div>
  );
}

const discountOptions = [0, 10, 20, 30];
export function FilterDiscount({ minDiscount, setMinDiscount, hasBorder = false }: { minDiscount: number, setMinDiscount: (val: number) => void, hasBorder?: boolean }) {
  return (
    <div className={cn("px-4 py-4", hasBorder && "border-b border-glass/10")}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/60">Discount</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {discountOptions.map((discount) => (
          <button
            key={`discount-${discount}`}
            type="button"
            onClick={() => setMinDiscount(discount)}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
              minDiscount === discount
                ? "bg-brand-orange text-white shadow-[0_4px_12px_rgb(var(--brand-orange)_/_0.3)]"
                : "bg-bg-elevated text-text-primary hover:bg-bg-highest hover:text-text-main"
            )}
          >
            {discount === 0 ? "Any" : `${discount}%+`}
          </button>
        ))}
      </div>
    </div>
  );
}