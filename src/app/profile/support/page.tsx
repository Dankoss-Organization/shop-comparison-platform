/**
 * @file SupportPage.tsx
 * @description Help and Support page orchestrator.
 */

"use client";

import { motion } from "framer-motion";

import { containerVariants, itemVariants } from "@/app/profile/_components/ui/animations";

import SupportChannelCard from "@/app/profile/_components/cards/support_channel_card";
import FaqSection from "@/app/profile/_components/sections/faq_section";
import SystemStatusFooter from "@/app/profile/_components/sections/system_status_footer";

const SUPPORT_CHANNELS = [
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

export default function SupportPage() {
  return (
    <div className="flex flex-col h-full gap-8 sm:gap-10 max-w-[1000px] mx-auto relative pb-16 sm:pb-10">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-md leading-tight">
          Help & Support
        </h1>
        <p className="text-[14px] sm:text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">
          Need help linking your loyalty cards or tracking a price? We are here for you.
        </p>
      </div>
      
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {SUPPORT_CHANNELS.map((channel) => (
          <SupportChannelCard 
            key={channel.name} 
            channel={channel} 
            variants={itemVariants} 
          />
        ))}
      </motion.div>
      <FaqSection />
      <SystemStatusFooter />
      
    </div>
  );
}