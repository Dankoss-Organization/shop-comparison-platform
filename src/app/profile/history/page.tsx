/**
 * @file page.tsx
 * @brief Basket History page showing past optimized purchases.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore } from "@/Store/user_store";

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { baskets } = useUserStore();

  useEffect(() => setIsMounted(true), []);

  const totalSpent = baskets.reduce((sum, basket) => sum + basket.price, 0);

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-[#FFDEBA] font-serif drop-shadow-md">
            Basket History
          </h2>
          <p className="text-[15px] text-[#FFDEBA]/50">Review your past purchases and optimized savings.</p>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-bold text-[#FFDEBA]/30 uppercase tracking-widest">Total Historical Value</span>
          <span className="text-[24px] font-black text-[#EC5800]">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {baskets.map((basket) => (
            <motion.div 
              key={basket.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative h-[220px] rounded-[36px] p-[1px] bg-gradient-to-br from-[#FFDEBA]/10 via-transparent to-transparent hover:from-[#EC5800]/40 transition-all duration-500 shadow-lg"
            >
              <div className="flex h-full flex-col justify-between rounded-[36px] bg-[rgba(50,45,50,0.4)] backdrop-blur-[20px] p-7 transition-colors group-hover:bg-[rgba(70,59,70,0.4)]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-[#FFDEBA] group-hover:text-white transition-colors">{basket.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">Completed</span>
                       <span className="text-[12px] text-[#FFDEBA]/40">{basket.date}</span>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: basket.color, backgroundColor: basket.color }} />
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex -space-x-2 h-8 items-center">
                      {basket.stores.length > 0 ? basket.stores.map(store => (
                        <div key={store} className="h-8 px-3 rounded-full bg-[rgba(30,26,30,0.8)] border border-[#FFDEBA]/10 flex items-center justify-center text-[10px] font-bold text-[#FFDEBA]/60 shadow-md">
                          {store}
                        </div>
                      )) : <span className="text-[12px] text-[#FFDEBA]/30 italic pl-1">{basket.items} items</span>}
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[26px] font-black text-[#FFDEBA]">${basket.price.toFixed(2)}</span>
                      <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-widest hover:text-white transition-colors">Reorder →</button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}