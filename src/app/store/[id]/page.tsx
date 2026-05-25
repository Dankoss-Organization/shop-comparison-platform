"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { DealCard as DealCardType } from "@/Data/home_data";
import CatalogGrid from "@/Components/Catalog/catalog_grid";
import CatalogPagination from "@/Components/Catalog/catalog_pagination";
import StoreFilterDrawer from "@/Components/Store/store_filter_drawer";
import StoreSortDropdown from "@/Components/Store/store_sort_dropdown";

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
  
  const [sortBy, setSortBy] = useState<"updated" | "price_asc" | "discount">("updated");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const priceBounds = { min: 0, max: 5000 };
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);

  const isAppending = useRef(false); 
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleLoadMore = () => {
    isAppending.current = true;
    setIsFetchingMore(true);
    setPage((prev) => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    isAppending.current = false;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    isAppending.current = false; 
    setPage(1);
  }, [sortBy, minDiscount, minRating, maxPrice]);

  const handleResetFilters = () => {
    setSortBy("updated");
    setMinDiscount(0);
    setMinRating(0);
    setMaxPrice(priceBounds.max);
    setPage(1);
  };

  useEffect(() => {
    setIsMounted(true);
    
    if (storeId) {
      const fetchStoreProducts = async () => {
        if (!isAppending.current) {
          setIsLoading(true);
        }
        setError(null);
        
        try {
          const response = await apiClient.getStoreProducts(storeId, {
            sort: sortBy,
            limit: 20, 
            page: page,
            minDiscount: minDiscount > 0 ? minDiscount : undefined,
            maxPrice: maxPrice < priceBounds.max ? maxPrice : undefined,
            minRating: minRating > 0 ? minRating : undefined,
          } as any);
          
          setStoreRealName(response.storeName);
          setTotalPages(response.totalPages); 
          
          const mappedCards: DealCardType[] = response.items.map((item) => 
            mapStoreProductToDealCard(item, response.storeId, response.storeName)
          );

          setStoreProducts((prev) => 
            isAppending.current ? [...prev, ...mappedCards] : mappedCards
          );
        } catch (err: any) {
          console.error("API Client Error:", err);
          setError(err.message || "Failed to load store catalog.");
        } finally {
          setIsLoading(false);
          setIsFetchingMore(false);
          isAppending.current = false; 
        }
      };

      fetchStoreProducts();
    }
  }, [storeId, sortBy, page, minDiscount, minRating, maxPrice]);

  if (!isMounted) return null;

  const storeNameDisplay = storeRealName || (storeId ? storeId.toUpperCase() : "STORE");
  const hasActiveFilters = minDiscount > 0 || minRating > 0 || maxPrice < priceBounds.max;

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
              {isLoading && !isFetchingMore ? "Loading store inventory..." : `Showing ${storeProducts.length} available deals & items`}
            </motion.p>
          </div>
        </div>
      </div>
      
      <StoreFilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        priceBounds={priceBounds}
        minRating={minRating}
        setMinRating={setMinRating}
        minDiscount={minDiscount}
        setMinDiscount={setMinDiscount}
        onReset={handleResetFilters}
      />

      <div className="relative z-30 flex items-center justify-between mb-6">
        <p className="text-[14px] text-text-muted dark:text-text-primary/60 font-medium">
          {isLoading && !isFetchingMore ? "Updating catalog..." : `Found ${storeProducts.length} deals`}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-bg-elevated/40 backdrop-blur-md border border-glass/10 px-4 py-2 rounded-xl shadow-sm text-[14px] font-semibold text-text-main dark:text-text-primary transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            )}
          </button>

          <StoreSortDropdown 
            value={sortBy} 
            onChange={(newSort) => setSortBy(newSort)} 
          />
        </div>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isLoading && !isFetchingMore ? (
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
              
              {isFetchingMore && (
                <div className="mt-8 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="pb-12 mt-6">
                  <CatalogPagination 
                    currentPage={page}
                    totalPages={totalPages}
                    hasMore={page < totalPages} 
                    onPageChange={handlePageChange}
                    onLoadMore={handleLoadMore}
                  />
                </div>
              )}
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