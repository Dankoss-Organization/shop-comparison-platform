/**
 * @file loyalty_cards_section.tsx
 * @description A section component within the user profile settings designed to display and manage linked store loyalty cards (e.g., Silpo, ATB).
 */
"use client";

import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
/**
 * Reusable CSS class string for consistent row styling across loyalty card entries.
 */
const rowClassName = "group flex items-center justify-between p-4 sm:p-5 rounded-[1.25rem] bg-black/[0.03] dark:bg-[rgba(45,40,45,0.6)] border border-text-main/5 dark:border-white/5 hover:shadow-md transition-all gap-2 backdrop-blur-[4px]";
/**
 * A presentational component rendering a list of the user's connected loyalty cards.
 * * * Features:
 * - Visual Organization: Uses `ProfileGlassCard` to group the loyalty cards with a distinct glassmorphic glow.
 * - Branded Elements: Hardcoded mockups (Silpo, ATB) demonstrate how brand colors and logos integrate into the list UI.
 * - Verification Status: Includes small badge indicators ("Verified") for linked card status.
 * - Actions: Provides interactive hover states for "Remove" actions and a prominent dashed button to "Link New Card".
 * * @note This component currently uses static mockup data. In a production environment, this should map over an array of user loyalty card data fetched from a backend API.
 * * @returns {JSX.Element} The rendered loyalty cards management section.
 */
export default function LoyaltyCardsSection() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Header section with context */}
      <div className="flex justify-between items-end pl-1 pr-2">
        <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif">
          Loyalty Cards
        </h3>
        <span className="text-[11px] sm:text-[12px] font-medium text-text-muted">For personalized deals</span>
      </div>

      <ProfileGlassCard variant="gradient" glow className="p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Silpo Loyalty Card Entry */}
          <div className={rowClassName}>
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex h-10 w-16 sm:h-11 sm:w-18 shrink-0 items-center justify-center rounded-lg bg-[#EC5800] shadow-md">
                <span className="text-[10px] sm:text-[11px] font-black text-white italic tracking-wider">СІЛЬПО</span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary leading-tight">Власний Рахунок</span>
                  <span className="text-[8px] sm:text-[9px] font-black text-green-600 bg-green-500/10 px-1 sm:px-1.5 rounded-sm border border-green-500/20">Verified</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 4123</span>
              </div>
            </div>
            <button className="text-[10px] sm:text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest shrink-0">Remove</button>
          </div>
          {/* ATB Loyalty Card Entry */}
          <div className={rowClassName}>
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex h-10 w-16 sm:h-11 sm:w-18 shrink-0 items-center justify-center rounded-lg bg-[#0047AB] shadow-md">
                <span className="text-[11px] sm:text-[13px] font-black text-white tracking-widest">АТБ</span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary leading-tight">Картка АТБ</span>
                  <span className="text-[8px] sm:text-[9px] font-black text-green-600 bg-green-500/10 px-1 sm:px-1.5 rounded-sm border border-green-500/20">Verified</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 8802</span>
              </div>
            </div>
            <button className="text-[10px] sm:text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest shrink-0">Remove</button>
          </div>
          {/* Add New Card Action */}
          <button className="mt-1 sm:mt-2 flex w-full items-center justify-center gap-2 rounded-[1rem] border-2 border-dashed border-text-main/10 dark:border-white/10 py-3 sm:py-4 text-[12px] sm:text-[13px] font-black uppercase tracking-widest text-text-muted transition-all hover:border-brand-orange/40 hover:text-brand-orange hover:bg-brand-orange/5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            Link New Card
          </button>
          
        </div>
      </ProfileGlassCard>
    </div>
  );
}