"use client";

import { motion } from "framer-motion";

const FAQ_ITEMS = [
  "How do I link my Silpo card?", 
  "Why is the price different in the store?", 
  "How do Smart Baskets calculate macros?"
];

export default function FaqSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }} 
      className="mt-2 sm:mt-4 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-bg-elevated/80 to-bg-surface/40 dark:from-bg-elevated/15 dark:to-bg-darker/15 border border-text-main/5 dark:border-text-primary/5 p-5 sm:p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.2)]"
    >
      <h2 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase mb-5 sm:mb-6 leading-tight">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-4 sm:gap-5">
        {FAQ_ITEMS.map((q, i) => (
          <div key={i} className="flex items-center justify-between cursor-pointer border-b border-text-main/10 dark:border-text-primary/10 pb-4 sm:pb-5 group gap-4">
            <span className="text-[14px] sm:text-[15px] font-medium tracking-[-0.2px] text-text-main/80 dark:text-text-primary/70 group-hover:text-brand-orange transition-colors pr-2 leading-tight">
              {q}
            </span>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-bg-main/50 dark:bg-bg-main/40 group-hover:bg-brand-orange transition-colors duration-300">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted dark:text-text-primary/50 group-hover:text-white transition-colors">
                 <path d="m9 18 6-6-6-6"/>
               </svg>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}