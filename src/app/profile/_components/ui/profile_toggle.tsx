"use client";

import { motion } from "framer-motion";

interface ProfileToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

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