/**
 * @file page.tsx
 * @brief Personal Info and Settings page, managing account details, loyalty cards, and preferences.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="flex flex-col gap-10 w-full pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 relative">
        <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-[#FFDEBA] leading-none font-serif cursor-default select-none">
          Personal Info
        </h2>
        <p className="text-[15px] text-[#FFDEBA]/50 tracking-wide cursor-default select-none">
          Manage your account details, connected loyalty cards, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* ЛІВА КОЛОНКА: Account Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif cursor-default select-none">
            Account Details
          </h3>
          <div className="flex flex-col rounded-[36px] bg-[rgba(50,45,50,0.3)] border border-[#FFDEBA]/5 p-8 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            <form className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2 cursor-default select-none">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="Sofiia M." 
                  className="w-full rounded-2xl bg-[rgba(30,26,30,0.4)] border border-transparent px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all focus:border-[#EC5800]/50 focus:bg-[rgba(30,26,30,0.6)] focus:shadow-[0_0_15px_rgba(236,88,0,0.15)] placeholder:text-[#FFDEBA]/20"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2 cursor-default select-none">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="sofia@knu.ua" 
                  className="w-full rounded-2xl bg-[rgba(30,26,30,0.4)] border border-transparent px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all focus:border-[#EC5800]/50 focus:bg-[rgba(30,26,30,0.6)] focus:shadow-[0_0_15px_rgba(236,88,0,0.15)] placeholder:text-[#FFDEBA]/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2 cursor-default select-none">Primary City (For Local Pricing)</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-2xl bg-[rgba(30,26,30,0.4)] border border-transparent px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all focus:border-[#EC5800]/50 focus:bg-[rgba(30,26,30,0.6)] focus:shadow-[0_0_15px_rgba(236,88,0,0.15)] cursor-pointer">
                    <option value="kyiv">Kyiv</option>
                    <option value="lviv">Lviv</option>
                    <option value="odesa">Odesa</option>
                    <option value="kharkiv">Kharkiv</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#FFDEBA]/50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end pt-4 border-t border-[#FFDEBA]/5">
                <button type="button" className="rounded-xl bg-[#EC5800] px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(236,88,0,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(236,88,0,0.4)] active:scale-95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА: Loyalty Cards & Preferences */}
        <div className="flex flex-col gap-8">
          
          {/* НОВЕ: Linked Loyalty Cards */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end pl-1 pr-2 cursor-default select-none">
              <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 font-serif">
                Linked Loyalty Cards
              </h3>
              <span className="text-[12px] text-[#FFDEBA]/40">For personalized discounts</span>
            </div>
            
            <div className="flex flex-col gap-3 rounded-[36px] bg-[rgba(50,45,50,0.3)] border border-[#FFDEBA]/5 p-6 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
              
              {/* Картка 1: Сільпо */}
              <div className="group flex items-center justify-between p-4 rounded-2xl bg-[rgba(30,26,30,0.4)] border border-[#FFDEBA]/5 hover:border-[#EC5800]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-orange-500 shadow-inner">
                    <span className="text-[11px] font-black text-white italic tracking-wider">СІЛЬПО</span>
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-[15px] font-bold text-[#FFDEBA]">Власний Рахунок</span>
                    <span className="text-[12px] text-[#FFDEBA]/50 tracking-widest font-mono mt-0.5">**** 4123</span>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#FFDEBA]/30 hover:text-red-500 transition-colors">
                  Remove
                </button>
              </div>

              {/* Картка 2: АТБ (Заглушка) */}
              <div className="group flex items-center justify-between p-4 rounded-2xl bg-[rgba(30,26,30,0.4)] border border-[#FFDEBA]/5 hover:border-[#EC5800]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-red-600 shadow-inner">
                    <span className="text-[13px] font-black text-white tracking-widest">АТБ</span>
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-[15px] font-bold text-[#FFDEBA]">Картка АТБ</span>
                    <span className="text-[12px] text-[#FFDEBA]/50 tracking-widest font-mono mt-0.5">**** 8802</span>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#FFDEBA]/30 hover:text-red-500 transition-colors">
                  Remove
                </button>
              </div>

              {/* Кнопка додавання */}
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#FFDEBA]/10 py-4 text-[13px] font-bold text-[#FFDEBA]/50 transition-all hover:border-[#EC5800]/50 hover:bg-[#EC5800]/10 hover:text-[#EC5800]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Link New Card
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif cursor-default select-none">
              Preferences
            </h3>
            <div className="flex flex-col gap-3 rounded-[36px] bg-[rgba(50,45,50,0.3)] border border-[#FFDEBA]/5 p-6 backdrop-blur-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
              
              {/* Theme Toggle */}
              <div onClick={() => setIsDarkMode(!isDarkMode)} className="group flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5 cursor-pointer hover:bg-[rgba(70,59,70,0.2)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA] overflow-hidden group-hover:text-[#EC5800] transition-colors">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div key={isDarkMode ? "moon" : "sun"} initial={{ y: -20, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 20, opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute">
                        {isDarkMode ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-[15px] font-medium text-[#FFDEBA] transition-colors group-hover:text-[#EC5800]">
                      {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                    <span className="text-[12px] text-[#FFDEBA]/50 transition-colors">
                      {isDarkMode ? "Reduces eye strain" : "High contrast interface"}
                    </span>
                  </div>
                </div>
                <button className={`pointer-events-none flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                   <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: isDarkMode ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                </button>
              </div>

              {/* Email Notifications */}
              <div onClick={() => setEmailAlerts(!emailAlerts)} className="group flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5 cursor-pointer hover:bg-[rgba(70,59,70,0.2)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA] group-hover:text-[#EC5800] transition-colors">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-[15px] font-medium text-[#FFDEBA] group-hover:text-[#EC5800] transition-colors">Email Alerts</span>
                    <span className="text-[12px] text-[#FFDEBA]/50">Get notified of 10%+ drops</span>
                  </div>
                </div>
                <button className={`pointer-events-none flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${emailAlerts ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                   <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: emailAlerts ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                </button>
              </div>

              {/* Push Notifications */}
              <div onClick={() => setPushAlerts(!pushAlerts)} className="group flex items-center justify-between p-3 rounded-2xl bg-[rgba(30,26,30,0.2)] border border-[#FFDEBA]/5 cursor-pointer hover:bg-[rgba(70,59,70,0.2)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(70,59,70,0.3)] text-[#FFDEBA] group-hover:text-[#EC5800] transition-colors">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-[15px] font-medium text-[#FFDEBA] group-hover:text-[#EC5800] transition-colors">Push Notifications</span>
                    <span className="text-[12px] text-[#FFDEBA]/50">Real-time browser alerts</span>
                  </div>
                </div>
                <button className={`pointer-events-none flex h-[26px] w-[46px] items-center rounded-full p-1 transition-colors duration-300 ${pushAlerts ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                   <motion.div layout className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" animate={{ x: pushAlerts ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                </button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}