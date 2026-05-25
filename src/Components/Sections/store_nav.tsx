/**
 * @file StoreNav.tsx
 * @brief Component for displaying an animated, responsive carousel of store logos.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Shop {
  name: string;
  src: string;
  active: boolean;
}

interface ArrowSquareProps {
  onClick: () => void;
  direction: "left" | "right";
}

interface ShopCardProps {
  shop: Shop;
}

interface Shop {
  id: string; 
  name: string;
  src: string;
  active: boolean;
}

const initialShops: Shop[] = [
  { id: "z_novus", name: "Novus", src: "/novus_logo.svg", active: false },
  { id: "a_atb", name: "ATB", src: "/atb_logo.svg", active: false },
  { id: "f_fora", name: "Fora", src: "/fora_logo.svg", active: false }, 
  { id: "s_silpo", name: "Silpo", src: "/silpo_logo.svg", active: false },
  { id: "v_varus", name: "Varus", src: "/varus_logo.svg", active: false },
];

export default function StoreNav() {
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const nextShop = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const track = trackRef.current;
    const firstItem = track.children[0] as HTMLElement;
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = 16;

    track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(-${itemWidth + gap}px)`;

    window.setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      setShops((prev) => {
        const next = [...prev];
        next.push(next.shift()!);
        return next;
      });
      setIsAnimating(false);
    }, 500);
  };

  const prevShop = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const track = trackRef.current;
    const firstItem = track.children[0] as HTMLElement;
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = 16;

    setShops((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });

    track.style.transition = "none";
    track.style.transform = `translateX(-${itemWidth + gap}px)`;

    void track.offsetHeight;

    requestAnimationFrame(() => {
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      track.style.transform = "translateX(0)";

      window.setTimeout(() => {
        track.style.transition = "none";
        setIsAnimating(false);
      }, 500);
    });
  };

  useEffect(() => {
    if (isHovered || isAnimating) return;

    const timer = window.setInterval(nextShop, 3500);
    return () => window.clearInterval(timer);
  }, [isHovered, isAnimating, shops]);

  const visibleShops = shops.length > 0 ? [...shops, ...shops] : shops;

  return (
    <>
      <div
        className="relative z-10 overflow-hidden border-t border-glass/10 bg-bg-darker p-4 md:p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4">
          <ArrowSquare onClick={prevShop} direction="left" />

          <div className="-mx-1 -my-2 flex-1 overflow-hidden px-1 py-2">
            <div ref={trackRef} className="flex w-full gap-4">
              {visibleShops.map((shop, index) => (
                <div
                  key={`${shop.name}-${index}`}
                  className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.3333%-10.66px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-12.8px)]"
                >
                  <ShopCard shop={shop} />
                </div>
              ))}
            </div>
          </div>

          <ArrowSquare onClick={nextShop} direction="right" />
        </div>
      </div>

      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-brand-orange to-transparent blur-[1px]" />
    </>
  );
}

export function ArrowSquare({ onClick, direction }: ArrowSquareProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative flex h-12 w-8 shrink-0 items-center justify-center transition-transform duration-150 active:scale-[0.85] md:h-[68px] md:w-[42px]"
      aria-label={`Scroll ${direction}`}
    >
      <div className="absolute inset-0 rounded-[14px] border border-glass/5 bg-bg-elevated/40 backdrop-blur-md transition-all duration-200 group-hover:border-brand-orange/40 group-hover:bg-brand-orange/20 group-hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.15)] group-active:border-brand-orange group-active:bg-brand-orange/40 md:rounded-[20px]" />

      <div
        className={`relative z-10 transition-transform duration-300 ${
          direction === "left" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-text-primary/60 transition-colors group-hover:text-brand-orange md:h-10 md:w-10"
        >
          {direction === "left" ? (
            <polyline points="15 18 9 12 15 6" />
          ) : (
            <polyline points="9 18 15 12 9 6" />
          )}
        </svg>
      </div>
    </button>
  );
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link
      href={`/store/${shop.id}`} 
      className={`group relative flex h-[56px] w-full items-center justify-center gap-[12px] overflow-hidden rounded-[16px] px-[16px] transition-all duration-300 ease-in-out md:h-[68px] md:rounded-[22px] md:px-[24px] ${
        shop.active
          ? "z-10 scale-100 border border-text-primary/20 bg-bg-deep shadow-[inset_0_0_15px_rgb(var(--brand-orange)_/_0.2)]"
          : "bg-gradient-to-r from-bg-elevated to-brand-store/60 shadow-md hover:z-50 hover:scale-[1.05] hover:to-brand-store md:shadow-xl"
      }`}
    >
      <div className="pointer-events-none relative flex h-[32px] w-full max-w-[90px] items-center justify-center md:h-[40px] md:max-w-[110px]">
        <div
          className={`h-full w-full transition-all duration-300 ${
            shop.active
              ? "bg-brand-orange opacity-100"
              : "bg-text-main opacity-30 dark:bg-text-primary dark:opacity-80 group-hover:bg-brand-orange group-hover:opacity-100 dark:group-hover:bg-brand-orange"
          }`}
          style={{
            WebkitMaskImage: `url(${shop.src})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${shop.src})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
          }}
        />
      </div>
    </Link>
  );
}