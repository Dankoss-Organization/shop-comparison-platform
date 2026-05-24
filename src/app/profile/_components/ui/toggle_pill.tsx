"use client";

interface TogglePillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;

  className?: string;
}

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