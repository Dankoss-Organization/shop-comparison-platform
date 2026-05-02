"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center"> 
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EC5800] opacity-[0.15] blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-[120px] font-black leading-none tracking-tighter text-transparent md:text-[180px]" style={{ WebkitTextStroke: "2px #EC5800" }}>
          404
        </h1>
        
        <h2 className="mt-4 text-2xl font-bold tracking-wide text-[#FFDEBA] md:text-4xl font-serif">
          Aisle Not Found
        </h2>
        
        <p className="mt-4 max-w-[400px] text-sm leading-relaxed text-[#FFDEBA]/60 md:text-base">
          Looks like this product has been moved or doesn't exist. Let's get you back to the fresh deals.
        </p>

        <Link 
          href="/" 
          className="group relative mt-10 flex h-14 w-full max-w-[240px] items-center justify-center overflow-hidden rounded-full bg-[#EC5800] text-[13px] font-black tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(236,88,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(236,88,0,0.5)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            BACK TO HOME
          </span>
        </Link>
      </motion.div>
    </div>
  );
}