/**
 * @file page.tsx
 * @brief My Baskets page with optimized shopping lists and total savings analysis.
 */

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MOCK_BASKETS = [
  { id: 1, name: "Weekend BBQ Party", date: "2 days ago", price: 42.50, items: 18, stores: ["Сільпо", "NOVUS"], color: "#EC5800" },
  { id: 2, name: "Healthy Week Prep", date: "1 week ago", price: 68.20, items: 24, stores: ["ATB", "Le Silpo"], color: "#4ADE80" },
  { id: 3, name: "Office Snacks", date: "Oct 12", price: 15.90, items: 5, stores: ["Metro"], color: "#3B82F6" },
];

export default function BasketsPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

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
            <span className="text-[24px] font-black text-[#EC5800]">$126.60</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <button className="group relative h-[220px] rounded-[36px] border-2 border-dashed border-[#FFDEBA]/10 flex flex-col items-center justify-center gap-4 transition-all hover:border-[#EC5800]/50 hover:bg-[#EC5800]/5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDEBA]/5 text-[#FFDEBA]/30 group-hover:bg-[#EC5800] group-hover:text-white transition-all shadow-xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <span className="text-[16px] font-bold text-[#FFDEBA]/40 group-hover:text-[#FFDEBA]">Create New Basket</span>
        </button>

        {MOCK_BASKETS.map((basket) => (
          <div key={basket.id} className="group relative h-[220px] rounded-[36px] p-[1px] bg-gradient-to-br from-[#FFDEBA]/10 via-transparent to-transparent hover:from-[#EC5800]/40 transition-all duration-500 shadow-lg">
            <div className="flex h-full flex-col justify-between rounded-[36px] bg-[rgba(50,45,50,0.4)] backdrop-blur-[20px] p-7 transition-colors group-hover:bg-[rgba(70,59,70,0.4)]">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-bold text-[#FFDEBA] group-hover:text-white transition-colors">{basket.name}</span>
                  <span className="text-[12px] text-[#FFDEBA]/40">{basket.date} • {basket.items} items</span>
                </div>
                <div className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: basket.color, backgroundColor: basket.color }} />
              </div>

              <div className="flex flex-col gap-3">
                 <div className="flex -space-x-2">
                    {basket.stores.map(store => (
                      <div key={store} className="h-8 px-3 rounded-full bg-[rgba(30,26,30,0.8)] border border-[#FFDEBA]/10 flex items-center justify-center text-[10px] font-bold text-[#FFDEBA]/60 shadow-md">
                        {store}
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[26px] font-black text-[#FFDEBA]">${basket.price.toFixed(2)}</span>
                    <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-widest hover:text-white transition-colors">Details →</button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}