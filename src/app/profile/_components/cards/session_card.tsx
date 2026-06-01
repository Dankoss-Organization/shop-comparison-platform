/**
 * @file session_card.tsx
 * @description A UI component that displays information about a user's active or past login session.
 */
"use client";
/**
 * Properties for the SessionCard component.
 *
 * @interface SessionCardProps
 * @property {string} device - The name of the device or browser used for the session (e.g., "MacBook Pro - Chrome").
 * @property {string} location - The geographical location or IP-based location of the session (e.g., "Kyiv, Ukraine").
 * @property {string} status - A descriptive text of the session's status (e.g., "Active now", "Last seen 2 hours ago").
 * @property {boolean} [active] - Optional flag indicating if this is the currently active session. Changes the styling to green.
 */
interface SessionCardProps {
  device: string;
  location: string;
  status: string;
  active?: boolean;
}
/**
 * A presentational card component showing security session details.
 * * Features:
 * - Visually differentiates between active and inactive sessions using color coding (green for active, muted gray for inactive).
 * - Displays a stylized lock/device SVG icon.
 * - Fully responsive layout using Tailwind CSS, adapting padding, icon size, and text sizing for mobile and desktop.
 * - Supports dark and light modes seamlessly.
 *
 * @param {SessionCardProps} props - The component properties.
 * @returns {JSX.Element} The rendered session card.
 */
export default function SessionCard({
  device,
  location,
  status,
  active,
}: SessionCardProps) {
  return (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep border border-text-main/5 dark:border-text-primary/5 backdrop-blur-[10px] shadow-sm hover:brightness-105 transition-all gap-2">
      
      <div className="flex items-center gap-3 sm:gap-4">
        
        <div
          className={`
            h-8 w-8 sm:h-10 sm:w-10
            shrink-0 rounded-full
            flex items-center justify-center

            ${
              active
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-black/5 dark:bg-text-primary/5 text-text-muted/70 dark:text-text-primary/30"
            }
          `}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <rect width="16" height="11" x="4" y="9" rx="2" />
            <path d="M9 15v.01" />
            <path d="M15 15v.01" />
            <path d="M8 9V5a4 4 0 0 1 8 0v4" />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[15px] font-bold text-text-main dark:text-text-primary leading-tight">
            {device}
          </span>

          <span className="text-[11px] sm:text-[12px] font-medium text-text-muted dark:text-text-primary/40">
            {location}
          </span>
        </div>
      </div>

      <span
        className={`
          text-[9px] sm:text-[11px]
          font-bold uppercase tracking-wider text-right

          ${
            active
              ? "text-green-600 dark:text-green-400"
              : "text-text-muted/60 dark:text-text-primary/30"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}