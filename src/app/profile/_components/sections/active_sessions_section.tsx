/**
 * @file active_sessions_section.tsx
 * @description A section component that displays the user's currently active authentication sessions across different devices.
 */
"use client";

import SessionCard from "@/app/profile/_components/cards/session_card";
/**
 * A presentational component rendering the list of active user sessions.
 * * * Features:
 * - Session Tracking: Displays devices currently logged into the user's account, differentiating between the current session and other active devices.
 * - Component Composition: Utilizes the `SessionCard` component to ensure consistent visual formatting and layout for each device entry.
 * - Security Action: Provides a quick-action "Terminate all other sessions" button for immediate account security management.
 * * @note This component currently uses static mockup data for demonstration. In a production environment, the session list should be dynamically mapped from backend authentication data, and the terminate button should trigger an API call.
 * * @returns {JSX.Element} The rendered active sessions section.
 */
export default function ActiveSessionsSection() {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {/* Current Active Session */}
      <SessionCard 
        device="MacBook Pro" 
        location="Kyiv, Ukraine" 
        status="Current Session" 
        active 
      />
      {/* Historical/Other Active Session */}
      <SessionCard 
        device="iPhone 15 Pro" 
        location="Kyiv, Ukraine" 
        status="Active 2h ago" 
      />
      {/* Global Termination Action */}
      <button className="text-[12px] sm:text-[13px] font-bold text-red-500/80 dark:text-red-400/60 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 text-left pl-2 mt-1">
        Terminate all other sessions
      </button>
    </div>
  );
}