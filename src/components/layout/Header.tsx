"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChainIcon, Connection } from "@/components/ui/IconUI";
import CatalogDropdown from "./header/CatalogDropdown";
import { categories } from "@/Data/catalog_data";
import { motion, AnimatePresence } from "framer-motion";
import { CatalogProvider, useCatalog } from "@/context/CatalogContext";
import { useFavoritesStore } from "@/store/use_favourites_store";
import { CartHeaderWidget } from "./header/CartHeaderWidget";

export default function Header() {
  return (
    <CatalogProvider>
      <HeaderContent />
    </CatalogProvider>
  );
}

function HeaderContent() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const { isCatalogOpen, setIsCatalogOpen, closeCatalog } = useCatalog();
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("#catalog-trigger") && !target.closest("#catalog-dropdown")) {
        closeCatalog(); 
      }
    };

    if (isCatalogOpen) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isCatalogOpen, closeCatalog]);

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
              className="group relative z-[50] flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#5A505A]/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#EC5800] hover:shadow-[0_8px_20px_rgba(236,88,0,0.4)] active:scale-90 active:translate-y-0"
              type="button"
            >
              <div className="relative flex h-[24px] w-[24px] items-center justify-center text-[#FFDEBA] transition-colors duration-300 group-hover:text-white">
                <svg viewBox="0 0 70 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute w-[24px] h-[24px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCatalogOpen ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0 group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-90"}`}>
                  <path d="M31.1417 24.6591C49.4538 3.70251 63.0718 -4.91299 64.6487 2.77106C65.6672 7.73417 49.6065 8.6756 36.8576 24.6591C17.5419 48.8756 0 47.9442 0 41.4244C0 34.9046 15.5709 42.4786 31.1417 24.6591Z" fill="currentColor"/>
                  <path d="M35.4781 36.2785C53.7902 15.322 67.4083 6.70645 68.9851 14.3905C70.0036 19.3536 53.9429 20.295 41.194 36.2785C21.8783 60.4951 4.33643 59.5637 4.33643 53.0438C4.33643 46.524 19.9073 54.0981 35.4781 36.2785Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M60.5847 27.1779C69.4541 24.8495 75.3669 42.3128 62.7615 46.4113C56.5915 48.4172 47.994 42.9442 47.7849 38.5539C47.576 34.1636 54.4787 28.7809 60.5847 27.1779ZM60.6677 43.05C68.5083 40.5007 64.8308 29.6392 59.3142 31.0871C55.5163 32.0841 51.2225 35.4315 51.3523 38.1623C51.4823 40.8931 56.83 44.2977 60.6677 43.05Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.5979 32.6772C1.72855 35.0056 -4.18428 17.5424 8.42115 13.4438C14.5911 11.4379 23.1887 16.9109 23.3977 21.3013C23.6067 25.6916 16.704 31.0742 10.5979 32.6772ZM10.5149 16.8052C2.6743 19.3544 6.35177 30.2159 11.8684 28.7681C15.6663 27.771 19.9601 24.4236 19.8303 21.6929C19.7003 18.9621 14.3526 15.5575 10.5149 16.8052Z" fill="currentColor"/>
                </svg>
                <svg viewBox="0 0 83 93" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute w-[26px] h-[26px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCatalogOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0"}`}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M39.4849 18.5947C53.6446 25.5173 61.701 43.3447 57.9272 61.6142C53.9193 81.0172 37.9816 94.0736 21.2896 92.4267C19.1262 90.9969 17.1099 89.3629 15.2651 87.5547C30.77 88.2687 45.2876 75.9203 49.0229 57.8369C52.2379 42.2726 46.5182 27.0433 35.6987 19.1513C36.9413 18.9077 38.2043 18.7214 39.4849 18.5947Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M59.8309 66.1071C61.5769 60.855 66.6548 57.9119 71.1732 59.5333C75.6915 61.1546 77.9393 66.7263 76.1935 71.9783C74.4475 77.2304 69.3687 80.1736 64.8502 78.5522C60.332 76.9306 58.0849 71.3591 59.8309 66.1071ZM69.7726 64.3083C67.5989 63.5283 65.1559 64.9443 64.3159 67.4709C63.476 69.9975 64.5574 72.678 66.731 73.458C68.9046 74.2377 71.3478 72.8218 72.1877 70.2954C73.0275 67.7689 71.946 65.0883 69.7726 64.3083Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M61.9521 23.9089C72.1683 28.818 79.5312 39.2367 80.4533 52.0685C81.0725 60.6866 78.6798 68.9364 74.2136 75.6361C74.6124 74.0626 74.7695 72.0696 74.5994 69.9227C74.401 67.4192 73.7957 65.1926 72.9845 63.6371C75.8977 58.6307 77.4093 52.6923 76.9655 46.5142C76.2281 36.252 70.2906 27.9364 62.0766 24.095C62.036 24.0326 61.9931 23.971 61.9521 23.9089Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.8386 44.7937C28.4393 38.7284 33.9413 35.0569 39.1279 36.5928C44.3143 38.1288 47.2215 44.2903 45.6209 50.3555C44.0203 56.4207 38.5182 60.0921 33.3316 58.5564C28.145 57.0205 25.238 50.859 26.8386 44.7937ZM37.8818 42.0947C35.3867 41.3559 32.7399 43.1226 31.9699 46.0404C31.2001 48.958 32.5987 51.922 35.0936 52.6608C37.5887 53.3996 40.2355 51.6329 41.0055 48.7152C41.7753 45.7975 40.3768 42.8336 37.8818 42.0947Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.7047 33.7763C30.626 32.7362 36.2947 34.1631 41.0353 37.4386C40.707 38.1395 40.5711 38.9423 40.6866 39.7681C40.7267 40.0545 40.7952 40.3299 40.8886 40.5918C39.2149 40.5698 37.5165 40.6729 35.8049 40.9123C33.4892 41.2361 31.2643 41.792 29.1519 42.5486C26.8162 41.9765 24.3648 41.8987 21.8868 42.3951C10.7233 44.6316 3.42911 55.1938 5.37005 69.034C5.95062 73.1733 7.29505 77.2018 9.18966 80.7576C9.23964 80.9237 9.2921 81.0888 9.34481 81.2536C7.1517 77.749 5.46119 73.6495 4.45802 69.0698C1.19456 52.2853 11.1693 36.4879 24.7047 33.7763Z" fill="currentColor"/>
                  <path d="M41.5528 0.620663C43.6636 0.806886 45.5566 1.6526 47.0515 2.93393C42.5112 3.43249 38.8016 7.07382 38.3848 11.7977C38.1198 14.803 39.2443 17.61 41.2253 19.5861C36.5524 18.5018 33.2696 14.1183 33.7031 9.20257C34.0773 4.96113 37.1065 1.59315 41.0076 0.588273C41.1884 0.594248 41.3704 0.604581 41.5528 0.620663Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 10.9659C19.1336 9.00607 23.4667 8.35381 27.8411 9.52388C29.3349 9.92348 30.718 10.5061 31.9611 11.228C32.3724 14.1974 34.0596 16.8371 36.5344 18.4687C33.9193 18.4013 31.2295 18.0237 28.532 17.3021C23.7102 16.0122 19.4554 13.787 16.0138 10.9659Z" fill="currentColor"/>
                </svg>
              </div>
            </button>

            <div onClick={(event) => event.stopPropagation()}>
              <CatalogDropdown categories={categories} />
            </div>
          </div>

          <div className="relative flex min-w-[220px] select-none items-center justify-center py-2 cursor-pointer group/logo">
            <Image src="/dankoss_logo_bkg.svg" alt="logo background" fill priority className="z-0 scale-[1.2] object-contain transition-all duration-700 ease-out group-hover/logo:scale-[1.3] group-hover/logo:opacity-100 opacity-80" />
            <span className="relative z-10 flex items-center text-[35px] font-bold tracking-[0.1em] text-[#F6D7B0] transition-colors duration-500 group-hover/logo:text-white group-hover/logo:drop-shadow-[0_0_10px_rgba(236,88,0,0.3)]">
              DANK
              <span className="relative mx-[2px] flex h-[35px] w-[35px] items-center justify-center">
                <div className="absolute inset-0 m-auto w-[25px] h-[25px] rounded-full bg-[#EC5800] opacity-0 blur-[12px] transition-opacity duration-500 group-hover/logo:opacity-50" />
                <span className="opacity-0 absolute">O</span>
                {/* ПОВНИЙ ЛОГОТИП */}
                <svg viewBox="0 0 61 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-[45px] h-[45px] top-[-5px] transition-transform duration-500 group-hover/logo:scale-105">
                  <g filter="url(#filter0_d_486_1007)">
                    <circle cx="28.6267" cy="36.9091" r="25.1365" fill="url(#paint0_radial_486_1007)"/>
                    <path d="M26.9971 11.7726C35.9626 16.155 41.0641 27.4416 38.6748 39.0089C36.1373 51.2935 26.0467 59.5597 15.4785 58.5167C14.1095 57.6119 12.8345 56.5769 11.667 55.4327C21.4826 55.8835 30.6724 48.0654 33.0371 36.6173C35.0725 26.7634 31.4515 17.1217 24.6016 12.1251C25.3877 11.971 26.1868 11.8528 26.9971 11.7726Z" fill="#1F181F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M39.8795 41.8535C40.985 38.5283 44.2007 36.6646 47.0614 37.6911C49.9221 38.7177 51.3452 42.2459 50.2398 45.5711C49.1343 48.8962 45.9185 50.7591 43.0578 49.7326C40.1975 48.7058 38.7743 45.1785 39.8795 41.8535ZM46.1745 40.715C44.7983 40.2212 43.2511 41.1172 42.7193 42.7169C42.1876 44.3163 42.8723 46.0133 44.2481 46.5074C45.6243 47.0012 47.1715 46.105 47.7033 44.5055C48.2351 42.9059 47.5505 41.2089 46.1745 40.715Z" fill="#1F181F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M41.2229 15.1365C47.6907 18.2446 52.3525 24.8413 52.9365 32.9651C53.3284 38.4184 51.813 43.6371 48.988 47.8773C49.2388 46.8825 49.3384 45.6239 49.231 44.2687C49.1054 42.6842 48.7199 41.276 48.2066 40.2913C50.0518 37.1214 51.009 33.3611 50.728 29.4489C50.261 22.9514 46.5016 17.6857 41.3008 15.2537C41.2753 15.2147 41.2485 15.1753 41.2229 15.1365Z" fill="#1F181F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.992 28.3592C20.0056 24.5194 23.4891 22.1948 26.7727 23.1672C30.0562 24.1398 31.8968 28.0411 30.8834 31.8811C29.87 35.721 26.3863 38.0454 23.1027 37.0731C19.8189 36.1007 17.9786 32.1993 18.992 28.3592ZM25.9839 26.6508C24.4043 26.1831 22.7286 27.3012 22.241 29.1483C21.7535 30.9956 22.6389 32.8728 24.2186 33.3406C25.7981 33.808 27.4739 32.6893 27.9614 30.8421C28.4486 28.9951 27.5633 27.1187 25.9839 26.6508Z" fill="#1F181F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.6407 21.3838C21.39 20.7253 24.9791 21.6293 27.9806 23.7037C27.7729 24.1472 27.6867 24.6546 27.7597 25.1772C27.7851 25.359 27.8277 25.5344 27.8871 25.7007C26.8273 25.6868 25.7519 25.7508 24.6682 25.9024C23.2026 26.1073 21.7945 26.459 20.4575 26.9379C18.9785 26.5754 17.426 26.5264 15.8568 26.8407C8.78917 28.2567 4.17072 34.9441 5.39938 43.7064C5.76705 46.3278 6.61819 48.8796 7.81818 51.1314C7.84961 51.2358 7.88287 51.3396 7.916 51.4431C6.52777 49.2244 5.45797 46.6291 4.82285 43.7298C2.75662 33.1033 9.07131 23.1008 17.6407 21.3838Z" fill="#1F181F"/>
                    <path d="M28.3079 0.392901C29.6442 0.510806 30.843 1.04562 31.7895 1.85674C28.9147 2.17225 26.5664 4.47872 26.3025 7.46968C26.1348 9.37278 26.847 11.1506 28.1018 12.4017C25.1429 11.7156 23.0644 8.93942 23.3387 5.827C23.5756 3.1405 25.4944 1.00689 27.9657 0.371545C28.0792 0.375349 28.1934 0.382807 28.3079 0.392901Z" fill="url(#paint1_linear_486_1007)" className="origin-[26px_12px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:rotate-[15deg] group-hover/logo:scale-[1.25]"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.0758 7.04105C15.0478 5.79515 17.7905 5.37507 20.562 6.10871C21.413 6.33399 22.2074 6.6531 22.9318 7.04589C23.151 8.93863 24.1637 10.6377 25.6739 11.7431C24.1462 11.6782 22.5807 11.4483 21.0112 11.0328C17.9562 10.2241 15.2594 8.82151 13.0758 7.04105Z" fill="url(#paint2_linear_486_1007)" className="origin-[25px_11px] transition-transform duration-500 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:-rotate-[15deg] group-hover/logo:scale-[1.25]"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.0758 7.04105C15.0478 5.79515 17.7905 5.37507 20.562 6.10871C21.413 6.33399 22.2074 6.6531 22.9318 7.04589C23.151 8.93863 24.1637 10.6377 25.6739 11.7431C24.1462 11.6782 22.5807 11.4483 21.0112 11.0328C17.9562 10.2241 15.2594 8.82151 13.0758 7.04105Z" fill="url(#paint1_linear_486_1007)" className="origin-[25px_12px] opacity-0 scale-50 rotate-[60deg] transition-all duration-500 delay-[120ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:opacity-100 group-hover/logo:scale-[0.85] group-hover/logo:rotate-[25deg] group-hover/logo:-translate-y-[2px]"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_486_1007" x="0" y="0.371582" width="60.2295" height="70.674" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="2" dy="5"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_486_1007"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_486_1007" result="shape"/>
                    </filter>
                    <radialGradient id="paint0_radial_486_1007" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5609 14.3271) rotate(67.825) scale(58.2055)">
                      <stop stopColor="#EC5800"/>
                      <stop offset="0.586538" stopColor="#E55500"/>
                      <stop offset="0.903846" stopColor="#2D282D"/>
                    </radialGradient>
                    <linearGradient id="paint1_linear_486_1007" x1="28.5604" y1="4.4112" x2="26.8192" y2="12.2886" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EC5800"/>
                      <stop offset="1" stopColor="#1F181F"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_486_1007" x1="19.568" y1="5.82686" x2="25.8166" y2="12.1742" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EC5800"/>
                      <stop offset="1" stopColor="#863200"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              SS
            </span>
          </div>
          
        </div>

        <div className="flex flex-1 items-center justify-end">
          
          <div className="flex items-center gap-0">
            <div className="relative z-10 hidden items-center lg:flex group/search mr-0">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="SEARCH"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    searchInputRef.current?.blur();
                  }
                  if (e.key === 'Enter') {
                    console.log("Searching for:", searchInputRef.current?.value);
                    searchInputRef.current?.blur();
                  }
                }}
                className="peer h-[42px] w-[180px] xl:w-[220px] rounded-full bg-[#3F363F] border border-transparent pl-[20px] pr-[46px] text-[14px] tracking-[0.1em] text-[#FFDEBA] shadow-inner outline-none placeholder:text-[#FFDEBA]/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#EC5800]/60 focus:bg-[#2A252A] focus:shadow-[0_0_20px_rgba(236,88,0,0.3)] focus:w-[260px] xl:focus:w-[320px] cursor-text"
              />
              
              <div className="absolute right-0 top-0 z-20 flex h-[42px] items-center transition-transform duration-300 group-focus-within/search:scale-105">
                
                <div 
                  className="outline-none cursor-pointer rounded-full"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (document.activeElement === searchInputRef.current) {
                      if (searchInputRef.current?.value.trim()) {
                         console.log("Searching for:", searchInputRef.current?.value);
                      }
                      searchInputRef.current?.blur();
                    } else {
                      searchInputRef.current?.focus();
                    }
                  }}
                >
                  <ChainIcon>
                    <Image src="/search.svg" alt="search" width={18} height={18} />
                  </ChainIcon>
                </div>
              </div>
            </div>

            <div className="hidden lg:block ml-[-2px]"><Connection /></div>

            <ChainIcon>
              <div className="relative flex items-center justify-center">
                <Image 
                  src="/favourites.svg" 
                  alt="fav" 
                  width={20} 
                  height={20} 
                  className={favoriteCount > 0 ? "opacity-100 text-[#EC5800]" : "opacity-80"} 
                  style={favoriteCount > 0 ? { filter: 'drop-shadow(0 0 8px rgba(236,88,0,0.5))' } : {}}
                />
                {isMounted && favoriteCount > 0 && (
                  <span 
                    key={favoriteCount}
                    className="absolute -top-[15px] -right-[15px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-[2px] border-[#2B262C] bg-[#EC5800] px-[4px] text-[9px] font-black leading-none text-white animate-in zoom-in duration-300"
                  >
                    {favoriteCount}
                  </span>
                )}
              </div>
            </ChainIcon>

            <Connection />

            <ChainIcon>
              <Image src="/location.svg" alt="loc" width={22} height={22} />
            </ChainIcon>

            <Connection />

            <div className="relative z-50 flex items-center justify-center h-[42px] w-[42px]">
              
              {isLangOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangOpen(false)}
                />
              )}

              <div className="relative z-50 flex items-center justify-center">
                <ChainIcon onClick={() => setIsLangOpen(!isLangOpen)}>
                  <span className={`text-[16px] font-semibold transition-colors duration-300 ${isLangOpen ? "text-white" : "text-[#FFDEBA] hover:text-white"}`}>
                    {currentLang}
                  </span>
                </ChainIcon>
              </div>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    key="lang-dropdown" 
                    initial={{ opacity: 0, scale: 0.85, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, y: -15, x: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      duration: 0.3
                    }}
                    className="absolute top-[18px] left-1/2 z-40 flex w-[42px] h-[145px] flex-col items-center overflow-hidden rounded-b-[21px] bg-[#1A181C]/50 backdrop-blur-xl pt-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.7)] shadow-t-transparent"
                  >
                    <div 
                      className="flex w-full flex-col items-center overflow-y-auto pb-[16px] [&::-webkit-scrollbar]:hidden"
                      style={{ 
                        scrollbarWidth: "none", 
                        WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", 
                        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" 
                      }}
                    >
                      {["EN", "PL", "FR", "ES", "DE", "IT", "UA"]
                        .filter((lang) => lang !== currentLang)
                        .map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setCurrentLang(lang);
                              setIsLangOpen(false);
                            }}
                            className="group flex h-[34px] w-full shrink-0 items-center justify-center text-[13px] font-medium text-[#FFDEBA]/70 outline-none transition-all duration-300 hover:bg-[#EC5800]/20 hover:text-[#EC5800]"
                            type="button"
                          >
                            <span className="transition-transform duration-300 group-hover:scale-110">{lang}</span>
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Connection />

            <ChainIcon>
              <Image src="/user.svg" alt="user" width={20} height={20} />
            </ChainIcon>
          </div>
          <CartHeaderWidget />
        </div>
      </div>
    </header>
  );
}