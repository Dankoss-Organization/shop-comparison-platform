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

/**
 * @brief Main store navigation carousel.
 * Auto-scrolls periodically or allows manual navigation via arrow buttons.
 * @returns {JSX.Element} The rendered store navigation component.
 */
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
        className="relative z-10 overflow-hidden border-t border-[#3A343D] bg-[#1E1C20] px-[30px] py-[20px]"
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

      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent blur-[1px]" />
    </>
  );
}

/**
 * @brief Renders a directional arrow button for the carousel.
 * @param {Object} props Component props.
 * @param {Function} props.onClick Callback fired on button click.
 * @param {"left" | "right"} props.direction Direction of the arrow.
 * @returns {JSX.Element} The arrow button element.
 */
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
      <div className="absolute inset-0 rounded-[20px] border border-white/5 bg-[#3A343D]/40 backdrop-blur-md transition-all duration-200 group-hover:border-[#FF7A00]/40 group-hover:bg-[#FF7A00]/20 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.15)] group-active:border-[#FF7A00] group-active:bg-[#FF7A00]/40" />

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
          className="text-[#F6D7B0]/60 transition-colors group-hover:text-[#FF7A00]"
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

/**
 * @brief Renders an individual shop card with hover effects.
 * @param {Object} props Component props.
 * @param {Object} props.shop Shop data including name, image source, and active state.
 * @returns {JSX.Element} The shop card element.
 */
export function ShopCard({ shop }: { shop: { name: string; src: string; active: boolean } }) {
  return (
    <button
      type="button"
      className={`group relative flex h-[68px] w-full items-center justify-center gap-[12px] overflow-hidden rounded-[22px] px-[24px] transition-all duration-300 ease-in-out ${
        shop.active
          ? "z-10 scale-100 border border-[#F6D7B0] bg-[#1A181C] shadow-[inset_0_0_15px_rgba(246,215,176,0.2)]"
          : "bg-gradient-to-r from-[#2D2930] to-[#5A3A2A] shadow-xl hover:z-50 hover:scale-[1.05]"
      }`}
    >
      <div className="pointer-events-none relative flex h-[40px] w-full max-w-[110px] items-center justify-center">
        <Image
          src={shop.src}
          alt={shop.name}
          fill
          className="object-contain transition-opacity duration-300 group-hover:opacity-0"
        />

        <Image
          src={shop.src}
          alt={shop.name}
          fill
          className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(46%) sepia(92%) saturate(6536%) hue-rotate(11deg) brightness(103%) contrast(101%)",
          }}
        />
      </div>
    </button>
  );
}