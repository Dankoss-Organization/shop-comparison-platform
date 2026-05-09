/**
 * @file HistoryPage.tsx
 * @description Past purchases history with adaptive glassmorphism and reorder functionality.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore, Basket } from "@/Store/user_store";
import { useCartStore } from "@/Store/use_cart_store"; 

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { baskets } = useUserStore(); 
  const { items: cartItems, addItem, setOpen } = useCartStore(); 

  const [error, setError] = useState<string | null>(null);
  const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);

  useEffect(() => setIsMounted(true), []);

  const totalSpent = baskets.reduce((sum, basket) => sum + basket.price, 0);

  const handleReorder = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    
    if (cartItems.length > 0) {
      setError("Your current basket is not empty. Please clear it before reordering.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    const historicalBasket = baskets.find(b => b.id === id);
    
    if (historicalBasket && historicalBasket.items.length > 0) {
      historicalBasket.items.forEach((item: any) => {
        const reorderedItem = {
          id: item.id || `reorder_${Date.now()}_${Math.random()}`, 
          title: item.title || item.name,
          image: item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop",
          rating: item.rating || "5.0",
          description: item.description || "Reordered from history.",
          quantity: item.quantity || "1 pc",
          nutrition: item.nutrition || { calories: "0 kcal", carbs: "0 g", fats: "0 g", protein: "0 g", fiber: "0 g", sugar: "0 g" },
          offers: item.offers && item.offers.length > 0 ? item.offers : [
            {
              store_id: item.selectedStoreId || "historical_store",
              store_name: "Historical Price",
              is_in_stock: true,
              pricing: {
                current_price: item.price || 0,
                regular_price: item.price || 0,
                discount_percent: 0
              }
            }
          ],
          selectedStoreId: item.selectedStoreId || "historical_store"
        };
        addItem(reorderedItem as any);
      });
      setOpen(true);
    } else {
      setError("This basket is empty or not found.");
      setTimeout(() => setError(null), 4000);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-[100px] right-10 z-[100] bg-red-500 dark:bg-red-600 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 max-w-xs"
          >
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span className="text-sm font-bold">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-sm">Basket History</h2>
          <p className="text-[15px] text-text-muted dark:text-text-primary/50">Review your past purchases and optimized savings.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-bold text-text-muted dark:text-text-primary/30 uppercase tracking-widest">Total Historical Value</span>
          <span className="text-[28px] font-black text-brand-orange drop-shadow-sm">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {baskets.map((basket) => (
            <motion.div 
              key={basket.id} 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedBasket(basket)}
              className="group cursor-pointer relative h-[230px] rounded-[36px] p-[1px] bg-gradient-to-br from-brand-orange/20 via-transparent to-transparent hover:from-brand-orange/40 transition-all duration-500 shadow-sm"
            >
              <div className="flex h-full flex-col justify-between rounded-[36px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] p-7 transition-all border border-white/40 dark:border-white/5 group-hover:bg-white/70 dark:group-hover:bg-white/10 group-hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[19px] font-bold text-text-main dark:text-text-primary group-hover:text-brand-orange transition-colors font-serif">{basket.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-black uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">Completed</span>
                       <span className="text-[12px] font-medium text-text-muted dark:text-text-primary/40">{basket.date}</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor] transition-transform group-hover:scale-125" style={{ color: basket.color, backgroundColor: basket.color }} />
                </div>

                <div className="flex flex-col gap-4">
                   <div className="flex -space-x-2 h-8 items-center">
                      {basket.stores.length > 0 ? basket.stores.map(store => (
                        <div key={store} className="h-8 px-3 rounded-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center justify-center text-[10px] font-black text-text-main dark:text-text-primary/70 shadow-sm">{store}</div>
                      )) : <span className="text-[12px] text-text-muted italic pl-1">{basket.items.length} items</span>}
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[26px] font-black text-text-main dark:text-text-primary">${basket.price.toFixed(2)}</span>
                      <button onClick={(e) => handleReorder(e, basket.id)} className="text-[12px] font-black text-brand-orange uppercase tracking-widest hover:translate-x-1 transition-transform relative z-10">Reorder →</button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedBasket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBasket(null)} className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative w-full max-w-lg rounded-[40px] p-[1px] bg-gradient-to-br from-brand-orange/40 via-white/20 to-transparent shadow-2xl">
              <div className="bg-white/90 dark:bg-bg-surface/95 backdrop-blur-2xl rounded-[40px] p-8">
                <div className="flex justify-between items-center mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                  <h3 className="text-2xl font-bold text-text-main dark:text-text-primary font-serif">{selectedBasket.name}</h3>
                  <button onClick={() => setSelectedBasket(null)} className="text-text-muted hover:text-red-500 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                </div>
                
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedBasket.items.length > 0 ? selectedBasket.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-brand-orange/5 transition-colors group">
                      <span className="text-text-main dark:text-text-primary font-bold">{item.emoji} {item.name}</span>
                      <span className="font-black text-brand-orange">${item.price.toFixed(2)}</span>
                    </div>
                  )) : (
                    <span className="text-text-muted italic text-center py-10">No items found in this basket.</span>
                  )}
                </div>
                
                <button onClick={() => setSelectedBasket(null)} className="w-full mt-8 py-4 rounded-[18px] bg-brand-orange text-white font-black shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all">Close Details</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}