/**
 * @file page.tsx
 * @description The main orchestrator for the user's security settings page, composing together password management, two-factor authentication, and session tracking components.
 */

"use client";

import ChangePasswordCard from "@/app/profile/_components/cards/change_password_card";
import TwoFactorCard from "@/app/profile/_components/cards/two_factor_card";
import ActiveSessionsSection from "@/app/profile/_components/sections/active_sessions_section";
/**
 * A layout component that structures the security settings interface.
 * * * Features:
 * - Component Composition: Aggregates modular security components (`ChangePasswordCard`, `TwoFactorCard`, `ActiveSessionsSection`) into a unified dashboard view.
 * - Responsive Grid: Utilizes CSS Grid (`grid-cols-1 xl:grid-cols-2`) to provide a stacked layout on mobile/tablet and a side-by-side layout on large desktop screens.
 * - Thematic Typography: Applies consistent serif fonts for section headers and maintains readable contrast ratios across light and dark modes.
 * - Maximum Width Constraint: Centers the content and prevents it from stretching too wide on ultra-wide monitors (`max-w-[1000px] mx-auto`).
 * * @returns {JSX.Element} The rendered security settings page.
 */
export default function SecurityPage() {
  return (
    <div className="relative flex flex-col gap-8 sm:gap-10 w-full pb-10 z-10 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-md leading-tight">
          Security Settings
        </h2>
        <p className="text-[14px] sm:text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">
          Manage your password and active sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        
        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
            Change Password
          </h3>
          <ChangePasswordCard />
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
              Extra Protection
            </h3>
            <TwoFactorCard />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
              Active Sessions
            </h3>
            <ActiveSessionsSection />
          </div>

        </div>
      </div>
    </div>
  );
}