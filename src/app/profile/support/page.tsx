"use client";

import { motion, Variants } from "framer-motion";

export default function SupportPage() {
  const supportChannels = [
    { name: "Telegram Bot", desc: "Instant replies & price alerts", icon: <path d="M21.5 2L2 11.5l6.5 2.5 2 7.5 3-4.5 5 5 3-20z"/>, color: "text-blue-400", bg: "bg-blue-400/10", shadow: "shadow-[2px_2px_1px_rgba(96,165,250,0.5)]" },
    { name: "Viber Support", desc: "Chat with our team", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>, color: "text-purple-400", bg: "bg-purple-400/10", shadow: "shadow-[2px_2px_1px_rgba(192,132,252,0.5)]" },
    { name: "Email Us", desc: "support@dankoss.ua", icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, color: "text-[#EC5800]", bg: "bg-[#EC5800]/10", shadow: "shadow-[2px_2px_1px_rgba(236,88,0,0.5)]" },
  ];

  const container: Variants = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
  };

  const item: Variants = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } 
  };

  return (
    <div className="flex flex-col h-full gap-8 max-w-[1000px] mx-auto relative pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-[#FFDEBA] uppercase tracking-[1px]">Help & Support</h1>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-[#FFDEBA]/50">Need help linking your loyalty cards or tracking a price? We are here for you.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel) => (
          <motion.button variants={item} key={channel.name} className="group relative overflow-hidden flex flex-col items-start gap-5 rounded-[36px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] border border-[#FFDEBA]/5 p-8 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-[#FFDEBA]/20">
            <div className={`absolute -right-[20%] -bottom-[20%] w-[80%] h-[80%] rounded-full ${channel.bg} blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
            
            <div className={`flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(45,40,45,0.6)] ${channel.shadow} ${channel.color} group-hover:scale-110 transition-transform duration-300`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">{channel.icon}</svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA] uppercase group-hover:text-white transition-colors">{channel.name}</span>
              <span className="text-[13px] tracking-[-0.5px] text-[#FFDEBA]/50 group-hover:text-[#FFDEBA]/80 transition-colors">{channel.desc}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }} className="mt-4 rounded-[36px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] border border-[#FFDEBA]/5 p-8 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-[20px] font-bold tracking-[1px] text-[#FFDEBA] uppercase mb-6">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-5">
          {["How do I link my Silpo card?", "Why is the price different in the store?", "How do Smart Baskets calculate macros?"].map((q, i) => (
            <div key={i} className="flex items-center justify-between cursor-pointer border-b border-[#FFDEBA]/10 pb-5 group">
              <span className="text-[15px] font-medium tracking-[-0.2px] text-[#FFDEBA]/70 group-hover:text-[#EC5800] transition-colors">{q}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(45,40,45,0.4)] group-hover:bg-[#EC5800] transition-colors duration-300">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#FFDEBA]/50 group-hover:text-white transition-colors"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-auto pt-10">
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#FFDEBA]/30 tracking-wider uppercase">
          <span>DANKOSS v1.0.4-beta</span>
          <span className="h-1 w-1 rounded-full bg-[#FFDEBA]/20" />
          <span className="flex items-center gap-2 text-[#4ADE80]"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span></span> Systems Operational</span>
          <span className="h-1 w-1 rounded-full bg-[#FFDEBA]/20" />
          <span>Session: 8f92a-kx</span>
        </div>
      </div>
    </div>
  );
}