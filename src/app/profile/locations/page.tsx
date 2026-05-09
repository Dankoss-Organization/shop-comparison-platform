/**
 * @file LocationsPage.tsx
 * @description Manage user locations with adaptive glassmorphism for Light/Dark themes.
 */

"use client";

import { useUserStore } from "@/Store/user_store";
import { motion, Variants } from "framer-motion";

export default function LocationsPage() {
  const { locations, isSmartLocationActive, toggleSmartLocation, setDefaultLocation, deleteLocation } = useUserStore();

  const container: Variants = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
  };

  const item: Variants = { 
    hidden: { opacity: 0, scale: 0.95 }, 
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } 
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto pb-10">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">My Locations</h1>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Manage your price-tracking zones for hyper-local deals.</p>
      </div>

      <div className="group relative overflow-hidden flex items-center justify-between rounded-[32px] bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 md:p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] transition-all hover:border-brand-orange/20 dark:hover:border-brand-orange/20">
        <div className="absolute -right-[10%] -top-[50%] w-[40%] h-[200%] rounded-full bg-brand-orange/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-5">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] transition-all duration-500 ${
            isSmartLocationActive 
              ? 'bg-brand-orange text-white shadow-md' 
              : 'bg-black/5 dark:bg-black/40 text-text-main/40 dark:text-text-primary/40 shadow-inner dark:shadow-[2px_2px_1px_rgba(30,26,30,0.8)]'
          }`}>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">Smart Location</span>
            <span className="text-[13px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/60">Use GPS to automatically fetch prices from the closest stores.</span>
          </div>
        </div>
        
        <button onClick={toggleSmartLocation} className={`relative z-10 flex h-[34px] w-[60px] shrink-0 items-center rounded-full transition-all duration-500 shadow-inner ${
          isSmartLocationActive ? 'bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.4)]' : 'bg-black/10 dark:bg-black/40'
        }`}>
          <motion.div 
            className="h-[26px] w-[26px] rounded-full bg-white dark:bg-[#FFDEBA] shadow-sm ml-1"
            animate={{ x: isSmartLocationActive ? 26 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {locations.map((loc) => (
          <motion.div variants={item} key={loc.id} className="group relative flex flex-col justify-between rounded-[32px] bg-white/50 dark:bg-white/5 p-7 backdrop-blur-[10px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 hover:border-brand-orange/20 dark:hover:border-white/10">
            <div>
              {loc.isDefault && (
                <div className="absolute top-6 right-6">
                  <span className="rounded-[8px] bg-brand-orange/10 dark:bg-[rgba(45,40,45,0.7)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1px] text-brand-orange dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_#EC5800] backdrop-blur-md">
                    Active Zone
                  </span>
                </div>
              )}
              <h3 className="text-[20px] font-bold text-text-main dark:text-text-primary pr-24 mb-3">{loc.title}</h3>
              <p className="text-[14px] font-medium tracking-[-0.2px] text-text-muted dark:text-text-primary/50 flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] mt-[1px] shrink-0 text-brand-orange"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {loc.address}
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between opacity-50 transition-opacity duration-300 group-hover:opacity-100">
              {!loc.isDefault ? (
                <button onClick={() => setDefaultLocation(loc.id)} className="text-[13px] font-bold uppercase tracking-[1px] text-brand-orange hover:text-orange-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-orange hover:after:w-full after:transition-all after:duration-300">
                  Set as Active
                </button>
              ) : <div/>}
              <button onClick={() => deleteLocation(loc.id)} className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </motion.div>
        ))}

        <motion.button variants={item} className="group flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[32px] border-2 border-dashed border-black/10 dark:border-[#FFDEBA]/10 bg-white/30 dark:bg-[rgba(30,26,30,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/40 hover:bg-brand-orange/5 hover:shadow-sm dark:hover:shadow-[0_15px_30px_rgba(236,88,0,0.1)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 dark:bg-[rgba(45,40,45,0.6)] shadow-sm dark:shadow-[2px_2px_1px_rgba(255,222,186,0.1)] text-text-main/50 dark:text-text-primary/70 transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white dark:group-hover:shadow-[2px_2px_1px_rgba(236,88,0,0.4)] group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span className="text-[15px] font-bold uppercase tracking-[1px] text-text-muted dark:text-text-primary/60 transition-colors duration-300 group-hover:text-brand-orange dark:group-hover:text-text-primary">Add New Address</span>
        </motion.button>

        <motion.div variants={item} className="group relative col-span-1 md:col-span-2 h-[400px] overflow-hidden rounded-[36px] bg-white/50 dark:bg-[rgba(30,26,30,0.4)] border border-black/5 dark:border-[#FFDEBA]/10 p-2 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_40px_rgba(0,0,0,0.3)] transition-all hover:shadow-md dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-brand-orange/20">
          
          <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black/5 dark:bg-bg-deep">
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-20 text-black dark:text-[#FFDEBA]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="absolute left-1/3 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand-orange/40 bg-brand-orange/5 pointer-events-none" />
            
            <div className="absolute left-1/3 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange shadow-[0_0_20px_#EC5800]">
              <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-[24px] bg-white/80 dark:bg-[rgba(45,40,45,0.85)] backdrop-blur-xl border border-black/5 dark:border-[#FFDEBA]/10 p-5 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">Active Zone: {locations.find(l => l.isDefault)?.title || "None"}</span>
                  <span className="text-[13px] font-medium tracking-[-0.5px] text-[#4ADE80]">3 stores found within 1.5km</span>
                </div>
              </div>
              <button className="group/scan relative flex h-[42px] items-center justify-center overflow-hidden rounded-[14px] bg-brand-orange px-6 text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:brightness-110 active:scale-95"
                style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}>
                <span className="relative z-10">Scan Deals</span>
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover/scan:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>
              </button>
            </div>
          </div>
          
        </motion.div>
      </motion.div>
    </div>
  );
}