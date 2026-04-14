"use client";

import { useCartStore } from "@/store/use_cart_store";
import { CartItemUI } from "./CartItemUI";
import { CheckoutButton } from "./CheckoutButton";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();

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
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] overflow-hidden bg-[#2d282d]/60 p-6 shadow-[-30px_0_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
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
                <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-white/5 bg-black/20 shadow-inner">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#FFDEBA]/20" strokeWidth="1.5">
                    <path d="M4 8h16M5 8l2 12h10l2-12M9 8v12M15 8v12M5 12h14M6 16h12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-black tracking-tight text-[#FFDEBA]">The court is empty</h3>
                <p className="mb-8 text-sm leading-relaxed text-[#FFDEBA66]">
                  You haven't added any hits to your basket yet. Let's find some solid deals to score.
                </p>
                <button 
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#EC5800]/10 px-8 py-3.5 text-xs font-black tracking-widest text-[#EC5800] transition-all hover:bg-[#EC5800] hover:text-white hover:shadow-[0_0_20px_rgba(236,88,0,0.4)] active:scale-95"
                >
                  BROWSE HITS
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
                />
              ))
            )}
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
    </>
  );
}