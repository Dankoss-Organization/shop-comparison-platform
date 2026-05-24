/**
 * @file Hero.tsx
 * @brief Main landing page hero section showcasing features and live basket comparison.
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import type { DealCard } from "@/Data/home_data";

const basketsData = {
  healthy: {
    name: "Healthy",
    icon: "🥗",
    items: [
      { icon: "🥑", name: "Hass Avocados (2-pack)", store1: "Silpo", price1: "$4.20", store2: "ATB", price2: "$2.90" },
      { icon: "🐟", name: "Fresh Salmon (300g)", store1: "Novus", price1: "$12.50", store2: "Auchan", price2: "$9.80" }
    ],
    totalSaved: "$4.00",
    percentage: "32%"
  },
  weekend: {
    name: "Weekend",
    icon: "🍕",
    items: [
      { icon: "🍻", name: "Craft Beer (6-pack)", store1: "ATB", price1: "$15.00", store2: "Silpo", price2: "$11.20" },
      { icon: "🍿", name: "Doritos Party Size", store1: "Fora", price1: "$4.50", store2: "ATB", price2: "$3.10" }
    ],
    totalSaved: "$5.20",
    percentage: "26%"
  }
};

export default function Hero({ featured: _featured }: { featured: DealCard[] }) {
  const [activeTab, setActiveTab] = useState<"healthy" | "weekend">("healthy");
  const activeBasket = basketsData[activeTab];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-bg-main py-12 lg:h-[calc(100vh-90px)] lg:min-h-[650px] lg:py-0">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Cart_hero2.png"
          alt="Dankoss background dark"
          fill
          priority
          className="hidden object-cover object-[80%_100%] opacity-90 transition-opacity duration-700 origin-bottom scale-[1.1] dark:block lg:object-[85%_100%] lg:scale-[1.25]" 
        />
        
        <Image
          src="/Cart_hero_light2.png" 
          alt="Dankoss background light"
          fill
          priority
          className="block object-cover object-[80%_100%] opacity-90 transition-opacity duration-700 origin-bottom scale-[1.1] dark:hidden lg:object-[85%_100%] lg:scale-[1.25]" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-bg-darker/60 via-bg-darker/85 to-bg-darker lg:bg-gradient-to-r lg:from-bg-darker lg:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-[1400px] px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">

          <div className="flex h-full flex-col justify-center pt-8 md:pr-10 lg:pr-12 lg:pt-0">
            <div>
              <p className="inline-flex rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-brand-orange backdrop-blur-md">
                Smart Price Tracker
              </p>
              
              <h1 className="mt-4 max-w-[650px] text-[2rem] font-black leading-[1.1] text-text-primary sm:text-[2.5rem] md:text-[3.25rem] md:leading-[1.05] xl:text-[4rem]">
                Score the best deals. Build your ultimate smart cart.
              </h1>
              <p className="mt-4 max-w-[500px] text-sm leading-relaxed text-text-primary/70 sm:text-base md:text-[17px]">
                Instantly compare grocery prices across top supermarkets. Discover seasonal recipes, track your nutrition, and never overpay for your daily essentials again.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href="#discounts-week" className="group relative flex h-12 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border border-transparent px-8 text-sm font-bold tracking-wide text-text-primary shadow-[2px_2px_1px_rgb(var(--brand-orange))] transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.6)] hover:text-text-main focus:border-brand-orange focus:outline-none active:scale-95" style={{ background: "rgb(var(--bg-elevated) / 0.4)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}>
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Start saving now</span>
                  <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]"><div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-text-primary/25 to-transparent" /></div>
                </a>
                <a href="#recipes-season" className="group relative flex h-12 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border border-transparent px-8 text-sm font-bold tracking-wide text-text-primary shadow-[2px_2px_1px_rgb(var(--text-primary)_/_0.2)] transition-all duration-300 hover:-translate-y-[2px] hover:border-text-primary/30 hover:shadow-[0_0_20px_rgb(var(--text-primary)_/_0.15)] hover:text-text-main focus:border-text-primary focus:outline-none active:scale-95" style={{ background: "rgb(var(--bg-elevated) / 0.2)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}>
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Browse recipes</span>
                  <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]"><div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-text-primary/15 to-transparent" /></div>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a href="#download" className="group flex h-12 flex-1 sm:flex-none items-center justify-center sm:justify-start gap-3 rounded-2xl border border-glass/10 bg-bg-deep/40 px-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:shadow-[0_10px_20px_rgb(var(--brand-orange)_/_0.15)] backdrop-blur-md">
                  <svg className="h-6 w-6 text-text-main transition-all duration-300 group-hover:scale-110 group-hover:text-brand-orange" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none"><span className="mb-[2px] text-[9px] font-semibold text-text-primary/60">GET IT ON</span><span className="text-sm font-bold tracking-wide text-text-primary">Google Play</span></div>
                </a>
                <a href="#download" className="group flex h-12 flex-1 sm:flex-none items-center justify-center sm:justify-start gap-3 rounded-2xl border border-glass/10 bg-bg-deep/40 px-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:shadow-[0_10px_20px_rgb(var(--brand-orange)_/_0.15)] backdrop-blur-md">
                  <svg className="h-6 w-6 text-text-main transition-all duration-300 group-hover:scale-110 group-hover:text-brand-orange" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none"><span className="mb-[2px] text-[9px] font-semibold text-text-primary/60">Download on the</span><span className="text-sm font-bold tracking-wide text-text-primary">App Store</span></div>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex h-full w-full items-center justify-center lg:translate-y-10">
            <div 
              className={`
                relative w-full max-w-full sm:max-w-[400px] lg:max-h-[480px] overflow-hidden rounded-3xl sm:rounded-[2.5rem] 
                bg-bg-elevated/[0.25] backdrop-blur-[35px]
                border border-glass/10 p-6 sm:p-8
                shadow-[0_20px_40px_rgba(0,0,0,0.5)] lg:shadow-[0_30px_60px_rgba(0,0,0,0.7)]
                animate-in fade-in zoom-in-95 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                transition-all hover:-translate-y-2 hover:bg-bg-elevated/[0.4] hover:shadow-[0_30px_60px_rgb(var(--brand-orange)_/_0.2)] hover:border-glass/20
              `}
            >
              <div className="absolute left-0 top-0 h-[2px] w-full scale-x-100 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-40" />

              <div className="flex items-center justify-between border-b border-glass/10 pb-4 sm:pb-5">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange"></span>
                    </span>
                    Live Comparison
                  </p>
                  <h2 className="mt-1 text-lg sm:text-xl font-black text-text-primary">Smart basket</h2>
                </div>

                <div className="flex rounded-xl border border-glass/5 bg-bg-deep/20 p-1">
                  <button 
                    onClick={() => setActiveTab("healthy")}
                    className={`rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-bold transition-all duration-300 ${activeTab === "healthy" ? "bg-text-primary/15 text-brand-orange shadow-inner" : "text-text-primary/50 hover:bg-text-primary/5"}`}
                  >
                    🥗 Healthy
                  </button>
                  <button 
                    onClick={() => setActiveTab("weekend")}
                    className={`rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-bold transition-all duration-300 ${activeTab === "weekend" ? "bg-text-primary/15 text-brand-orange shadow-inner" : "text-text-primary/50 hover:bg-text-primary/5"}`}
                  >
                    🍕 Weekend
                  </button>
                </div>
              </div>

              <div className="relative mt-5 sm:mt-6 min-h-[140px] sm:min-h-[160px] space-y-4 sm:space-y-5">
                {activeBasket.items.map((item, idx) => (
                  <div 
                    key={`${activeTab}-${idx}`} 
                    className="group flex cursor-pointer items-center gap-3 sm:gap-4 fill-mode-both animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-glass/10 bg-glass/5 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-orange/50 group-hover:bg-brand-orange/10">
                      <span className="text-xl sm:text-2xl">{item.icon}</span>
                    </div>
                    <div className="w-full">
                      <p className="text-xs sm:text-[14px] font-bold text-text-primary transition-colors group-hover:text-text-main">{item.name}</p>
                      <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-glass/5 bg-bg-deep/20 px-2 py-1 sm:px-2.5">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-text-primary/40">{item.store1}</span>
                          <span className="text-[10px] sm:text-[12px] text-text-primary/30 line-through">{item.price1}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-primary opacity-20 transition-transform sm:h-3.5 sm:w-3.5 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-2 py-1 shadow-[0_0_15px_rgb(var(--brand-orange)_/_0.1)] transition-all sm:px-2.5 group-hover:bg-brand-orange/20">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-brand-orange/80">{item.store2}</span>
                          <span className="text-[10px] sm:text-[12px] font-black text-brand-orange">{item.price2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 border-t border-glass/10 pt-4 sm:pt-5">
                <div className="mb-2 sm:mb-3 flex items-end justify-between">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-primary/50">You Save Today</p>
                  <p className="text-xl sm:text-2xl font-black text-text-primary animate-in fade-in zoom-in duration-700" key={activeBasket.totalSaved}>
                    {activeBasket.totalSaved}
                  </p>
                </div>
                <div className="relative h-1.5 sm:h-2 w-full overflow-hidden rounded-full border border-glass/5 bg-bg-deep/30">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-brand-orange-dark to-brand-orange shadow-[0_0_15px_rgb(var(--brand-orange)_/_0.5)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    style={{ width: activeBasket.percentage }}
                  />
                </div>
                <div className="mt-2 sm:mt-3 flex items-center justify-between">
                   <span className="rounded bg-brand-orange/10 border border-brand-orange/20 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter text-brand-orange">Verified</span>
                   <p className="text-[10px] sm:text-[11px] font-medium tracking-tight text-text-primary/40">~{activeBasket.percentage} cheaper basket</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}