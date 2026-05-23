/**
 * @file page.tsx
 * @description Help and Support page with contact channels, FAQ, and system status.
 */

"use client";

import { motion, Variants } from "framer-motion";

export default function SupportPage() {
  const supportChannels = [
    { 
      name: "Telegram Bot", 
      desc: "Instant replies & price alerts", 
      icon: <path d="M21.5 2L2 11.5l6.5 2.5 2 7.5 3-4.5 5 5 3-20z"/>, 
      color: "text-blue-500 dark:text-blue-400", 
      bg: "bg-blue-500/10 dark:bg-blue-400/10", 
      shadow: "shadow-[2px_2px_1px_rgba(59,130,246,0.3)] dark:shadow-[2px_2px_1px_rgba(96,165,250,0.5)]" 
    },
    { 
      name: "Viber Support", 
      desc: "Chat with our team", 
      icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>, 
      color: "text-purple-500 dark:text-purple-400", 
      bg: "bg-purple-500/10 dark:bg-purple-400/10", 
      shadow: "shadow-[2px_2px_1px_rgba(168,85,247,0.3)] dark:shadow-[2px_2px_1px_rgba(192,132,252,0.5)]" 
    },
    { 
      name: "Email Us", 
      desc: "support@dankoss.ua", 
      icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, 
      color: "text-brand-orange", 
      bg: "bg-brand-orange/10", 
      shadow: "shadow-[2px_2px_1px_rgba(236,88,0,0.3)] dark:shadow-[2px_2px_1px_rgba(236,88,0,0.5)]" 
    },
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
    <div className="flex flex-col h-full gap-8 sm:gap-10 max-w-[1000px] mx-auto relative pb-16 sm:pb-10">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-md leading-tight">
          Help & Support
        </h1>
        <p className="text-[14px] sm:text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Need help linking your loyalty cards or tracking a price? We are here for you.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {supportChannels.map((channel) => (
          <motion.button variants={item} key={channel.name} className="group relative overflow-hidden flex flex-col items-start gap-4 sm:gap-5 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-bg-elevated/80 to-bg-surface/40 dark:from-bg-elevated/15 dark:to-bg-darker/15 border border-text-main/5 dark:border-text-primary/5 p-5 sm:p-8 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-orange/20">
            <div className={`absolute -right-[20%] -bottom-[20%] w-[80%] h-[80%] rounded-full ${channel.bg} blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
            
            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-bg-main/60 ${channel.shadow} ${channel.color} group-hover:scale-110 transition-transform duration-300`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">{channel.icon}</svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-start gap-1 sm:gap-1.5">
              <span className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase group-hover:text-brand-orange dark:group-hover:text-white transition-colors leading-tight">{channel.name}</span>
              <span className="text-[12px] sm:text-[13px] tracking-[-0.5px] text-text-muted dark:text-text-primary/50 group-hover:text-text-main/80 dark:group-hover:text-text-primary/80 transition-colors text-left">{channel.desc}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }} className="mt-2 sm:mt-4 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-bg-elevated/80 to-bg-surface/40 dark:from-bg-elevated/15 dark:to-bg-darker/15 border border-text-main/5 dark:border-text-primary/5 p-5 sm:p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase mb-5 sm:mb-6 leading-tight">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4 sm:gap-5">
          {["How do I link my Silpo card?", "Why is the price different in the store?", "How do Smart Baskets calculate macros?"].map((q, i) => (
            <div key={i} className="flex items-center justify-between cursor-pointer border-b border-text-main/10 dark:border-text-primary/10 pb-4 sm:pb-5 group gap-4">
              <span className="text-[14px] sm:text-[15px] font-medium tracking-[-0.2px] text-text-main/80 dark:text-text-primary/70 group-hover:text-brand-orange transition-colors pr-2 leading-tight">{q}</span>
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-bg-main/50 dark:bg-bg-main/40 group-hover:bg-brand-orange transition-colors duration-300">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted dark:text-text-primary/50 group-hover:text-white transition-colors"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-2 sm:bottom-0 left-0 right-0 flex justify-center mt-auto pt-6 sm:pt-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-text-muted/60 dark:text-text-primary/30 tracking-wider uppercase">
          <span>DANKOSS v1.0.4-beta</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-text-muted/20 dark:bg-text-primary/20" />
          <span className="flex items-center gap-2 text-green-500 dark:text-[#4ADE80]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-[#4ADE80] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-[#4ADE80]"></span>
            </span> 
            Systems Operational
          </span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-text-muted/20 dark:bg-text-primary/20" />
          <span className="hidden sm:block">Session: 8f92a-kx</span>
        </div>
      </div>
    </div>
  );
}