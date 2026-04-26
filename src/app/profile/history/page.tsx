"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore, Basket } from "@/Store/user_store";

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { baskets, reorderBasket } = useUserStore();
  
  const [error, setError] = useState<string | null>(null);
  const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);

  useEffect(() => setIsMounted(true), []);

  const totalSpent = baskets.reduce((sum, basket) => sum + basket.price, 0);

  const handleReorder = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    const result = reorderBasket(id);
    if (!result.success) {
      setError(result.message || "Error");
      setTimeout(() => setError(null), 4000);
    } else {
      alert("Success! Items added to your active basket.");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-[100px] right-10 z-[100] bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 max-w-xs"
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
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-[#FFDEBA] font-serif drop-shadow-md">Basket History</h2>
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
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedBasket(basket)}
              className="group cursor-pointer relative h-[220px] rounded-[36px] p-[1px] bg-gradient-to-br from-[#FFDEBA]/10 via-transparent to-transparent hover:from-[#EC5800]/40 transition-all duration-500 shadow-lg"
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
                        <div key={store} className="h-8 px-3 rounded-full bg-[rgba(30,26,30,0.8)] border border-[#FFDEBA]/10 flex items-center justify-center text-[10px] font-bold text-[#FFDEBA]/60 shadow-md">{store}</div>
                      )) : <span className="text-[12px] text-[#FFDEBA]/30 italic pl-1">{basket.items.length} items</span>}
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[26px] font-black text-[#FFDEBA]">${basket.price.toFixed(2)}</span>
                      <button onClick={(e) => handleReorder(e, basket.id)} className="text-[12px] font-bold text-[#EC5800] uppercase tracking-widest hover:text-white transition-colors relative z-10">Reorder →</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBasket(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg rounded-[40px] bg-gradient-to-br from-[#1E1B1E] to-[#2D282D] p-[1px] shadow-2xl">
              <div className="bg-[rgba(30,26,30,0.95)] rounded-[40px] p-8">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-2xl font-bold text-[#FFDEBA] font-serif">{selectedBasket.name}</h3>
                  <button onClick={() => setSelectedBasket(null)} className="text-[#FFDEBA]/40 hover:text-red-400 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                </div>
                
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedBasket.items.length > 0 ? selectedBasket.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-[#FFDEBA] font-medium">{item.emoji} {item.name}</span>
                      <span className="font-bold text-[#EC5800]">${item.price.toFixed(2)}</span>
                    </div>
                  )) : (
                    <span className="text-[#FFDEBA]/40 italic text-center py-10">No items found in this basket.</span>
                  )}
                </div>
                
                <button onClick={() => setSelectedBasket(null)} className="w-full mt-8 py-4 rounded-[16px] bg-[#EC5800] text-white font-bold shadow-[0_8px_20px_rgba(236,88,0,0.3)] hover:-translate-y-1 transition-transform">Close Details</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}