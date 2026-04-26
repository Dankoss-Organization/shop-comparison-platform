/**
 * @file page.tsx
 * @brief My Baskets page with persisted Zustand state and real date formatting.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore } from "@/Store/user_store";

const COLORS = ["#EC5800", "#4ADE80", "#3B82F6", "#A855F7", "#D946EF", "#EAB308"];

export default function BasketsPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { baskets, addBasket } = useUserStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBasketName, setNewBasketName] = useState("");

  useEffect(() => setIsMounted(true), []);

  const handleCreateBasket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBasketName.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newBasket = {
      id: Date.now(),
      name: newBasketName,
      date: formattedDate, 
      price: 0.00,
      items: 0,
      stores: [],
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };

    addBasket(newBasket); 
    setNewBasketName("");
    setIsModalOpen(false);
  };

  const totalValue = baskets.reduce((sum, basket) => sum + basket.price, 0);

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-[#FFDEBA] font-serif drop-shadow-md">
            My Baskets
          </h2>
          <p className="text-[15px] text-[#FFDEBA]/50">Manage and compare your optimized shopping lists.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-bold text-[#FFDEBA]/30 uppercase tracking-widest">Total Active Value</span>
            <span className="text-[24px] font-black text-[#EC5800]">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative h-[220px] rounded-[36px] border-2 border-dashed border-[#FFDEBA]/10 flex flex-col items-center justify-center gap-4 transition-all hover:border-[#EC5800]/50 hover:bg-[#EC5800]/5"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDEBA]/5 text-[#FFDEBA]/30 group-hover:bg-[#EC5800] group-hover:text-white transition-all shadow-xl group-active:scale-95">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <span className="text-[16px] font-bold text-[#FFDEBA]/40 group-hover:text-[#FFDEBA]">Create New Basket</span>
        </button>

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
                    <span className="text-[12px] text-[#FFDEBA]/40">{basket.date} • {basket.items} items</span>
                  </div>
                  <div className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: basket.color, backgroundColor: basket.color }} />
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex -space-x-2 h-8 items-center">
                      {basket.stores.length > 0 ? basket.stores.map(store => (
                        <div key={store} className="h-8 px-3 rounded-full bg-[rgba(30,26,30,0.8)] border border-[#FFDEBA]/10 flex items-center justify-center text-[10px] font-bold text-[#FFDEBA]/60 shadow-md">
                          {store}
                        </div>
                      )) : <span className="text-[12px] text-[#FFDEBA]/30 italic pl-1">Empty list</span>}
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[26px] font-black text-[#FFDEBA]">${basket.price.toFixed(2)}</span>
                      <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-widest hover:text-white transition-colors">Details →</button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-[36px] p-[1px] bg-gradient-to-br from-[#EC5800]/50 to-transparent shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col gap-6 rounded-[36px] bg-[linear-gradient(135deg,rgba(40,35,40,0.95),rgba(20,18,20,0.95))] p-8">
                <div className="flex justify-between items-center border-b border-[#FFDEBA]/10 pb-4">
                  <h3 className="text-[20px] font-bold text-[#FFDEBA] font-serif">Name your basket</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-[#FFDEBA]/40 hover:text-red-400 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>

                <form onSubmit={handleCreateBasket} className="flex flex-col gap-6">
                  <input 
                    type="text" 
                    autoFocus
                    value={newBasketName}
                    onChange={(e) => setNewBasketName(e.target.value)}
                    placeholder="e.g. Grandma's Birthday..."
                    className="w-full rounded-[16px] border-none px-5 py-4 text-[16px] text-[#FFDEBA] outline-none transition-all placeholder:text-[#FFDEBA]/30 focus:ring-2 focus:ring-[#EC5800]/50"
                    style={{ background: "rgba(30, 26, 30, 0.6)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}
                  />
                  <button 
                    type="submit"
                    disabled={!newBasketName.trim()}
                    className={`w-full py-4 rounded-[16px] text-[15px] font-bold text-white transition-all ${
                      newBasketName.trim() 
                        ? 'bg-[#EC5800] shadow-[0_8px_20px_rgba(236,88,0,0.3)] hover:-translate-y-1' 
                        : 'bg-[#3F363F] text-[#FFDEBA]/30 cursor-not-allowed'
                    }`}
                  >
                    Create Basket
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}