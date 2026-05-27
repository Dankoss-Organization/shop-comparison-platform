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
    wrapper: "w-full rounded-[1.5rem]",
    image: "h-[130px] sm:h-[150px] lg:h-[175px]",
    container: "p-3 md:p-4 lg:p-5",
    title: "text-[1rem] md:text-[1.05rem] lg:text-[1.3rem] tracking-tight",
    description: "text-xs leading-5",
    meta: "text-xs",
    price: "text-[1.4rem] md:text-[1.5rem] lg:text-[2rem]",
    cta: "px-4 py-2 text-xs tracking-wide",
    badge: "text-[10px] px-2.5 py-1",
    icon: "h-8 w-8 lg:h-9 lg:w-9",
    iconSize: 16,
  },
  recent: {
    wrapper: "w-full min-w-[200px] sm:min-w-[220px] lg:min-w-[260px] rounded-[1.35rem]",
    image: "h-[140px] sm:h-[155px] lg:h-[185px]",
    container: "p-3 md:p-3.5 lg:p-4",
    title: "text-[0.95rem] md:text-[1rem] lg:text-[1.2rem] tracking-tight",
    description: "text-xs leading-5",
    meta: "text-xs",
    price: "text-[1.3rem] md:text-[1.4rem] lg:text-[1.8rem]",
    cta: "px-3 py-1.5 text-xs",
    badge: "text-[10px] px-2.5 py-1",
    icon: "h-8 w-8",
    iconSize: 16,
  },
  compact: {
    wrapper: "w-full min-w-[160px] sm:min-w-[180px] lg:min-w-[220px] rounded-[1.2rem]",
    image: "h-[120px] sm:h-[132px] lg:h-[150px]",
    container: "p-2.5 md:p-3 lg:p-4",
    title: "text-[0.9rem] md:text-[0.95rem] lg:text-[1.1rem] tracking-tight",
    description: "text-[11px] leading-4",
    meta: "text-[11px]",
    price: "text-[1.2rem] md:text-[1.25rem] lg:text-[1.6rem]",
    cta: "px-3 py-1.5 text-[11px]",
    badge: "text-[9px] px-2 py-0.5",
    icon: "h-7 w-7 lg:h-8 lg:w-8",
    iconSize: 14,
  },
};