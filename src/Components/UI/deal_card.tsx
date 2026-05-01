/**
 * @file deal_card.tsx
 * @description A factory component for rendering product/deal cards with dynamic sizing based on layout context.
 * @pattern Factory: Abstracts the logic of determining the card's visual variant (compact, recent, default) based on where it is rendered.
 * @pattern Smart UI: Connects directly to global stores (Zustand) to handle "Add to Cart" and "Favorite" actions autonomously.
 */
"use client";

import { MouseEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import type { DealCard as DealCardType, StoreOffer } from "@/Data/home_data";
import { cardSizes } from "@/Components/UI/card_config";
import SmartImage from "@/Components/UI/smart_image";
import { useFavoritesStore } from "@/Store/use_favourite_store";
import { useCartStore } from "@/Store/use_cart_store";
import { cn } from "@/Lib/utils";

export type DealCardContext = "carousel" | "grid" | "sidebar";

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

function getBestOffer(offers: StoreOffer[]): StoreOffer | null {
  if (!offers || offers.length === 0) return null;
  return [...offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];
}

export function BaseDealCard({ item, onClick, compact, className = "", size }: { item: DealCardType; onClick?: () => void; compact?: boolean; className?: string; size: any }) {
  const toggleFavorite = useFavoritesStore((state: FavoritesState) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state: FavoritesState) => state.isFavorite(item.title));
  const addItem = useCartStore((state: CartState) => state.addItem);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => setIsMounted(true), []);
  
  const isFavourite = isMounted ? isFavoriteGlobal : false;
  const clickable = Boolean(onClick);
  
  const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(item.title);
  };

  const handleBadgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOffersOpen(!isOffersOpen);
  };

  const handleSelectOffer = (event: MouseEvent<HTMLButtonElement>, offerId: string) => {
    event.stopPropagation();
    setSelectedOfferId(offerId);
    setIsOffersOpen(false); 
  };

  const bestOffer = getBestOffer(item.offers);
  const currentOffer = item.offers.find(o => o.store_id === selectedOfferId) || bestOffer || item.offers[0];

  return (
    <article 
      onClick={onClick} 
      onMouseLeave={() => setIsOffersOpen(false)}
      className={cn("group relative isolate border border-[#ffffff14] bg-[#342e34] shadow-sm rounded-2xl !overflow-visible z-10 hover:z-30", size.wrapper, clickable ? "cursor-pointer transform-gpu transition duration-300 hover:-translate-y-1" : "", className)}
    >
      <div className={cn("relative rounded-t-[inherit]", size.image)}>
        
        <div className="absolute inset-0 overflow-hidden rounded-t-[inherit]">
          <SmartImage src={item.image} alt={item.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#342e34] to-transparent pointer-events-none" />
        </div>
        
        <div className={compact ? "absolute left-3 right-3 top-3 flex items-start justify-between z-50" : "absolute left-4 right-4 top-4 flex items-start justify-between z-50"}>
          
          <div className="relative">
            <button 
              onClick={handleBadgeClick}
              className={cn(
                "flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.18em] transition-all duration-300", 
                size.badge,
                isOffersOpen 
                  ? "bg-[rgba(35,30,35,0.65)] backdrop-blur-[24px] border-[#ffffff20] text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]" 
                  : "bg-[#171316CC] border-[#ffffff12] text-[#FFDEBA] hover:bg-[#171316]"
              )}
            >
              {currentOffer ? currentOffer.store_name : "N/A"}
              <svg 
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                className={cn("transition-transform duration-300", isOffersOpen ? "rotate-180" : "rotate-0")}
              >
                <path d="M6 9l6 6 6-6"/>
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
                  className="absolute top-[calc(100%+6px)] left-0 z-50 flex w-[125px] flex-col overflow-hidden rounded-[16px] bg-[rgba(35,30,35,0.65)] backdrop-blur-[24px] shadow-[0_25px_50px_rgba(0,0,0,0.6)] border border-[#ffffff15]"
                >
                  <div className="px-2 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#FFDEBA]/80 border-b border-[#ffffff10] text-center w-full">
                    Available at
                  </div>
                  
                  <div 
                    className="flex max-h-[115px] w-full flex-col overflow-y-auto pb-1.5 pt-1 [&::-webkit-scrollbar]:hidden"
                    style={{ 
                      scrollbarWidth: "none", 
                      WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", 
                      maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" 
                    }}
                  >
                    {[...item.offers]
                      .sort((a, b) => a.pricing.current_price - b.pricing.current_price)
                      .map((offer, index) => {
                        const isCheapest = index === 0;
                        const isSelected = currentOffer.store_id === offer.store_id;

                        return (
                          <button 
                            key={offer.store_id} 
                            onClick={(e) => handleSelectOffer(e, offer.store_id)}
                            className={cn(
                              "group flex w-full items-center justify-between gap-2 px-3 py-2 outline-none transition-all duration-300",
                              isCheapest ? "bg-[#EC5800]/[0.08]" : "hover:bg-[#ffffff0a]"
                            )}
                          >
                            <span className={cn(
                              "text-[11px] font-bold tracking-wider transition-colors duration-300",
                              isSelected ? "text-[#FFDEBA]" : "text-[#FFDEBA]/70 group-hover:text-[#FFDEBA]"
                            )}>
                              {offer.store_name}
                            </span>
                            <div className="flex flex-col items-end">
                              <span className="text-[12px] font-black text-[#EC5800]">${offer.pricing.current_price.toFixed(2)}</span>
                              {offer.pricing.discount_percent > 0 && (
                                <span className="text-[8px] text-[#FFDEBA]/40 line-through leading-none">${offer.pricing.regular_price.toFixed(2)}</span>
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

          <button type="button" onClick={handleFavourite} className={cn("flex items-center justify-center rounded-full transition-all duration-300 z-10", size.icon, isFavourite ? "bg-[#EC5800] text-white shadow-[0_0_10px_#EC5800]" : "bg-black/40 backdrop-blur-sm text-white/90 border border-white/10")}>
            <div className={cn("transition-transform duration-300", isFavourite ? "scale-110" : "scale-100")}><HeartIcon filled={isFavourite} size={size.iconSize || 20} /></div>
          </button>
        </div>

        <div className={cn("z-20 pointer-events-none", compact ? "absolute bottom-3 left-3 flex items-center gap-1.5" : "absolute bottom-4 left-4 flex items-center gap-2")}>
          {currentOffer && currentOffer.pricing.discount_percent > 0 && (
            <span className={cn("rounded-full bg-[#EC5800] font-semibold text-white shadow-[0_8px_16px_#5e1f0033]", size.badge)}>
              -{currentOffer.pricing.discount_percent}%
            </span>
          )}
          <span className={cn("rounded-full border border-[#ffffff10] bg-[#171316CC] font-semibold text-[#FFDEBA] backdrop-blur-md", size.badge)}>
            ★ {item.rating}
          </span>
        </div>
      </div>
      
      <div className={cn("relative z-[1] -mt-px bg-[#342e34] rounded-b-[inherit]", size.container)}>
        <h3 className={cn(size.title, "font-black text-white")}>{item.title}</h3>
        <p className={cn("mt-2 text-white/60", size.description)}>{item.description}</p>
        <div className={compact ? "mt-3 flex items-end justify-between gap-3" : "mt-5 flex items-end justify-between gap-4"}>
          <div>
            <p className={cn(size.price, "font-black text-[#EC5800]")}>
              {currentOffer ? `$${currentOffer.pricing.current_price.toFixed(2)}` : "Unavailable"}
            </p>
          </div>
          <button 
            type="button" 
            onClick={(e) => { 
              e.stopPropagation(); 
              addItem({ ...item, selectedStoreId: currentOffer.store_id } as any); 
            }}
            className={cn("rounded-full bg-[#fff4eb] font-semibold text-[#2D282D] transition-all duration-300 hover:bg-[#EC5800] hover:text-white active:scale-95 active:bg-[#D34205] shadow-sm hover:shadow-[0_4px_12px_rgba(236,88,0,0.3)]", size.cta)}
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ); 
}