/**
 * @file page.tsx
 * @brief Personal Info and Settings page orchestrator.
 */

"use client";

import { useState, useEffect } from "react";

import PersonalInfoForm from "@/app/profile/_components/sections/personal_info_form";
import LoyaltyCardsSection from "@/app/profile/_components/sections/loyalty_cards_section";
import GeneralPreferencesSection from "@/app/profile/_components/sections/general_preferences_section";

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-8 sm:gap-10 w-full pb-10 z-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px] opacity-[0.03] dark:opacity-[0.02] text-text-main dark:text-text-primary"
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="flex flex-col gap-1.5 sm:gap-2 relative">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary leading-tight font-serif drop-shadow-sm">
          Personal Info
        </h2>
        <p className="text-[14px] sm:text-[15px] text-text-muted dark:text-text-primary/50 tracking-wide">
          Manage your account details, connected loyalty cards, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-10">
        
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
            Account Details
          </h3>
          <PersonalInfoForm />
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          <LoyaltyCardsSection />
          <GeneralPreferencesSection />
        </div>

      </div>
    </div>
  );
}