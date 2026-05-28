/**
 * @file catalog_grid.tsx
 * @description Renders a responsive grid of DealCard components, handling empty states and entry animations.
 */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DealCardFactory from "@/Components/UI/deal_card";
import type { DealCard } from "@/Data/home_data";

export interface CatalogGridProps {
  items: (DealCard & { _cat?: string; _uniqueId?: string; market?: string; discount?: number | string })[];
}

/**
 * @description Grid layout for catalog items.
 * @param {CatalogGridProps} props - The items to render.
 * @returns {JSX.Element} The populated grid or an empty state placeholder.
 */
export default function CatalogGrid({ items }: CatalogGridProps) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-glass/10 bg-bg-elevated shadow-inner text-center">
        <svg
          className="mb-4 text-text-primary/40"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <h3 className="text-lg font-bold text-text-main">No items found</h3>
        <p className="mt-2 text-sm text-text-primary/60">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:gap-9">
      {items.map((item, idx) => (
        <motion.div
          key={item._uniqueId ?? `${item.title}-${idx}`}
          layout
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full w-full min-w-0 justify-center min-h-[400px]"
        >
          <DealCardFactory
            item={item}
            context="grid"
            className="flex h-full w-full flex-col items-stretch justify-between shadow-xl"
            onClick={() => router.push(`/product/${encodeURIComponent(item.id)}`)}
          />
        </motion.div>
      ))}
    </div>
  );
}