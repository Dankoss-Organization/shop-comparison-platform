/**
 * @file CartHeaderWidget.tsx
 * @description An interactive widget displaying the current state of the user's shopping cart.
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/Store/use_cart_store";
import { cn } from "@/Lib/utils";

/**
 * @description Renders the cart button with total price, item count, and an add-to-cart animation effect.
 * Retrieves cart state from the store. Triggers a visually appealing "shooting ball"
 * animation over the cart icon whenever a new item is added.
 * @returns {JSX.Element} The animated shopping cart widget.
 */
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
        className="group/basket relative ml-8 flex h-[42px] min-w-[100px] shrink-0 cursor-pointer items-center justify-between rounded-full bg-[#4D444D] pl-[6px] pr-0 shadow-inner border border-transparent transition-all duration-300 hover:border-[#EC5800]/40 hover:bg-[#3A323A] hover:shadow-[0_0_15px_rgba(236,88,0,0.2)] active:scale-95 xl:ml-[50px]"
      >
        <div className="relative flex h-[30px] w-[45px] shrink-0 items-center justify-center transition-transform duration-500 ease-out group-hover/basket:scale-[1.15]">
          <span 
            className={cn(
              "absolute font-black text-[#EC5800] transition-all duration-300 text-sm tracking-tight",
              (!isEmpty && !isAnimating) ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
          >
            ${safeTotalPrice % 1 === 0 ? safeTotalPrice.toFixed(0) : safeTotalPrice.toFixed(2)}
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
        <div className="absolute right-[2px] top-[4px] z-20 flex h-[44px] w-[44px] shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/basket:-translate-y-[4px] group-hover/basket:scale-105">
          <Image
            src="/basket.svg"
            alt="basket"
            width={44}
            height={44}
            className={cn(
              "relative top-[6px] object-contain transition-transform duration-300 group-hover/basket:-rotate-2",
              isAnimating && "scale-110 drop-shadow-[0_0_10px_#EC5800]" 
            )}
          />
          
          {!isEmpty && !isAnimating && (
            <span className="absolute left-1/2 top-[40%] z-10 -translate-x-[50%] -translate-y-[20%] animate-in zoom-in text-[12px] font-black leading-none text-[#FDE3C8] transition-all duration-300 group-hover/basket:text-white group-hover/basket:drop-shadow-[0_0_6px_#EC5800]">
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