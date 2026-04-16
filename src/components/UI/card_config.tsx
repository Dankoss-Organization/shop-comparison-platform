/**
 * @file card_sizes.ts
 * @description Centralized configuration object defining design tokens (Tailwind CSS classes) for product card variants.
 * @pattern Theme/Token Object: Centralizes styling constants to ensure UI consistency and easy global updates across the application.
 * @pattern Factory Parameter: Acts as a configuration dictionary that can be passed into a generic Card component to alter its appearance.
 */

/**
 * Predefined styling variants for Deal/Product cards.
 * Each variant maps specific internal elements to their respective Tailwind CSS utility classes.
 * * @property {Object} default - Standard card size. Used for main product grids and primary displays.
 * @property {Object} compact - Condensed card size. Ideal for sidebars, mobile views, or dense carousels.
 * @property {Object} recent - Intermediate size. Optimized for browsing history logs or recommendation sections.
 */
export const cardSizes = {
  default: {
    wrapper: "min-w-[240px] md:min-w-[280px] rounded-[1.85rem]",
    image: "h-[160px]",
    container: "p-4",
    title: "text-lg md:text-xl",
    description: "text-xs leading-5 min-h-[60px]",
    meta: "text-xs",
    price: "text-2xl",
    cta: "px-4 py-2.5 text-xs",
    badge: "text-[10px] px-2.5 py-1",
    icon: "h-9 w-9",
    iconSize: 18,
  },
  compact: {
    wrapper: "rounded-[1.9rem]",
    image: "h-[110px]",
    container: "p-3",
    title: "text-[0.95rem]",
    description: "text-[10px] leading-[1.4] min-h-[28px]",
    meta: "text-[9px]",
    price: "text-lg",
    cta: "px-2.5 py-1.5 text-[9px]",
    badge: "text-[8px] px-2 py-0.5",
    icon: "h-7 w-7",
    iconSize: 14,
  },
  recent: {
    wrapper: "rounded-[1.95rem]",
    image: "h-[130px]",
    container: "p-3.5",
    title: "text-[1.15rem]",
    description: "text-[11px] leading-[1.5] min-h-[40px]",
    meta: "text-[10px]",
    price: "text-xl",
    cta: "px-3 py-2 text-[10px]",
    badge: "text-[9px] px-2.5 py-1",
    icon: "h-8 w-8",
    iconSize: 16,
  },
};