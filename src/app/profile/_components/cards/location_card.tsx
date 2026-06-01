/**
 * @file location_card.tsx
 * @description Presentational UI component for displaying saved delivery or pickup addresses.
 */
"use client";
/**
 * Defines the structure of a saved location object.
 *
 * @interface LocationData
 * @property {string} id - Unique identifier for the location.
 * @property {string} title - A descriptive name for the location (e.g., "Home", "Office").
 * @property {string} address - The full formatted physical address.
 * @property {boolean} isDefault - Indicates if this is the currently active/default location for orders.
 */
interface LocationData {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
}
/**
 * Properties for the LocationCard component.
 *
 * @interface LocationCardProps
 * @property {LocationData} location - The location data object to display.
 * @property {() => void} onSetDefault - Callback triggered when the user clicks "Set as Active".
 * @property {() => void} onDelete - Callback triggered when the user clicks the delete (trash bin) icon.
 */
interface LocationCardProps {
  location: LocationData;
  onSetDefault: () => void;
  onDelete: () => void;
}
/**
 * A presentational card displaying a saved address.
 * * Features:
 * - Visually highlights the default/active location with a badge ("Active Zone").
 * - Hides the "Set as Active" button if the location is already default.
 * - Action buttons are faded (`opacity-50`) until the user hovers over the card.
 * - Fully responsive with dynamic hover and dark mode styling.
 *
 * @param {LocationCardProps} props - The component properties.
 * @returns {JSX.Element} The styled location card component.
 */
export default function LocationCard({ location, onSetDefault, onDelete }: LocationCardProps) {
  return (
    <div className="group relative h-full flex flex-col justify-between rounded-[24px] sm:rounded-[32px] bg-white/50 dark:bg-white/5 p-5 sm:p-7 backdrop-blur-[10px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 hover:border-brand-orange/20 dark:hover:border-white/10">
      <div>
        {location.isDefault && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span className="rounded-[8px] bg-brand-orange/10 dark:bg-[rgba(45,40,45,0.7)] px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[1px] text-brand-orange dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_#EC5800] backdrop-blur-md">
              Active Zone
            </span>
          </div>
        )}
        <h3 className="text-[18px] sm:text-[20px] font-bold text-text-main dark:text-text-primary pr-0 sm:pr-24 mb-2 sm:mb-3 mt-8 sm:mt-0">{location.title}</h3>
        <p className="text-[13px] sm:text-[14px] font-medium tracking-[-0.2px] text-text-muted dark:text-text-primary/50 flex items-start gap-2 sm:gap-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] mt-[2px] sm:mt-[1px] shrink-0 text-brand-orange"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          {location.address}
        </p>
      </div>
      
      <div className="mt-8 flex items-center justify-between opacity-50 transition-opacity duration-300 group-hover:opacity-100">
        {!location.isDefault ? (
          <button onClick={onSetDefault} className="text-[13px] font-bold uppercase tracking-[1px] text-brand-orange hover:text-orange-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-orange hover:after:w-full after:transition-all after:duration-300">
            Set as Active
          </button>
        ) : <div/>}
        <button onClick={onDelete} className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  );
}