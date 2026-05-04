"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => 
    Math.floor(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2, 
        ease: "easeOut", 
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const BackgroundGlowShape = ({ color, size, position }: { color: string; size: string; position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.7, 0.4], 
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute z-0 ${size} ${position} rounded-full blur-[100px] pointer-events-none mix-blend-screen`}
    style={{ backgroundColor: color }}
  />
);

export default function PartnershipPage() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const trackingMethods = [
    { id: "api", label: "Custom API / Webhooks" },
    { id: "erp", label: "ERP System (SAP, Oracle, etc.)" },
    { id: "csv", label: "Daily Excel / CSV Exports" },
    { id: "manual", label: "Manual Entry" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full overflow-hidden pb-20 pt-10">
      
      <BackgroundGlowShape color="#EC5800" size="h-[500px] w-[500px]" position="top-[10%] left-[10%]" />
      <BackgroundGlowShape color="#FFDEBA" size="h-[300px] w-[300px]" position="top-[30%] -right-[5%]" />
      <BackgroundGlowShape color="#D34205" size="h-[600px] w-[600px]" position="-bottom-[10%] left-[20%]" />
      <BackgroundGlowShape color="#EC5800" size="h-[250px] w-[250px]" position="top-[60%] left-[60%]" />

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
          
          <div className="mt-8 space-y-6">
            {[
              { title: "Direct API Integration", desc: "Seamlessly sync your catalog, pricing, and stock levels in real-time." },
              { title: "Data-Driven Insights", desc: "Gain access to analytics on how your products perform against competitors." }
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EC5800] text-xs text-[#FFDEBA]">✓</div>
                <div>
                  <h4 className="font-bold text-[#FFDEBA]">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-[#FFDEBA]/50">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-8 border-t border-[#ffffff10] pt-8">
            <div>
              <div className="text-3xl font-black text-[#EC5800] md:text-4xl">
                <Counter value={10000} suffix="+" />
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Active Students</div>
            </div>
            <div className="h-10 w-[1px] bg-[#ffffff10]" />
            <div>
              <div className="text-3xl font-black text-[#EC5800] md:text-4xl">
                <Counter value={15} suffix="%" />
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Avg. Basket Savings</div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-[32px] border border-[#ffffff10] bg-[rgba(30,26,30,0.6)] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl md:p-10">
            <h3 className="mb-6 text-2xl font-bold text-[#FFDEBA]">Partner Application</h3>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Fresh Foods Ltd." 
                  className="h-12 w-full rounded-[16px] border-none px-5 text-sm text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50 caret-[#EC5800] selection:bg-[#EC5800]/30" 
                  style={{
                    background: "rgba(45, 40, 45, 0.4)",
                    boxShadow: "2px 2px 1px #EC5800",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                  }}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Contact Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="h-12 w-full rounded-[16px] border-none px-5 text-sm text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50 caret-[#EC5800] selection:bg-[#EC5800]/30" 
                    style={{
                      background: "rgba(45, 40, 45, 0.4)",
                      boxShadow: "2px 2px 1px #EC5800",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com" 
                    className="h-12 w-full rounded-[16px] border-none px-5 text-sm text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50 caret-[#EC5800] selection:bg-[#EC5800]/30" 
                    style={{
                      background: "rgba(45, 40, 45, 0.4)",
                      boxShadow: "2px 2px 1px #EC5800",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Inventory Tracking Method</label>
                <div className="relative" ref={selectRef}>
                  <div 
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className={`flex h-12 w-full cursor-pointer items-center justify-between rounded-[16px] border-none px-5 text-sm transition ${isSelectOpen ? 'ring-2 ring-[#EC5800]/50' : ''}`}
                    style={{
                      background: "rgba(45, 40, 45, 0.4)",
                      boxShadow: "2px 2px 1px #EC5800",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                    }}
                  >
                    <span className={selectedMethod ? "text-[#FFDEBA]" : "text-[#FFDEBA]/70"}>
                      {selectedMethod ? trackingMethods.find(m => m.id === selectedMethod)?.label : "Select your current system..."}
                    </span>
                    <svg 
                      className={`h-4 w-4 text-[#FFDEBA]/70 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <AnimatePresence>
                    {isSelectOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute left-0 right-0 z-[100] overflow-hidden rounded-xl border border-[#ffffff1a] bg-[rgba(30,26,30,0.8)] shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-[24px]"
                      >
                        {trackingMethods.map((method) => (
                          <div 
                            key={method.id}
                            onClick={() => {
                              setSelectedMethod(method.id);
                              setIsSelectOpen(false);
                            }}
                            className="cursor-pointer px-5 py-3 text-sm text-[#FFDEBA]/80 transition-colors hover:bg-[#EC5800]/20 hover:text-[#FFDEBA]"
                          >
                            {method.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFDEBA]/50">Message</label>
                <textarea 
                  rows={3} 
                  placeholder="Tell us about your inventory..." 
                  className="w-full resize-none rounded-[16px] border-none p-5 text-sm text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50 caret-[#EC5800] selection:bg-[#EC5800]/30" 
                  style={{
                    background: "rgba(45, 40, 45, 0.4)",
                    boxShadow: "2px 2px 1px #EC5800",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="group relative mt-2 flex h-14 w-full items-center justify-center overflow-hidden rounded-[22px] border border-transparent text-[16px] font-bold tracking-[0.1em] text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white active:scale-[0.98]"
                style={{
                  background: "rgba(45, 40, 45, 0.4)",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  SUBMIT REQUEST
                </span>
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.25)] to-transparent" />
                </div>
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}