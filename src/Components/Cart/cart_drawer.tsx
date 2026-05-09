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

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DealCardType | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => setIsMounted(true), []);

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
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] overflow-hidden bg-bg-surface/95 p-6 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.3)] dark:shadow-[-30px_0_60px_rgba(0,0,0,0.6)]" : "translate-x-full shadow-none"
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-[300px] w-[300px] rounded-full bg-brand-orange opacity-[0.12] blur-[80px]" />

        <div className="relative z-10 flex h-full flex-col">
          
          <div className="flex items-center justify-between border-b border-glass/10 pb-6">
            <h2 className="text-2xl font-black tracking-tight text-text-main">YOUR BASKET</h2>
            <button 
              onClick={() => setOpen(false)} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass/10 bg-glass/5 text-text-primary/60 transition-all hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:text-brand-orange"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {items.length === 0 ? (
              
            <div className="flex h-full flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
              <div className="relative mb-8 flex h-36 w-36 items-center justify-center rounded-full border border-glass/10 bg-bg-elevated shadow-inner">
                <Image 
                  src="/basket.svg" 
                  alt="Empty basket" 
                  width={64} 
                  height={64} 
                  className="opacity-20 grayscale transition-all duration-500 hover:scale-110 hover:opacity-40"
                  style={{ filter: "var(--logo-filter)" }}
                />
                <span className="absolute bottom-6 right-6 flex h-7 w-7 items-center justify-center rounded-full border-[2px] border-bg-surface bg-bg-darker text-[11px] font-black text-text-primary/50 shadow-sm">
                  0
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-text-main">The court is empty</h3>
              <p className="mb-10 text-sm leading-relaxed text-text-primary/60 max-w-[280px]">
                You haven't added any hits to your basket yet. Let's find some solid deals to score.
              </p>
              <button 
                onClick={() => setOpen(false)}
                className="group relative flex h-[48px] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-[24px] border border-transparent bg-bg-deepest/40 text-[13px] font-black tracking-[0.2em] text-text-primary shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.4)] hover:text-text-main focus:border-brand-orange focus:outline-none active:scale-95"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                  BROWSE HITS
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </span>
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />
                </div>
              </button>
            </div>
            ) : (
              items.map((item) => (
              <CartItemUI 
                key={item.id || item.title}
                item={item as any}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
                onRemove={() => removeItem(item.id)}
                onClick={() => setSelectedItem(item as DealCardType)} 
              />
            )))}
          </div>

          {items.length > 0 && (
            <div className="border-t border-glass/10 pt-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="mb-6 flex items-end justify-between px-2">
                <span className="text-sm font-bold uppercase tracking-widest text-text-primary/60">Total cost</span>
                <span className="text-3xl font-black leading-none text-brand-orange drop-shadow-[0_0_15px_rgb(var(--brand-orange)_/_0.2)]">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className={`group relative mb-3 flex h-[48px] w-full items-center justify-center overflow-hidden rounded-[24px] text-[13px] font-black tracking-[0.2em] transition-all duration-300 backdrop-blur-md ${
                  isOptimizing
                    ? "bg-bg-deepest/60 text-text-primary/50 cursor-not-allowed border border-glass/10"
                    : "bg-bg-deepest/40 border border-brand-orange/50 text-text-primary shadow-[2px_2px_1px_rgb(var(--brand-orange))] hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.4)] active:scale-95"
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
                    <span className="relative z-10 flex items-center gap-2">
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
            </div>
          )}
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