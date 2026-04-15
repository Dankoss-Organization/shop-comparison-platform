/**
 * @file CartDrawer.tsx
 * @description The main interactive shopping cart drawer UI.
 * Acts as an Observer to the `useCartStore`, automatically re-rendering when the global 
 * cart state changes. Orchestrates interactions between individual cart items and the checkout FSM.
 */
"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/use_cart_store";
import Image from "next/image";
import { CartItemUI } from "./CartItemUI";
import { CheckoutButton } from "./CheckoutButton";
import { ProductModal } from "../ui/ProductModal";
import { type DealCard as DealCardType } from "@/Data/home_data";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DealCardType | null>(null);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <aside 
        className={cn(
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] overflow-hidden bg-[#2d282d]/60 p-6 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.6)]" : "translate-x-full shadow-none"
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-[300px] w-[300px] rounded-full bg-[#EC5800] opacity-[0.12] blur-[80px]" />

        <div className="relative z-10 flex h-full flex-col">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-2xl font-black tracking-tight text-[#FFDEBA]">YOUR BASKET</h2>
            <button 
              onClick={() => setOpen(false)} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#FFDEBA66] transition-all hover:border-[#EC5800]/50 hover:bg-[#EC5800]/10 hover:text-[#EC5800]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {items.length === 0 ? (
              
            <div className="flex h-full flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
              
              <div className="relative mb-8 flex h-36 w-36 items-center justify-center rounded-full border border-white/5 bg-[#1f1a1f] shadow-inner">
                <Image 
                  src="/basket.svg" 
                  alt="Empty basket" 
                  width={64} 
                  height={64} 
                  className="opacity-20 grayscale filter transition-all duration-500 hover:scale-110 hover:opacity-40"
                />
                <span className="absolute bottom-6 right-6 flex h-7 w-7 items-center justify-center rounded-full border-[2px] border-[#1a171a] bg-[#2d282d] text-[11px] font-black text-white/40 shadow-sm">
                  0
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-black tracking-tight text-[#FFDEBA]">The court is empty</h3>
              <p className="mb-10 text-sm leading-relaxed text-[#FFDEBA66] max-w-[280px]">
                You haven't added any hits to your basket yet. Let's find some solid deals to score.
              </p>

              <button 
                onClick={() => setOpen(false)}
                className="group relative flex h-[48px] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-[24px] border border-transparent text-[13px] font-black tracking-[0.2em] text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95"
                style={{
                  background: "rgba(45, 40, 45, 0.4)",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                  BROWSE HITS
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </span>
                
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.25)] to-transparent" />
                </div>
              </button>
            </div>

            ) : (
              
              items.map((item) => (
              <CartItemUI 
                key={item.title} 
                item={item}
                onIncrease={() => updateQuantity(item.title, 1)}
                onDecrease={() => updateQuantity(item.title, -1)}
                onRemove={() => removeItem(item.title)}
                onClick={() => setSelectedItem(item as DealCardType)} 
              />
            )))}
          </div>

          {items.length > 0 && (
            <div className="border-t border-white/5 pt-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="mb-6 flex items-end justify-between px-2">
                <span className="text-sm font-bold uppercase tracking-widest text-[#FFDEBA66]">Total cost</span>
                <span className="text-3xl font-black leading-none text-[#EC5800] drop-shadow-[0_0_15px_rgba(236,88,0,0.2)]">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
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