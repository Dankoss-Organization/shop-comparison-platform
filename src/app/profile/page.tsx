/**
 * @file page.tsx
 * @brief Dashboard Overview page featuring Catalog-style deep glassmorphism.
 */

"use client";

import Image from "next/image";
import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";

export default function OverviewPage() {
  return (
    <div className="relative flex flex-col gap-10 w-full pb-10">
      
      <div className="flex flex-col gap-6 z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative">
          <div className="relative p-[3px] rounded-full bg-gradient-to-br from-[#EC5800] via-[#EC5800]/30 to-transparent shadow-[0_0_30px_rgba(236,88,0,0.25)] shrink-0">
            <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[rgba(30,26,30,0.8)] overflow-hidden">
               <Image src="/user.svg" alt="Sofiia M." width={50} height={50} className="opacity-90" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-[36px] font-bold tracking-[1px] text-[#FFDEBA] leading-none font-serif drop-shadow-md">
                Sofiia M.
              </h2>
              <span className="flex items-center gap-1.5 rounded-full bg-[rgba(236,88,0,0.15)] border border-[#EC5800]/30 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1px] text-[#EC5800] backdrop-blur-md shadow-[0_0_15px_rgba(236,88,0,0.2)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 15l-2 5l9-5l-9-5l2 5Z"/><circle cx="12" cy="12" r="10"/></svg>
                Savvy Shopper
              </span>
            </div>
            <p className="text-[16px] font-medium text-[#FFDEBA]/50 tracking-wide cursor-default select-none">sofia@knu.ua</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-md mt-2">
          <div className="flex justify-between items-end">
            <span className="text-[12px] font-bold uppercase tracking-[1px] text-[#FFDEBA]/60">Profile Setup</span>
            <span className="text-[13px] font-bold text-[#EC5800]">80%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[rgba(50,45,50,0.4)] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-[#FFDEBA]/5">
            <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-[#EC5800] to-[#ff7e33] rounded-full shadow-[0_0_10px_rgba(236,88,0,0.5)]" />
          </div>
          <span className="text-[11px] text-[#FFDEBA]/40 cursor-default select-none">
            Add a primary city to get localized grocery deals.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 z-10">
        <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif cursor-default select-none drop-shadow-md">
          Your Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="group flex flex-col justify-between rounded-[32px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_15px_35px_rgba(0,0,0,0.3)] p-7 transition-all duration-500 hover:shadow-[inset_0_1px_0_rgba(255,222,186,0.15),_0_20px_45px_rgba(0,0,0,0.5)] hover:-translate-y-1">
            <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px] cursor-default select-none">Total Savings</span>
            <div className="mt-4 flex flex-col cursor-default select-none">
              <div className="flex items-end gap-1.5">
                <span className="text-[42px] font-black text-[#EC5800] leading-none tracking-tight">
                  $<Counter from={0} to={154} duration={1.5} />
                </span>
                <span className="text-[20px] font-bold text-[#EC5800]/60 leading-tight mb-1">.20</span>
              </div>
              <span className="text-[12px] font-medium text-[#4ADE80] mt-2 flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="m18 15-6-6-6 6"/></svg>
                12% from last month
              </span>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-[32px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_15px_35px_rgba(0,0,0,0.3)] p-7 transition-all duration-500 hover:shadow-[inset_0_1px_0_rgba(255,222,186,0.15),_0_20px_45px_rgba(0,0,0,0.5)] hover:-translate-y-1">
            <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px] cursor-default select-none">Active Alerts</span>
            <div className="mt-4 flex flex-col cursor-default select-none">
              <span className="text-[42px] font-black text-[#FFDEBA] leading-none tracking-tight drop-shadow-md">
                <Counter from={0} to={2} duration={1} />
              </span>
              <span className="text-[12px] font-medium text-[#FFDEBA]/40 mt-2">
                Tracking 2 items globally
              </span>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_15px_35px_rgba(0,0,0,0.3)] p-7 transition-all duration-500 hover:shadow-[inset_0_1px_0_rgba(255,222,186,0.15),_0_20px_45px_rgba(0,0,0,0.5)] hover:-translate-y-1">
            <div className="relative z-10 flex flex-col cursor-default select-none">
              <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px]">Top Store</span>
              <span className="mt-4 text-[32px] font-black text-[#FFDEBA] leading-none tracking-tight drop-shadow-md">Сільпо</span>
              <span className="text-[12px] font-medium text-[#FFDEBA]/40 mt-3">
                Most frequent deals found
              </span>
            </div>
            <div className="absolute -right-4 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
               <span className="text-[120px] font-black italic">С</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 font-serif cursor-default select-none drop-shadow-md">Recent Baskets</h3>
            <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-wide hover:text-white transition-colors drop-shadow-md">View All</button>
          </div>
          
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_20px_40px_rgba(0,0,0,0.4)] p-8 transition-all duration-500 hover:shadow-[inset_0_1px_0_rgba(255,222,186,0.15),_0_25px_50px_rgba(0,0,0,0.6)] cursor-pointer">
            <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EC5800]/20 text-[#EC5800] border border-[#EC5800]/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#FFDEBA] drop-shadow-sm">Weekend BBQ Cart</span>
                      <span className="text-[12px] text-[#FFDEBA]/50">Saved 2 days ago</span>
                    </div>
                  </div>
                  <span className="text-[20px] font-black text-[#EC5800] drop-shadow-sm">$42.50</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-bold uppercase tracking-[1px] text-[#FFDEBA]/40">Optimized across:</span>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 text-[11px] font-bold text-[#FFDEBA]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">Сільпо</div>
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 text-[11px] font-bold text-[#FFDEBA]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">NOVUS</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(30,26,30,0.4)] text-[11px] font-bold text-[#FFDEBA]/50 border border-[#FFDEBA]/5">+2</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#EC5800]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#EC5800]/20" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <div className="flex items-center gap-3 cursor-default select-none">
              <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 font-serif drop-shadow-md">Price Alerts Feed</h3>
              <span className="flex items-center gap-1.5 rounded-full bg-[rgba(255,222,186,0.05)] px-2.5 py-1 text-[10px] text-[#FFDEBA]/40 font-medium border border-[#FFDEBA]/5 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                Synced 2m ago
              </span>
            </div>
            <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-wide hover:text-white transition-colors drop-shadow-md">Manage</button>
          </div>
          
          <div className="flex h-full flex-col justify-center rounded-[36px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_20px_40px_rgba(0,0,0,0.4)] p-8">
            <div className="flex items-center justify-between border-b border-[#FFDEBA]/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[rgba(30,26,30,0.6)] p-2 border border-[#FFDEBA]/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  <div className="h-full w-full rounded-md bg-[#EC5800]/20 flex items-center justify-center text-[18px]">🥑</div>
                </div>
                <div className="flex flex-col cursor-default select-none">
                  <span className="text-[15px] font-bold text-[#FFDEBA] drop-shadow-sm">Hass Avocados (2-pack)</span>
                  <div className="flex items-center gap-2 text-[12px] text-[#FFDEBA]/50 mt-0.5">
                    <span>Target: <strong className="text-[#EC5800]">$2.90</strong></span>
                    <span className="w-1 h-1 rounded-full bg-[#FFDEBA]/20" />
                    <span>Current: $3.10</span>
                  </div>
                </div>
              </div>
              <div className="w-[60px] h-[30px] opacity-80 pointer-events-none drop-shadow-[0_0_5px_rgba(236,88,0,0.5)]">
                <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
                  <path d="M0,25 C10,25 15,10 25,15 C35,20 45,5 60,10" fill="none" stroke="#EC5800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="10" r="3" fill="#EC5800" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[rgba(30,26,30,0.6)] p-2 border border-[#FFDEBA]/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  <div className="h-full w-full rounded-md bg-[#FFDEBA]/5 flex items-center justify-center text-[18px]">☕</div>
                </div>
                <div className="flex flex-col cursor-default select-none">
                  <span className="text-[15px] font-bold text-[#FFDEBA] drop-shadow-sm">Jacobs Monarch 200g</span>
                  <div className="flex items-center gap-2 text-[12px] text-[#FFDEBA]/50 mt-0.5">
                    <span>Target: <strong className="text-[#EC5800]">$5.00</strong></span>
                    <span className="w-1 h-1 rounded-full bg-[#FFDEBA]/20" />
                    <span>Current: <span className="line-through opacity-70">$6.20</span> $5.00</span>
                  </div>
                </div>
              </div>
              <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-[rgba(74,222,128,0.1)] text-green-400 text-[11px] font-bold border border-green-500/20 cursor-default select-none shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                Reached!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Counter({ from = 0, to, duration = 1.5 }: { from: number, to: number, duration?: number }) {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        setCurrent(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <span>{current}</span>;
}