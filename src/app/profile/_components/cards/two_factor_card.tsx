/**
 * @file two_factor_card.tsx
 * @description A glassmorphic card component used to toggle Two-Factor Authentication (2FA) settings.
 */
"use client";

import { useState } from "react";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
import ProfileToggle from "@/app/profile/_components/ui/profile_toggle";
/**
 * A presentational and interactive component for managing Two-Factor Authentication.
 * * * Features:
 * - State Management: Uses local React state (`useState`) to track the toggle status (enabled/disabled). *Note: In a production environment, this should ideally sync with a global state or backend API.*
 * - Glassmorphism: Wraps content in a `ProfileGlassCard` using the "gradient" variant with ambient glow effects.
 * - Interactive UI: The entire card acts as a clickable area (cursor-pointer) that triggers the toggle state, enhancing user experience on mobile devices.
 * - Responsive Design: Scales padding, icon sizes, and typography for mobile (`sm:`) viewports.
 * * @returns {JSX.Element} The rendered Two-Factor Authentication toggle card.
 */
export default function TwoFactorCard() {
  // Local state to manage the 2FA toggle.
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <ProfileGlassCard 
      variant="gradient" 
      glow 
      className="p-5 sm:p-6 group cursor-pointer hover:brightness-105"
    >
      {/* Wrapper acting as a hit area for the toggle */}
      <div 
        onClick={() => setTwoFactor(!twoFactor)} 
        className="relative z-10 flex items-center justify-between"
      >
        {/* Left Section: Icon and Descriptive Text */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20 shadow-sm shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] sm:text-[16px] font-bold text-text-main dark:text-text-primary">Two-Factor Auth</span>
            <span className="text-[11px] sm:text-[13px] text-text-muted dark:text-text-primary/40 leading-tight">Adds an extra layer of security</span>
          </div>
        </div>
        {/* Right Section: Animated Toggle Component */}
        <ProfileToggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
      </div>
    </ProfileGlassCard>
  );
}