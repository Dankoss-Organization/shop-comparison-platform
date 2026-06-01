/**
 * @file support_channel_card.tsx
 * @description A reusable, animated card component representing a single customer support channel (e.g., Telegram, Viber, Email).
 */
"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
/**
 * Defines the data structure and visual styling properties for a specific support channel.
 * * @interface SupportChannel
 * @property {string} name - The display name of the support channel (e.g., "Telegram Bot", "Email Us").
 * @property {string} desc - A brief description, subtitle, or contact info.
 * @property {React.ReactNode} icon - The inner SVG path or React node representing the channel's icon.
 * @property {string} color - Tailwind class for the icon's primary text/stroke color (e.g., "text-blue-500").
 * @property {string} bg - Tailwind class for the ambient background glow color revealed on hover.
 * @property {string} shadow - Tailwind class defining the custom box-shadow applied to the icon container.
 */
interface SupportChannel {
  name: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  shadow: string;
}
/**
 * Properties for the SupportChannelCard component.
 * * @interface SupportChannelCardProps
 * @property {SupportChannel} channel - The configuration object containing text, icon, and specific theme colors.
 * @property {Variants} variants - Framer Motion variants used to animate the card's entrance within a staggered list.
 */
interface SupportChannelCardProps {
  channel: SupportChannel;
  variants: Variants;
}
/**
 * An interactive, glassmorphic card component built with Framer Motion.
 * * * Features:
 * - Animated Entrance: Integrates seamlessly with parent `motion` containers using the provided `variants`.
 * - Ambient Hover Effects: Features a dynamically colored radial glow (`channel.bg`) that fades in on hover.
 * - Icon Scaling: The channel icon smoothly scales up when the card is hovered for extra visual feedback.
 * - Glassmorphism: Utilizes backdrop-blur and responsive semi-transparent gradients tailored for both Light and Dark modes.
 * * @param {SupportChannelCardProps} props - The component properties.
 * @returns {JSX.Element} The rendered animated support card button.
 */
export default function SupportChannelCard({ channel, variants }: SupportChannelCardProps) {
  return (
    <motion.button 
      variants={variants} 
      className="group relative overflow-hidden flex flex-col items-start gap-4 sm:gap-5 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-bg-elevated/80 to-bg-surface/40 dark:from-bg-elevated/15 dark:to-bg-darker/15 border border-text-main/5 dark:border-text-primary/5 p-5 sm:p-8 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-orange/20"
    >
      {/* Ambient background glow revealed on hover */}
      <div className={`absolute -right-[20%] -bottom-[20%] w-[80%] h-[80%] rounded-full ${channel.bg} blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
      {/* Icon Container */}
      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-bg-main/60 ${channel.shadow} ${channel.color} group-hover:scale-110 transition-transform duration-300`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
          {channel.icon}
        </svg>
      </div>
      {/* Text Content */}
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