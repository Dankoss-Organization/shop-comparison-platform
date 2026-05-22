/**
 * @file page.tsx
 * @description Dynamic store page. Fetches and displays products available at a specific store using CSR.
 */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StoreOffer } from "@/Data/home_data";

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
  const router = useRouter();
  const rawStoreId = params.id as string;
  const storeId = rawStoreId ? decodeURIComponent(rawStoreId).toLowerCase() : "";

  const [isMounted, setIsMounted] = useState(false);
  const [storeProducts, setStoreProducts] = useState<DealCardType[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    if (storeId) {
      const filtered = allProducts.filter(product => 
          product.offers?.some((offer: StoreOffer) =>
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
    <div className="relative min-h-screen w-full pt-24 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto z-10 antialiased">
      
      <div className="pointer-events-none absolute left-10 top-20 z-0 h-[400px] w-[400px] rounded-full bg-brand-orange opacity-5 dark:opacity-10 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-6 mb-8 border-b border-text-main/10 dark:border-white/10 pb-8">
        
        <div className="flex items-start">
          <motion.button 
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4, scale: 1.02 }} 
            whileTap={{ scale: 0.95 }}         
            className="group flex items-center gap-2 rounded-full border border-glass/10 bg-bg-elevated/40 backdrop-blur-md px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-brand-orange transition-colors duration-300 hover:border-brand-orange/40 hover:bg-brand-orange/10 hover:shadow-[0_4px_15px_rgb(var(--brand-orange)/0.25)]"
          >
            <svg 
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1" 
            >
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            BACK
          </motion.button>
        </div>
        <div className="flex items-center gap-5"> 
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
              transition={{ delay: 0.05 }}
              className="text-[40px] md:text-[48px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif leading-none"
            >
              {storeNameDisplay}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
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
                <DealCardFactory item={product} preferredStore={storeId} /> 
              </motion.div>
            ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center bg-white/50 dark:bg-black/20 rounded-[40px] border border-text-main/5 dark:border-white/5 backdrop-blur-md shadow-inner"
            >
              <div className="text-[64px] mb-6 opacity-30 grayscale filter">🏪</div>
              <h3 className="text-[28px] font-bold text-text-main dark:text-text-primary font-serif mb-3 leading-tight">No active deals found</h3>
              <p className="text-[15px] text-text-muted dark:text-text-primary/50 max-w-md">
                We couldn't find any current products or recipes available at {storeNameDisplay} right now. Check back later for new savings!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}