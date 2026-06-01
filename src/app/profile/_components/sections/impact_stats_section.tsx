/**
 * @file impact_stats_section.tsx
 * @description A dashboard widget section that visualizes the user's total savings, 
 * active tracking alerts, and favorite store statistics using animated counters.
 */
"use client";

import { useState, useEffect } from "react";
import { animate } from "framer-motion";
/**
 * A helper component that animates a numeric value from a starting point to an end point.
 * * @param {object} props
 * @param {number} [props.from=0] - The starting value of the counter.
 * @param {number} props.to - The target value to animate to.
 * @param {number} [props.duration=1.5] - The duration of the animation in seconds.
 * @returns {JSX.Element} A span element containing the animated current value.
 */
function Counter({ from = 0, to, duration = 1.5 }: { from: number, to: number, duration?: number }) {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        setCurrent(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <span>{current}</span>;
}
/**
 * A presentational component rendering the user's "Impact" metrics.
 * * * Features:
 * - Animated Statistics: Utilizes the `Counter` helper to smoothly animate numerical data on mount.
 * - Glassmorphism UI: Applies backdrop blurs, semi-transparent backgrounds, and subtle borders for a modern look.
 * - Hover Effects: Features smooth upward translation (`hover:-translate-y-1`) and background brightening on hover.
 * - Responsive Grid: Adapts from a single column on mobile to three columns on large screens.
 * * @returns {JSX.Element} The rendered impact statistics section.
 */
export default function ImpactStatsSection() {
  return (
    <div className="flex flex-col gap-4 z-10">
      <h3 className="text-[20px] font-bold tracking-[1px] text-text-main pl-1 font-serif cursor-default select-none drop-shadow-sm">
        Your Impact
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Total Savings Card */}
        <div className="group flex flex-col justify-between rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
          <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px] cursor-default select-none">Total Savings</span>
          <div className="mt-4 flex flex-col cursor-default select-none">
            <div className="flex items-end gap-1.5">
              <span className="text-[42px] font-black text-brand-orange leading-none tracking-tight">
                $<Counter from={0} to={154} duration={1.5} />
              </span>
              <span className="text-[20px] font-bold text-brand-orange/60 leading-tight mb-1">.20</span>
            </div>
            <span className="text-[12px] font-medium text-[#4ADE80] mt-2 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="m18 15-6-6-6 6"/></svg>
              12% from last month
            </span>
          </div>
        </div>
        {/* Active Alerts Card */}
        <div className="group flex flex-col justify-between rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
          <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px] cursor-default select-none">Active Alerts</span>
          <div className="mt-4 flex flex-col cursor-default select-none">
            <span className="text-[42px] font-black text-text-main leading-none tracking-tight drop-shadow-sm">
              <Counter from={0} to={2} duration={1} />
            </span>
            <span className="text-[12px] font-medium text-text-muted mt-2">
              Tracking 2 items globally
            </span>
          </div>
        </div>
        {/* Top Store Card */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_35px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-1">
          <div className="relative z-10 flex flex-col cursor-default select-none">
            <span className="text-[13px] font-bold text-text-muted uppercase tracking-[1.5px]">Top Store</span>
            <span className="mt-4 text-[32px] font-black text-text-main leading-none tracking-tight drop-shadow-sm">Сільпо</span>
            <span className="text-[12px] font-medium text-text-muted mt-3">
              Most frequent deals found
            </span>
          </div>
          <div className="absolute -right-4 -bottom-6 opacity-[0.03] dark:opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
             <span className="text-[120px] font-black italic text-text-main dark:text-white">С</span>
          </div>
        </div>
      </div>
    </div>
  );
}