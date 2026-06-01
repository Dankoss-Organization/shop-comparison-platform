/**
 * @file location_map_preview.tsx
 * @description A presentational component that provides a stylized, interactive visual mockup 
 * of a map interface showing the user's active deal-scanning radius.
 */
"use client";
/**
 * Properties for the LocationMapPreview component.
 *
 * @interface LocationMapPreviewProps
 * @property {string} activeTitle - The name of the currently active location zone to display in the overlay.
 */
interface LocationMapPreviewProps {
  activeTitle: string;
}
/**
 * A stylized map visualization card.
 * * * Features:
 * - Visual Simulation: Uses a radial gradient dot-grid, a dashed boundary circle, and a pulsing center indicator to mimic a GPS radar or map view.
 * - Floating Overlay: Features a glassmorphic bottom panel that displays the `activeTitle` and contextual data (e.g., nearby stores found).
 * - Interactive CTA: Includes a "Scan Deals" button with a custom CSS-driven shiny sweep animation triggered on hover (`group-hover/scan`).
 * - Responsive Layout: Adjusts the floating overlay from a stacked column on mobile to a flex row on desktop viewports.
 * - Theme Support: Adapts background blurs, grid colors, and shadow depths for optimal visibility in Light and Dark modes.
 * * @param {LocationMapPreviewProps} props - The component properties.
 * @returns {JSX.Element} The rendered map preview card.
 */
export default function LocationMapPreview({ activeTitle }: LocationMapPreviewProps) {
  return (
    <div className="group relative h-[400px] overflow-hidden rounded-[36px] bg-white/50 dark:bg-[rgba(30,26,30,0.4)] border border-black/5 dark:border-[#FFDEBA]/10 p-2 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_15px_40px_rgba(0,0,0,0.3)] transition-all hover:shadow-md dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-brand-orange/20">
      {/* Map Background & Grid */}
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black/5 dark:bg-bg-deep">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-20 text-black dark:text-[#FFDEBA]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        {/* Radar Radius Indicator */}
        <div className="absolute left-1/3 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand-orange/40 bg-brand-orange/5 pointer-events-none" />
        {/* Center Pulsing Marker */}
        <div className="absolute left-1/3 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange shadow-[0_0_20px_#EC5800]">
          <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
        </div>
        {/* Floating Information Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 rounded-[20px] sm:rounded-[24px] bg-white/80 dark:bg-[rgba(45,40,45,0.85)] backdrop-blur-xl border border-black/5 dark:border-[#FFDEBA]/10 p-4 sm:p-5 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="flex flex-col text-center sm:text-left w-full sm:w-auto">
              <span className="text-[13px] sm:text-[15px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px] line-clamp-1">Active Zone: {activeTitle}</span>
              <span className="text-[11px] sm:text-[13px] font-medium tracking-[-0.5px] text-[#4ADE80]">3 stores found within 1.5km</span>
            </div>
          </div>
          {/* Action Button with Shine Animation */}
          <button className="group/scan relative flex w-full sm:w-auto h-[40px] sm:h-[42px] items-center justify-center overflow-hidden rounded-[12px] sm:rounded-[14px] bg-brand-orange px-6 text-[13px] sm:text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}>
            <span className="relative z-10">Scan Deals</span>
            <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover/scan:left-[150%]">
              <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </button>
        </div>
      </div>
      
    </div>
  );
}