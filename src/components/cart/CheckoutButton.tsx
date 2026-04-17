/**
 * @file CheckoutButton.tsx
 * @description A checkout button component managing asynchronous payment transitions.
 * @pattern State (Finite State Machine): The component alters its behavior and UI 
 * based on its internal state (IDLE, LOADING, SUCCESS). This encapsulates state-specific 
 * logic and strictly prevents invalid actions like double-submissions during the LOADING phase.
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

/**
 * @description Represents the potential processing states of the checkout action.
 */
export type CheckoutStatus = "IDLE" | "LOADING" | "SUCCESS";

/**
 * @description CheckoutButton Component.
 * Acts as the context for the State pattern, changing its UI based on `CheckoutStatus`.
 * Manages the pseudo-asynchronous delay and handles clearing the cart upon success.
 * * **Internal Behavior (`handleCheckout`):**
 * Handles the state transitions for the checkout process.
 * Simulates an async network request: `IDLE` -> `LOADING` -> `SUCCESS` -> `IDLE`.
 * Resolves when the fake checkout delay is complete.
 * @returns {JSX.Element} The stateful checkout action button.
 */
export function CheckoutButton() {
  const [status, setStatus] = useState<CheckoutStatus>("IDLE");
  const clearCart = useCartStore(state => state.clearCart);
  const setOpen = useCartStore(state => state.setOpen);

  const handleCheckout = async () => {
    if (status !== "IDLE") return;

    setStatus("LOADING");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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