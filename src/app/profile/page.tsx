/**
 * @file page.tsx
 * @brief Default profile page showing user overview, gamified stats, and quick actions.
 */

"use client";

import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-12">
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative">
        <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center rounded-full bg-[rgba(30,26,30,0.6)] border-[3px] border-[#EC5800] shadow-[0_0_30px_rgba(236,88,0,0.25)]">
           <Image src="/user.svg" alt="Sofiia M." width={50} height={50} className="opacity-90" />
        </div>
        
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-[36px] font-bold tracking-[1px] text-[#FFDEBA] leading-none">
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
        <h3 className="text-[18px] font-bold uppercase tracking-[1px] text-[#FFDEBA]/80 pl-1">
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
            <div className="absolute -right-4 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
               <span className="text-[120px] font-black italic">С</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}