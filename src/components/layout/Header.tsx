"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const languages = ["UA", "EN", "PL", "DE", "FR", "ES"];
const catalogGroups = [
  "Discounts",
  "Products",
  "Recipes",
  "Stores",
  "Collections",
  "Seasonal picks",
  "Recently viewed",
  "Top rated",
];

const iconButtons = [
  { key: "search", src: "/Search.svg", alt: "Search" },
  { key: "favourites", src: "/Favourites.svg", alt: "Favourites" },
  { key: "location", src: "/Location.svg", alt: "Location" },
  { key: "user", src: "/User.svg", alt: "User" },
];

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UA");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsCatalogOpen(false);
        setIsLangOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative w-full rounded-[2rem] border border-[#3a3339] bg-[#2b262c]/95 px-5 py-4 shadow-soft backdrop-blur-xl xl:px-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setIsCatalogOpen((value) => !value);
              setIsLangOpen(false);
            }}
            className="relative z-20 flex h-[46px] w-[46px] items-center justify-center rounded-[16px] border border-white/10 bg-[#3a3339] transition hover:border-brand-orange/45 hover:bg-[#433b43]"
            aria-label="Open catalog"
          >
            <Image src="/Catalog_logo.svg" alt="Catalog" width={24} height={24} />
          </button>

          <div className="relative flex min-h-[60px] min-w-[220px] select-none items-center justify-center overflow-hidden rounded-[22px] border border-white/8 px-8 py-3">
            <Image
              src="/Dankoss_logo_bkg.svg"
              alt="Logo background"
              fill
              priority
              className="object-contain opacity-85"
            />
            <span className="relative z-10 flex items-center text-[30px] font-black tracking-[0.12em] text-[#f6d7b0]">
              DANK
              <span className="relative mx-[2px] flex h-[28px] w-[28px] items-center justify-center">
                <span className="opacity-0">O</span>
                <Image
                  src="/Orange_logo.svg"
                  alt="O"
                  width={30}
                  height={30}
                  className="absolute"
                />
              </span>
              SS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center">
            <ChainIcon ariaLabel={iconButtons[0].alt}>
              <Image src={iconButtons[0].src} alt={iconButtons[0].alt} width={20} height={20} />
            </ChainIcon>

            <div className="ml-2 flex items-center">
              <Connection />

              <ChainIcon ariaLabel={iconButtons[1].alt}>
                <Image src={iconButtons[1].src} alt={iconButtons[1].alt} width={20} height={20} />
              </ChainIcon>

              <Connection />

              <ChainIcon ariaLabel={iconButtons[2].alt}>
                <Image src={iconButtons[2].src} alt={iconButtons[2].alt} width={22} height={22} />
              </ChainIcon>

              <Connection />

              <div className="relative z-20">
                <ChainIcon
                  onClick={() => {
                    setIsLangOpen((value) => !value);
                    setIsCatalogOpen(false);
                  }}
                  ariaLabel={`Language ${currentLang}`}
                >
                  <span className="text-[13px] font-bold tracking-[0.14em] text-[#ffdeba]">
                    {currentLang}
                  </span>
                </ChainIcon>

                {isLangOpen ? (
                  <div className="absolute left-1/2 top-[52px] z-30 w-[88px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/10 bg-[#1a181c]/95 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="max-h-[180px] overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {languages.map((lang, index) => (
                        <div key={lang}>
                          <button
                            onClick={() => {
                              setCurrentLang(lang);
                              setIsLangOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-center text-sm font-semibold transition ${
                              currentLang === lang
                                ? "text-brand-orange"
                                : "text-[#ffdeba]/80 hover:text-brand-orangeSoft"
                            }`}
                          >
                            {lang}
                          </button>
                          {index < languages.length - 1 ? (
                            <div className="mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <Connection />

              <ChainIcon ariaLabel={iconButtons[3].alt}>
                <Image src={iconButtons[3].src} alt={iconButtons[3].alt} width={20} height={20} />
              </ChainIcon>
            </div>
          </div>

          <button className="flex h-[44px] items-center gap-3 rounded-full border border-white/8 bg-[#4d444d] pl-1 pr-3 transition hover:border-brand-orange/40 hover:bg-[#5a505a]">
            <Image src="/Orange_logo.svg" alt="" width={34} height={34} />
            <div className="relative flex h-[36px] w-[36px] items-center justify-center">
              <Image src="/Basket.svg" alt="Basket" width={32} height={32} />
              <span className="absolute inset-0 flex items-center justify-center pb-3 text-sm font-bold text-[#ffdeba]">
                5
              </span>
            </div>
          </button>
        </div>
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className={`absolute left-0 top-[calc(100%+10px)] w-full origin-top overflow-hidden rounded-[32px] border border-white/8 bg-[rgba(43,38,44,0.86)] backdrop-blur-[18px] transition-all duration-300 ${
          isCatalogOpen
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
        }`}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-60" />
        <div className="p-6 text-[#ffdeba] md:p-8">
          <h2 className="mb-5 text-2xl font-semibold">Catalog</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {catalogGroups.map((group) => (
              <button
                key={group}
                className="rounded-[22px] border border-white/6 bg-white/5 px-4 py-4 text-left text-sm font-medium transition hover:border-brand-orange/35 hover:text-brand-orangeSoft"
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function ChainIcon({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#5a505a] shadow-md transition-all duration-300 hover:scale-105 hover:bg-brand-orange active:scale-95"
      type="button"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
    </button>
  );
}

function Connection() {
  return (
    <div className="relative z-0 -mx-[4px] shrink-0 opacity-80">
      <Image src="/Connection.svg" alt="" width={30} height={20} />
    </div>
  );
}
