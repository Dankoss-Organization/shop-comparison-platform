/**
 * @file basket_details_modal.tsx
 * @description A modal component that displays the detailed contents of a historical or saved basket,
 * allowing users to review individual items, inspect products, or reorder the entire basket.
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/Lib/utils";
import { Basket } from "@/Store/user_store";
/**
 * Properties for the BasketDetailsModal component.
 *
 * @interface BasketDetailsModalProps
 * @property {Basket} basket - The basket data object containing its name, items, and metadata.
 * @property {() => void} onClose - Callback function to close and unmount the modal.
 * @property {(e: React.MouseEvent) => void} onReorder - Callback function triggered when the "Reorder Basket" button is clicked.
 * @property {(item: any) => void} onProductClick - Callback function triggered when a specific product item is clicked for deeper inspection.
 */
interface BasketDetailsModalProps {
  basket: Basket;
  onClose: () => void;
  onReorder: (e: React.MouseEvent) => void;
  onProductClick: (item: any) => void;
}
/**
 * An animated modal overlay that presents the itemized breakdown of a specific shopping basket.
 * * * Features:
 * - Fluid Animations: Uses `framer-motion` for a smooth scale-in and backdrop fade effect.
 * - Scrollable List: Handles large baskets with a custom scrollable container (`max-h-[400px]`).
 * - Item Breakdown: Displays product images, names, individual quantities, cart multipliers, and calculated total prices.
 * - Interactive Elements: Supports individual product clicking for detailed views and a primary action button for full basket reordering.
 * - Thematic Adaptability: Fully integrates with light/dark mode design tokens via Tailwind CSS.
 * * @param {BasketDetailsModalProps} props - The component properties.
 * @returns {JSX.Element} The rendered modal overlay and content window.
 */
export default function BasketDetailsModal({ basket, onClose, onReorder, onProductClick }: BasketDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }} 
        className="relative w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="bg-bg-surface dark:bg-[#2a252a] p-5 sm:p-6 md:p-8 relative border border-white/20 dark:border-white/5">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-text-main/10 dark:border-white/10">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-text-main dark:text-text-primary font-serif">{basket.name}</h3>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {basket.items.length > 0 ? basket.items.map((item: any, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex justify-between items-center px-5 py-4 rounded-[20px] transition-all group border",
                    "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-text-main/5",
                    "dark:bg-white/5 dark:border-white/10 dark:shadow-none",
                    "hover:border-brand-orange/40 hover:scale-[1.01]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-black/5 dark:border-white/10 shadow-inner bg-bg-main dark:bg-black/20">
                        {item.image ? (
                          <Image src={item.image} alt={item.title || item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm opacity-50">🛍️</div>
                        )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(item);
                        }}
                        className="text-[15px] font-bold cursor-pointer text-text-main dark:text-text-primary hover:text-brand-orange transition-colors"
                      >
                        {item.title || item.name}
                      </span>
                      <span className="text-[11px] text-text-muted dark:text-text-primary/40">
                        {item.quantity || "1 pc"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-text-muted dark:text-text-primary/40">
                          x{item.cartQuantity || 1}
                        </span>
                        <span className="font-black text-[15px] text-brand-orange">
                          ${(item.price * (item.cartQuantity || 1)).toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[9px] text-text-muted dark:text-text-primary/30 uppercase font-black tracking-tighter">Total</span>
                    </div>
                  </div>
                </div>
              )) : (
                <span className="text-text-muted italic text-center py-10">No items found.</span>
              )}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={onReorder} 
                className="w-full py-4 rounded-[16px] bg-brand-orange text-[14px] text-white tracking-[0.05em] font-bold shadow-[0_8px_20px_rgb(var(--brand-orange)/0.25)] hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                REORDER BASKET
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}