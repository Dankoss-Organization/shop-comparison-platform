/**
 * @file CheckoutButton.tsx
 * @description A checkout button component managing asynchronous payment transitions.
 * @pattern State (Finite State Machine): The component alters its behavior and UI 
 * based on its internal state (IDLE, LOADING, SUCCESS). This encapsulates state-specific 
 * logic and strictly prevents invalid actions like double-submissions during the LOADING phase.
 */

"use client";

import { useState } from "react";
import { cn } from "@/Lib/utils";
import { useCartStore } from "@/Store/use_cart_store";
import { useUserStore } from "@/Store/user_store"; 
export type CheckoutStatus = "IDLE" | "LOADING" | "SUCCESS";

const COLORS = ["#EC5800", "#4ADE80", "#3B82F6", "#A855F7", "#D946EF", "#EAB308"];

export function CheckoutButton() {
  const [status, setStatus] = useState<CheckoutStatus>("IDLE");
  
  const clearCart = useCartStore(state => state.clearCart);
  const setOpen = useCartStore(state => state.setOpen);
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);

  const addBasket = useUserStore(state => state.addBasket);

  const handleCheckout = async () => {
    if (status !== "IDLE") return;

    setStatus("LOADING");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    const historicalItems = items.map((item: any) => {
      const activeOffer = item.selectedStoreId 
        ? item.offers?.find((o: any) => o.store_id === item.selectedStoreId) 
        : item.offers?.sort((a: any, b: any) => a.pricing.current_price - b.pricing.current_price)[0];
        
      const numericPrice = activeOffer ? activeOffer.pricing.current_price : 0;
      
      return {
        ...item,
        name: item.title,
        price: numericPrice,
        emoji: "🛍️",       
      };
    });

    addBasket({
      id: Date.now(),
      name: `Order #${orderNumber}`,
      date: formattedDate,
      price: getTotalPrice(),
      items: historicalItems,
      stores: ["DANKOSS Checkout"],
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });

    setStatus("SUCCESS");
    
    setTimeout(() => {
      clearCart(); 
      setOpen(false); 
      setStatus("IDLE"); 
    }, 2500);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={status !== "IDLE"}
      className={cn(
        "group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl font-black transition-all duration-500",
        status === "IDLE" && "bg-[#EC5800] text-white hover:shadow-[0_0_20px_#ec580066]",
        status === "LOADING" && "bg-[#EC5800]/50 text-white/50 cursor-wait",
        status === "SUCCESS" && "bg-green-600 text-white"
      )}
    >
      <div className="flex items-center gap-3">
        {status === "IDLE" && (
          <>
            <span>PLACE ORDER</span>
            <svg className="transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </>
        )}
        {status === "LOADING" && (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>PROCESSING...</span>
          </>
        )}
        {status === "SUCCESS" && (
          <>
            <svg className="animate-bounce" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>ORDER PLACED!</span>
          </>
        )}
      </div>
    </button>
  );
}