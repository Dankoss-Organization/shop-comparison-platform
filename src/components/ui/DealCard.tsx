"use client";

import Image from "next/image";
import type { DealCard as DealCardType } from "@/Data/home_data";

type DealCardProps = {
  item: DealCardType;
  onClick?: () => void;
  compact?: boolean;
  variant?: "default" | "recent";
  className?: string;
};

export default function DealCard({
  item,
  onClick,
  compact = false,
  variant = "default",
  className = "",
}: DealCardProps) {
  const size =
    variant === "recent"
      ? {
          wrapper: "rounded-[1.95rem]",
          image: "h-[160px]",
          container: "p-4",
          title: "text-[1.34rem]",
          description: "text-[0.78rem] leading-[1.58] min-h-[48px]",
          meta: "text-[11.5px]",
          price: "text-[1.7rem]",
          cta: "px-3.5 py-1.5 text-[11.5px]",
          badge: "text-[10.5px] px-2.5 py-1",
          icon: "h-8 w-8",
        }
      : compact
    ? {
        wrapper: "rounded-[1.9rem]",
        image: "h-[138px]",
        container: "p-3.5",
        title: "text-[1.08rem]",
        description: "text-[0.62rem] leading-[1.55] min-h-[28px]",
        meta: "text-[10px]",
        price: "text-[1.28rem]",
        cta: "px-3 py-1.5 text-[10px]",
        badge: "text-[9px] px-2.5 py-1",
        icon: "h-8 w-8",
      }
    : {
        wrapper: "rounded-[1.85rem]",
        image: "h-[220px]",
        container: "p-5",
        title: "text-2xl",
        description: "text-sm leading-6 min-h-[72px]",
        meta: "text-sm",
        price: "text-3xl",
        cta: "px-5 py-3 text-sm",
        badge: "text-xs px-3 py-1",
        icon: "h-10 w-10",
      };

  const clickable = Boolean(onClick);

  return (
    <article
      onClick={onClick}
      className={[
        "overflow-hidden border border-white/10 bg-[#342e34] shadow-soft",
        size.wrapper,
        clickable ? "cursor-pointer transition hover:-translate-y-1 hover:border-brand-orange/25" : "",
        className,
      ].join(" ")}
    >
      <div className={["relative overflow-hidden", size.image].join(" ")}>
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#342e34] via-[#342e34]/18 to-transparent" />

        <div className={compact ? "absolute left-3 right-3 top-3 flex items-center justify-between" : "absolute left-4 right-4 top-4 flex items-center justify-between"}>
          <span
            className={[
              "rounded-full bg-[#201b20]/80 font-semibold uppercase tracking-[0.18em] text-brand-orangeSoft backdrop-blur-md",
              size.badge,
            ].join(" ")}
          >
            {item.market}
          </span>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className={[
              "flex items-center justify-center rounded-full border border-white/15 bg-[#201b20]/70 backdrop-blur-md transition hover:border-brand-orange/45 hover:bg-brand-orange/15",
              size.icon,
            ].join(" ")}
          >
            <Image src="/heart.svg" alt="Favourite" width={compact ? 14 : 18} height={compact ? 14 : 18} />
          </button>
        </div>

        <div className={compact ? "absolute bottom-3 left-3 flex items-center gap-1.5" : "absolute bottom-4 left-4 flex items-center gap-2"}>
          <span className={["rounded-full bg-brand-orange font-semibold text-white", size.badge].join(" ")}>
            {item.discount}
          </span>
          <span
            className={[
              "rounded-full bg-[#201b20]/80 font-semibold text-white/80 backdrop-blur-md",
              size.badge,
            ].join(" ")}
          >
            Rating {item.rating}
          </span>
        </div>
      </div>

      <div className={size.container}>
        <h3 className={[size.title, "font-black leading-[1.06] text-white"].join(" ")}>{item.title}</h3>
        <p className={["mt-2 text-white/60", size.description].join(" ")}>{item.description}</p>

        <div className={["mt-3 flex items-center gap-2", size.meta].join(" ")}>
          <span className={compact ? "rounded-full border border-white/10 px-2.5 py-1 text-white/65" : "rounded-full border border-white/10 px-3 py-1 text-white/65"}>{item.quantity}</span>
          <span className={compact ? "rounded-full border border-white/10 px-2.5 py-1 text-white/65" : "rounded-full border border-white/10 px-3 py-1 text-white/65"}>
            Market: {item.market}
          </span>
        </div>

        <div className={compact ? "mt-3 flex items-end justify-between gap-3" : "mt-5 flex items-end justify-between gap-4"}>
          <div>
            <p className={[size.price, "font-black text-brand-orange"].join(" ")}>{item.price}</p>
            <div className={["mt-1 flex items-center gap-2", size.meta].join(" ")}>
              <span className="text-white/35 line-through">{item.oldPrice}</span>
              <span className="text-brand-orangeSoft">{item.discount}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className={[
              "rounded-full bg-white font-semibold text-brand-night transition hover:bg-brand-orange hover:text-white",
              size.cta,
            ].join(" ")}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
