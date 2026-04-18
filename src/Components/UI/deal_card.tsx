/**
 * @file deal_card_factory.tsx
 * @description A factory component for rendering product/deal cards with dynamic sizing based on layout context.
 * @pattern Factory: Abstracts the logic of determining the card's visual variant (compact, recent, default) based on where it is rendered.
 * @pattern Smart UI: Connects directly to global stores (Zustand) to handle "Add to Cart" and "Favorite" actions autonomously.
 */
"use client";

import { MouseEvent, useEffect, useState } from "react";
import type { DealCard as DealCardType } from "@/Data/home_data";
import { cardSizes } from "@/Components/UI/card_config";
import SmartImage from "@/Components/UI/smart_image";
import { useFavoritesStore } from "@/Store/use_favourite_store";
import { useCartStore } from "@/Store/use_cart_store";
import { cn } from "@/Lib/utils";

/**
 * Defines the layout areas where a card might be used, automatically dictating its default size.
 */
export type DealCardContext = "carousel" | "grid" | "sidebar";

/**
 * Props for the DealCardFactory component.
 * * @property {DealCardType} item - The product data object to display.
 * @property {DealCardContext} [context="grid"] - The layout context (determines default sizing rules).
 * @property {"default" | "recent" | "compact"} [variant] - Explicitly overrides the size variant, ignoring context.
 * @property {boolean} [compact] - Boolean shortcut to force the "compact" variant.
 * @property {() => void} [onClick] - Optional click handler for the entire card container.
 * @property {string} [className] - Optional custom CSS classes appended to the card wrapper.
 */
export type DealCardFactoryProps = {
  item: DealCardType;
  context?: DealCardContext;
  variant?: "default" | "recent" | "compact";
  compact?: boolean;
  onClick?: () => void;
  className?: string;
};

export interface FavoritesState {
  toggleFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
}

export interface CartState {
  addItem: (item: DealCardType) => void;
}

/**
 * Factory component that acts as a gatekeeper. It calculates the correct CSS sizing 
 * configuration based on explicit props or contextual fallback rules, and then 
 * delegates rendering to the BaseDealCard.
 */

export default function DealCardFactory({
  item,
  context = "grid",
  variant,
  compact,
  onClick,
  className,
}: DealCardFactoryProps) {
  let activeVariant: "default" | "recent" | "compact" = variant || (compact ? "compact" : "default");

  if (!variant && !compact) {
    if (context === "sidebar") activeVariant = "compact";
    if (context === "carousel") activeVariant = "recent";
  }

  const sizeConfig = cardSizes[activeVariant] || cardSizes["default"];

  return <BaseDealCard item={item} size={sizeConfig} compact={activeVariant === "compact"} onClick={onClick} className={className} />;
}

/**
 * The internal presentational component that renders the actual card UI.
 * Handles local hydration state, global store interactions (cart/favorites), and styling application.
 * * @param {Object} props - Internal properties passed down from the Factory.
 * @param {any} props.size - The resolved CSS class map from the cardSizes configuration.
 */

export function BaseDealCard({ item, onClick, compact, className = "", size }: { item: DealCardType; onClick?: () => void; compact?: boolean; className?: string; size: any }) {
  const toggleFavorite = useFavoritesStore((state: FavoritesState) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state: FavoritesState) => state.isFavorite(item.title));
  const addItem = useCartStore((state: CartState) => state.addItem);
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  
  const isFavourite = isMounted ? isFavoriteGlobal : false;
  const clickable = Boolean(onClick);
  
  /**
   * Handles the favorite toggle action, preventing the click from bubbling up 
   * to the parent card container (which might trigger a navigation event).
   */

  const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(item.title);
  };

  return (
    <article onClick={onClick} className={cn("group relative isolate overflow-hidden border border-[#ffffff14] bg-[#342e34] shadow-sm", size.wrapper, clickable ? "cursor-pointer transform-gpu transition duration-300 hover:-translate-y-1" : "", className)}>
      <div className={cn("relative overflow-hidden", size.image)}>
        <SmartImage src={item.image} alt={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#342e34] to-transparent pointer-events-none" />
        <div className={compact ? "absolute left-3 right-3 top-3 flex items-center justify-between" : "absolute left-4 right-4 top-4 flex items-center justify-between"}>
          <span className={cn("rounded-full border border-[#ffffff12] bg-[#171316CC] font-semibold uppercase tracking-[0.18em] text-[#FFDEBA]", size.badge)}>{item.market}</span>
          <button type="button" onClick={handleFavourite} className={cn("flex items-center justify-center rounded-full transition-all duration-300", size.icon, isFavourite ? "bg-[#EC5800] text-white" : "bg-black/30 text-white/90")}>
            <div className={cn("transition-transform duration-300", isFavourite ? "scale-110" : "scale-100")}><HeartIcon filled={isFavourite} size={size.iconSize || 20} /></div>
          </button>
        </div>
      </div>
      <div className={cn("relative z-[1] -mt-px bg-[#342e34]", size.container)}>
        <h3 className={cn(size.title, "font-black text-white")}>{item.title}</h3>
        <p className={cn("mt-2 text-white/60", size.description)}>{item.description}</p>
        <div className={compact ? "mt-3 flex items-end justify-between gap-3" : "mt-5 flex items-end justify-between gap-4"}>
          <div>
            <p className={cn(size.price, "font-black text-[#EC5800]")}>{item.price}</p>
          </div>
          <button 
            type="button" 
            onClick={(e) => { e.stopPropagation(); addItem(item); }} 
            className={cn(
              "rounded-full bg-[#fff4eb] font-semibold text-[#2D282D] transition-all duration-300 hover:bg-[#EC5800] hover:text-white active:scale-95 active:bg-[#D34205] shadow-sm hover:shadow-[0_4px_12px_rgba(236,88,0,0.3)]", 
              size.cta
            )}
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}
/**
 * Standard SVG Heart Icon used for the favorites toggle.
 */
export function HeartIcon({ filled, size }: { filled: boolean; size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg"><path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>; }