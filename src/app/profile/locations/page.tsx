"use client";

import { useUserStore } from "@/Store/user_store";
import { motion } from "framer-motion";

export default function LocationsPage() {
  const { locations, isSmartLocationActive, toggleSmartLocation, setDefaultLocation, deleteLocation } = useUserStore();

  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-[#FFDEBA]">My Locations</h1>
        <p className="text-[15px] text-[#FFDEBA]/50">Manage your price-tracking zones to see the best deals near you.</p>
      </div>

      <div className="flex items-center justify-between rounded-[24px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-6 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${isSmartLocationActive ? 'bg-[#EC5800]/20 text-[#EC5800]' : 'bg-[#FFDEBA]/5 text-[#FFDEBA]/40'}`}>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#FFDEBA]">Smart Location</span>
            <span className="text-[13px] text-[#FFDEBA]/50">Automatically use GPS to show prices in nearby stores.</span>
          </div>
        </div>
        
        <button 
          onClick={toggleSmartLocation}
          className={`relative flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${isSmartLocationActive ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}
        >
          <motion.div 
            className="h-5 w-5 rounded-full bg-white shadow-sm ml-1"
            animate={{ x: isSmartLocationActive ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {locations.map((loc) => (
          <div key={loc.id} className="group relative flex flex-col gap-3 rounded-[24px] bg-[rgba(30,26,30,0.4)] border border-[#FFDEBA]/5 p-6 transition-all hover:bg-[rgba(70,59,70,0.3)] hover:border-[#FFDEBA]/10">
            {loc.isDefault && (
              <span className="absolute top-5 right-5 flex items-center justify-center rounded-full bg-[#EC5800]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EC5800]">
                Active Zone
              </span>
            )}
            <h3 className="text-[18px] font-bold text-[#FFDEBA] pr-20">{loc.title}</h3>
            <p className="text-[14px] text-[#FFDEBA]/60 flex items-start gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mt-0.5 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {loc.address}
            </p>
            
            <div className="mt-3 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
              {!loc.isDefault && (
                <button onClick={() => setDefaultLocation(loc.id)} className="text-[13px] font-medium text-[#EC5800] hover:underline">Set as Active</button>
              )}
              <button onClick={() => deleteLocation(loc.id)} className="text-[13px] font-medium text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}

        <button className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-[#FFDEBA]/10 bg-transparent transition-all hover:border-[#EC5800]/50 hover:bg-[#EC5800]/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFDEBA]/10 text-[#FFDEBA]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span className="text-[14px] font-medium text-[#FFDEBA]/70">Add New Address</span>
        </button>
      </div>
    </div>
  );
}