/**
 * @file alert_card.tsx
 * @description A customizable UI component for displaying system or product alerts (e.g., price drops, promos).
 */
"use client";
/**
 * Defines the structure of an Alert object used within the application.
 * * @interface Alert
 * @property {number} id - Unique identifier for the alert.
 * @property {'price_drop' | 'target_reached' | 'promo' | 'system'} type - The category/type of the alert.
 * @property {boolean} unread - Indicates whether the user has read the alert.
 * @property {string} icon - Emoji or icon string representing the alert visually.
 * @property {string} store - The store associated with the alert (e.g., "Silpo", "ATB").
 * @property {string} time - Formatted string indicating when the alert was generated.
 * @property {string} title - The main heading of the alert.
 * @property {string} message - The detailed description or content of the alert.
 * @property {string} action - The call-to-action text for the alert button.
 */
import { motion } from "framer-motion";

export type AlertType = 'price_drop' | 'target_reached' | 'promo' | 'system';

export interface Alert {
  id: number;
  type: AlertType;
  unread: boolean;
  icon: string;
  store: string;
  time: string;
  title: string;
  message: string;
  action: string;
}
/**
 * Properties for the AlertCard component.
 * * @interface AlertCardProps
 * @property {Alert} alert - The alert data object to display.
 * @property {(id: number) => void} onDelete - Callback function triggered to remove/delete the alert.
 */
interface AlertCardProps {
  alert: Alert;
  onDelete: (id: number) => void;
}
/**
 * A presentational card component used to display a single notification or alert.
 * * Features:
 * - Differentiates styling based on the `unread` state (highlighted left border, bolder text).
 * - Utilizes `framer-motion` for smooth enter/exit animations and layout shifts.
 * - Responsive design (adjusts padding, font sizes, and gap spacing for mobile/desktop).
 * - The "Dismiss" button is hidden on desktop until hover for a cleaner UI, but always visible on mobile or focus.
 *
 * @param {AlertCardProps} props - The component properties.
 * @returns {JSX.Element} The animated alert card component.
 */
export default function AlertCard({ alert, onDelete }: AlertCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative overflow-hidden rounded-[20px] sm:rounded-[28px] transition-all duration-300 border ${
        alert.unread
          ? "bg-brand-orange/[0.03] dark:bg-brand-orange/10 border-brand-orange/30 shadow-md shadow-brand-orange/5"
          : "bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10"
      }`}
    >
      {alert.unread && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.5)]" />
      )}

      <div className="flex items-start gap-3 sm:gap-5 p-4 pl-5 sm:p-6 sm:pl-8">
        <div
          className={`flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-[18px] sm:text-[24px] shadow-sm border transition-all ${
            alert.unread
              ? "bg-brand-orange/10 border-brand-orange/20 scale-105"
              : "bg-black/5 dark:bg-black/40 border-black/5 dark:border-white/10"
          }`}
        >
          {alert.icon}
        </div>

        <div className="flex flex-col flex-1 gap-1 sm:gap-1.5 pt-0 sm:pt-1">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span
                className={`text-[15px] sm:text-[17px] font-bold font-serif leading-tight ${
                  alert.unread ? "text-text-main dark:text-white" : "text-text-main dark:text-text-primary"
                }`}
              >
                {alert.title}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-text-muted bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10 mt-0.5 sm:mt-0">
                {alert.store}
              </span>
            </div>
            <span className="text-[11px] sm:text-[12px] font-medium text-text-muted whitespace-nowrap mt-0.5 sm:mt-0">
              {alert.time}
            </span>
          </div>

          <p
            className={`text-[13px] sm:text-[14px] leading-relaxed pr-2 sm:pr-8 ${
              alert.unread ? "text-text-main dark:text-text-primary" : "text-text-muted"
            }`}
          >
            {alert.message}
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-3">
            <button className="text-[12px] sm:text-[13px] font-black text-brand-orange uppercase tracking-wider hover:translate-x-1 transition-transform">
              {alert.action} →
            </button>
            <button
              onClick={() => onDelete(alert.id)}
              className="text-[12px] sm:text-[13px] font-bold text-text-muted hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}