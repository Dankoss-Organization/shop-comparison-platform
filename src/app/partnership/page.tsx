"use client";

import { motion } from "framer-motion";

export default function PartnershipPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-20 pt-10">
      <div className="pointer-events-none absolute right-[0%] top-[20%] z-0 h-[600px] w-[600px] rounded-full bg-[#EC5800] opacity-[0.08] blur-[150px]" />

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-2 md:px-10 lg:gap-24">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#EC5800]">For Retailers</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#FFDEBA] md:text-5xl lg:text-6xl font-serif">
            Grow your reach with DANKOSS.
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-[#FFDEBA]/60">
            Integrate your inventory with our smart aggregator. We bring highly-motivated, conversion-ready shoppers directly to your products by highlighting your best deals.
          </p>
          
          <div className="mt-10 space-y-6">
            {[
              { title: "Direct API Integration", desc: "Seamlessly sync your catalog, pricing, and stock levels in real-time." },
              { title: "Data-Driven Insights", desc: "Gain access to analytics on how your products perform against competitors." }
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EC5800] text-xs text-white">✓</div>
                <div>
                  <h4 className="font-bold text-[#FFDEBA]">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-[#FFDEBA]/50">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-[32px] border border-[#ffffff10] bg-[rgba(30,26,30,0.6)] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-10">
            <h3 className="mb-6 text-2xl font-bold text-white">Partner Application</h3>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Company Name</label>
                <input type="text" placeholder="e.g. Fresh Foods Ltd." className="h-12 w-full rounded-xl border border-[#ffffff10] bg-[#1a171a] px-4 text-sm text-[#FFDEBA] outline-none transition-colors focus:border-[#EC5800] focus:bg-[#252025]" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Contact Name</label>
                  <input type="text" placeholder="John Doe" className="h-12 w-full rounded-xl border border-[#ffffff10] bg-[#1a171a] px-4 text-sm text-[#FFDEBA] outline-none transition-colors focus:border-[#EC5800] focus:bg-[#252025]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Work Email</label>
                  <input type="email" placeholder="john@company.com" className="h-12 w-full rounded-xl border border-[#ffffff10] bg-[#1a171a] px-4 text-sm text-[#FFDEBA] outline-none transition-colors focus:border-[#EC5800] focus:bg-[#252025]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Message</label>
                <textarea rows={4} placeholder="Tell us about your inventory..." className="w-full resize-none rounded-xl border border-[#ffffff10] bg-[#1a171a] p-4 text-sm text-[#FFDEBA] outline-none transition-colors focus:border-[#EC5800] focus:bg-[#252025]" />
              </div>

              <button type="submit" className="mt-2 flex h-14 w-full items-center justify-center rounded-xl bg-[#EC5800] text-[14px] font-black tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#ff6a0d] hover:shadow-[0_8px_20px_rgba(236,88,0,0.3)] active:scale-[0.98]">
                SUBMIT REQUEST
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}