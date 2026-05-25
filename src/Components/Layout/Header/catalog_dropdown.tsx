/**
 * @file CatalogDropdown.tsx
 * @description Dropdown menu component displaying the store's product catalog.
 * Features fixed, reduced heights to prevent layout jumping, scroll-locking, and an embedded mobile language picker.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Category } from "@/Data/catalog_data";
import { useCatalog } from "@/Context/catalog_context";
import { useFavoritesStore } from "@/Store/use_favourite_store";

const STORE_ID_MAP: Record<string, string> = {
  novus: "z_novus",
  atb: "a_atb",
  fora: "f_fora",
  silpo: "s_silpo",
  varus: "v_varus",
};

export interface Props {
  categories: Category[];
}

export default function CatalogDropdown({ categories }: Props) {
  const {
    isCatalogOpen: isOpen,
    activeCategory,
    lockedCategory,
    setActiveCategory,
    setLockedCategory,
  } = useCatalog();

  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);

  const currentActiveCategoryName = lockedCategory || activeCategory;
  const activeCategoryData = categories.find((c) => c.name === currentActiveCategoryName);

  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [lockedSubCategory, setLockedSubCategory] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveSubCategory(null);
    setLockedSubCategory(null);
  }, [currentActiveCategoryName, isOpen]);

  const currentActiveSubName =
    lockedSubCategory || activeSubCategory || activeCategoryData?.subcategories[0]?.name;
  const activeSubData = activeCategoryData?.subcategories.find(
    (s) => s.name === currentActiveSubName
  );

  const hasThirdLevel = activeCategoryData?.subcategories.some(
    (s) => s.items && s.items.length > 0
  );
  const backgroundImage = activeSubData?.image || "/salmon.jpg";

  const closeCatalog = () => {
    const btn = document.getElementById("catalog-trigger");
    if (btn) btn.click();
  };

  const SubPanel = ({ heightClass = "h-full" }: { heightClass?: string }) => (
    <div
      className={`group relative flex ${heightClass} w-full flex-col overflow-hidden rounded-[24px] bg-black/20 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 shrink-0`}
    >
      <Image
        key={backgroundImage}
        src={backgroundImage}
        alt="category background"
        fill
        className={`object-cover transition-all duration-700 ease-out ${
          activeCategoryData ? "opacity-20 blur-md scale-110" : "opacity-60 group-hover:scale-105"
        }`}
      />
      <div
        className={`absolute inset-0 z-10 transition-colors duration-700 ${
          activeCategoryData
            ? "bg-gradient-to-r from-black/60 to-transparent"
            : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        }`}
      />

      {activeCategoryData ? (
        <div className="animate-in fade-in slide-in-from-left-4 relative z-20 flex h-full w-full duration-500">
          {hasThirdLevel ? (
            <>
              <div className="w-[45%] flex flex-col gap-0.5 p-5 border-r border-text-primary/5 overflow-y-auto custom-scrollbar">
                {activeCategoryData.subcategories.map((sub) => {
                  const isDisplaying = currentActiveSubName === sub.name;
                  const isLocked = lockedSubCategory === sub.name;
                  return (
                    <div
                      key={sub.name}
                      onMouseEnter={() => setActiveSubCategory(sub.name)}
                      onClick={() => {
                        if (lockedSubCategory === sub.name) {
                          setLockedSubCategory(null);
                        } else {
                          setLockedSubCategory(sub.name);
                        }
                      }}
                      className={`group/sub relative flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-300 ${
                        isDisplaying ? "bg-text-primary/15 shadow-[0_0_20px_rgba(0,0,0,0.35)]" : "hover:bg-text-primary/5"
                      } ${isLocked ? "border-l-2 border-brand-orange pl-[8px]" : "border-l-2 border-transparent"}`}
                    >
                      <span
                        className={`text-[14px] transition-colors duration-300 ${
                          isDisplaying
                            ? "font-medium text-brand-orange"
                            : "text-text-primary/70 group-hover/sub:text-text-primary"
                        }`}
                      >
                        {sub.name}
                      </span>
                      {isLocked && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgb(var(--brand-orange)_/_0.5)]" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="w-[55%] p-5 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                  {activeSubData?.items?.map((item) => (
                    <div
                      key={item.name}
                      className="group/item flex cursor-pointer items-center transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="text-[13px] font-normal tracking-[-0.5px] text-text-primary/60 transition-colors duration-300 group-hover/item:text-text-primary line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                {activeCategoryData.subcategories.map((sub) => {
                  const isStoreCategory = currentActiveCategoryName === "Stores";
                  if (isStoreCategory) {
                  const storeKey = sub.name.toLowerCase();
                  const realStoreId = STORE_ID_MAP[storeKey] || storeKey;

                  return (
                    <Link
                      key={sub.name}
                      href={`/store/${realStoreId}`} 
                      onClick={closeCatalog}
                      className="group/item flex cursor-pointer items-center px-3 py-2 rounded-2xl transition-all duration-300 hover:bg-text-primary/15 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
                    >
                      <span className="text-[15px] font-medium text-text-primary/80 transition-colors group-hover/item:text-brand-orange">
                        {sub.name}
                      </span>
                    </Link>
                  );
                }
                  return (
                    <div
                      key={sub.name}
                      className="group/item flex cursor-pointer items-center px-3 py-2 rounded-2xl transition-all duration-300 hover:bg-text-primary/15 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
                    >
                      <span className="text-[15px] font-medium text-text-primary/80 transition-colors group-hover/item:text-brand-orange">
                        {sub.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 relative z-20 flex h-full w-full flex-col justify-end p-5 duration-500 cursor-pointer">
          <div className="relative flex flex-col gap-2">
            <span className="w-fit rounded-[8px] bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-white shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-md">
              🔥 Deal of the Day
            </span>
            <div className="w-fit rounded-lg bg-black/30 px-3 py-1 backdrop-blur-sm text-[16px] font-bold leading-snug text-white">
              Salmon -30% Off
            </div>
            <div className="mb-1 text-[12px] tracking-[-0.5px] text-white/80">Today only in all stores</div>
          </div>
        </div>
      )}
    </div>
  );

  const RightCards = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? "grid grid-cols-2 gap-3 shrink-0" : "col-span-1 grid h-full grid-rows-2 gap-5 shrink-0"}>
      <div className={`group relative flex cursor-pointer flex-col justify-end overflow-hidden bg-black/20 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] backdrop-blur-md ${vertical ? "rounded-[20px] min-h-[120px]" : "rounded-[24px]"}`}>
        <Image src="/recipe.jpg" alt="recipe" fill className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="relative z-20 flex flex-col gap-2">
          <span className="w-fit rounded-[8px] bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-white shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-md">New</span>
          <div className={`font-bold tracking-[1px] leading-tight text-white uppercase ${vertical ? "text-[13px]" : "text-[18px]"}`}>Recipe of the week</div>
          <p className={`line-clamp-2 tracking-[-0.5px] text-white/70 ${vertical ? "text-[11px]" : "text-[12px]"}`}>Salmon with vegetables in cream sauce</p>
        </div>
      </div>

      <div className={`group relative flex cursor-pointer flex-col justify-between p-5 transition-all duration-500 hover:-translate-y-1 backdrop-blur-md bg-gradient-to-b from-white/10 to-black/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] ${vertical ? "rounded-[20px] min-h-[120px]" : "rounded-[24px]"}`}>
        <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${vertical ? "rounded-[20px]" : "rounded-[24px]"}`}>
          <div
            className="absolute -bottom-[40%] -right-[20%] w-[90%] h-[90%] rounded-full transition-all duration-1000 ease-out group-hover:scale-125 group-hover:opacity-100 opacity-60"
            style={{
              background: "radial-gradient(circle at center, rgb(var(--brand-orange)) 2%, rgb(var(--brand-orange-dark)) 25%, transparent 85%)",
              filter: "blur(60px)",
            }}
          />
          <svg className="absolute -right-4 -bottom-4 w-28 h-28 text-text-primary opacity-[0.03] transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50Z" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6"/>
            <path d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50Z" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col gap-1.5">
          <h3 className={`font-bold tracking-[2px] text-brand-orange uppercase ${vertical ? "text-[15px]" : "text-[20px]"}`}>Partnership</h3>
          <p className={`font-medium leading-[18px] tracking-[-0.5px] text-text-primary/70 transition-colors duration-500 group-hover:text-text-primary ${vertical ? "text-[11px]" : "max-w-[160px] text-[13px]"}`}>Shape the future of retail with our ecosystem.</p>
        </div>
        <div className="relative z-20 mt-auto flex justify-start pt-3">
          <Link
            href="/partnership"
            onClick={closeCatalog}
            className="group/btn relative overflow-hidden flex h-[32px] items-center justify-center rounded-[10px] border border-transparent px-3 text-[12px] font-medium text-text-primary transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.6)] hover:text-text-main active:scale-95"
            style={{
              background: "rgb(var(--bg-main) / 0.4)",
              boxShadow: "2px 2px 1px rgb(var(--brand-orange))",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">Become a partner</span>
            <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover/btn:left-[150%]">
              <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-text-primary/25 to-transparent" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={`absolute left-0 right-0 top-full h-[100vh] z-[110] bg-black/50 backdrop-blur-sm transition-all duration-700 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCatalog}
      />

      <div
        id="catalog-dropdown"
        className={`
          absolute left-0 right-0 top-full w-full pb-2
          max-h-[calc(100vh-120px)] lg:max-h-[calc(100vh-85px)]
          overflow-y-auto overflow-x-visible custom-scrollbar
          bg-zinc-900/60
          backdrop-blur-[35px]
          rounded-b-[50px]
          shadow-[0_30px_60px_rgba(0,0,0,0.6)]
          z-[120]
          origin-top
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          will-change-transform
          ${isOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-75 -translate-y-6 pointer-events-none"}
        `}
      >
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent transition-all duration-700 ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}`} />
        <div className={`hidden lg:grid grid-cols-3 gap-5 h-[380px] px-8 py-5 transition-all duration-500 delay-150 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="col-span-2 rounded-[36px] p-6 flex bg-white/5 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgb(var(--text-primary)_/_0.05),_0_8px_30px_rgba(0,0,0,0.3)]" onMouseLeave={() => { if (!lockedCategory) setActiveCategory(null); }}>
            <div className="relative flex w-[35%] flex-col pr-6">
              <div className="mb-3 pl-3 pb-2 text-[20px] font-bold tracking-[1px] text-text-primary uppercase">Catalog:</div>
              <div className="flex flex-col gap-0.5 mt-1 overflow-y-auto custom-scrollbar flex-1">
                {categories.map((category) => {
                  const isActive = currentActiveCategoryName === category.name;
                  return (
                    <div
                      key={category.name}
                      onMouseEnter={() => !lockedCategory && setActiveCategory(category.name)}
                      onClick={() => {
                        if (lockedCategory === category.name) {
                          setLockedCategory(null);
                          setActiveCategory(null);
                        } else {
                          setLockedCategory(category.name);
                          setActiveCategory(category.name);
                        }
                      }}
                      className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-1.5 transition-all duration-300 ${isActive ? "bg-text-primary/15 shadow-[0_0_20px_rgba(0,0,0,0.35)]" : "hover:bg-text-primary/5"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[15px] transition-all duration-300 ${isActive ? "font-bold text-brand-orange" : "font-medium text-text-primary/80 group-hover:text-text-primary"}`}>{category.name}</span>
                      </div>
                      <span className={`text-[18px] transition-all duration-300 ${isActive ? "translate-x-1 text-text-primary" : "text-text-primary/30 group-hover:translate-x-0.5 group-hover:text-text-primary/60"}`}>›</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-text-primary/10 to-transparent" />
            </div>
            <div className="h-full w-[65%] pl-6">
              <SubPanel />
            </div>
          </div>
          <RightCards />
        </div>

        <div className={`flex lg:hidden flex-col gap-3 px-[18px] py-6 pb-12 transition-all duration-500 delay-150 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/favorites" onClick={closeCatalog} className="group relative flex flex-1 items-center gap-2.5 rounded-2xl bg-white/5 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgb(var(--text-primary)_/_0.05),_0_4px_16px_rgba(0,0,0,0.25)] px-4 py-3 transition-all duration-300 hover:bg-brand-orange/10 active:scale-[0.97]">
              <div className="w-[18px] h-[18px] shrink-0 bg-text-primary opacity-60 transition-all duration-300 group-hover:bg-brand-orange group-hover:opacity-100 [-webkit-mask-image:url(/favourites.svg)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]" />
              <span className="text-[13px] font-semibold tracking-[0.06em] text-text-primary/70 transition-colors group-hover:text-brand-orange">Favorites</span>
              {favoriteCount > 0 && <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-orange px-[4px] text-[9px] font-black text-white">{favoriteCount}</span>}
            </Link>

            <Link href="/locations" onClick={closeCatalog} className="group flex flex-1 items-center gap-2.5 rounded-2xl bg-white/5 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgb(var(--text-primary)_/_0.05),_0_4px_16px_rgba(0,0,0,0.25)] px-4 py-3 transition-all duration-300 hover:bg-brand-orange/10 active:scale-[0.97]">
              <div className="w-[18px] h-[18px] shrink-0 bg-text-primary opacity-60 transition-all duration-300 group-hover:bg-brand-orange group-hover:opacity-100 [-webkit-mask-image:url(/location.svg)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]" />
              <span className="text-[13px] font-semibold tracking-[0.06em] text-text-primary/70 transition-colors group-hover:text-brand-orange">Map</span>
            </Link>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white/5 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgb(var(--text-primary)_/_0.05),_0_4px_16px_rgba(0,0,0,0.25)] px-4 py-3 shrink-0">
            <span className="text-[13px] font-semibold tracking-[0.06em] text-text-primary/70">Language</span>
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              {["EN", "PL", "FR", "ES", "DE", "IT", "UA"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300 ${
                    currentLang === lang ? "bg-brand-orange text-white shadow-lg" : "bg-white/5 text-text-primary/70 hover:bg-white/10 hover:text-text-primary"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] p-4 flex flex-col gap-3 bg-white/5 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgb(var(--text-primary)_/_0.05),_0_8px_30px_rgba(0,0,0,0.3)] shrink-0">
            <div className="text-[11px] font-bold tracking-[1px] text-text-primary/50 uppercase pl-1">
              Catalog
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              {categories.map((category) => {
                const isActive = currentActiveCategoryName === category.name;
                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => {
                      if (lockedCategory === category.name) {
                        setLockedCategory(null);
                        setActiveCategory(null);
                      } else {
                        setLockedCategory(category.name);
                        setActiveCategory(category.name);
                      }
                    }}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-[0.04em] transition-all duration-300 ${
                      isActive
                        ? "bg-brand-orange text-white shadow-lg"
                        : "bg-white/5 text-text-primary/70 hover:bg-white/10 hover:text-text-primary"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
            <SubPanel heightClass="h-[260px]" />
          </div>

          <RightCards vertical />
        </div>
      </div>
    </>
  );
}