/**
 * @file CartHeaderWidget.tsx
 * @description An interactive widget displaying the current state of the user's shopping cart.
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/Store/use_cart_store";
import { cn } from "@/Lib/utils";

export function CartHeaderWidget() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const setOpen = useCartStore((state) => state.setOpen);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevItems, setPrevItems] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setPrevItems(totalItems);
  }, []);

  useEffect(() => {
    if (isMounted && totalItems > prevItems) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600); 
      return () => clearTimeout(timer);
    }
    if (isMounted) setPrevItems(totalItems);
  }, [totalItems, prevItems, isMounted]);

  const safeTotalItems = isMounted ? totalItems : 0;
  const safeTotalPrice = isMounted ? totalPrice : 0;
  const isEmpty = safeTotalItems === 0;

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="group/basket relative ml-1 lg:ml-8 flex h-[42px] w-auto shrink-0 cursor-pointer items-center rounded-full bg-bg-highest pl-[6px] pr-[4px] shadow-inner border border-transparent transition-all duration-300 hover:border-brand-orange/40 hover:bg-bg-elevated hover:shadow-[0_0_15px_rgb(var(--brand-orange)_/_0.2)] active:scale-95 xl:ml-[50px]"
      >
        <div className="relative flex h-[30px] shrink-0 pl-3 pr-[52px] items-center justify-center whitespace-nowrap transition-transform duration-500 ease-out group-hover/basket:scale-[1.15]">
          <span 
            className={cn(
              "font-black text-brand-orange transition-all duration-300 text-sm tracking-tight",
              (!isEmpty && !isAnimating) ? "relative scale-100 opacity-100" : "absolute scale-50 opacity-0"
            )}
          >
            ₴{safeTotalPrice % 1 === 0 ? safeTotalPrice.toFixed(0) : safeTotalPrice.toFixed(2)}
          </span>
          <div 
            className={cn(
              "absolute transition-all duration-300", 
              (isEmpty || isAnimating) ? "opacity-100" : "opacity-0",
              isAnimating && "animate-shoot"
            )}
          >
            <Image src="/orange_logo.svg" alt="logo" width={28} height={28} className="object-contain" />
          </div>
        </div>
        
        <div className="absolute right-0 top-[0px] z-20 flex h-[50px] w-[50px] shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/basket:-translate-y-[4px] group-hover/basket:scale-105">
          
          <div
            className={cn(
              "relative top-[2px] w-[50px] h-[50px] transition-all duration-300 group-hover/basket:bg-brand-orange group-hover/basket:opacity-100 group-hover/basket:-rotate-2",
              "bg-text-main opacity-20 dark:bg-text-primary dark:opacity-90",
              isAnimating && "scale-110 bg-brand-orange opacity-100 drop-shadow-[0_0_10px_rgb(var(--brand-orange))]" 
            )}
            style={{ 
              WebkitMaskImage: 'url(/basket.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center',
              maskImage: 'url(/basket.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center'
            }}
          />
          
          {!isEmpty && !isAnimating && (
            <span 
              className={cn(
                "absolute left-1/2 top-[44%] z-10 -translate-x-1/2 -translate-y-1/2 animate-in zoom-in text-[15px] font-black leading-none transition-all duration-300",
                "text-text-main opacity-50 group-hover/basket:text-white group-hover/basket:opacity-100",
                "dark:text-text-primary dark:opacity-100 dark:group-hover/basket:text-bg-deepest"
              )}
            >
              {safeTotalItems}
            </span>
          )}
        </div>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shoot-ball {
          0% { 
            transform: scale(1) translate(0px, 0px) rotate(0deg); 
            opacity: 1; 
            animation-timing-function: ease-out; 
          }
          35% { 
            transform: scale(1.15) translate(18px, -24px) rotate(120deg); 
            opacity: 1; 
            animation-timing-function: ease-in; 
          }
          70% { 
            transform: scale(0.6) translate(38px, 0px) rotate(260deg); 
            opacity: 0.9; 
          }
          85% { 
            transform: scale(0.3) translate(43px, 10px) rotate(320deg); 
            opacity: 0.4; 
          }
          100% { 
            transform: scale(0.1) translate(45px, 15px) rotate(360deg); 
            opacity: 0; 
          }
        }
        .animate-shoot {
          animation: shoot-ball 0.8s linear forwards;
          z-index: 50;
        }
      `}} />
    </>
  );
}