/**
 * @file deal_card.tsx
 * @description Unified factory and presentation architecture for multi-variant product deals.
 */
"use client";

import { MouseEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DealCard as DealCardType, StoreOffer } from "@/Data/home_data";
import { cardSizes, type CardSizeTokens } from "@/Components/UI/card_config";
import SmartImage from "@/Components/UI/smart_image";
import { useFavoritesStore } from "@/Store/use_favourite_store";
import { useCartStore } from "@/Store/use_cart_store";
import { cn, formatCurrency } from "@/Lib/utils";

export type DealCardContext = "carousel" | "grid" | "sidebar";
export type DealCardVariant = "default" | "recent" | "compact";

export type DealCardFactoryProps = {
  item: DealCardType;
  context?: DealCardContext;
  variant?: DealCardVariant;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
  preferredStore?: string;
};

export interface FavoritesState {
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export interface CartState {
  addItem: (item: DealCardType & { selectedStoreId?: string }) => void;
}

export default function DealCardFactory({
  item,
  context = "grid",
  variant,
  compact,
  onClick,
  className,
  preferredStore,
}: DealCardFactoryProps) {
  let activeVariant: DealCardVariant = variant || (compact ? "compact" : "default");

  if (!variant && !compact) {
    if (context === "sidebar") activeVariant = "compact";
    if (context === "carousel") activeVariant = "recent";
  }

  const sizeConfig = cardSizes[activeVariant] || cardSizes.default;

  return (
    <BaseDealCard
      item={item}
      size={sizeConfig}
      compact={activeVariant === "compact"}
      onClick={onClick}
      className={className}
      preferredStore={preferredStore}
    />
  );
}

function getBestOffer(offers: StoreOffer[]): StoreOffer | null {
  if (!offers || offers.length === 0) return null;
  return [...offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];
}

export function BaseDealCard({
  item,
  onClick,
  compact,
  className = "",
  size,
  preferredStore,
}: {
  item: DealCardType;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
  size: CardSizeTokens;
  preferredStore?: string;
}) {
  const toggleFavorite = useFavoritesStore((state: any) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state: any) => state.isFavorite(item.id));
  const addItem = useCartStore((state: any) => state.addItem);

  const [isMounted, setIsMounted] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => setIsMounted(true), []);

  const isFavourite = isMounted ? isFavoriteGlobal : false;
  const clickable = Boolean(onClick);

  const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleBadgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOffersOpen((prev) => !prev);
  };

  const handleSelectOffer = (event: MouseEvent<HTMLButtonElement>, offerId: string) => {
    event.stopPropagation();
    setSelectedOfferId(offerId);
    setIsOffersOpen(false);
  };

  const bestOffer = getBestOffer(item.offers);
  const currency = item.currency ?? "UAH";

  let currentOffer = item.offers.find((offer) => offer.store_id === selectedOfferId);

  if (!currentOffer && preferredStore) {
    currentOffer = item.offers.find(
      (o) =>
        o.store_name.toLowerCase() === preferredStore.toLowerCase() ||
        o.store_id.toLowerCase() === `s_${preferredStore.toLowerCase()}`
    );
  }

  if (!currentOffer) {
    currentOffer = bestOffer || item.offers[0];
  }

  const hasOldPrice =
    !!currentOffer && currentOffer.pricing.regular_price > currentOffer.pricing.current_price;

  return (
    <article
      onClick={onClick}
      onMouseLeave={() => setIsOffersOpen(false)}
      className={cn(
        "group relative isolate z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-glass/10 bg-bg-elevated shadow-sm hover:z-30 transition-all duration-300",
        size.wrapper,
        clickable ? "cursor-pointer transform-gpu hover:-translate-y-1" : "",
        className
      )}
    >
      <div className={cn("relative w-full aspect-[4/3] overflow-hidden rounded-t-[inherit] flex-shrink-0", size.image)}>
        <div className="absolute inset-0 overflow-hidden rounded-t-[inherit]">
          <SmartImage src={item.image} alt={item.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated to-transparent pointer-events-none" />
        </div>

        <div className={cn("absolute z-50 flex items-start justify-between left-0 right-0 top-0 p-3", compact ? "p-3" : "p-4")}>
          <div className="relative">
            <button
              type="button"
              onClick={handleBadgeClick}
              className={cn(
                "flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.18em] transition-all duration-300 outline-none focus:outline-none",
                size.badge,
                isOffersOpen
                  ? "border-glass/20 bg-bg-deep/80 text-text-main shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-[24px]"
                  : "border-glass/10 bg-bg-deepest/80 text-text-primary hover:bg-bg-deepest"
              )}
            >
              {currentOffer ? currentOffer.store_name : "N/A"}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("transition-transform duration-300", isOffersOpen ? "rotate-180" : "rotate-0")}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {isOffersOpen && item.offers.length > 1 && (
                <motion.div
                  key="store-dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.2 }}
                  className="absolute top-[calc(100%+6px)] left-0 z-50 flex w-[160px] flex-col overflow-hidden rounded-[16px] border border-glass/15 bg-bg-deep/80 shadow-[0_25px_50px_rgba(0,0,0,0.6)] backdrop-blur-[24px]"
                >
                  <div className="w-full border-b border-glass/10 px-2 py-2 text-center text-[8px] font-bold uppercase tracking-[0.2em] text-text-primary/80">
                    Available at
                  </div>

                  <div
                    className="flex max-h-[160px] w-full flex-col overflow-y-auto pb-1.5 pt-1 [&::-webkit-scrollbar]:hidden"
                    style={{
                      scrollbarWidth: "none",
                      WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                      maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    }}
                  >
                    {[...item.offers]
                      .sort((a, b) => a.pricing.current_price - b.pricing.current_price)
                      .map((offer) => {
                        const isSelected = currentOffer?.store_id === offer.store_id;
                        const showOfferOldPrice = offer.pricing.regular_price > offer.pricing.current_price;

                        return (
                          <button
                            key={offer.store_id}
                            type="button"
                            onClick={(event) => handleSelectOffer(event, offer.store_id)}
                            className={cn(
                              "group flex w-full items-center justify-between gap-2 px-3 py-2 outline-none text-left transition-all duration-300",
                              isSelected ? "bg-brand-orange/10" : "hover:bg-glass/5"
                            )}
                          >
                            <span
                              className={cn(
                                "text-[11px] font-bold tracking-wider transition-colors duration-300 truncate max-w-[70px]",
                                isSelected ? "text-text-primary" : "text-text-primary/70 group-hover:text-text-primary"
                              )}
                            >
                              {offer.store_name}
                            </span>
                            <div className="flex flex-col items-end flex-shrink-0">
                              <span className="text-[12px] font-black text-brand-orange">
                                {formatCurrency(offer.pricing.current_price, currency)}
                              </span>
                              {showOfferOldPrice && (
                                <span className="text-[8px] leading-none text-text-primary/40 line-through">
                                  {formatCurrency(offer.pricing.regular_price, currency)}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={handleFavourite}
            className={cn(
              "z-10 flex items-center justify-center rounded-full transition-all duration-300 outline-none focus:outline-none",
              size.icon,
              isFavourite
                ? "border border-brand-orange bg-brand-orange text-white shadow-[0_0_15px_rgb(var(--brand-orange))]"
                : "border border-glass/10 bg-bg-deepest/40 text-text-main/90 backdrop-blur-sm hover:bg-bg-deepest/60"
            )}
          >
            <div className={cn("transition-transform duration-300", isFavourite ? "scale-110" : "scale-100")}>
              <HeartIcon filled={isFavourite} size={size.iconSize || 20} />
            </div>
          </button>
        </div>

        <div className={cn("absolute pointer-events-none z-20 left-0 right-0 bottom-0 p-3 flex items-center gap-2", compact ? "p-3 gap-1.5" : "p-4 gap-2")}>
          {currentOffer && currentOffer.pricing.discount_percent > 0 && (
            <span className={cn("rounded-full bg-brand-orange font-semibold text-white shadow-[0_8px_16px_rgb(var(--brand-orange)_/_0.2)]", size.badge)}>
              -{currentOffer.pricing.discount_percent}%
            </span>
          )}
          <span className={cn("rounded-full border border-glass/10 bg-bg-deepest/80 font-semibold text-text-primary backdrop-blur-md", size.badge)}>
            {"\u2605"} {item.rating}
          </span>
        </div>
      </div>

      <div className={cn("relative z-[1] -mt-px flex flex-1 flex-col rounded-b-[inherit] bg-bg-elevated", size.container)}>
        <div className={cn("w-full flex-shrink-0 overflow-hidden", compact ? "h-[54px]" : "h-[120px]")}>
          <h3 className={cn(size.title, "line-clamp-2 font-black text-text-main leading-tight")}>
            {item.title}
          </h3>

          {item.detailsLine ? (
            <p className="mt-1 line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary/45">
              {item.detailsLine}
            </p>
          ) : (
            item.description && (
              <p className={cn("mt-1 line-clamp-1 text-text-main/60", size.description)}>
                {item.description}
              </p>
            )
          )}
        </div>

        <div className={cn("mt-auto flex items-end justify-between gap-3 w-full", compact ? "pt-2" : "pt-4")}>
          <div className="min-w-0 flex flex-col justify-end">
            <p className={cn(size.price, "font-black text-brand-orange leading-none")}>
              {currentOffer ? formatCurrency(currentOffer.pricing.current_price, currency) : "Unavailable"}
            </p>
            {hasOldPrice && (
              <p className="mt-1.5 text-[11px] font-medium text-text-main/35 line-through leading-none">
                {formatCurrency(currentOffer!.pricing.regular_price, currency)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addItem({ ...item, selectedStoreId: currentOffer?.store_id });
            }}
            className={cn(
              "rounded-full bg-text-primary font-semibold text-bg-main shadow-sm transition-all duration-300 hover:bg-brand-orange hover:text-white hover:shadow-[0_4px_12px_rgb(var(--brand-orange)_/_0.3)] active:scale-95 active:bg-brand-orange-dark flex-shrink-0",
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

export function HeartIcon({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}