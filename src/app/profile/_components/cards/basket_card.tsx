/**
 * @file basket_card.tsx
 * @description Presentational component for displaying a historical or saved basket (cart) summary.
 */
"use client";

import { motion } from "framer-motion";
import { Basket } from "@/Store/user_store";
/**
 * Properties for the BasketCard component.
 *
 * @interface BasketCardProps
 * @property {Basket} basket - The basket data object containing items, price, date, etc.
 * @property {number} index - The index of the card in a list, used for staggered entrance animations.
 * @property {() => void} onSelect - Callback triggered when the entire card is clicked.
 * @property {(e: React.MouseEvent) => void} onReorder - Callback triggered when the "Reorder" button is clicked.
 */
interface BasketCardProps {
  basket: Basket;
  index: number;
  onSelect: () => void;
  onReorder: (e: React.MouseEvent) => void;
}
/**
 * Renders a summary card for a specific shopping basket.
 * Displays the basket's name, completion date, color indicator, unique stores involved, and total price.
 * * @param {BasketCardProps} props - The component properties.
 * @returns {JSX.Element} The animated basket card component.
 */
export default function BasketCard({ basket, index, onSelect, onReorder }: BasketCardProps) {
  /**
   * Extracts a unique list of store names from the basket's items.
   * Falls back to the basket's default stores array or a generic name if no stores are found.
   * * @param {Basket} basketData - The basket object to analyze.
   * @returns {string[]} An array of unique store names.
   */
  const getUniqueStores = (basketData: Basket) => {
    const stores = new Set<string>();
    basketData.items.forEach((item: any) => {
      if (item.selectedStoreId && item.offers) {
         const offer = item.offers.find((o:any) => o.store_id === item.selectedStoreId);
         if(offer) stores.add(offer.store_name);
      } 
      else if (item.offers && item.offers.length > 0) {
        const sortedOffers = [...item.offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price);
        stores.add(sortedOffers[0].store_name);
      }
    });
    
    if (stores.size === 0) {
       return basketData.stores.length > 0 ? basketData.stores : ["DANKOSS Checkout"];
    }
    return Array.from(stores);
  };

  const uniqueStores = getUniqueStores(basket);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className="group cursor-pointer relative rounded-[28px] p-[1px] bg-gradient-to-br from-text-main/10 dark:from-white/10 via-transparent to-transparent hover:from-brand-orange hover:via-brand-orange/20 transition-all duration-500 shadow-sm"
    >
      <div className="flex h-full flex-col justify-between rounded-[28px] bg-bg-surface dark:bg-[#201c20] p-6 transition-all group-hover:shadow-[0_15px_40px_rgb(var(--brand-orange)/0.15)] dark:group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[22px] font-bold text-text-main dark:text-text-primary group-hover:text-brand-orange transition-colors font-serif">{basket.name}</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] border border-[#10b981]/30 rounded-full px-2.5 py-0.5">Completed</span>
               <span className="text-[12px] text-text-muted dark:text-text-primary/50">{basket.date}</span>
            </div>
          </div>
          <div className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor] transition-transform group-hover:scale-125" style={{ color: basket.color, backgroundColor: basket.color }} />
        </div>

        <div className="flex flex-col gap-5">
           <div className="flex flex-wrap gap-2 items-center">
              {uniqueStores.map((store, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-black/40 flex items-center justify-center text-[11px] font-semibold text-text-main dark:text-text-primary/80 transition-colors group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                  {store}
                </div>
              ))}
           </div>
           
           <div className="flex justify-between items-end">
              <span className="text-[28px] font-black text-text-main dark:text-white">${basket.price.toFixed(2)}</span>
              <button 
                onClick={onReorder} 
                className="relative z-20 flex items-center gap-1.5 rounded-[12px] bg-brand-orange/10 dark:bg-brand-orange/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-brand-orange transition-all hover:bg-brand-orange hover:text-white hover:shadow-[0_4px_15px_rgb(var(--brand-orange)/0.3)] active:scale-95"
              >
                Reorder
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}