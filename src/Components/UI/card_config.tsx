/**
 * @file card_config.ts
 * @description Centralized design tokens for flexible product card scales.
 */

export interface CardSizeTokens {
  wrapper: string;
  image: string;
  container: string;
  title: string;
  description?: string;
  meta: string;
  price: string;
  cta: string;
  badge: string;
  icon: string;
  iconSize: number;
}

export const cardSizes: Record<"default" | "compact" | "recent", CardSizeTokens> = {
  default: {
    wrapper: "w-full min-w-[280px] md:min-w-[320px] rounded-[1.5rem]",
    image: "h-[220px]",
    container: "p-4 md:p-5",
    title: "text-[1.15rem] md:text-[1.3rem] tracking-tight",
    description: "text-xs leading-5 min-h-[60px]",
    meta: "text-xs",
    price: "text-[1.75rem] md:text-[2rem]",
    cta: "px-5 py-2.5 text-xs tracking-wide",
    badge: "text-[10px] px-2.5 py-1",
    icon: "h-9 w-9",
    iconSize: 18,
  },
  compact: {
    wrapper: "w-full min-w-[240px] md:min-w-[260px] rounded-[1.2rem]",
    image: "h-[150px]",
    container: "p-3 md:p-4",
    title: "text-[1rem] md:text-[1.1rem] tracking-tight",
    description: "text-[11px] leading-4 min-h-[44px]",
    meta: "text-[11px]",
    price: "text-[1.4rem] md:text-[1.6rem]",
    cta: "px-3.5 py-2 text-[11px]",
    badge: "text-[9px] px-2 py-0.5",
    icon: "h-8 w-8",
    iconSize: 16,
  },
  recent: {
    wrapper: "w-full min-w-[260px] md:min-w-[290px] rounded-[1.35rem]",
    image: "h-[185px]",
    container: "p-4",
    title: "text-[1.1rem] md:text-[1.2rem] tracking-tight",
    description: "text-xs leading-5 min-h-[52px]",
    meta: "text-xs",
    price: "text-[1.6rem] md:text-[1.8rem]",
    cta: "px-4 py-2 text-xs",
    badge: "text-[10px] px-2.5 py-1",
    icon: "h-8 w-8",
    iconSize: 16,
  },
};