/**
 * @file page.tsx
 * @brief Dashboard Overview with pixel-perfect Avatar UI and Catalog glassmorphism.
 */

"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/Store/user_store";

export default function OverviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { displayName, email, avatarUrl, setAvatarUrl } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const highQualityBase64 = canvas.toDataURL('image/jpeg', 0.95);
          setAvatarUrl(highQualityBase64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarUrl("/user.svg");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10">
      
      <div className="flex flex-col gap-6 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 relative">
          
          <div className="relative group shrink-0 w-[110px] h-[110px]">
            <div 
              className="absolute inset-0 p-[3px] rounded-full bg-gradient-to-br from-brand-orange via-brand-orange/30 to-transparent shadow-[0_0_30px_rgba(236,88,0,0.25)] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[rgba(30,26,30,0.8)] overflow-hidden">
                 
                 <img 
                   src={avatarUrl} 
                   alt={displayName} 
                   className={`transition-opacity duration-300 group-hover:opacity-30 ${
                     avatarUrl === "/user.svg" 
                       ? "w-[50px] h-[50px] object-contain opacity-40 dark:opacity-80" 
                       : "h-full w-full object-cover opacity-90"
                   }`} 
                 />
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-text-main dark:text-white"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                 </div>
              </div>
              <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
            </div>

            {avatarUrl !== "/user.svg" && (
              <button
                onClick={handleRemovePhoto}
                title="Remove photo"
                className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-transform hover:scale-110 active:scale-95 z-20 border-2 border-bg-main"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}

            <div className="absolute bottom-0 right-0 pointer-events-none flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition-transform group-hover:scale-110 z-10 border-2 border-bg-main">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            </div>
          </div>
          
          <div className="flex flex-col gap-2.5 w-full items-center md:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h2 className="text-[32px] sm:text-[36px] font-bold tracking-[1px] text-text-main leading-none font-serif drop-shadow-sm">
                {displayName}
              </h2>
              <span className="flex items-center gap-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1px] text-brand-orange backdrop-blur-md shadow-[0_0_15px_rgba(236,88,0,0.1)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 15l-2 5l9-5l-9-5l2 5Z"/><circle cx="12" cy="12" r="10"/></svg>
                Savvy Shopper
              </span>
            </div>
            <p className="text-[15px] sm:text-[16px] font-medium text-text-muted tracking-wide cursor-default select-none">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-md mt-2">
          <div className="flex justify-between items-end">
            <span className="text-[12px] font-bold uppercase tracking-[1px] text-text-muted">Profile Setup</span>
            <span className="text-[13px] font-bold text-brand-orange">100%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden shadow-inner border border-black/5 dark:border-white/5">
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-brand-orange to-orange-400 rounded-full shadow-[0_0_10px_rgba(236,88,0,0.5)]" />
          </div>
          <span className="text-[11px] text-text-muted opacity-80 cursor-default select-none">
            Your profile is fully optimized!
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 z-10">
        <h3 className="text-[20px] font-bold tracking-[1px] text-text-main pl-1 font-serif cursor-default select-none drop-shadow-sm">
          Your Impact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="group flex flex-col justify-between rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
            <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px] cursor-default select-none">Total Savings</span>
            <div className="mt-4 flex flex-col cursor-default select-none">
              <div className="flex items-end gap-1.5">
                <span className="text-[42px] font-black text-brand-orange leading-none tracking-tight">
                  $<Counter from={0} to={154} duration={1.5} />
                </span>
                <span className="text-[20px] font-bold text-brand-orange/60 leading-tight mb-1">.20</span>
              </div>
              <span className="text-[12px] font-medium text-[#4ADE80] mt-2 flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="m18 15-6-6-6 6"/></svg>
                12% from last month
              </span>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
            <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px] cursor-default select-none">Active Alerts</span>
            <div className="mt-4 flex flex-col cursor-default select-none">
              <span className="text-[42px] font-black text-text-main leading-none tracking-tight drop-shadow-sm">
                <Counter from={0} to={2} duration={1} />
              </span>
              <span className="text-[12px] font-medium text-text-muted mt-2">
                Tracking 2 items globally
              </span>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
            <div className="relative z-10 flex flex-col cursor-default select-none">
              <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px]">Top Store</span>
              <span className="mt-4 text-[32px] font-black text-text-main leading-none tracking-tight drop-shadow-sm">Сільпо</span>
              <span className="text-[12px] font-medium text-text-muted mt-3">
                Most frequent deals found
              </span>
            </div>
            <div className="absolute -right-4 -bottom-6 opacity-[0.03] dark:opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
               <span className="text-[120px] font-black italic text-text-main dark:text-white">С</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <h3 className="text-[20px] font-bold tracking-[1px] text-text-main font-serif cursor-default select-none drop-shadow-sm">Recent Baskets</h3>
            <button className="text-[12px] font-bold text-brand-orange uppercase tracking-wide hover:brightness-110 transition-all drop-shadow-sm">View All</button>
          </div>
          
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-8 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-md cursor-pointer">
            <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-text-main drop-shadow-sm">Weekend BBQ Cart</span>
                      <span className="text-[12px] text-text-muted">Saved 2 days ago</span>
                    </div>
                  </div>
                  <span className="text-[20px] font-black text-brand-orange drop-shadow-sm">$42.50</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-bold uppercase tracking-[1px] text-text-muted">Optimized across:</span>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/10 text-[11px] font-bold text-text-main shadow-inner">Сільпо</div>
                  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/10 text-[11px] font-bold text-text-main shadow-inner">NOVUS</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-black/40 text-[11px] font-bold text-text-muted border border-black/5 dark:border-white/5">+2</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-orange/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-brand-orange/20" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end pl-1 pr-2">
            <div className="flex items-center gap-3 cursor-default select-none">
              <h3 className="text-[20px] font-bold tracking-[1px] text-text-main font-serif drop-shadow-sm">Price Alerts Feed</h3>
              <span className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/5 px-2.5 py-1 text-[10px] text-text-muted font-medium border border-black/5 dark:border-white/5 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                Synced 2m ago
              </span>
            </div>
            <button className="text-[12px] font-bold text-brand-orange uppercase tracking-wide hover:brightness-110 transition-all drop-shadow-sm">Manage</button>
          </div>
          
          <div className="flex h-full flex-col justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-black/40 p-2 border border-black/5 dark:border-white/5 shadow-inner">
                  <div className="h-full w-full rounded-md bg-brand-orange/20 flex items-center justify-center text-[18px]">🥑</div>
                </div>
                <div className="flex flex-col cursor-default select-none">
                  <span className="text-[15px] font-bold text-text-main drop-shadow-sm">Hass Avocados (2-pack)</span>
                  <div className="flex items-center gap-2 text-[12px] text-text-muted mt-0.5">
                    <span>Target: <strong className="text-brand-orange">$2.90</strong></span>
                    <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                    <span>Current: $3.10</span>
                  </div>
                </div>
              </div>
              <div className="w-[60px] h-[30px] opacity-80 pointer-events-none drop-shadow-[0_0_5px_rgba(236,88,0,0.4)]">
                <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
                  <path d="M0,25 C10,25 15,10 25,15 C35,20 45,5 60,10" fill="none" stroke="currentColor" className="text-brand-orange" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="10" r="3" fill="currentColor" className="text-brand-orange" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-black/40 p-2 border border-black/5 dark:border-white/5 shadow-inner">
                  <div className="h-full w-full rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center text-[18px]">☕</div>
                </div>
                <div className="flex flex-col cursor-default select-none">
                  <span className="text-[15px] font-bold text-text-main drop-shadow-sm">Jacobs Monarch 200g</span>
                  <div className="flex items-center gap-2 text-[12px] text-text-muted mt-0.5">
                    <span>Target: <strong className="text-brand-orange">$5.00</strong></span>
                    <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                    <span>Current: <span className="line-through opacity-70">$6.20</span> $5.00</span>
                  </div>
                </div>
              </div>
              <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-green-500/10 text-green-500 dark:text-green-400 text-[11px] font-bold border border-green-500/20 cursor-default select-none shadow-sm">
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