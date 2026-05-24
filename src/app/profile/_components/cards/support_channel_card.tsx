"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface SupportChannel {
  name: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  shadow: string;
}

interface SupportChannelCardProps {
  channel: SupportChannel;
  variants: Variants;
}

export default function SupportChannelCard({ channel, variants }: SupportChannelCardProps) {
  return (
    <motion.button 
      variants={variants} 
      className="group relative overflow-hidden flex flex-col items-start gap-4 sm:gap-5 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-bg-elevated/80 to-bg-surface/40 dark:from-bg-elevated/15 dark:to-bg-darker/15 border border-text-main/5 dark:border-text-primary/5 p-5 sm:p-8 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-orange/20"
    >
      <div className={`absolute -right-[20%] -bottom-[20%] w-[80%] h-[80%] rounded-full ${channel.bg} blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
      
      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-bg-main/60 ${channel.shadow} ${channel.color} group-hover:scale-110 transition-transform duration-300`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
          {channel.icon}
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col items-start gap-1 sm:gap-1.5">
        <span className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase group-hover:text-brand-orange dark:group-hover:text-white transition-colors leading-tight">
          {channel.name}
        </span>
        <span className="text-[12px] sm:text-[13px] tracking-[-0.5px] text-text-muted dark:text-text-primary/50 group-hover:text-text-main/80 dark:group-hover:text-text-primary/80 transition-colors text-left">
          {channel.desc}
        </span>
      </div>
    </motion.button>
  );
}