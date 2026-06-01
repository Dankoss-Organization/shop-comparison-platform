/**
 * @file system_status_footer.tsx
 * @description A persistent footer component that displays application version information, 
 * current system operational status, and session identifiers.
 */
"use client";
/**
 * A purely presentational component rendering the system status footer.
 * * * Features:
 * - Technical Typography: Uses a monospace font (`font-mono`) and uppercase tracking to achieve a technical, dashboard-like aesthetic.
 * - Live Status Indicator: Implements a pulsing "live" dot using Tailwind's `animate-ping` utility to indicate operational status.
 * - Responsive Design: Intelligently hides non-critical information (like the session ID and separator dots) on mobile viewports (`sm:block`, `hidden`) to prevent clutter.
 * - Absolute Positioning: Anchors to the bottom of its relative parent container to ensure consistent placement at the end of the page or section.
 * * @returns {JSX.Element} The rendered system status footer.
 */
export default function SystemStatusFooter() {
  return (
    <div className="absolute bottom-2 sm:bottom-0 left-0 right-0 flex justify-center mt-auto pt-6 sm:pt-10">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-text-muted/60 dark:text-text-primary/30 tracking-wider uppercase">
        <span>DANKOSS v1.0.4-beta</span>
        <span className="hidden sm:block h-1 w-1 rounded-full bg-text-muted/20 dark:bg-text-primary/20" />
        <span className="flex items-center gap-2 text-green-500 dark:text-[#4ADE80]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-[#4ADE80] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-[#4ADE80]"></span>
          </span> 
          Systems Operational
        </span>
        <span className="hidden sm:block h-1 w-1 rounded-full bg-text-muted/20 dark:bg-text-primary/20" />
        <span className="hidden sm:block">Session: 8f92a-kx</span>
      </div>
    </div>
  );
}