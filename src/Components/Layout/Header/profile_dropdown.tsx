/**
 * @file profile_dropdown.tsx
 * @brief Dropdown menu for user profile actions (Settings, Saved Baskets, Theme toggle).
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
          initial={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
          className="absolute top-[50px] left-1/2 z-[100] flex w-[280px] flex-col overflow-hidden rounded-[24px] bg-[#1A181C]/80 backdrop-blur-xl border border-[#FFDEBA]/10 shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
        >
          <div className="flex items-center gap-3 border-b border-[#FFDEBA]/10 p-5 bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))]">
            <div className="relative flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#EC5800]/20 border border-[#EC5800]/50 overflow-hidden">
               <Image src="/user.svg" alt="Avatar" width={24} height={24} className="opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-[#FFDEBA] leading-tight">Blabla C.</span>
              <span className="text-[12px] text-[#FFDEBA]/50 leading-tight">user@knu.ua</span>
            </div>
          </div>

          <div className="flex flex-col p-2 border-b border-[#FFDEBA]/10">
            <Link 
              href="/profile" 
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#FFDEBA]/5"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/70 group-hover:text-[#EC5800] transition-colors">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">My Account</span>
            </Link>

            <Link 
              href="/profile/baskets" 
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#FFDEBA]/5"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/70 group-hover:text-[#EC5800] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m2 7 4.42-4.42a2 2 0 0 1 2.83 0L12 5.41l2.75-2.83a2 2 0 0 1 2.83 0L22 7"/><path d="M2 7h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">Saved Baskets</span>
            </Link>

            <Link 
              href="/profile/alerts" 
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#FFDEBA]/5"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/70 group-hover:text-[#EC5800] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">Price Alerts</span>
              <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#EC5800] text-[10px] font-bold text-white">2</span>
            </Link>
          </div>

          <div className="flex flex-col p-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-[#FFDEBA]/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/70 group-hover:text-[#FFDEBA] transition-colors">
                  {isDarkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  )}
                </div>
                <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">
                  Appearance
                </span>
              </div>
              <div className="flex h-[20px] w-[36px] items-center rounded-full bg-[#3F363F] p-1 transition-colors">
                 <motion.div 
                   layout 
                   className="h-[14px] w-[14px] rounded-full bg-[#FFDEBA]"
                   animate={{ x: isDarkMode ? 14 : 0 }}
                   transition={{ type: "spring", stiffness: 500, damping: 30 }}
                 />
              </div>
            </button>

            <button 
              onClick={onClose}
              className="group mt-1 flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#EC5800]/10"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#EC5800]/80 group-hover:text-[#EC5800] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </div>
              <span className="text-[14px] font-medium text-[#EC5800]/80 group-hover:text-[#EC5800] transition-colors">Log Out</span>
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}