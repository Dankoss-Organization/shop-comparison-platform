"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChainIcon, Connection } from "@/components/ui/HeaderUI";
import CatalogDropdown from "./header/CatalogDropdown";
import { categories } from "@/data/catalog";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UA");

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);

  // Закриття dropdown по кліку поза ним
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        !target.closest("#catalog-trigger") &&
        !target.closest("#catalog-dropdown")
      ) {
        setIsCatalogOpen(false);
        setLockedCategory(null);
        setActiveCategory(null);
      }
    };

    if (isCatalogOpen) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    }
  }, [isCatalogOpen]);

  return (
    <header className="relative w-full bg-[#2B262C] border-b border-[#1A181C] font-sans">
      <div className="flex items-center justify-between px-[20px] xl:px-[40px] py-[15px]">

        {/* LEFT */}
        <div className="flex items-center gap-[34px]">
          <button
            id="catalog-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setIsCatalogOpen(!isCatalogOpen);
            }}
            className="shrink-0 hover:opacity-80 transition-opacity z-[50]"
          >
            <Image src="/Catalog_logo.svg" alt="catalog" width={30} height={30} />
          </button>

          {/* DROPDOWN */}
          <div onClick={(e) => e.stopPropagation()}>
            <CatalogDropdown
              isOpen={isCatalogOpen}
              categories={categories}
              activeCategory={activeCategory}
              lockedCategory={lockedCategory}
              setActiveCategory={setActiveCategory}
              setLockedCategory={setLockedCategory}
            />
          </div>
        </div>

        <div className="relative self-start flex items-center select-none px-10 py-4 min-w-[220px] justify-center">
        <Image
          src="/Dankoss_logo_bkg.svg"
          alt="logo background"
          fill
          priority
          className="z-0 object-contain scale-160"
        />

          <span className="relative z-10 text-[#F6D7B0] text-[35px] tracking-[0.1em] flex items-center font-bold">
            DANK
            <span className="relative flex items-center justify-center w-[28px] h-[28px] mx-[2px]">
              <span className="opacity-0">O</span>
              <Image
                src="/Orange_logo.svg"
                alt="O"
                width={35}
                height={35}
                className="absolute"
              />
            </span>
            SS
          </span>
        </div>

        <div className="flex items-center">

          <div className="relative flex items-center z-10">
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-[#3F363F] h-[42px] w-[300px] pl-[20px] pr-[50px] rounded-full text-[#FFDEBA] text-[14px] tracking-[0.1em] outline-none shadow-md placeholder:text-[#FFDEBA]/40"
            />

            <div className="absolute right-[2px] top-1/2 -translate-y-1/2 z-20">
              <ChainIcon>
                <Image src="/Search.svg" alt="search" width={20} height={20} />
              </ChainIcon>
            </div>
          </div>
          <div className="flex items-center gap-0">
            <Connection />

            <ChainIcon>
              <Image src="/Favourites.svg" alt="fav" width={20} height={20} />
            </ChainIcon>

            <Connection />

            <ChainIcon>
              <Image src="/Location.svg" alt="loc" width={22} height={22} />
            </ChainIcon>

            <Connection />
            <div className="relative flex items-center z-20">
              <ChainIcon onClick={() => setIsLangOpen(!isLangOpen)}>
                <span className="text-[#FFDEBA] text-[16px] font-semibold">
                  {currentLang}
                </span>
              </ChainIcon>

              {isLangOpen && (
                <div className="absolute top-[46px] left-1/2 -translate-x-1/2 w-[60px] bg-[#1A181C]/90 backdrop-blur-xl rounded-[15px] flex flex-col items-center shadow-lg overflow-hidden py-1">
                  {["EN", "PL", "FR", "ES", "DE", "IT", "UA"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="py-1.5 w-full text-center text-[13px] font-medium text-white/80 hover:text-[#FF7A00] hover:bg-white/5 transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Connection />

            <ChainIcon>
              <Image src="/User.svg" alt="user" width={20} height={20} />
            </ChainIcon>
          </div>
          <div className="flex items-center justify-between bg-[#4D444D] w-[100px] h-[42px] rounded-full pl-[6px] pr-0 ml-4 shrink-0 shadow-inner relative">
            <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
              <Image src="/Orange_logo.svg" alt="logo" width={28} height={28} className="object-contain" />
            </div>

            <div className="absolute right-[2px] top-[4px] flex items-center justify-center w-[44px] h-[44px] shrink-0 z-20">
              <Image src="/Basket.svg" alt="basket" width={44} height={44} className="object-contain relative top-[6px]" />
              <span className="absolute top-2/5 left-1/2 -translate-x-[50%] -translate-y-[20%] text-[#FDE3C8] font-black text-[12px] leading-none z-10 drop-shadow-md">
                5
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}