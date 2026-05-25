"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { DealCard as DealCardType } from "@/Data/home_data";
import DealCardFactory from "@/Components/UI/deal_card";
import CatalogGrid from "@/Components/Catalog/catalog_grid";

import { ProductsApiClient } from "@/Lib/api/products_api.client";
import { mapStoreProductToDealCard } from "@/Lib/api/products_api.adapters";

const apiClient = new ProductsApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
});

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const rawStoreId = params.id as string;
  const storeId = rawStoreId ? decodeURIComponent(rawStoreId).toLowerCase() : "";

  const [isMounted, setIsMounted] = useState(false);
  const [storeProducts, setStoreProducts] = useState<DealCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storeRealName, setStoreRealName] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (storeId) {
      const fetchStoreProducts = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await apiClient.getStoreProducts(storeId);
          
          setStoreRealName(response.storeName);
          
          const mappedCards: DealCardType[] = response.items.map((item) => 
            mapStoreProductToDealCard(item, response.storeId, response.storeName)
          );

          setStoreProducts(mappedCards);
        } catch (err: any) {
          console.error("API Client Error:", err);
          setError(err.message || "Failed to load store catalog.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchStoreProducts();
    }
  }, [storeId]);

  if (!isMounted) return null;

  const storeNameDisplay = storeRealName || (storeId ? storeId.toUpperCase() : "STORE");

  return (
    <div className="relative min-h-screen w-full pt-24 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto z-10 antialiased">
      <div className="pointer-events-none absolute left-10 top-20 z-0 h-[400px] w-[400px] rounded-full bg-brand-orange opacity-5 dark:opacity-10 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-6 mb-8 border-b border-text-main/10 dark:border-white/10 pb-8">
        <div className="flex items-start">
          <motion.button onClick={() => router.back()} className="group flex items-center gap-2 rounded-full border border-glass/10 bg-bg-elevated/40 backdrop-blur-md px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-brand-orange transition-colors duration-300 hover:bg-brand-orange/10 hover:border-brand-orange/40 hover:shadow-[0_4px_15px_rgb(var(--brand-orange)/0.25)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1"><polyline points="15 18 9 12 15 6"/></svg>
            BACK
          </motion.button>
        </div>
        
        <div className="flex items-center gap-5"> 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-bg-deepest border border-text-main/5 dark:border-white/5 shadow-sm">
            <span className="text-2xl font-black text-brand-orange text-center leading-none">{storeNameDisplay.charAt(0)}</span>
          </motion.div>
          <div className="flex flex-col">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-[40px] md:text-[48px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif leading-none">{storeNameDisplay}</motion.h1>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-[14px] text-text-muted dark:text-text-primary/60 mt-2 font-medium">
              {isLoading ? "Loading store inventory..." : `Showing ${storeProducts.length} available deals & items`}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center bg-red-500/5 rounded-[40px] border border-red-500/10 p-6">
              <div className="text-[48px] mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-500 mb-2">Connection Error</h3>
              <p className="text-sm text-text-muted max-w-md">{error}</p>
            </motion.div>
          ) : storeProducts.length > 0 ? (
            <motion.div 
              key="grid" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="w-full"
            >
              <CatalogGrid items={storeProducts} /> 
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center bg-white/50 dark:bg-black/20 rounded-[40px] border border-text-main/5 dark:border-white/5 backdrop-blur-md shadow-inner">
              <div className="text-[64px] mb-6 opacity-30 grayscale filter">🏪</div>
              <h3 className="text-[28px] font-bold text-text-main dark:text-text-primary font-serif mb-3 leading-tight">No active deals found</h3>
              <p className="text-[15px] text-text-muted dark:text-text-primary/50 max-w-md">We couldn't find any live products mapped to {storeNameDisplay}.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}