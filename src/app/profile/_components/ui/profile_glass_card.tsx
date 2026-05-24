"use client";

const CARD_RADIUS = "rounded-[1.75rem]";
const WRAPPER_RADIUS = "rounded-[1.85rem]"; 

interface ProfileGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient";
  glow?: boolean;
}

export default function ProfileGlassCard({
  children,
  className = "",
  variant = "default",
  glow = false,
}: ProfileGlassCardProps) {

  const cardClasses: Record<NonNullable<ProfileGlassCardProps["variant"]>, string> = {
    default:
      `bg-white/50 dark:bg-white/5 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-md`,
    gradient:
      `bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep shadow-lg dark:shadow-[0px_-3px_8px_rgb(var(--brand-orange)/0.20),0_24px_40px_rgba(0,0,0,0.4)]`,
  };

  const glowNode = glow && (
    variant === "gradient" ? (
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.35),transparent_28%),radial-gradient(circle_at_92%_10%,rgb(var(--brand-orange)/0.2),transparent_24%)]" />
    ) : (
      <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-brand-orange/10 blur-[60px] pointer-events-none" />
    )
  );

  const cardBody = (
    <div
      className={`relative overflow-hidden h-full ${CARD_RADIUS} border border-text-main/5 dark:border-white/5 backdrop-blur-[20px] transition-all duration-300 ${cardClasses[variant]} ${className}`}
    >
      {glowNode}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (variant === "gradient") {
    return (
      <div className={`relative ${WRAPPER_RADIUS} p-[1px] bg-gradient-to-br from-brand-orange/50 via-brand-orange/10 to-transparent shadow-xl dark:shadow-2xl`}>
        {cardBody}
      </div>
    );
  }

  return cardBody;
}