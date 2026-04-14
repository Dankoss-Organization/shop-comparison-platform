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
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] bg-[#2D282D] p-6 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-2xl font-black text-[#FFDEBA]">YOUR BASKET</h2>
            <button onClick={() => setOpen(false)} className="text-[#FFDEBA66] hover:text-[#EC5800]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center opacity-30">
                <p className="font-bold text-[#FFDEBA]">The basket is empty</p>
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
            <div className="border-t border-white/5 pt-6">
              <div className="mb-6 flex items-end justify-between">
                <span className="text-sm font-bold text-[#FFDEBA66] uppercase tracking-widest">Total cost</span>
                <span className="text-3xl font-black text-[#EC5800] leading-none">${getTotalPrice().toFixed(2)}</span>
              </div>
              <CheckoutButton />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}