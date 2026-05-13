/**
 * @file CartDrawer.tsx
 * @description The main interactive shopping cart drawer UI.
 * Acts as an Observer to the `useCartStore`, automatically re-rendering when the global 
 * cart state changes. Orchestrates interactions between individual cart items and the checkout FSM.
 */

"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/Store/use_cart_store";
import Image from "next/image";
import { CartItemUI } from "./cart_item_ui";
import { CheckoutButton } from "./checkout_button";
import { ProductModal } from "../UI/product_modal";
import { type DealCard as DealCardType } from "@/Data/home_data";
import { cn } from "@/Lib/utils";
import { generateCombinations, splitIntoChunks } from "@/Lib/Workers/optimizer.utils";
import type { CartProduct } from "@/Types/optimization";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DealCardType | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClearAll = () => {
    setIsClearing(true); 
    setTimeout(() => {
      clearCart(); 
      const totalAnimationTime = (items.length * 80) + 350;
      setTimeout(() => {
        setIsClearing(false);
      }, totalAnimationTime);
    }, 10);
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    const cartProducts: CartProduct[] = items.map((item: any) => {
      const activeOffer = item.selectedStoreId 
        ? item.offers?.find((o: any) => o.store_id === item.selectedStoreId) 
        : item.offers ? [...item.offers].sort((a: any, b: any) => a.pricing.current_price - b.pricing.current_price)[0] : null;
      const basePrice = activeOffer ? activeOffer.pricing.current_price : 0;
      return {
        product_id: item.title, id: item.id, canonical_name: item.title, brand: "Generic", category: "General", country: "UA",
        media: { raw_main_image: item.image, raw_gallery: [], main_image: item.image, gallery: [] },
        measurements: { value: 1, unit: "pc" }, pricing_logic: { sales_unit: "piece", unit_step: 1 }, specific_attributes: {},
        quantity: item.cartQuantity, cartQuantity: item.cartQuantity,
        offers: [
          { store_id: "store_A", store_name: "Сільпо", url: "", is_in_stock: true, sku: "", scraped_at: "", store_rating: { rating: 5, reviews_count: 10 }, pricing: { regular_price: basePrice, current_price: basePrice * 0.9, discount_percent: 10, is_online_only: false, promo_end_date: null, bulk_discounts: [] }, price_history: [] },
          { store_id: "store_B", store_name: "Фора", url: "", is_in_stock: true, sku: "", scraped_at: "", store_rating: { rating: 4, reviews_count: 5 }, pricing: { regular_price: basePrice, current_price: basePrice * 0.95, discount_percent: 5, is_online_only: false, promo_end_date: null, bulk_discounts: [] }, price_history: [] }
        ]
      };
    });

    const combinations = generateCombinations(cartProducts);
    const chunks = splitIntoChunks(combinations, 10000);

    if (chunks.length === 0) {
      alert("No valid combinations found.");
      setIsOptimizing(false);
      return;
    }

    const worker = new Worker(new URL("../../Lib/Workers/optimizer.worker.ts", import.meta.url));

    worker.onmessage = (event) => {
      const { status, totalCost, itemsCost, deliveryCost } = event.data;
      if (status === "success") {
        alert(`Optimization complete\n\nBest Items Price: $${itemsCost.toFixed(2)}\nDelivery Cost: $${deliveryCost.toFixed(2)}\n\nTotal Lowest Cost: $${totalCost.toFixed(2)}`);
      } else {
        alert(event.data.message || "Optimization failed.");
      }
      setIsOptimizing(false);
      worker.terminate(); 
    };

    worker.postMessage({ type: "START_OPTIMIZATION", payload: { cartItems: cartProducts, combinationsChunk: chunks[0] } });
  };

  if (!isMounted) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <aside 
        className={cn(
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] overflow-hidden bg-bg-surface/95 dark:bg-bg-deep/30 p-6 backdrop-blur-3xl border-l border-text-main/5 dark:border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.15)] dark:shadow-[-30px_0_60px_rgba(0,0,0,0.6)]" : "translate-x-full shadow-none"
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-[400px] w-[400px] rounded-full bg-brand-orange opacity-[0.08] dark:opacity-30 blur-[100px]" />

        <div className="relative z-10 flex h-full flex-col">
          
          <div className="flex items-center justify-between border-b border-text-main/10 dark:border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-text-primary font-serif">YOUR BASKET</h2>
              
              <AnimatePresence>
                {items.length > 0 && !isClearing && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    onClick={handleClearAll}
                    className="group relative flex items-center gap-1.5 overflow-hidden rounded-[16px] border border-semantic-danger/20 bg-semantic-danger/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-semantic-danger shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-semantic-danger/40 hover:bg-semantic-danger/20 hover:shadow-[0_4px_15px_rgb(var(--semantic-danger)/0.25)] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      CLEAR
                    </span>
                    <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                      <div className="h-full w-[20px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-semantic-danger/30 to-transparent" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setOpen(false)} 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-text-main/10 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm dark:shadow-none text-text-muted dark:text-text-primary/60 transition-all hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:text-brand-orange"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
            <AnimatePresence mode="wait">
              {items.length === 0 && !isClearing ? (
                <motion.div 
                  key="empty-basket"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col items-center justify-center px-6 text-center"
                >
                  <div className="relative mb-8 flex h-[144px] w-[144px] cursor-default items-center justify-center rounded-full border border-text-main/5 dark:border-white/5 bg-white/50 dark:bg-black/30 shadow-inner">
                    <Image 
                      src="/basket.svg" 
                      alt="Empty basket" 
                      width={64} 
                      height={64} 
                      className="opacity-40 transition-transform duration-500 hover:scale-105"
                      style={{ filter: "var(--logo-filter)" }}
                    />
                    <span className="pointer-events-none select-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] border-bg-surface dark:border-bg-deep/80 bg-white dark:bg-black/60 text-[12px] font-black text-text-main/60 dark:text-text-primary/70 shadow-sm backdrop-blur-md">
                      0
                    </span>
                  </div>
                  <h3 className="mb-3 text-[22px] font-bold tracking-tight text-text-main dark:text-text-primary font-serif">The court is empty</h3>
                  <p className="mb-10 text-[13px] leading-relaxed text-text-muted dark:text-text-primary/60 max-w-[280px]">
                    You haven't added any hits to your basket yet. Let's find some solid deals to score.
                  </p>
                  
                  <button 
                    onClick={() => setOpen(false)}
                    className="group relative flex h-[48px] w-full max-w-[240px] items-center justify-center overflow-hidden rounded-[24px] border border-text-main/10 dark:border-transparent bg-white dark:bg-bg-deepest/60 text-[12px] font-black tracking-[0.15em] text-text-main dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-md dark:hover:shadow-[0_0_20px_rgb(var(--brand-orange)/0.4)] hover:text-brand-orange active:scale-95"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                      BROWSE HITS
                      <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </span>
                    <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                      <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-brand-orange/10 to-transparent" />
                    </div>
                  </button>
                </motion.div>
              ) : (
                <motion.div key="items-list" className="flex w-full flex-col">
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id || item.title}
                        layout
                        initial={{ opacity: 0, height: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, height: "auto", scale: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          scale: 0.9,
                          x: isClearing ? -150 : -20,
                          transition: { 
                            duration: 0.35, 
                            delay: isClearing ? index * 0.08 : 0, 
                            ease: "backIn" 
                          }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden border-b border-text-main/5 dark:border-white/5 last:border-0"
                      >
                        <CartItemUI 
                          item={item as any}
                          onIncrease={() => updateQuantity(item.id, 1)}
                          onDecrease={() => updateQuantity(item.id, -1)}
                          onRemove={() => removeItem(item.id)}
                          onClick={() => setSelectedItem(item as DealCardType)} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {items.length > 0 && !isClearing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-text-main/10 dark:border-white/10 pt-6"
              >
                <div className="mb-6 flex items-end justify-between px-2">
                  <span className="text-sm font-bold uppercase tracking-widest text-text-muted dark:text-text-primary/60">Total cost</span>
                  <span className="text-3xl font-black leading-none text-brand-orange drop-shadow-[0_0_15px_rgb(var(--brand-orange)/0.2)]">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className={`group relative mb-3 flex h-[48px] w-full items-center justify-center overflow-hidden rounded-[24px] text-[13px] font-black tracking-[0.2em] transition-all duration-300 backdrop-blur-md ${
                    isOptimizing
                      ? "bg-white dark:bg-bg-deepest/60 text-text-muted dark:text-text-primary/50 cursor-not-allowed border border-text-main/10 dark:border-white/10"
                      : "bg-white dark:bg-bg-deepest/40 border border-brand-orange/40 dark:border-brand-orange/50 text-brand-orange dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))] hover:-translate-y-[2px] hover:shadow-md dark:hover:shadow-[0_0_20px_rgb(var(--brand-orange)/0.4)] hover:border-brand-orange active:scale-95"
                  }`}
                >
                  {isOptimizing ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>OPTIMIZING...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        SMART OPTIMIZE
                      </span>
                      <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                        <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />
                      </div>
                    </>
                  )}
                </button>

                <CheckoutButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
      
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)}>
          <ProductModal.Window>
            <ProductModal.LeftColumn>
              <ProductModal.ImageGallery />
              <ProductModal.Reviews />
            </ProductModal.LeftColumn>
            <ProductModal.RightColumn>
              <ProductModal.Header categoryTitle="Groceries" />
              <ProductModal.Actions categoryTitle="Groceries" />
              <ProductModal.Details categoryTitle="Groceries" />
            </ProductModal.RightColumn>
          </ProductModal.Window>
        </ProductModal>
      )}
    </>
  );
}