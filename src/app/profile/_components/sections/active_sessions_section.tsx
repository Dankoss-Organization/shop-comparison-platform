"use client";

import SessionCard from "@/app/profile/_components/cards/session_card";

export default function ActiveSessionsSection() {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <SessionCard 
        device="MacBook Pro" 
        location="Kyiv, Ukraine" 
        status="Current Session" 
        active 
      />
      <SessionCard 
        device="iPhone 15 Pro" 
        location="Kyiv, Ukraine" 
        status="Active 2h ago" 
      />
      
      <button className="text-[12px] sm:text-[13px] font-bold text-red-500/80 dark:text-red-400/60 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 text-left pl-2 mt-1">
        Terminate all other sessions
      </button>
    </div>
  );
}