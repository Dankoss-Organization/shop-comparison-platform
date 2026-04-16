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

/**
 * @brief Hero component with a dynamic "Smart Basket" widget.
 * Allows users to toggle between different basket types to see price comparisons.
 * @param {Object} props Component properties.
 * @param {DealCard[]} props.featured Array of featured deal cards (currently unused).
 * @returns {JSX.Element} The rendered hero section.
 */
export default function Hero({ featured: _featured }: { featured: DealCard[] }) {
  const [activeTab, setActiveTab] = useState<"healthy" | "weekend">("healthy");
  const activeBasket = basketsData[activeTab];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[calc(100vh-90px)] min-h-[650px] overflow-hidden bg-[#151315]">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Cart_hero2.png"
          alt="Dankoss background"
          fill
          priority
          className="object-cover origin-bottom object-[80%_100%] lg:object-[85%_100%] scale-[1.1] lg:scale-[1.25] opacity-90 transition-opacity duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151315] via-[#151315]/85 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-[1400px] px-6 md:px-12">
        <div className="grid h-full w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          <div className="flex h-full flex-col justify-center pr-4 pt-8 lg:pt-0">
            <div>
              <p className="inline-flex rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-orangeSoft backdrop-blur-md">
                Smart Price Tracker
              </p>
              
              <h1 className="mt-4 max-w-[650px] text-[2.5rem] font-black leading-[1.05] text-[#FFDEBA] md:text-[3.25rem] xl:text-[4rem]">
                Score the best deals. Build your ultimate smart cart.
              </h1>
              <p className="mt-4 max-w-[500px] text-base md:text-[17px] leading-relaxed text-[#FFDEBA]/70">
                Instantly compare grocery prices across top supermarkets. Discover seasonal recipes, track your nutrition, and never overpay for your daily essentials again.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a href="#discounts-week" className="group relative flex h-[48px] items-center justify-center overflow-hidden rounded-[24px] border border-transparent px-8 text-[14px] font-bold tracking-wide text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95" style={{ background: "rgba(45, 40, 45, 0.4)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}>
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Start saving now</span>
                  <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]"><div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.25)] to-transparent" /></div>
                </a>
                <a href="#recipes-season" className="group relative flex h-[48px] items-center justify-center overflow-hidden rounded-[24px] border border-transparent px-8 text-[14px] font-bold tracking-wide text-[#FFDEBA] shadow-[2px_2px_1px_rgba(255,222,186,0.2)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#FFDEBA]/30 hover:shadow-[0_0_20px_rgba(255,222,186,0.15)] hover:text-white focus:border-[#FFDEBA] focus:outline-none active:scale-95" style={{ background: "rgba(45, 40, 45, 0.2)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}>
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Browse recipes</span>
                  <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]"><div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.15)] to-transparent" /></div>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a href="#download" className="group flex h-[48px] items-center gap-3 rounded-[16px] border border-white/10 bg-black/40 px-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#EC5800]/50 hover:bg-[#EC5800]/10 hover:shadow-[0_10px_20px_rgba(236,88,0,0.15)] backdrop-blur-md">
                  <svg className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#EC5800]" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none"><span className="text-[9px] font-semibold text-[#FFDEBA]/60 mb-[2px]">GET IT ON</span><span className="text-[14px] font-bold text-[#FFDEBA] tracking-wide">Google Play</span></div>
                </a>
                <a href="#download" className="group flex h-[48px] items-center gap-3 rounded-[16px] border border-white/10 bg-black/40 px-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#EC5800]/50 hover:bg-[#EC5800]/10 hover:shadow-[0_10px_20px_rgba(236,88,0,0.15)] backdrop-blur-md">
                  <svg className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#EC5800]" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none"><span className="text-[9px] font-semibold text-[#FFDEBA]/60 mb-[2px]">Download on the</span><span className="text-[14px] font-bold text-[#FFDEBA] tracking-wide">App Store</span></div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex h-full w-full items-center justify-center z-20 lg:translate-y-10">
            <div 
              className={`
                relative w-full max-w-[400px] max-h-[480px] overflow-hidden rounded-[2.5rem] 
                bg-[rgba(70,59,70,0.25)] backdrop-blur-[35px]
                border border-white/10 p-8
                shadow-[0_30px_60px_rgba(0,0,0,0.7)]
                animate-in fade-in zoom-in-95 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                transition-all hover:-translate-y-2 hover:bg-[rgba(70,59,70,0.4)] hover:shadow-[0_30px_60px_rgba(236,88,0,0.2)] hover:border-white/20
              `}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EC5800] to-transparent opacity-40 scale-x-100" />

              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC5800]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC5800] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EC5800]"></span>
                    </span>
                    Live Comparison
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#FFDEBA]">Smart basket</h2>
                </div>

                <div className="flex rounded-xl bg-black/20 p-1 border border-white/5">
                  <button 
                    onClick={() => setActiveTab("healthy")}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-300 ${activeTab === "healthy" ? "bg-[#FFDEBA]/15 text-[#EC5800] shadow-inner" : "text-[#FFDEBA]/50 hover:bg-[#FFDEBA]/5"}`}
                  >
                    🥗 Healthy
                  </button>
                  <button 
                    onClick={() => setActiveTab("weekend")}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-300 ${activeTab === "weekend" ? "bg-[#FFDEBA]/15 text-[#EC5800] shadow-inner" : "text-[#FFDEBA]/50 hover:bg-[#FFDEBA]/5"}`}
                  >
                    🍕 Weekend
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-5 relative min-h-[160px]">
                {activeBasket.items.map((item, idx) => (
                  <div 
                    key={`${activeTab}-${idx}`} 
                    className="flex items-center gap-4 group animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both cursor-pointer"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#EC5800]/50 group-hover:bg-[#EC5800]/10">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="w-full">
                      <p className="text-[14px] font-bold text-[#FFDEBA] transition-colors group-hover:text-white">{item.name}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-lg bg-black/20 px-2.5 py-1 border border-white/5">
                          <span className="text-[9px] uppercase tracking-wider text-[#FFDEBA]/40">{item.store1}</span>
                          <span className="text-[12px] text-[#FFDEBA]/30 line-through">{item.price1}</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFDEBA" strokeWidth="2.5" className="opacity-20 transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        <div className="flex items-center gap-2 rounded-lg bg-[#EC5800]/10 px-2.5 py-1 border border-[#EC5800]/30 shadow-[0_0_15px_rgba(236,88,0,0.1)] transition-all group-hover:bg-[#EC5800]/20">
                          <span className="text-[9px] uppercase tracking-wider text-[#EC5800]/80">{item.store2}</span>
                          <span className="text-[12px] font-black text-[#EC5800]">{item.price2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[11px] uppercase tracking-wider text-[#FFDEBA]/50 font-bold">You Save Today</p>
                  <p className="text-2xl font-black text-[#FFDEBA] animate-in fade-in zoom-in duration-700" key={activeBasket.totalSaved}>
                    {activeBasket.totalSaved}
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-black/30 border border-white/5 overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D34205] to-[#EC5800] rounded-full shadow-[0_0_15px_rgba(236,88,0,0.5)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    style={{ width: activeBasket.percentage }}
                  />
                </div>
                <div className="mt-3 flex justify-between items-center">
                   <span className="text-[10px] text-[#EC5800] font-bold px-2 py-0.5 rounded bg-[#EC5800]/10 border border-[#EC5800]/20 uppercase tracking-tighter">Verified</span>
                   <p className="text-[11px] font-medium text-[#FFDEBA]/40 tracking-tight">~{activeBasket.percentage} cheaper basket</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}