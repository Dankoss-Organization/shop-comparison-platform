/**
 * @file page.tsx
 * @brief Personal Info and Settings page with adaptive light/dark glassmorphism.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/Store/user_store";

const UKRAINIAN_CITIES = [
  "Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia",
  "Vinnytsia", "Poltava", "Chernihiv", "Chernivtsi", "Ivano-Frankivsk",
  "Ternopil", "Lutsk", "Rivne", "Zhytomyr", "Sumy", "Cherkasy",
  "Kropyvnytskyi", "Mykolaiv", "Kherson", "Uzhhorod", "Khmelnytskyi",
];

const cardClassName =
  "relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep border border-text-main/5 dark:border-white/5 shadow-lg dark:shadow-[0px_-3px_8px_rgb(var(--brand-orange)/0.20),0_24px_40px_rgba(0,0,0,0.4)] transition-colors duration-300";

const glowLayerClassName =
  "pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.35),transparent_28%),radial-gradient(circle_at_92%_10%,rgb(var(--brand-orange)/0.2),transparent_24%)]";

const inputClassName =
  "w-full rounded-[1rem] border-none px-5 py-3.5 sm:px-6 sm:py-4 text-[14px] sm:text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/40 dark:placeholder:text-text-primary/40 focus:ring-2 focus:ring-brand-orange/50 bg-black/5 dark:bg-[rgba(54,46,54,0.6)] border border-text-main/5 dark:border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-[5px]";

const rowClassName =
  "group flex items-center justify-between p-4 sm:p-5 rounded-[1.25rem] bg-black/[0.03] dark:bg-[rgba(45,40,45,0.6)] border border-text-main/5 dark:border-white/5 hover:shadow-md transition-all gap-2 backdrop-blur-[4px]";

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { displayName: globalName, email: globalEmail, primaryCity: globalCity, setDisplayName, setEmail, setPrimaryCity } = useUserStore();

  const [localName, setLocalName] = useState(globalName);
  const [localEmail, setLocalEmail] = useState(globalEmail);
  const [localCity, setLocalCity] = useState(globalCity);

  const [emailAlerts, setEmailAlerts] = useState(true);

  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = isMounted ? resolvedTheme === "dark" : true;

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLocalName(globalName);
    setLocalEmail(globalEmail);
    setLocalCity(globalCity);
  }, [globalName, globalEmail, globalCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = UKRAINIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(localCity.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setDisplayName(localName);
      setEmail(localEmail);
      setPrimaryCity(localCity);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  const isEmailVerified = localEmail === globalEmail && localEmail.length > 0;

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-8 sm:gap-10 w-full pb-10 z-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px] opacity-[0.03] dark:opacity-[0.02] text-text-main dark:text-text-primary"
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="flex flex-col gap-1.5 sm:gap-2 relative">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary leading-tight font-serif drop-shadow-sm">
          Personal Info
        </h2>
        <p className="text-[14px] sm:text-[15px] text-text-muted dark:text-text-primary/50 tracking-wide">
          Manage your account details, connected loyalty cards, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-10">

        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
            Account Details
          </h3>

          <div className="relative rounded-[1.85rem] p-[1px] bg-gradient-to-br from-brand-orange/50 via-brand-orange/10 to-transparent shadow-xl dark:shadow-2xl">
            <div className={`${cardClassName} p-5 sm:p-6 md:p-8 h-full`}>
              <div className={glowLayerClassName} />

              <form onSubmit={handleSave} className="relative z-10 flex flex-col gap-5 sm:gap-7">

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-[12px] sm:text-[13px] font-black text-text-muted uppercase tracking-wider pl-1 sm:pl-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="Enter your display name..."
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex justify-between items-end pl-1 sm:pl-2">
                    <label className="text-[12px] sm:text-[13px] font-black text-text-muted uppercase tracking-wider">
                      Email Address
                    </label>
                    <AnimatePresence mode="wait">
                      {isEmailVerified ? (
                        <motion.span key="verified" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-green-500/20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 sm:w-3 sm:h-3"><path d="M20 6 9 17l-5-5" /></svg>
                          Verified
                        </motion.span>
                      ) : (
                        <motion.span key="unverified" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-text-muted bg-black/5 dark:bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-black/5 dark:border-white/10">
                          Pending Verification
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2 relative" ref={cityRef}>
                  <label className="text-[12px] sm:text-[13px] font-black text-text-muted uppercase tracking-wider pl-1 sm:pl-2">
                    Primary City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={localCity}
                      onChange={(e) => { setLocalCity(e.target.value); setIsCityDropdownOpen(true); }}
                      onFocus={() => setIsCityDropdownOpen(true)}
                      placeholder="Enter your primary city..."
                      className={inputClassName}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isCityDropdownOpen && filteredCities.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute top-[65px] sm:top-[70px] left-0 w-full bg-bg-surface dark:bg-bg-deep backdrop-blur-xl border border-text-main/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[200px] overflow-y-auto custom-scrollbar"
                      >
                        {filteredCities.map((city) => (
                          <div
                            key={city}
                            onClick={() => { setLocalCity(city); setIsCityDropdownOpen(false); }}
                            className="px-5 py-3 sm:px-6 sm:py-3.5 text-[13px] sm:text-[14px] text-text-main dark:text-text-primary hover:bg-brand-orange/10 hover:text-brand-orange cursor-pointer transition-colors border-b border-text-main/[0.03] dark:border-white/[0.03] last:border-none"
                          >
                            {city}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex justify-end pt-5 sm:pt-6 border-t border-text-main/5 dark:border-white/5">
                  <button
                    type="submit"
                    disabled={isSaving || isSaved}
                    className={`relative overflow-hidden flex items-center justify-center rounded-[1rem] w-full md:w-[180px] h-[48px] sm:h-[52px] text-[13px] sm:text-[14px] font-black uppercase tracking-widest text-white transition-all duration-300 ${
                      isSaved
                        ? "bg-green-500 shadow-lg"
                        : "bg-brand-orange shadow-[0_5px_15px_rgb(var(--brand-orange)/0.2)] dark:shadow-[0_10px_16px_rgb(var(--brand-orange)/0.18),0_0_12px_rgb(var(--brand-orange)/0.14)] hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSaving ? (
                        <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </motion.div>
                      ) : isSaved ? (
                        <motion.div key="saved" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">✓ Saved</motion.div>
                      ) : (
                        <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Save Changes</motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">

          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex justify-between items-end pl-1 pr-2">
              <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif">
                Loyalty Cards
              </h3>
              <span className="text-[11px] sm:text-[12px] font-medium text-text-muted">For personalized deals</span>
            </div>

            <div className="relative rounded-[1.85rem] p-[1px] bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent">
              <div className={`${cardClassName} p-5 sm:p-6`}>
                <div className={glowLayerClassName} />

                <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
                  <div className={rowClassName}>
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="flex h-10 w-16 sm:h-11 sm:w-18 shrink-0 items-center justify-center rounded-lg bg-[#EC5800] shadow-md">
                        <span className="text-[10px] sm:text-[11px] font-black text-white italic tracking-wider">СІЛЬПО</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary leading-tight">Власний Рахунок</span>
                          <span className="text-[8px] sm:text-[9px] font-black text-green-600 bg-green-500/10 px-1 sm:px-1.5 rounded-sm border border-green-500/20">Verified</span>
                        </div>
                        <span className="text-[11px] sm:text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 4123</span>
                      </div>
                    </div>
                    <button className="text-[10px] sm:text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest shrink-0">Remove</button>
                  </div>

                  <div className={rowClassName}>
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="flex h-10 w-16 sm:h-11 sm:w-18 shrink-0 items-center justify-center rounded-lg bg-[#0047AB] shadow-md">
                        <span className="text-[11px] sm:text-[13px] font-black text-white tracking-widest">АТБ</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary leading-tight">Картка АТБ</span>
                          <span className="text-[8px] sm:text-[9px] font-black text-green-600 bg-green-500/10 px-1 sm:px-1.5 rounded-sm border border-green-500/20">Verified</span>
                        </div>
                        <span className="text-[11px] sm:text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 8802</span>
                      </div>
                    </div>
                    <button className="text-[10px] sm:text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest shrink-0">Remove</button>
                  </div>

                  <button className="mt-1 sm:mt-2 flex w-full items-center justify-center gap-2 rounded-[1rem] border-2 border-dashed border-text-main/10 dark:border-white/10 py-3 sm:py-4 text-[12px] sm:text-[13px] font-black uppercase tracking-widest text-text-muted transition-all hover:border-brand-orange/40 hover:text-brand-orange hover:bg-brand-orange/5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Link New Card
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
              General Preferences
            </h3>

            <div className="relative rounded-[1.85rem] p-[1px] bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent shadow-lg">
              <div className={`${cardClassName} p-5 sm:p-7`}>
                <div className={glowLayerClassName} />

                <div className="relative z-10 flex flex-col gap-3 sm:gap-4">

                  <div onClick={() => setTheme(isDarkMode ? "light" : "dark")} className={`${rowClassName} cursor-pointer`}>
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[14px] sm:rounded-2xl bg-black/5 dark:bg-white/5 text-brand-orange transition-all sm:scale-110">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div key={isDarkMode ? "moon" : "sun"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                            {isDarkMode
                              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 sm:w-5 sm:h-5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m8-8h2M2 12h2" /></svg>}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                        <span className="text-[11px] sm:text-[12px] text-text-muted opacity-80">{isDarkMode ? "Reduces eye strain" : "High contrast interface"}</span>
                      </div>
                    </div>
                    <button className={`flex h-[26px] w-[46px] sm:h-[30px] sm:w-[54px] shrink-0 items-center rounded-full p-1 transition-all duration-500 shadow-inner ${isDarkMode ? "bg-brand-orange shadow-[0_0_8px_rgb(var(--brand-orange)/0.4)]" : "bg-black/10 dark:bg-white/10"}`}>
                      <motion.div layout className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] rounded-full bg-white shadow-md" animate={{ x: isDarkMode ? (typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 24) : 0 }} />
                    </button>
                  </div>

                  <div onClick={() => setEmailAlerts(!emailAlerts)} className={`${rowClassName} cursor-pointer`}>
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[14px] sm:rounded-2xl bg-black/5 dark:bg-white/5 text-text-muted group-hover:text-brand-orange transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 sm:w-5 sm:h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] sm:text-[16px] font-bold font-serif text-text-main dark:text-text-primary">Email Alerts</span>
                        <span className="text-[11px] sm:text-[12px] text-text-muted opacity-80">Get notified of 10%+ drops</span>
                      </div>
                    </div>
                    <button className={`flex h-[26px] w-[46px] sm:h-[30px] sm:w-[54px] shrink-0 items-center rounded-full p-1 transition-all duration-500 shadow-inner ${emailAlerts ? "bg-brand-orange shadow-[0_0_8px_rgb(var(--brand-orange)/0.4)]" : "bg-black/10 dark:bg-white/10"}`}>
                      <motion.div layout className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] rounded-full bg-white shadow-md" animate={{ x: emailAlerts ? (typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 24) : 0 }} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}