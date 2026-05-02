/**
 * @file profile_dropdown.tsx
 * @description A dropdown component that displays user profile settings when authenticated, or login prompts when accessed by a guest.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "@/Store/user_store";
import { useRouter } from "next/navigation";

/**
 * @interface ProfileDropdownProps
 * @description Defines the properties accepted by the ProfileDropdown component.
 * * @property {boolean} isOpen - Controls the visibility of the dropdown.
 * @property {() => void} onClose - Callback triggered to close the dropdown.
 * @property {boolean} [isAuthenticated] - Determines if the authenticated or guest view is shown.
 * @property {() => void} [onLogout] - Optional callback executed when the user logs out.
 * @property {() => void} [onLogin] - Optional callback executed when the user initiates login.
 * @property {boolean} [highlightLogin] - Triggers a visual animation on the login button if true.
 */
interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean; 
  onLogout?: () => void;
  onLogin?: () => void; 
  highlightLogin?: boolean;
}

/**
 * @function ProfileDropdown
 * @description Main component for the profile dropdown menu. It dynamically renders 
 * either user-specific links (e.g., account, basket history) or guest actions based on authentication state.
 * * @param {ProfileDropdownProps} props - The properties passed to the component.
 * @returns {JSX.Element} The animated profile dropdown component.
 */
export default function ProfileDropdown({ isOpen, onClose, isAuthenticated = false, onLogout, onLogin, highlightLogin = false }: ProfileDropdownProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  const { displayName, email, avatarUrl, logout } = useUserStore();

  const themeToggleBtn = (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        setIsDarkMode(!isDarkMode);
      }}
      className="group flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#FFDEBA]/5 hover:shadow-sm"
    >
      <div className="flex items-center gap-3.5">
        <div className="relative flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#FFDEBA] transition-colors">
          <motion.div
            initial={false}
            animate={{ scale: isDarkMode ? 1 : 0, rotate: isDarkMode ? 0 : -90, opacity: isDarkMode ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ scale: isDarkMode ? 0 : 1, rotate: isDarkMode ? 90 : 0, opacity: isDarkMode ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </motion.div>
        </div>
        <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">
          Appearance
        </span>
      </div>
      <div className={`flex h-[22px] w-[40px] items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
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
      <div className="flex items-center gap-4 p-5 bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(30,26,30,0.8)] overflow-hidden border border-[#FFDEBA]/10 shadow-sm">
          <img 
            src={avatarUrl} 
            alt="Profile" 
            className={
              avatarUrl === "/user.svg" 
                ? "h-[60%] w-[60%] object-contain opacity-80" 
                : "h-full w-full object-cover"
            }
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] font-bold tracking-[0.5px] text-[#FFDEBA] leading-tight">{displayName}</span>
          <span className="text-[12px] font-medium tracking-[-0.2px] text-[#FFDEBA]/50 leading-tight">{email}</span>
        </div>
      </div>

      <div className="flex flex-col p-2.5 gap-1 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
        <Link href="/profile" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">My Account</span>
        </Link>

        <Link href="/profile/history" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">Basket History</span>
        </Link>

        <Link href="/profile/alerts" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">Price Alerts</span>
          <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#EC5800] shadow-[0_0_8px_rgba(236,88,0,0.6)] text-[10px] font-bold text-white">2</span>
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
          <div className="flex h-5 w-5 items-center justify-center text-red-400/80 group-hover:text-red-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </div>
          <span className="text-[14px] font-medium text-red-400/80 group-hover:text-red-500 transition-colors">Log Out</span>
        </button>
      </div>
    </>
  );

  const guestContent = (
    <>
      <div className="flex flex-col items-center gap-3 p-5 bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
        <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[rgba(30,26,30,0.4)] shadow-[inset_0_1px_0_rgba(255,222,186,0.1)] border border-[#FFDEBA]/10">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#FFDEBA]/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <span className="text-[15px] font-bold text-[#FFDEBA] leading-tight mt-1">Welcome to DANKOSS</span>
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
                "0 0 15px rgba(236,88,0,0.4)", 
                "0 0 30px rgba(236,88,0,0.95)", 
                "0 0 15px rgba(236,88,0,0.4)"
              ] 
            } : {}}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className={`flex h-[38px] w-full items-center justify-center rounded-xl bg-[#EC5800] text-[13px] font-bold text-white shadow-[0_0_15px_rgba(236,88,0,0.4)] transition-all hover:bg-[#ff6a0d] hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] active:scale-95 ${
              highlightLogin ? 'ring-[3px] ring-[#FFDEBA]/45 ring-offset-2 ring-offset-[#463b46]' : ''
            }`}
          >
            Sign In / Register
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col p-2.5 gap-1 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFDEBA]/10" />
        <span className="px-3 pt-1 pb-1 text-[11px] font-bold uppercase tracking-[1px] text-[#FFDEBA]/40">Registered User Features</span>
        
        <button 
          onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => { if (onLogin) onLogin(); }, 300); }}
          className="group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/10 text-left"
        >
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/40 transition-colors duration-300 group-hover:text-[#EC5800]/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-[14px] font-medium text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors duration-300 leading-tight">Basket History</span>
            <div className="relative w-full h-[15px] mt-0.5 overflow-hidden">
              <span className="absolute inset-0 text-[11px] text-[#FFDEBA]/40 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 leading-tight">
                See your smart carts history
              </span>
              <span className="absolute inset-0 text-[11px] font-bold text-[#EC5800] translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1 leading-tight">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Sign in to unlock
              </span>
            </div>
          </div>
        </button>

        <button 
          onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => { if (onLogin) onLogin(); }, 300); }}
          className="group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#EC5800]/10 text-left"
        >
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/40 transition-colors duration-300 group-hover:text-[#EC5800]/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-[14px] font-medium text-[#FFDEBA]/60 group-hover:text-[#EC5800] transition-colors duration-300 leading-tight">Price Alerts</span>
            <div className="relative w-full h-[15px] mt-0.5 overflow-hidden">
              <span className="absolute inset-0 text-[11px] text-[#FFDEBA]/40 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 leading-tight">
                Get notified when prices drop
              </span>
              <span className="absolute inset-0 text-[11px] font-bold text-[#EC5800] translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1 leading-tight">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Sign in to unlock
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col p-2.5 gap-1">
        {themeToggleBtn}
        <Link href="/help" onClick={onClose} className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[#FFDEBA]/5 hover:shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center text-[#FFDEBA]/60 group-hover:text-[#FFDEBA] transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </div>
          <span className="text-[14px] font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA] transition-colors">Help / Support</span>
        </Link>
      </div>

      <div className="px-5 pb-4 pt-1 text-center">
         <span className="text-[10px] text-[#FFDEBA]/30 italic tracking-wide">Join 5,000+ users saving today</span>
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
          className="absolute top-[65px] right-[-14px] flex w-[290px] flex-col overflow-hidden rounded-b-[24px] rounded-t-none bg-[rgba(70,59,70,0.25)] backdrop-blur-[35px] border-x border-b border-[#FFDEBA]/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          <div className={`absolute top-0 left-0 w-full h-[2px] z-10 bg-gradient-to-r from-transparent via-[#EC5800] to-transparent transition-all duration-700 ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}`} />
          {isAuthenticated ? authenticatedContent : guestContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}