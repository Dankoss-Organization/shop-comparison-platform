/**
 * @file DealCard.tsx
 * @description A factory component for rendering product cards with different visual variants.
 * @pattern Factory Method: The `DealCardFactory` encapsulates the logic of determining 
 * which specific configuration (size, layout, compact mode) of the card to instantiate 
 * based on the provided `variant` or `compact` props, hiding the complex conditional 
 * rendering logic from the consumer components.
 */
"use client";

import { MouseEvent, useEffect, useState } from "react";
import type { DealCard as DealCardType } from "@/Data/home_data";
import { cardSizes } from "@/Components/ui/CardConfig";
import SmartImage from "@/Components/ui/SmartImage";
import { useFavoritesStore } from "@/store/use_favourites_store";
import { useCartStore } from "@/store/use_cart_store";
import { cn } from "@/lib/utils";

type DealCardProps = {
  item: DealCardType;
  onClick?: () => void;
  compact?: boolean;
  variant?: "default" | "recent" | "compact";
  className?: string;
};

export default function DealCardFactory(props: DealCardProps) {
  const activeVariant = props.variant || (props.compact ? "compact" : "default");
  const sizeConfig = cardSizes[activeVariant];

  return <BaseDealCard {...props} size={sizeConfig} compact={activeVariant === "compact"} />;
}

function BaseDealCard({
  item,
  onClick,
  compact,
  className = "",
  size,
}: DealCardProps & { size: typeof cardSizes.default }) {
  
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state) => state.isFavorite(item.title));
  const addItem = useCartStore((state) => state.addItem);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const isFavourite = isMounted ? isFavoriteGlobal : false;
  const clickable = Boolean(onClick);
  const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(item.title);
  };

  return (
    <article
      onClick={onClick}
      className={[
        "group relative isolate overflow-hidden border border-[#ffffff14] bg-[#342e34] shadow-[0_16px_36px_#0000002e,0_0_0_1px_#ffffff08] [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform",
        size.wrapper,
        clickable
          ? "cursor-pointer transform-gpu transition duration-300 hover:[transform:translate3d(0,-4px,0)] hover:border-[#ec580066] hover:shadow-[0_24px_42px_#00000042,0_10px_22px_#ec580030]"
          : "",
        className,
      ].join(" ")}
    >
      <div className={["relative overflow-hidden", size.image].join(" ")}>
        <SmartImage src={item.image} alt={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#342e34] via-[#342e34]/18 to-transparent pointer-events-none" />

        <div className={compact ? "absolute left-3 right-3 top-3 flex items-center justify-between" : "absolute left-4 right-4 top-4 flex items-center justify-between"}>
          <span
            className={[
              "rounded-full border border-[#ffffff12] bg-[#171316CC] font-semibold uppercase tracking-[0.18em] text-[#FFDEBA] backdrop-blur-md shadow-[0_4px_12px_#00000036]",
              size.badge,
            ].join(" ")}
          >
            {item.market}
          </span>
          <button
            type="button"
            onClick={handleFavourite}
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-300 active:scale-75",
              size.icon,
              isFavourite
                ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.5)] border border-[#EC5800]"
                : "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/50 hover:text-white"
            )}
          >
            <div className={cn("transition-transform duration-300", isFavourite ? "scale-110" : "scale-100")}>
              <HeartIcon filled={isFavourite} size={size.iconSize} />
            </div>
          </button>
        </div>

        <div className={compact ? "absolute bottom-3 left-3 flex items-center gap-1.5" : "absolute bottom-4 left-4 flex items-center gap-2"}>
          <span className={["rounded-full bg-[#EC5800]/90 font-semibold text-white", size.badge].join(" ")}>
            {item.discount}
          </span>
          <span
            className={[
              "rounded-full bg-[#171316B8] font-semibold text-white/78 backdrop-blur-md shadow-[0_4px_12px_#00000026]",
              size.badge,
            ].join(" ")}
          >
            ★ {item.rating}
          </span>
        </div>
      </div>

      <div className={["relative z-[1] -mt-px bg-[#342e34]", size.container].join(" ")}>
        <h3 className={[size.title, "font-black leading-[1.06] text-white"].join(" ")}>{item.title}</h3>
        <p className={["mt-2 text-white/60", size.description].join(" ")}>{item.description}</p>

        <div className={["mt-3 flex items-center gap-2", size.meta].join(" ")}>
          <span className={compact ? "rounded-full border border-white/10 px-2 py-1 text-white/65" : "rounded-full border border-white/10 px-3 py-1 text-white/65"}>
            {item.quantity}
          </span>
        </div>

        <div className={compact ? "mt-3 flex items-end justify-between gap-3" : "mt-5 flex items-end justify-between gap-4"}>
          <div>
            <p className={[size.price, "font-black text-[#EC5800]"].join(" ")}>{item.price}</p>
            <div className={["mt-1 flex items-center gap-2", size.meta].join(" ")}>
              <span className="text-white/35 line-through">{item.oldPrice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addItem(item); 
            }}
            className={cn(
              "rounded-full bg-[#fff4eb] font-semibold text-[#2D282D] shadow-[0_8px_18px_#0000001f] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EC5800] hover:text-[#FFDEBA] hover:shadow-[0_12px_20px_#5e1f0033,0_0_14px_#ec580022]",
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

function HeartIcon({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}