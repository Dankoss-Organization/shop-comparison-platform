/**
 * @file profile_toggle.tsx
 * @description A reusable, animated toggle switch component designed for binary settings and preferences.
 */
"use client";

import { motion } from "framer-motion";
/**
 * Properties for the ProfileToggle component.
 *
 * @interface ProfileToggleProps
 * @property {boolean} enabled - The current active state of the toggle (true if on/enabled).
 * @property {() => void} onToggle - Callback function executed when the toggle button is clicked.
 */
interface ProfileToggleProps {
  enabled: boolean;
  onToggle: () => void;
}
/**
 * A fluid, responsive toggle switch component.
 * * * Features:
 * - Smooth Animation: Utilizes `framer-motion` with spring physics to smoothly slide the toggle thumb between states.
 * - State-Driven Styling: Dynamically applies a vibrant brand color and an ambient glow when active, and a muted, recessed look when inactive.
 * - Responsive Sizing: Automatically scales its dimensions (track width/height and thumb size) for optimal touch targets across mobile and desktop (`sm:` breakpoints).
 * - Theme Adaptive: Includes specific dark mode color targets for both the thumb indicator and the inactive track background.
 * * @param {ProfileToggleProps} props - The component properties.
 * @returns {JSX.Element} The rendered animated toggle switch.
 */
export default function ProfileToggle({
  enabled,
  onToggle,
}: ProfileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative flex items-center

        h-[30px]
        w-[54px]

        sm:h-[34px]
        sm:w-[60px]

        rounded-full

        transition-all duration-500

        shadow-inner

        ${
          enabled
            ? "bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.4)]"
            : "bg-black/10 dark:bg-black/40"
        }
      `}
    >
      <motion.div
        className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px] rounded-full bg-white dark:bg-[#FFDEBA] shadow-sm ml-1"
        animate={{
          x: enabled ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}