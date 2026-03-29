"use client";

import { useState } from "react";
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

  const nextShop = () => {
    setShops((prev) => {
      const newShops = [...prev];
      const last = newShops.pop();
      if (last) newShops.unshift(last);
      return newShops;
    });
  };

  const prevShop = () => {
    setShops((prev) => {
      const newShops = [...prev];
      const first = newShops.shift();
      if (first) newShops.push(first);
      return newShops;
    });
  };

  return (
    <>
      <div className="bg-[#1E1C20] px-[30px] py-[20px] flex items-center gap-[16px] border-t border-[#3A343D] relative overflow-hidden">
        <ArrowSquare onClick={prevShop} direction="left" />
        
        <div 
          key={shops[0].name} 
          className="flex flex-1 items-center justify-between gap-[16px] animate-in fade-in slide-in-from-right-8 duration-500 ease-out"
        >
          {shops.map((shop) => (
            <ShopCard key={shop.name} shop={shop} />
          ))}
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
      className="group relative h-[68px] w-[42px] shrink-0 flex items-center justify-center transition-all duration-300 active:scale-90"
    >
      <div className="absolute inset-0 bg-[#3A343D]/40 backdrop-blur-md rounded-[20px] border border-white/5 transition-all duration-300 group-hover:bg-[#FF7A00]/20 group-hover:border-[#FF7A00]/40 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]" />

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
      className={`group flex flex-1 items-center justify-center gap-[12px] px-[24px] rounded-[22px] transition-all duration-300 ease-in-out h-[68px] shrink-0 min-w-[150px] relative overflow-hidden
        ${
          shop.active
            ? "bg-[#1A181C] border border-[#F6D7B0] shadow-[inset_0_0_15px_rgba(246,215,176,0.2)] scale-100 z-10"
            : "bg-gradient-to-r from-[#2D2930] to-[#5A3A2A] hover:scale-110 hover:z-50 shadow-xl"
        }`}
    >
      <div className="relative h-[40px] w-auto flex items-center justify-center pointer-events-none">
        <Image
          src={shop.src}
          alt={shop.name}
          width={110}
          height={40}
          className="object-contain transition-opacity duration-300 group-hover:opacity-0"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Image
            src={shop.src} 
            alt={shop.name}
            width={110}
            height={40}
            className="object-contain fill-[#FF7A00]"
            style={{ filter: "brightness(0) saturate(100%) invert(46%) sepia(92%) saturate(6536%) hue-rotate(11deg) brightness(103%) contrast(101%)" }}
          />
        </div>
      </div>

      {shop.active && (
        <div className="flex items-center gap-[10px] shrink-0 animate-in fade-in zoom-in duration-300">
        </div>
      )}
    </button>
  );
}

