/**
 * @file StoreNav.tsx
 * @brief Component for displaying an animated carousel of store logos.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const initialShops = [
  { name: "Novus", src: "/novus_logo.svg", active: false },
  { name: "ATB", src: "/atb_logo.svg", active: false },
  { name: "Fora", src: "/fora_logo.svg", active: false },
  { name: "Silpo", src: "/silpo_logo.svg", active: false },
  { name: "Varus", src: "/varus_logo.svg", active: false },
];

export default function StoreNav() {
  const [shops, setShops] = useState(initialShops);
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

    const timer = window.setInterval(() => {
      nextShop();
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isHovered, isAnimating, shops]);

  const visibleShops = shops.length > 0 ? [...shops, shops[0]] : shops;

  return (
    <>
      <div
        className="relative z-10 overflow-hidden border-t border-glass/10 bg-bg-darker px-[30px] py-[20px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-[16px]">
          <ArrowSquare onClick={prevShop} direction="left" />

          <div className="-mx-1 -my-2 flex-1 overflow-visible px-1 py-2 md:overflow-hidden">
            <div ref={trackRef} className="flex w-full gap-[16px]">
              {visibleShops.map((shop, index) => (
                <div
                  key={`${shop.name}-${index}`}
                  className="shrink-0"
                  style={{ width: "calc((100% - 64px) / 5)" }}
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

export function ArrowSquare({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative flex h-[68px] w-[42px] shrink-0 items-center justify-center transition-transform duration-150 active:scale-[0.85]"
    >
      <div className="absolute inset-0 rounded-[20px] border border-glass/5 bg-bg-elevated/40 backdrop-blur-md transition-all duration-200 group-hover:border-brand-orange/40 group-hover:bg-brand-orange/20 group-hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.15)] group-active:border-brand-orange group-active:bg-brand-orange/40" />

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
          className="text-text-primary/60 transition-colors group-hover:text-brand-orange"
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
export function ShopCard({ shop }: { shop: { name: string; src: string; active: boolean } }) {
  return (
    <button
      type="button"
      className={`group relative flex h-[68px] w-full items-center justify-center gap-[12px] overflow-hidden rounded-[22px] px-[24px] transition-all duration-300 ease-in-out ${
        shop.active
          ? "z-10 scale-100 border border-text-primary bg-bg-deep shadow-[inset_0_0_15px_rgb(var(--text-primary)_/_0.2)]"
          : "bg-gradient-to-r from-bg-elevated to-brand-store/60 shadow-xl hover:z-50 hover:scale-[1.05] hover:to-brand-store"
      }`}
    >
      <div className="pointer-events-none relative flex h-[40px] w-full max-w-[110px] items-center justify-center">
        {/* ТУТ ПОВЕРНУЛИ bg-text-primary (кремовий колір) */}
        <div
          className={`w-full h-full transition-colors duration-300 ${
            shop.active ? "bg-brand-orange" : "bg-text-primary group-hover:bg-brand-orange"
          }`}
          style={{
            WebkitMaskImage: `url(${shop.src})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center',
            maskImage: `url(${shop.src})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center'
          }}
        />
      </div>
    </button>
  );
}