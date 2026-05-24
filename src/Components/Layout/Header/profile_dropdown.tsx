"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "@/Store/user_store";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean; 
  onLogout?: () => void;
  onLogin?: () => void; 
  highlightLogin?: boolean;
}

export default function ProfileDropdown({ isOpen, onClose, isAuthenticated = false, onLogout, onLogin, highlightLogin = false }: ProfileDropdownProps) {
  const router = useRouter();
  const { displayName, email, avatarUrl, logout } = useUserStore();
  
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  const isDarkMode = mounted ? resolvedTheme === "dark" : true;

  const themeToggleBtn = (
    <button 
      suppressHydrationWarning
      onClick={(e) => {
        e.stopPropagation();
        setTheme(isDarkMode ? "light" : "dark");
      }}
      className="group flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-white/5 hover:shadow-sm"
    >
      <div className="flex items-center gap-3.5">
        <div className="relative flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-text-primary transition-colors">
          <motion.div
            initial={false}
            animate={{ scale: isDarkMode ? 1 : 0, rotate: isDarkMode ? 0 : -90, opacity: isDarkMode ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ scale: isDarkMode ? 0 : 1, rotate: isDarkMode ? 90 : 0, opacity: isDarkMode ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </motion.div>
        </div>
        <span className="text-[14px] font-medium text-text-main/80 dark:text-text-primary/80 group-hover:text-brand-orange dark:group-hover:text-text-primary transition-colors">
          Appearance
        </span>
      </div>
      
      <div className={`flex h-[22px] w-[40px] items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-brand-orange' : 'bg-text-main/15'}`}>
         <motion.div 
           className="h-[14px] w-[14px] rounded-full bg-white shadow-sm"
           initial={false}
           animate={{ x: isDarkMode ? 18 : 0 }}
           transition={{ type: "spring", stiffness: 500, damping: 30 }}
         />
      </div>
    </button>
  );

  const authenticatedContent = (
    <>
      <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-text-main/5 to-transparent dark:from-white/10 dark:to-transparent relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-main/5 dark:bg-white/10" />
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text-main/5 dark:bg-bg-deep overflow-hidden border border-text-main/5 dark:border-white/10 shadow-sm">
          <img 
            src={avatarUrl} 
            alt="Profile" 
            className={
              avatarUrl === "/user.svg" 
                ? "h-[60%] w-[60%] object-contain opacity-60 dark:opacity-80" 
                : "h-full w-full object-cover"
            }
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] font-bold tracking-[0.5px] text-text-main dark:text-text-primary leading-tight">{displayName}</span>
          <span className="text-[12px] font-medium tracking-[-0.2px] text-text-muted dark:text-text-primary/50 leading-tight">{email}</span>
        </div>
      </div>

      <div className="flex flex-col p-2.5 gap-1 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-main/5 dark:bg-white/10" />
        <Link href="/profile" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-brand-orange/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span className="text-[14px] font-medium text-text-main/80 dark:text-text-primary/80 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">My Account</span>
        </Link>

        <Link href="/profile/history" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-brand-orange/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <span className="text-[14px] font-medium text-text-main/80 dark:text-text-primary/80 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">Basket History</span>
        </Link>

        <Link href="/profile/alerts" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-brand-orange/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <span className="text-[14px] font-medium text-text-main/80 dark:text-text-primary/80 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors">Price Alerts</span>
          <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-orange shadow-[0_0_8px_rgba(236,88,0,0.6)] text-[10px] font-bold text-white">2</span>
        </Link>
      </div>

      <div className="flex flex-col p-2.5 gap-1">
        {themeToggleBtn}
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            onClose();
            setTimeout(() => { 
              logout(); 
              if (onLogout) onLogout();
              router.push("/");
            }, 300);
          }} 
          className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-red-500/10 hover:shadow-sm"
        >
          <div className="flex h-5 w-5 items-center justify-center text-red-500/80 group-hover:text-red-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </div>
          <span className="text-[14px] font-medium text-red-500/80 group-hover:text-red-500 transition-colors">Log Out</span>
        </button>
      </div>
    </>
  );

  const guestContent = (
    <>
      <div className="flex flex-col items-center gap-3 p-5 bg-gradient-to-br from-text-main/5 to-transparent dark:from-white/10 dark:to-transparent relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-main/5 dark:bg-white/10" />
        <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-text-main/5 dark:bg-bg-darker/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-text-main/5 dark:border-white/10">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-text-muted dark:text-text-primary/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <span className="text-[15px] font-bold text-text-main dark:text-text-primary leading-tight mt-1">Welcome to DANKOSS</span>
        <div className="flex w-full flex-col gap-2 mt-2">
          <motion.button 
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => { if (onLogin) onLogin(); }, 300);
            }} 
            animate={highlightLogin ? { 
              y: [0, -8, 0, -6, 0],
              scale: [1, 1.03, 1, 1.02, 1],
              boxShadow: [
                "0 0 15px rgb(var(--brand-orange)/0.4)", 
                "0 0 30px rgb(var(--brand-orange)/0.95)", 
                "0 0 15px rgb(var(--brand-orange)/0.4)"
              ] 
            } : {}}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className={`flex h-[38px] w-full items-center justify-center rounded-xl bg-brand-orange text-[13px] font-bold text-white shadow-[0_0_15px_rgb(var(--brand-orange)/0.4)] transition-all hover:bg-brand-orangeDark hover:shadow-[0_0_20px_rgb(var(--brand-orange)/0.6)] active:scale-95 ${
              highlightLogin ? 'ring-[3px] ring-text-main/20 dark:ring-text-primary/45 ring-offset-2 ring-offset-bg-elevated' : ''
            }`}
          >
            Sign In / Register
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col p-2.5 gap-1 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-main/5 dark:bg-white/10" />
        <span className="px-3 pt-1 pb-1 text-[11px] font-bold uppercase tracking-[1px] text-text-muted dark:text-text-primary/40">Registered User Features</span>
        
        <button 
          onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => { if (onLogin) onLogin(); }, 300); }}
          className="group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-brand-orange/10 text-left"
        >
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/40 transition-colors duration-300 group-hover:text-brand-orange dark:group-hover:text-brand-orange/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-[14px] font-medium text-text-main/70 dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors duration-300 leading-tight">Basket History</span>
            <div className="relative w-full h-[15px] mt-0.5 overflow-hidden">
              <span className="absolute inset-0 text-[11px] text-text-muted dark:text-text-primary/40 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 leading-tight">
                See your smart carts history
              </span>
              <span className="absolute inset-0 text-[11px] font-bold text-brand-orange dark:text-brand-orange translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1 leading-tight">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Sign in to unlock
              </span>
            </div>
          </div>
        </button>

        <button 
          onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => { if (onLogin) onLogin(); }, 300); }}
          className="group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-brand-orange/10 text-left"
        >
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/40 transition-colors duration-300 group-hover:text-brand-orange dark:group-hover:text-brand-orange/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-[14px] font-medium text-text-main/70 dark:text-text-primary/60 group-hover:text-brand-orange dark:group-hover:text-brand-orange transition-colors duration-300 leading-tight">Price Alerts</span>
            <div className="relative w-full h-[15px] mt-0.5 overflow-hidden">
              <span className="absolute inset-0 text-[11px] text-text-muted dark:text-text-primary/40 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 leading-tight">
                Get notified when prices drop
              </span>
              <span className="absolute inset-0 text-[11px] font-bold text-brand-orange dark:text-brand-orange translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1 leading-tight">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Sign in to unlock
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col p-2.5 gap-1">
        {themeToggleBtn}
        <Link href="/help" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-text-main/5 dark:hover:bg-white/5 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-text-muted dark:text-text-primary/60 group-hover:text-text-main dark:group-hover:text-text-primary transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </div>
          <span className="text-[14px] font-medium text-text-main/80 dark:text-text-primary/80 group-hover:text-text-main dark:group-hover:text-text-primary transition-colors">Help / Support</span>
        </Link>
      </div>

      <div className="px-5 pb-4 pt-1 text-center">
         <span className="text-[10px] text-text-muted dark:text-text-primary/30 italic tracking-wide">Join 5,000+ users saving today</span>
      </div>
    </>
  );

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
          className="absolute top-[65px] right-[-14px] flex w-[290px] flex-col overflow-hidden rounded-b-[24px] rounded-t-none bg-bg-elevated/40 dark:bg-bg-elevated/25 backdrop-blur-[35px] border-x border-b border-text-main/5 dark:border-white/5 shadow-md dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          <div className={`absolute top-0 left-0 w-full h-[2px] z-10 bg-gradient-to-r from-transparent via-brand-orange to-transparent transition-all duration-700 ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}`} />
          {isAuthenticated ? authenticatedContent : guestContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}