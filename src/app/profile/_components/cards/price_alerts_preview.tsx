/**
 * @file price_alerts_preview.tsx
 * @description A dashboard preview widget displaying a summary of the user's active and reached price alerts.
 */
"use client";
/**
 * A presentational UI component that renders a "Price Alerts Feed" preview card.
 * * Features:
 * - Displays a header with the sync status and a "Manage" action button.
 * - Uses a glassmorphic design (`backdrop-blur`, semi-transparent backgrounds) adapted for both light and dark modes.
 * - Currently displays static mockup data (e.g., "Hass Avocados" and "Jacobs Monarch") to illustrate pending and reached alert states.
 * - Includes an inline SVG sparkline to represent price trends visually.
 * * @returns {JSX.Element} The styled price alerts preview widget.
 */
export default function PriceAlertsPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end pl-1 pr-2">
        <div className="flex items-center gap-3 cursor-default select-none">
          <h3 className="text-[20px] font-bold tracking-[1px] text-text-main font-serif drop-shadow-sm">Price Alerts Feed</h3>
          <span className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/5 px-2.5 py-1 text-[10px] text-text-muted font-medium border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
            Synced 2m ago
          </span>
        </div>
        <button className="text-[12px] font-bold text-brand-orange uppercase tracking-wide hover:brightness-110 transition-all drop-shadow-sm">Manage</button>
      </div>
      <div className="flex h-full flex-col justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-black/40 p-2 border border-black/5 dark:border-white/5 shadow-inner">
              <div className="h-full w-full rounded-md bg-brand-orange/20 flex items-center justify-center text-[18px]">🥑</div>
            </div>
            <div className="flex flex-col cursor-default select-none">
              <span className="text-[15px] font-bold text-text-main drop-shadow-sm">Hass Avocados (2-pack)</span>
              <div className="flex items-center gap-2 text-[12px] text-text-muted mt-0.5">
                <span>Target: <strong className="text-brand-orange">$2.90</strong></span>
                <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                <span>Current: $3.10</span>
              </div>
            </div>
          </div>
          <div className="w-[60px] h-[30px] opacity-80 pointer-events-none drop-shadow-[0_0_5px_rgba(236,88,0,0.4)]">
            <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
              <path d="M0,25 C10,25 15,10 25,15 C35,20 45,5 60,10" fill="none" stroke="currentColor" className="text-brand-orange" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="60" cy="10" r="3" fill="currentColor" className="text-brand-orange" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-black/40 p-2 border border-black/5 dark:border-white/5 shadow-inner">
              <div className="h-full w-full rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center text-[18px]">☕</div>
            </div>
            <div className="flex flex-col cursor-default select-none">
              <span className="text-[15px] font-bold text-text-main drop-shadow-sm">Jacobs Monarch 200g</span>
              <div className="flex items-center gap-2 text-[12px] text-text-muted mt-0.5">
                <span>Target: <strong className="text-brand-orange">$5.00</strong></span>
                <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                <span>Current: <span className="line-through opacity-70">$6.20</span> $5.00</span>
              </div>
            </div>
          </div>
          <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-green-500/10 text-green-500 dark:text-green-400 text-[11px] font-bold border border-green-500/20 cursor-default select-none shadow-sm">
            Reached!
          </div>
        </div>
      </div>
    </div>
  );
}