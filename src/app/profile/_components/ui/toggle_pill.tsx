/**
 * @file toggle_pill.tsx
 * @description A reusable, interactive pill-shaped button component generally used for filtering, category selection, or toggling binary states.
 */
"use client";
/**
 * Properties for the TogglePill component.
 *
 * @interface TogglePillProps
 * @property {string} label - The text displayed inside the pill.
 * @property {boolean} isActive - Determines if the pill is currently in its selected/active state.
 * @property {() => void} onClick - Callback function executed when the user clicks the pill.
 * @property {string} [className=""] - Optional Tailwind CSS classes to extend or override default styles.
 */
interface TogglePillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;

  className?: string;
}
/**
 * A highly visual, glassmorphic toggle button with integrated micro-interactions.
 * * * Features:
 * - State-Driven UI: Distinctly transitions between an active (solid brand color with a sharp shadow) and inactive (translucent background, muted text) visual state based on `isActive`.
 * - Tactile Feedback: Incorporates subtle upward translation on hover and a scale-down effect on active click (`active:scale-95`).
 * - Ambient Animations: When active, features a continuous CSS-driven gradient sweep (`animate-[shine...]`) that plays across the background for an engaging, polished feel.
 * - Responsive Layout: Automatically scales internal padding and typography for mobile (`sm:` breakpoints) to ensure comfortable touch targets.
 * * @param {TogglePillProps} props - The component properties.
 * @returns {JSX.Element} The rendered toggle pill button.
 */
export default function TogglePill({
  label,
  isActive,
  onClick,
  className = "",
}: TogglePillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden

        flex items-center justify-center

        rounded-[12px]

        border

        px-3 py-1.5
        sm:px-4 sm:py-2

        text-[12px]
        sm:text-[13px]

        font-medium

        transition-all duration-300

        hover:-translate-y-[2px]
        active:scale-95

        backdrop-blur-[5px]

        ${
          isActive
            ? `
              bg-brand-orange
              text-white
              border-brand-orange
              shadow-[2px_2px_1px_rgba(236,88,0,0.5)]
            `
            : `
              bg-white/5
              dark:bg-white/5

              border-transparent

              text-text-muted
              dark:text-text-primary/60

              hover:text-text-main
              dark:hover:text-text-primary

              hover:border-black/5
              dark:hover:border-[#FFDEBA]/20

              hover:shadow-sm
            `
        }

        ${className}
      `}
      style={{
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <span className="relative z-10">
        {label}
      </span>

      {isActive && (
        <div className="absolute inset-0 overflow-hidden">
          
          <div className="absolute -left-[150%] top-0 flex h-full w-full justify-center animate-[shine_2.5s_linear_infinite]">
            <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

        </div>
      )}
    </button>
  );
}