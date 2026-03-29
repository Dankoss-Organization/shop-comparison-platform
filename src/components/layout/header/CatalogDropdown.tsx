"use client";

import Image from "next/image";
import { Category } from '@/data/catalog'; 

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
  const activeCategoryData = categories.find(
    (c) => c.name === currentActiveCategoryName
  );

  return (
    <div
      id="catalog-dropdown"
      className={`
        absolute left-[0px] top-[77px] w-full h-[434px]
        bg-[rgba(101,88,101,0.35)]
        backdrop-blur-[25px]
        rounded-b-[50px]
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        z-[40]
        origin-top
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
        ${isOpen 
          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 scale-y-75 -translate-y-6 pointer-events-none"}
      `}
    >
      <div className={`
        absolute top-0 left-0 w-full h-[2px]
        bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent
        transition-all duration-700
        ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}
      `} />

      <div className={`
        grid grid-cols-3 gap-6 h-full px-8 py-6
        transition-all duration-500 delay-150
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}>
        <div 
          className="col-span-2 rounded-[40px] p-8 flex
            bg-[linear-gradient(135deg,rgba(70,65,70,0.35),rgba(40,36,40,0.35))] backdrop-blur-[25px]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_30px_rgba(0,0,0,0.25)]"
          
          onMouseLeave={() => {
            if (!lockedCategory) {
              setActiveCategory(null);
            }
          }}
        >
          {/* Ліва частина: Головні категорії */}
          <div className="w-1/2 pr-8 flex flex-col relative">
            <div className="text-[22px] font-bold text-white mb-6">
              Каталог:
            </div>

            <div className="flex flex-col gap-2">
              {categories.map((cat) => {
                const isActive = currentActiveCategoryName === cat.name;

                return (
                  <div
                    key={cat.name}
                    onMouseEnter={() => !lockedCategory && setActiveCategory(cat.name)}
                    onClick={() => {
                      if (lockedCategory === cat.name) {
                        setLockedCategory(null);
                      } else {
                        setLockedCategory(cat.name);
                        setActiveCategory(cat.name);
                      }
                    }}
                    className={`flex items-center justify-between cursor-pointer group px-3 py-2 rounded-xl transition-all duration-300
                      ${isActive ? "bg-white/10 shadow-inner" : "hover:bg-white/5"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[20px] ${isActive ? "text-[#FF7A00]" : "text-[#FF7A00]/60"}`}>
                        •
                      </span>
                      <span className={`text-[16px] transition-all duration-300 font-medium
                        ${isActive ? "text-[#FF7A00]" : "text-white/80 group-hover:text-white"}`}
                      >
                        {cat.name}
                      </span>
                    </div>

                    <span className={`text-[18px] transition-all duration-300
                      ${isActive ? "text-white translate-x-1" : "text-white/30 group-hover:text-white/60"}`}
                    >
                      ›
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[1px]
              bg-gradient-to-b from-transparent via-white/20 to-transparent"
            />
          </div>

          <div className="w-1/2 pl-8 h-full">
            <div className="group w-full h-full bg-[#2A252A]/80 rounded-[30px] relative overflow-hidden flex flex-col
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_15px_35px_rgba(0,0,0,0.4)]
              hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] transition-all duration-500 cursor-pointer"
            >
              {activeCategoryData ? (
                <div className="relative z-20 p-6 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-300">
                  {activeCategoryData.subcategories.map((sub) => (
                    <div key={sub.name} className="flex items-center gap-3 group/item cursor-pointer">
                      <span className="text-white/40 group-hover/item:text-[#FF7A00] transition-colors">•</span>
                      <span className="text-white/80 group-hover/item:text-white transition-colors">
                        {sub.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full relative flex flex-col justify-end p-6 animate-in fade-in zoom-in-95 duration-300">
                  <Image
                    src="/Salmon.jpg" 
                    alt="salmon"
                    fill
                    className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-transparent z-10" />
                  
                  <div className="relative z-20 flex flex-col gap-1">
                    <div className="text-[#FF7A00] text-[14px] font-semibold mb-1">
                      🔥 Знижка дня
                    </div>
                    <div className="text-white text-[18px] font-bold leading-snug">
                      Лосось зі знижкою -30%
                    </div>
                    <div className="text-white/60 text-[13px] mb-3">
                      Тільки сьогодні у всіх магазинах
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 border border-white/5">
                      <div className="text-white text-[13px] font-semibold">
                        1 + 1 = 3 на фрукти 🍑
                      </div>
                      <div className="text-white/50 text-[11px] mt-0.5">
                        Акція до кінця тижня
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-6 h-full">
          
          <div className="group bg-[#2A252A]/80 rounded-[30px] p-6 relative overflow-hidden flex flex-col justify-end cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] transition-all duration-500">
            <Image src="/recipe.jpg" alt="recipe" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A181C]/90 via-[#1A181C]/40 to-transparent z-10" />
            <div className="relative z-20 flex flex-col gap-2">
              <span className="w-fit px-[8px] py-[3px] rounded-full bg-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-bold uppercase tracking-wide border border-[#FF7A00]/30">Новинка</span>
              <div className="text-[20px] font-bold text-white leading-tight">Рецепт тижня</div>
              <p className="text-white/70 text-[13px] line-clamp-1">Лосось з овочами під вершковим соусом</p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-[#3F363F] to-[#2A252A] rounded-[30px] p-6 relative overflow-hidden flex flex-col justify-end shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A181C]/80 to-transparent z-10" />
            <div className="relative z-20 flex flex-col h-full">
              <div className="flex flex-col gap-2 mb-auto">
                <div className="text-[20px] font-bold text-white">
                  Співпраця
                </div>
                <p className="text-white/60 text-[13px] leading-relaxed max-w-[220px]">
                  Розвивайте бізнес разом з Dankoss.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="px-[14px] py-[8px] rounded-full bg-[#FF7A00] text-xs font-semibold text-white hover:bg-[#e66e00] transition-colors shadow-lg w-fit">
                  Стати партнером
                </button>
                <div className="flex gap-[6px] ml-[4px] text-[12px] text-white/50">
                  <span className="cursor-pointer hover:text-[#FF7A00] transition">
                    Про нас
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="cursor-pointer hover:text-[#FF7A00] transition">
                    Контакти
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}