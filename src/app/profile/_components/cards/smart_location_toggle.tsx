/**
 * @file smart_location_toggle.tsx
 * @description A glassmorphic card component featuring an animated toggle switch, 
 * allowing users to enable or disable GPS-based "Smart Location" tracking.
 */
"use client";

import { motion } from "framer-motion";
/**
 * Properties for the SmartLocationToggle component.
 *
 * @interface SmartLocationToggleProps
 * @property {boolean} isActive - The current state of the smart location feature (true if enabled).
 * @property {() => void} onToggle - Callback function executed when the toggle switch is clicked.
 */
interface SmartLocationToggleProps {
  isActive: boolean;
  onToggle: () => void;
}
/**
 * A responsive, interactive toggle card for location settings.
 * * * Features:
 * - Fluid Animations: Utilizes `framer-motion` with spring physics for the toggle switch movement.
 * - Responsive Layout: Adapts its flex layout and toggle dimensions for mobile vs. desktop (using `sm:` breakpoints).
 * - Visual Feedback: The icon background and text colors dynamically react to the `isActive` state.
 * - Ambient Hover Effects: Includes a subtle, delayed radial gradient glow on hover.
 * - Glassmorphism: Features a backdrop blur and semi-transparent backgrounds compatible with both Light and Dark themes.
 *
 * @param {SmartLocationToggleProps} props - The component properties.
 * @returns {JSX.Element} The rendered smart location toggle card.
 */
export default function SmartLocationToggle({ isActive, onToggle }: SmartLocationToggleProps) {
  return (
    <div className="group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-0 rounded-[24px] sm:rounded-[32px] bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] transition-all hover:border-brand-orange/20 dark:hover:border-brand-orange/20">
      <div className="absolute -right-[10%] -top-[50%] w-[40%] h-[200%] rounded-full bg-brand-orange/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
        <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-[16px] sm:rounded-[18px] transition-all duration-500 ${
          isActive 
            ? 'bg-brand-orange text-white shadow-md' 
            : 'bg-black/5 dark:bg-black/40 text-text-main/40 dark:text-text-primary/40 shadow-inner dark:shadow-[2px_2px_1px_rgba(30,26,30,0.8)]'
        }`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
        </div>
        <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
          <span className="text-[16px] sm:text-[18px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">Smart Location</span>
          <span className="text-[12px] sm:text-[13px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/60">Use GPS to automatically fetch prices.</span>
        </div>
        
        <button onClick={onToggle} className={`sm:hidden relative z-10 flex h-[30px] w-[54px] shrink-0 items-center rounded-full transition-all duration-500 shadow-inner ${
          isActive ? 'bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.4)]' : 'bg-black/10 dark:bg-black/40'
        }`}>
          <motion.div 
            className="h-[22px] w-[22px] rounded-full bg-white dark:bg-[#FFDEBA] shadow-sm ml-1"
            animate={{ x: isActive ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
      
      <button onClick={onToggle} className={`hidden sm:flex relative z-10 h-[34px] w-[60px] shrink-0 items-center rounded-full transition-all duration-500 shadow-inner ${
        isActive ? 'bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.4)]' : 'bg-black/10 dark:bg-black/40'
      }`}>
        <motion.div 
          className="h-[26px] w-[26px] rounded-full bg-white dark:bg-[#FFDEBA] shadow-sm ml-1"
          animate={{ x: isActive ? 26 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}