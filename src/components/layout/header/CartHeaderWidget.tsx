"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/use_cart_store";
import { cn } from "@/lib/utils"; // Перевір, щоб шлях до utils був правильним

export function CartHeaderWidget() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const setOpen = useCartStore((state) => state.setOpen);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevItems, setPrevItems] = useState(totalItems);

  useEffect(() => {
    if (totalItems > prevItems) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevItems(totalItems);
  }, [totalItems, prevItems]);

  const isEmpty = totalItems === 0;

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="group relative flex items-center gap-3 rounded-full border border-white/5 bg-[#1f1a1f]/80 py-1.5 pl-4 pr-1.5 backdrop-blur-md transition-all hover:border-[#EC5800]/50"
      >
        <div className="relative flex h-6 min-w-[50px] items-center justify-end">
          <span 
            className={cn(
              "absolute right-0 font-black text-[#EC5800] transition-all duration-300",
              (!isEmpty && !isAnimating) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            ${totalPrice.toFixed(2)}
          </span>

          {(isEmpty || isAnimating) && (
            <div className={cn("absolute right-0 text-[#EC5800]", isAnimating ? "animate-shoot" : "")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M5.636 5.636a9 9 0 0 1 12.728 12.728" />
                <path d="M18.364 5.636a9 9 0 0 0-12.728 12.728" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </div>
          )}
        </div>

        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
          <svg className={cn("w-5 h-5 text-[#FFDEBA] transition-transform", isAnimating ? "scale-110" : "scale-100")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h16M5 8l2 12h10l2-12M9 8v12M15 8v12M5 12h14M6 16h12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {!isEmpty && !isAnimating && (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] animate-in zoom-in items-center justify-center rounded-full border-[2px] border-[#1f1a1f] bg-[#EC5800] px-1 text-[10px] font-black leading-none text-white duration-300">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shoot-ball {
          0% { transform: scale(1) translate(0px, 0px) rotate(0deg); opacity: 1; }
          40% { transform: scale(1.3) translate(15px, -15px) rotate(90deg); opacity: 1; }
          80% { transform: scale(0.5) translate(40px, 5px) rotate(270deg); opacity: 0.8; }
          100% { transform: scale(0.2) translate(40px, 15px) rotate(360deg); opacity: 0; }
        }
        .animate-shoot {
          animation: shoot-ball 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          z-index: 50;
        }
      `}} />
    </>
  );
}