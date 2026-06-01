/**
 * @file general_preferences_section.tsx
 * @description A settings section that allows users to manage global application preferences,
 * including UI theme (Light/Dark mode) and email notification opt-ins.
 */
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
import ProfileToggle from "@/app/profile/_components/ui/profile_toggle";
/**
 * Reusable CSS class string for consistent row styling across preference toggles.
 */
const rowClassName = "group flex items-center justify-between p-4 sm:p-5 rounded-[1.25rem] bg-black/[0.03] dark:bg-[rgba(45,40,45,0.6)] border border-text-main/5 dark:border-white/5 hover:shadow-md transition-all gap-2 backdrop-blur-[4px] cursor-pointer";
/**
 * Animated icon component that transitions between sun (Light Mode) and moon (Dark Mode) graphics.
 * * @param {object} props
 * @param {boolean} props.isDark - Determines which icon to display based on the current theme state.
 * @returns {JSX.Element} The animated SVG icon.
 */
function ThemeIcon({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
      <motion.div
        initial={false}
        animate={{ scale: isDark ? 1 : 0, rotate: isDark ? 0 : -90, opacity: isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ scale: isDark ? 0 : 1, rotate: isDark ? 90 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2m-8-8H2m20 0h-2m-2.93-5.07-1.41 1.41M6.34 17.66l-1.41 1.41m12.73 0-1.41-1.41M6.34 6.34 4.93 4.93"/>
        </svg>
      </motion.div>
    </div>
  );
}
/**
 * Static SVG icon for the email alerts setting.
 * @returns {JSX.Element}
 */
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
/**
 * A reusable UI row component representing a single preference setting with an interactive toggle switch.
 * * @param {object} props
 * @param {React.ReactNode} props.icon - The visual icon representing the setting.
 * @param {string} props.title - The primary name of the setting.
 * @param {string} props.description - A brief explanation of what the setting does.
 * @param {boolean} props.isActive - The current boolean state of the setting.
 * @param {() => void} props.onToggle - Callback executed when the user clicks the row or toggle component.
 * @returns {JSX.Element} The rendered settings row.
 */
function SettingsToggle({ icon, title, description, isActive, onToggle }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div onClick={onToggle} className={rowClassName}>
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[14px] sm:rounded-2xl bg-brand-orange/10 dark:bg-brand-orange/15 text-brand-orange border border-brand-orange/20 dark:border-brand-orange/30 transition-all sm:scale-110">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary">{title}</span>
          <span className="text-[11px] sm:text-[12px] text-text-muted opacity-80">{description}</span>
        </div>
      </div>
      <ProfileToggle enabled={isActive} onToggle={onToggle} />
    </div>
  );
}
/**
 * The main General Preferences section component.
 * * * Features:
 * - Theme Management: Integrates with `next-themes` to handle global Light/Dark mode switching.
 * - Hydration Safety: Uses a `mounted` state to prevent SSR mismatch errors when evaluating the active theme.
 * - Animated UI: Employs `framer-motion` inside `ThemeIcon` for playful, spring-based transitions.
 * - Reusable Architecture: Abstracts individual settings into a `SettingsToggle` component for easy expansion.
 * * @returns {JSX.Element} The rendered preferences section.
 */
export default function GeneralPreferencesSection() {
  const [emailAlerts, setEmailAlerts] = useState(true);

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Ensure the component is mounted on the client before reading the theme to avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  const isDarkMode = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
        General Preferences
      </h3>

      <ProfileGlassCard variant="gradient" glow className="p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:gap-4">
          <SettingsToggle
            icon={<ThemeIcon isDark={isDarkMode} />}
            title={isDarkMode ? "Dark Mode" : "Light Mode"}
            description={isDarkMode ? "Reduces eye strain" : "High contrast interface"}
            isActive={isDarkMode}
            onToggle={() => setTheme(isDarkMode ? "light" : "dark")}
          />
          <SettingsToggle
            icon={<EmailIcon />}
            title="Email Alerts"
            description="Get notified of 10%+ drops"
            isActive={emailAlerts}
            onToggle={() => setEmailAlerts(!emailAlerts)}
          />
        </div>
      </ProfileGlassCard>
    </div>
  );
}