/**
 * @file page.tsx
 * @description Dynamic store page. Fetches and displays products available at a specific store using CSR.
 */

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked,
  type DealCard as DealCardType 
} from "@/Data/home_data"; 

import DealCardFactory from "@/Components/UI/deal_card";

const allProducts = [
  ...weekDiscounts,
  ...dailyDiscounts,
  ...expiringDiscounts,
  ...seasonalRecipes,
  ...peopleLiked
];

export default function StorePage() {
  const params = useParams();
  const rawStoreId = params.id as string;
  const storeId = rawStoreId ? decodeURIComponent(rawStoreId).toLowerCase() : "";

  const [isMounted, setIsMounted] = useState(false);
  const [storeProducts, setStoreProducts] = useState<DealCardType[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    if (storeId) {
      const filtered = allProducts.filter(product => 
        product.offers?.some(offer => 
          offer.store_name.toLowerCase() === storeId || 
          offer.store_id.toLowerCase() === `s_${storeId}` 
        )
      );
      
      const uniqueProducts = Array.from(new Map(filtered.map(item => [item.id, item])).values());
      
      setStoreProducts(uniqueProducts);
    }
  }, [storeId]);

  if (!isMounted) return null; 
  const storeNameDisplay = storeId ? storeId.toUpperCase() : "STORE";

  return (
    <div className="relative min-h-screen w-full pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
      
      <div className="pointer-events-none absolute left-10 top-20 z-0 h-[400px] w-[400px] rounded-full bg-brand-orange opacity-5 dark:opacity-10 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-3 mb-12 border-b border-text-main/10 dark:border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-bg-deepest border border-text-main/5 dark:border-white/5 shadow-sm"
          >
            <span className="text-2xl font-black text-brand-orange text-center leading-none">
              {storeNameDisplay.charAt(0)}
            </span>
          </motion.div>
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[40px] md:text-[48px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif leading-none"
            >
              {storeNameDisplay}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[14px] text-text-muted dark:text-text-primary/60 mt-2 font-medium"
            >
              Showing {storeProducts.length} available deals & items
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {storeProducts.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
              {storeProducts.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <DealCardFactory item={product} /> 
                </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center bg-white/50 dark:bg-black/20 rounded-[40px] border border-text-main/5 dark:border-white/5 backdrop-blur-md"
            >
              <div className="text-[64px] mb-6 opacity-30 grayscale filter">🏪</div>
              <h3 className="text-[28px] font-bold text-text-main dark:text-text-primary font-serif mb-3">No active deals found</h3>
              <p className="text-[15px] text-text-muted dark:text-text-primary/50 max-w-md">
                We couldn't find any current products or recipes available at {storeNameDisplay} right now.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}