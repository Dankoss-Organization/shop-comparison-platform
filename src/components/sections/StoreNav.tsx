"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const initialShops = [
  { name: "Novus", src: "/Novus_logo.svg", active: false },
  { name: "ATB", src: "/Atb_logo.svg", active: false },
  { name: "Fora", src: "/Fora_logo.svg", active: false },
  { name: "Silpo", src: "/Silpo_logo.svg", active: false },
  { name: "Varus", src: "/Varus_logo.svg", active: false },
];

export default function HeaderLogoCarousel() {
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

    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      setShops((prev) => {
        const arr = [...prev];
        arr.push(arr.shift()!); 
        return arr;
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
      const arr = [...prev];
      arr.unshift(arr.pop()!); 
      return arr;
    });

    track.style.transition = "none";
    track.style.transform = `translateX(-${itemWidth + gap}px)`;

    void track.offsetHeight;

    requestAnimationFrame(() => {
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      track.style.transform = "translateX(0)";
      
      setTimeout(() => {
        track.style.transition = "none";
        setIsAnimating(false);
      }, 500);
    });
  };

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      nextShop();
    }, 3500);
    
    return () => clearInterval(timer);
  }, [isHovered, shops, isAnimating]);

  const visibleShops = [...shops, shops[0]];

  return (
    <>
      <div 
        className="bg-[#1E1C20] px-[30px] py-[20px] flex items-center gap-[16px] border-t border-[#3A343D] relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowSquare onClick={prevShop} direction="left" />
        
        <div className="flex-1 overflow-visible md:overflow-hidden px-1 -mx-1 py-2 -my-2">
          <div 
            ref={trackRef}
            className="flex gap-[16px] w-full"
          >
            {visibleShops.map((shop, i) => (
              <div 
                key={shop.name + i} 
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

      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent blur-[1px]" />
    </>
  );
}

function ArrowSquare({ onClick, direction }: { onClick: () => void; direction: "left" | "right" }) {
  return (
    <button
      onClick={onClick}
      className="group relative h-[68px] w-[42px] shrink-0 flex items-center justify-center transition-transform duration-150 active:scale-[0.85]"
    >
      <div className="absolute inset-0 bg-[#3A343D]/40 backdrop-blur-md rounded-[20px] border border-white/5 transition-all duration-200 group-hover:bg-[#FF7A00]/20 group-hover:border-[#FF7A00]/40 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.15)] group-active:bg-[#FF7A00]/40 group-active:border-[#FF7A00]" />

      <div className={`relative z-10 transition-transform duration-300 ${direction === 'left' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-[#F6D7B0]/60 group-hover:text-[#FF7A00] transition-colors"
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

function ShopCard({ shop }: { shop: { name: string; src: string; active: boolean } }) {
  return (
    <button
      className={`group flex w-full items-center justify-center gap-[12px] px-[24px] rounded-[22px] transition-all duration-300 ease-in-out h-[68px] relative overflow-hidden
        ${
          shop.active
            ? "bg-[#1A181C] border border-[#F6D7B0] shadow-[inset_0_0_15px_rgba(246,215,176,0.2)] scale-100 z-10"
            : "bg-gradient-to-r from-[#2D2930] to-[#5A3A2A] hover:scale-[1.05] hover:z-50 shadow-xl"
        }`}
    >
      <div className="relative h-[40px] w-full max-w-[110px] flex items-center justify-center pointer-events-none">
        
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
          className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ filter: "brightness(0) saturate(100%) invert(46%) sepia(92%) saturate(6536%) hue-rotate(11deg) brightness(103%) contrast(101%)" }}
        />
      </div>
    </button>
  );
}