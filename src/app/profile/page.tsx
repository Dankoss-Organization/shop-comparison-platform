/**
 * @file page.tsx
 * @brief Default profile page showing user overview, gamified stats, and wide bento cards for settings and previews.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="flex flex-col gap-12 w-full pb-10">
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative">
        <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center rounded-full bg-[rgba(30,26,30,0.6)] border-[3px] border-[#EC5800] shadow-[0_0_30px_rgba(236,88,0,0.25)]">
           <Image src="/user.svg" alt="Sofiia M." width={50} height={50} className="opacity-90" />
           <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#EC5800] text-white shadow-lg transition-transform hover:scale-110">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
           </button>
        </div>
        
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-[36px] font-bold tracking-[1px] text-[#FFDEBA] leading-none font-serif">
              Sofiia M.
            </h2>
            <span className="flex items-center gap-1.5 rounded-full bg-[rgba(236,88,0,0.15)] border border-[#EC5800]/30 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1px] text-[#EC5800] backdrop-blur-md shadow-[0_0_15px_rgba(236,88,0,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 15l-2 5l9-5l-9-5l2 5Z"/><circle cx="12" cy="12" r="10"/></svg>
              Savvy Shopper
            </span>
          </div>
          <p className="text-[16px] font-medium text-[#FFDEBA]/50 tracking-wide">sofia@knu.ua</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">
          Your Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="group flex flex-col justify-between rounded-[32px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-7 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-[rgba(70,59,70,0.25)] hover:-translate-y-1">
            <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px]">Total Savings</span>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-[42px] font-black text-[#EC5800] leading-none tracking-tight">$154</span>
              <span className="text-[20px] font-bold text-[#EC5800]/60 leading-tight mb-1">.20</span>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-[32px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-7 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-[rgba(70,59,70,0.25)] hover:-translate-y-1">
            <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px]">Active Alerts</span>
            <span className="mt-4 text-[42px] font-black text-[#FFDEBA] leading-none tracking-tight">2</span>
          </div>

          <div className="group flex flex-col justify-between rounded-[32px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-7 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-[rgba(70,59,70,0.25)] hover:-translate-y-1 relative overflow-hidden">
            <div className="relative z-10 flex flex-col">
              <span className="text-[13px] font-bold text-[#FFDEBA]/50 uppercase tracking-[1.5px]">Top Store</span>
              <span className="mt-4 text-[32px] font-black text-[#FFDEBA] leading-none tracking-tight">Сільпо</span>
            </div>
            <div className="absolute -right-4 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
               <span className="text-[120px] font-black italic">С</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 font-serif">Recent Baskets</h3>
            <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-wide hover:text-white transition-colors">See All</button>
          </div>
          <div className="group flex h-full flex-col justify-between rounded-[36px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-8 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-[rgba(70,59,70,0.25)] relative overflow-hidden cursor-pointer">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EC5800]/20 text-[#EC5800]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#FFDEBA]">Weekend BBQ Cart</span>
                    <span className="text-[12px] text-[#FFDEBA]/50">Saved 2 days ago</span>
                  </div>
                </div>
                <span className="text-[20px] font-black text-[#EC5800]">$42.50</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-bold uppercase tracking-[1px] text-[#FFDEBA]/40">Optimized across:</span>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 text-[11px] font-bold text-[#FFDEBA]/70 shadow-inner">Сільпо</div>
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 text-[11px] font-bold text-[#FFDEBA]/70 shadow-inner">NOVUS</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(30,26,30,0.4)] text-[11px] font-bold text-[#FFDEBA]/50 border border-[#FFDEBA]/5">+2</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#EC5800]/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#EC5800]/20" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 font-serif">Price Alerts Feed</h3>
            <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-wide hover:text-white transition-colors">Manage</button>
          </div>
          <div className="flex h-full flex-col justify-center rounded-[36px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-8 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            
            <div className="flex items-center justify-between border-b border-[#FFDEBA]/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[rgba(30,26,30,0.6)] p-2 border border-[#FFDEBA]/5">
                  <div className="h-full w-full rounded-md bg-[#EC5800]/20 flex items-center justify-center text-[18px]">🥑</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#FFDEBA]">Hass Avocados (2-pack)</span>
                  <div className="flex items-center gap-2 text-[12px] text-[#FFDEBA]/50 mt-0.5">
                    <span>Target: <strong className="text-[#EC5800]">$2.90</strong></span>
                    <span className="w-1 h-1 rounded-full bg-[#FFDEBA]/20" />
                    <span>Current: $3.10</span>
                  </div>
                </div>
              </div>
              
              <div className="w-[60px] h-[30px] opacity-80">
                <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
                  <path d="M0,25 C10,25 15,10 25,15 C35,20 45,5 60,10" fill="none" stroke="#EC5800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="10" r="2.5" fill="#EC5800" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[rgba(30,26,30,0.6)] p-2 border border-[#FFDEBA]/5">
                  <div className="h-full w-full rounded-md bg-[#FFDEBA]/5 flex items-center justify-center text-[18px]">☕</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#FFDEBA]">Jacobs Monarch 200g</span>
                  <div className="flex items-center gap-2 text-[12px] text-[#FFDEBA]/50 mt-0.5">
                    <span>Target: <strong className="text-[#EC5800]">$5.00</strong></span>
                    <span className="w-1 h-1 rounded-full bg-[#FFDEBA]/20" />
                    <span>Current: <span className="line-through opacity-70">$6.20</span> $5.00</span>
                  </div>
                </div>
              </div>
              <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-green-500/20 text-green-400 text-[11px] font-bold border border-green-500/30">
                Reached!
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex flex-col gap-4">
          <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">
            Account Details
          </h3>
          <div className="flex flex-col rounded-[36px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-8 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="Sofiia M." 
                  className="w-full rounded-2xl bg-[rgba(30,26,30,0.4)] border border-transparent px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all focus:border-[#EC5800]/50 focus:bg-[rgba(30,26,30,0.6)] focus:shadow-[0_0_15px_rgba(236,88,0,0.15)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2">Primary City (For Local Pricing)</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-2xl bg-[rgba(30,26,30,0.4)] border border-transparent px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all focus:border-[#EC5800]/50 focus:bg-[rgba(30,26,30,0.6)] focus:shadow-[0_0_15px_rgba(236,88,0,0.15)] cursor-pointer">
                    <option value="kyiv">Kyiv</option>
                    <option value="lviv">Lviv</option>
                    <option value="odesa">Odesa</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#FFDEBA]/50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button type="button" className="rounded-xl bg-[#EC5800] px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(236,88,0,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(236,88,0,0.4)] active:scale-95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">
            Preferences
          </h3>
          <div className="flex flex-col gap-3 h-full rounded-[36px] bg-[rgba(50,45,50,0.2)] border border-[#FFDEBA]/5 p-8 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#FFDEBA]">Appearance</span>
                  <span className="text-[12px] text-[#FFDEBA]/50">Dark mode recommended</span>
                </div>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                 <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: isDarkMode ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5 mt-2">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#FFDEBA]">Email Alerts</span>
                  <span className="text-[12px] text-[#FFDEBA]/50">Get notified of 10%+ drops</span>
                </div>
              </div>
              <button onClick={() => setEmailAlerts(!emailAlerts)} className={`flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${emailAlerts ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                 <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: emailAlerts ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#FFDEBA]">Push Notifications</span>
                  <span className="text-[12px] text-[#FFDEBA]/50">Real-time browser alerts</span>
                </div>
              </div>
              <button onClick={() => setPushAlerts(!pushAlerts)} className={`flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${pushAlerts ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                 <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: pushAlerts ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}