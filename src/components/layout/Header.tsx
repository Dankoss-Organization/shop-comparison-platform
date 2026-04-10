"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChainIcon, Connection } from "@/components/ui/IconUI";
import CatalogDropdown from "./header/CatalogDropdown";
import { categories } from "@/Data/catalog_data";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UA");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("#catalog-trigger") && !target.closest("#catalog-dropdown")) {
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
    };
  }, [isCatalogOpen]);

  return (
    <header className="relative z-[90] w-full border-b border-[#1A181C] bg-[#2B262C] font-sans shadow-lg">
      <div className="relative flex w-full items-center justify-between px-4 py-[8px] md:px-8 xl:px-[40px]">
        
        <div className="flex items-center gap-8 xl:gap-[60px]">
          
          <div className="flex items-center">
            <button
              id="catalog-trigger"
              onClick={(event) => {
                event.stopPropagation();
                setIsCatalogOpen(!isCatalogOpen);
              }}
              className="z-[50] shrink-0 transition-opacity hover:opacity-80"
              type="button"
            >
              <Image src="/catalog_logo.svg" alt="catalog" width={30} height={30} />
            </button>

            <div onClick={(event) => event.stopPropagation()}>
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

          <div className="relative flex min-w-[220px] select-none items-center justify-center py-2">
            <Image
              src="/dankoss_logo_bkg.svg"
              alt="logo background"
              fill
              priority
              className="z-0 scale-[1.2] object-contain"
            />

            <span className="relative z-10 flex items-center text-[35px] font-bold tracking-[0.1em] text-[#F6D7B0]">
              DANK
              <span className="relative mx-[2px] flex h-[28px] w-[28px] items-center justify-center">
                <span className="opacity-0">O</span>
                <Image src="/orange_logo.svg" alt="O" width={35} height={35} className="absolute" />
              </span>
              SS
            </span>
          </div>
          
        </div>

        <div className="flex flex-1 items-center justify-end">
          
          <div className="relative z-10 hidden items-center lg:flex">
            <input
              type="text"
              placeholder="SEARCH"
              className="h-[42px] w-[250px] xl:w-[300px] rounded-full bg-[#3F363F] pl-[20px] pr-[50px] text-[14px] tracking-[0.1em] text-[#FFDEBA] shadow-md outline-none placeholder:text-[#FFDEBA]/40"
            />

            <div className="absolute right-[2px] top-1/2 z-20 -translate-y-1/2">
              <ChainIcon>
                <Image src="/search.svg" alt="search" width={20} height={20} />
              </ChainIcon>
            </div>
          </div>

          <div className="flex items-center gap-0">
            <div className="hidden lg:block"><Connection /></div>

            <ChainIcon>
              <Image src="/favourites.svg" alt="fav" width={20} height={20} />
            </ChainIcon>

            <Connection />

            <ChainIcon>
              <Image src="/location.svg" alt="loc" width={22} height={22} />
            </ChainIcon>

            <Connection />

            <div className="relative z-20 flex items-center">
              <ChainIcon onClick={() => setIsLangOpen(!isLangOpen)}>
                <span className="text-[16px] font-semibold text-[#FFDEBA]">{currentLang}</span>
              </ChainIcon>

              {isLangOpen ? (
                <div className="absolute left-1/2 top-[46px] flex w-[60px] -translate-x-1/2 flex-col items-center overflow-hidden rounded-[15px] bg-[#1A181C]/90 py-1 shadow-lg backdrop-blur-xl">
                  {["EN", "PL", "FR", "ES", "DE", "IT", "UA"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="w-full py-1.5 text-center text-[13px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-[#FF7A00]"
                      type="button"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Connection />

            <ChainIcon>
              <Image src="/user.svg" alt="user" width={20} height={20} />
            </ChainIcon>
          </div>

          <div className="relative ml-8 xl:ml-[50px] flex h-[42px] w-[100px] shrink-0 items-center justify-between rounded-full bg-[#4D444D] pl-[6px] pr-0 shadow-inner">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center">
              <Image src="/orange_logo.svg" alt="logo" width={28} height={28} className="object-contain" />
            </div>

            <div className="absolute right-[2px] top-[4px] z-20 flex h-[44px] w-[44px] shrink-0 items-center justify-center">
              <Image
                src="/basket.svg"
                alt="basket"
                width={44}
                height={44}
                className="relative top-[6px] object-contain"
              />
              <span className="absolute left-1/2 top-2/5 z-10 -translate-x-[50%] -translate-y-[20%] text-[12px] font-black leading-none text-[#FDE3C8] drop-shadow-md">
                5
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}