"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [lockedSubCategory, setLockedSubCategory] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubCategory(null);
    setLockedSubCategory(null);
  }, [currentActiveCategoryName, isOpen]);

  const currentActiveSubName = lockedSubCategory || activeSubCategory || activeCategoryData?.subcategories[0]?.name;
  const activeSubData = activeCategoryData?.subcategories.find((sub) => sub.name === currentActiveSubName);

  const hasThirdLevel = activeCategoryData?.subcategories.some(sub => sub.items && sub.items.length > 0);
  const backgroundImage = activeSubData?.image || "/salmon.jpg";

  return (
    <div
      id="catalog-dropdown"
      className={`
        absolute left-[0px] top-[85px] w-full h-auto pb-2
        bg-[rgba(70,59,70,0.25)] 
        backdrop-blur-[35px]
        rounded-b-[50px]
        shadow-[0_30px_60px_rgba(0,0,0,0.7)]
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
          bg-gradient-to-r from-transparent via-[#EC5800] to-transparent
          transition-all duration-700
          ${isOpen ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"}
        `}
      />

      <div
        className={`
          grid grid-cols-3 gap-5 h-full px-8 py-5
          transition-all duration-500 delay-150
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div
          className="col-span-2 rounded-[36px] p-6 flex bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.3)]"
          onMouseLeave={() => {
            if (!lockedCategory) {
              setActiveCategory(null);
            }
          }}
        >
          <div className="relative flex w-[35%] flex-col pr-6">
            <div className="mb-3 pl-3 pb-2 text-[20px] font-bold tracking-[1px] text-[#FFDEBA] uppercase">
              Catalog:
            </div>

            <div className="flex flex-col gap-0.5 mt-1">
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
                    className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-1.5 transition-all duration-300 ${
                      isActive ? "bg-[#FFDEBA]/15 shadow-inner" : "hover:bg-[#FFDEBA]/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[15px] transition-all duration-300 ${isActive ? "font-bold text-[#EC5800]" : "font-medium text-[#FFDEBA]/80 group-hover:text-[#FFDEBA]"}`}>
                        {category.name}
                      </span>
                    </div>
                    <span className={`text-[18px] transition-all duration-300 ${isActive ? "translate-x-1 text-[#FFDEBA]" : "text-[#FFDEBA]/30 group-hover:translate-x-0.5 group-hover:text-[#FFDEBA]/60"}`}>
                      ›
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FFDEBA]/10 to-transparent" />
          </div>

          <div className="h-full w-[65%] pl-6">
            <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[rgba(30,26,30,0.2)] backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
              
              <Image
                key={backgroundImage}
                src={backgroundImage}
                alt="category background"
                fill
                className={`object-cover transition-all duration-700 ease-out ${
                  activeCategoryData ? "opacity-20 blur-md scale-110" : "opacity-60 group-hover:scale-105"
                }`}
              />
              <div className={`absolute inset-0 z-10 transition-colors duration-700 ${
                activeCategoryData ? "bg-gradient-to-r from-[rgba(26,23,26,0.6)] to-transparent" : "bg-gradient-to-t from-[rgba(16,14,16,0.8)] via-[rgba(26,23,26,0.4)] to-transparent"
              }`} />

              {activeCategoryData ? (
                <div className="animate-in fade-in slide-in-from-left-4 relative z-20 flex h-full w-full duration-500">
                  
                  {hasThirdLevel ? (
                    <>
                      <div className="w-[45%] flex flex-col gap-0.5 p-5 border-r border-[#FFDEBA]/5 overflow-y-auto custom-scrollbar">
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
                                isDisplaying ? "bg-[#FFDEBA]/15 shadow-inner" : "hover:bg-[#FFDEBA]/5"
                              } ${isLocked ? "border-l-2 border-[#EC5800] pl-[8px]" : "border-l-2 border-transparent"}`}
                            >
                              <span className={`text-[14px] transition-colors duration-300 ${
                                isDisplaying ? "font-medium text-[#EC5800]" : "text-[#FFDEBA]/70 group-hover/sub:text-[#FFDEBA]"
                              }`}>
                                {sub.name}
                              </span>
                              
                              {isLocked && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#EC5800] shadow-[0_0_8px_#EC5800]/50"></span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="w-[55%] p-5 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                          {activeSubData?.items?.map((item) => (
                            <div key={item.name} className="group/item flex cursor-pointer items-center transition-all duration-300 hover:translate-x-1">
                              <span className="text-[13px] font-normal tracking-[-0.5px] text-[#FFDEBA]/60 transition-colors duration-300 group-hover/item:text-[#FFDEBA] line-clamp-1">
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
                        {activeCategoryData.subcategories.map((sub) => (
                          <div key={sub.name} className="group/item flex cursor-pointer items-center px-3 py-2 rounded-2xl transition-all duration-300 hover:bg-[#EC5800]/15 hover:shadow-sm">
                            <span className="text-[15px] font-medium text-[#FFDEBA]/80 transition-colors group-hover/item:text-[#EC5800]">
                              {sub.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 relative z-20 flex h-full w-full flex-col justify-end p-5 duration-500 cursor-pointer">
                  <div className="relative flex flex-col gap-2">
                    <span className="w-fit rounded-[8px] bg-[rgba(45,40,45,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] backdrop-blur-md">
                      🔥 Deal of the Day
                    </span>
                    <div className="text-[16px] font-bold leading-snug text-[#FFDEBA]">Salmon -30% Off</div>
                    <div className="mb-1 text-[12px] tracking-[-0.5px] text-[#FFDEBA]/70">Today only in all stores</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 grid h-full grid-rows-2 gap-5">
          
          <div className="group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[24px] bg-[rgba(30,26,30,0.2)] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <Image src="/recipe.jpg" alt="recipe" fill className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[rgba(16,14,16,0.9)] via-[rgba(26,23,26,0.2)] to-transparent" />
            <div className="relative z-20 flex flex-col gap-2">
              <span className="w-fit rounded-[8px] bg-[rgba(45,40,45,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] backdrop-blur-md">
                New
              </span>
              <div className="text-[18px] font-bold tracking-[1px] leading-tight text-[#FFDEBA] uppercase">Recipe of the week</div>
              <p className="line-clamp-1 text-[12px] tracking-[-0.5px] text-[#FFDEBA]/70">Salmon with vegetables in cream sauce</p>
            </div>
          </div>
          
          <div 
            className="group relative flex cursor-pointer flex-col justify-between rounded-[24px] p-5 transition-all duration-500 hover:-translate-y-1 backdrop-blur-md"
            style={{
              background: "linear-gradient(180deg, rgba(50,45,50,0.15) 0%, rgba(30,26,30,0.2) 100%)", 
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
            }}
          >
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] pointer-events-none">
              <div
                className="absolute -bottom-[40%] -right-[20%] w-[90%] h-[90%] rounded-full transition-all duration-1000 ease-out group-hover:scale-125 group-hover:opacity-100 opacity-60"
                style={{
                  background: "radial-gradient(circle at center, #EC5800 2%, #D34205 25%, transparent 85%)",
                  filter: "blur(60px)",
                }}
              />
              <svg 
                className="absolute -right-4 -bottom-4 w-28 h-28 text-[#FFDEBA] opacity-[0.03] transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10" 
                viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50Z" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6"/>
                <path d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50Z" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>

            <div className="relative z-20 flex flex-col gap-1.5">
              <h3 className="text-[20px] font-bold tracking-[2px] text-[#EC5800] uppercase">
                Partnership
              </h3>
              <p className="max-w-[160px] text-[13px] font-medium leading-[18px] tracking-[-0.5px] text-[#FFDEBA]/70 transition-colors duration-500 group-hover:text-[#FFDEBA]">
                Shape the future of retail with our ecosystem.
              </p>
            </div>

            <div className="relative z-20 mt-auto flex justify-start pt-4">
              {/* ОНОВЛЕНА КНОПКА З АНІМАЦІЄЮ ВІДБЛИСКУ */}
              <button
                className="group/btn relative overflow-hidden flex h-[36px] items-center justify-center rounded-[12px] border border-transparent px-4 text-[13px] font-medium text-[#FFDEBA] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white active:scale-95"
                style={{
                  background: "rgba(45, 40, 45, 0.4)",
                  boxShadow: "2px 2px 1px #EC5800",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">
                  Become a partner
                </span>
                
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover/btn:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.25)] to-transparent" />
                </div>
              </button>
            </div>
          </div>        
        </div>
      </div>
    </div>
  );
}