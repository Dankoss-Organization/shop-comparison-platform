"use client";

import Image from "next/image";
import { Category } from "@/Data/catalog_data";

interface Props {
  isOpen: boolean;
  categories: Category[];
  activeCategory: string | null;
  lockedCategory: string | null;
  setActiveCategory: (name: string | null) => void;
  setLockedCategory: (name: string | null) => void;
}

export default function CatalogDropdown({
  isOpen,
  categories,
  activeCategory,
  lockedCategory,
  setActiveCategory,
  setLockedCategory,
}: Props) {
  const currentActiveCategoryName = lockedCategory || activeCategory;
  const activeCategoryData = categories.find((category) => category.name === currentActiveCategoryName);

  return (
    <div
      id="catalog-dropdown"
      className={`
        absolute left-[0px] top-[77px] w-full h-[434px]
        bg-[rgba(101,88,101,0.35)]
        backdrop-blur-[25px]
        rounded-b-[50px]
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        z-[120]
        origin-top
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
        ${isOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-75 -translate-y-6 pointer-events-none"}
      `}
    >
      <div
        className={`
          absolute top-0 left-0 w-full h-[2px]
          bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent
          transition-all duration-700
          ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}
        `}
      />

      <div
        className={`
          grid grid-cols-3 gap-6 h-full px-8 py-6
          transition-all duration-500 delay-150
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div
          className="col-span-2 rounded-[40px] p-8 flex bg-[linear-gradient(135deg,rgba(70,65,70,0.35),rgba(40,36,40,0.35))] backdrop-blur-[25px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_30px_rgba(0,0,0,0.25)]"
          onMouseLeave={() => {
            if (!lockedCategory) {
              setActiveCategory(null);
            }
          }}
        >
          <div className="relative flex w-1/2 flex-col pr-8">
            <div className="mb-6 text-[22px] font-bold text-white">Каталог:</div>

            <div className="flex flex-col gap-2">
              {categories.map((category) => {
                const isActive = currentActiveCategoryName === category.name;

                return (
                  <div
                    key={category.name}
                    onMouseEnter={() => !lockedCategory && setActiveCategory(category.name)}
                    onClick={() => {
                      if (lockedCategory === category.name) {
                        setLockedCategory(null);
                      } else {
                        setLockedCategory(category.name);
                        setActiveCategory(category.name);
                      }
                    }}
                    className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-all duration-300 ${
                      isActive ? "bg-white/10 shadow-inner" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[20px] ${isActive ? "text-[#FF7A00]" : "text-[#FF7A00]/60"}`}>
                        •
                      </span>
                      <span
                        className={`text-[16px] font-medium transition-all duration-300 ${
                          isActive ? "text-[#FF7A00]" : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>

                    <span
                      className={`text-[18px] transition-all duration-300 ${
                        isActive ? "translate-x-1 text-white" : "text-white/30 group-hover:text-white/60"
                      }`}
                    >
                      ›
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          <div className="h-full w-1/2 pl-8">
            <div className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[30px] bg-[#2A252A]/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
              {activeCategoryData ? (
                <div className="animate-in fade-in zoom-in-95 relative z-20 flex flex-col gap-3 p-6 duration-300">
                  {activeCategoryData.subcategories.map((sub) => (
                    <div key={sub.name} className="group/item flex cursor-pointer items-center gap-3">
                      <span className="text-white/40 transition-colors group-hover/item:text-[#FF7A00]">•</span>
                      <span className="text-white/80 transition-colors group-hover/item:text-white">{sub.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 relative flex h-full w-full flex-col justify-end p-6 duration-300">
                  <Image
                    src="/salmon.jpg"
                    alt="salmon"
                    fill
                    className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-transparent" />

                  <div className="relative z-20 flex flex-col gap-1">
                    <div className="mb-1 text-[14px] font-semibold text-[#FF7A00]">🔥 Знижка дня</div>
                    <div className="text-[18px] font-bold leading-snug text-white">Лосось зі знижкою -30%</div>
                    <div className="mb-3 text-[13px] text-white/60">Тільки сьогодні у всіх магазинах</div>

                    <div className="rounded-xl border border-white/5 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
                      <div className="text-[13px] font-semibold text-white">1 + 1 = 3 на фрукти 🍑</div>
                      <div className="mt-0.5 text-[11px] text-white/50">Акція до кінця тижня</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 grid h-full grid-rows-2 gap-6">
          <div className="group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[30px] bg-[#2A252A]/80 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
            <Image
              src="/recipe.jpg"
              alt="recipe"
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A181C]/90 via-[#1A181C]/40 to-transparent" />
            <div className="relative z-20 flex flex-col gap-2">
              <span className="w-fit rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/20 px-[8px] py-[3px] text-[10px] font-bold uppercase tracking-wide text-[#FF7A00]">
                Новинка
              </span>
              <div className="text-[20px] font-bold leading-tight text-white">Рецепт тижня</div>
              <p className="line-clamp-1 text-[13px] text-white/70">Лосось з овочами під вершковим соусом</p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-end overflow-hidden rounded-[30px] bg-gradient-to-br from-[#3F363F] to-[#2A252A] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A181C]/80 to-transparent" />
            <div className="relative z-20 flex h-full flex-col">
              <div className="mb-auto flex flex-col gap-2">
                <div className="text-[20px] font-bold text-white">Співпраця</div>
                <p className="max-w-[220px] text-[13px] leading-relaxed text-white/60">
                  Розвивайте бізнес разом з Dankoss.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-fit rounded-full bg-[#FF7A00] px-[14px] py-[8px] text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#e66e00]">
                  Стати партнером
                </button>
                <div className="ml-[4px] flex gap-[6px] text-[12px] text-white/50">
                  <span className="cursor-pointer transition hover:text-[#FF7A00]">Про нас</span>
                  <span className="opacity-30">•</span>
                  <span className="cursor-pointer transition hover:text-[#FF7A00]">Контакти</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
