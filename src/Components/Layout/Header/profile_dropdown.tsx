/**
 * @file profile_dropdown.tsx
 * @brief Dropdown menu for user profile actions (Settings, Saved Baskets, Theme toggle).
 * @pattern Flush Header Dropdown, Framer Motion Micro-interactions
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="profile-dropdown"
          style={{ transformOrigin: "top" }}
          initial={{ opacity: 0, scaleY: 0.85, y: -5 }}
          animate={{ opacity: 1, scaleY: 1, y: 0 }}
          exit={{ opacity: 0, scaleY: 0.85, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-[65px] right-[-14px] flex w-[290px] flex-col overflow-hidden rounded-b-[24px] rounded-t-none bg-[rgba(70,59,70,0.25)] backdrop-blur-[35px] border-x border-b border-[#FFDEBA]/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >

            <div
            className={`
              absolute top-0 left-0 w-full h-[2px] z-10
              bg-gradient-to-r from-transparent via-[#EC5800] to-transparent
              transition-all duration-700
              ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}
            `}
          />
          <div className="flex items-center gap-4 p-5 bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] relative">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
            <div className="relative flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[rgba(30,26,30,0.4)] shadow-[inset_0_1px_0_rgba(255,222,186,0.1)]">
               <Image src="/user.svg" alt="Avatar" width={22} height={22} className="opacity-90" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] font-bold tracking-[0.5px] text-[#FFDEBA] leading-tight">Sofiia M.</span>
              <span className="text-[12px] font-medium tracking-[-0.2px] text-[#FFDEBA]/50 leading-tight">sofia@knu.ua</span>
            </div>
          </div>

          <div className="flex flex-col p-2.5 gap-1 relative">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
            <Link 
              href="/profile" 
              onClick={onClose}
              className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">My Account</span>
            </Link>

            <Link 
              href="/profile/baskets" 
              onClick={onClose}
              className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">Saved Baskets</span>
            </Link>

            <Link 
              href="/profile/alerts" 
              onClick={onClose}
              className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">Price Alerts</span>
              <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#EC5800] shadow-[0_0_8px_rgba(236,88,0,0.6)] text-[10px] font-bold text-white">2</span>
            </Link>
          </div>

          <div className="flex flex-col p-2.5 gap-1">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="group flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#FFDEBA]/5 hover:shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#FFDEBA] transition-colors overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isDarkMode ? "moon" : "sun"}
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      {isDarkMode ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">
                  Appearance
                </span>
              </div>
              <div className={`flex h-[22px] w-[40px] items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                 <motion.div 
                   layout 
                   className="h-[14px] w-[14px] rounded-full bg-white shadow-sm"
                   animate={{ x: isDarkMode ? 18 : 0 }}
                   transition={{ type: "spring", stiffness: 500, damping: 30 }}
                 />
              </div>
            </button>

            <button 
              onClick={onClose}
              className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-red-500/10 hover:shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center text-red-400/80 group-hover:text-red-500 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </div>
              <span className="text-[14px] font-medium text-red-400/80 group-hover:text-red-500 transition-colors">Log Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}