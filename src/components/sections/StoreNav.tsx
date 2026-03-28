"use client";

import { useState } from "react";
import Image from "next/image";

const initialShops = [
  { name: "Novus", src: "/Novus_logo.svg" },
  { name: "ATB", src: "/Atb_logo.svg" },
  { name: "Fora", src: "/Fora_logo.svg" },
  { name: "Silpo", src: "/Silpo_logo.svg" },
  { name: "Varus", src: "/Varus_logo.svg" },
];

export default function StoreNav() {
  const [shops, setShops] = useState(initialShops);
  const [activeShop, setActiveShop] = useState("Silpo");

  const nextShop = () => {
    setShops((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  const prevShop = () => {
    setShops((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (first) next.push(first);
      return next;
    });
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#211d22] p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <ArrowButton onClick={prevShop} src="/arrow-left-square-fill.svg" alt="Previous" />
        <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {shops.map((shop) => {
            const isActive = activeShop === shop.name;

            return (
              <button
                key={shop.name}
                onClick={() => setActiveShop(shop.name)}
                className={`group flex h-[74px] items-center justify-center rounded-[22px] border px-4 transition ${
                  isActive
                    ? "border-brand-orange/45 bg-[#171418] shadow-[inset_0_0_18px_rgba(236,88,0,0.15)]"
                    : "border-white/8 bg-[linear-gradient(135deg,#2d2930,#4a352f)] hover:border-brand-orange/35 hover:-translate-y-0.5"
                }`}
              >
                <Image
                  src={shop.src}
                  alt={shop.name}
                  width={110}
                  height={40}
                  className={isActive ? "" : "opacity-90 transition group-hover:opacity-100"}
                  style={
                    isActive
                      ? {
                          filter:
                            "brightness(0) saturate(100%) invert(55%) sepia(91%) saturate(3698%) hue-rotate(9deg) brightness(102%) contrast(102%)",
                        }
                      : undefined
                  }
                />
              </button>
            );
          })}
        </div>
        <ArrowButton onClick={nextShop} src="/arrow-right-square-fill.svg" alt="Next" />
      </div>
      <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-70" />
    </div>
  );
}

function ArrowButton({ onClick, src, alt }: { onClick: () => void; src: string; alt: string }) {
  return (
    <button
      onClick={onClick}
      className="flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-white/10 bg-white/5 transition hover:border-brand-orange/35 hover:bg-brand-orange/10"
      aria-label={alt}
    >
      <Image src={src} alt={alt} width={24} height={24} />
    </button>
  );
}
