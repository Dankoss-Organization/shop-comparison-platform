"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/Store/user_store";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
import ProfileInput from "@/app/profile/_components/ui/profile_input";

const UKRAINIAN_CITIES = [
  "Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia",
  "Vinnytsia", "Poltava", "Chernihiv", "Chernivtsi", "Ivano-Frankivsk",
  "Ternopil", "Lutsk", "Rivne", "Zhytomyr", "Sumy", "Cherkasy",
  "Kropyvnytskyi", "Mykolaiv", "Kherson", "Uzhhorod", "Khmelnytskyi",
];

export default function PersonalInfoForm() {
  const { displayName: globalName, email: globalEmail, primaryCity: globalCity, setDisplayName, setEmail, setPrimaryCity } = useUserStore();

  const [localName, setLocalName] = useState(globalName);
  const [localEmail, setLocalEmail] = useState(globalEmail);
  const [localCity, setLocalCity] = useState(globalCity);

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
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
  const customLabelClass = "text-[12px] sm:text-[13px] font-black text-text-muted uppercase tracking-wider pl-1 sm:pl-2";

  return (
    <ProfileGlassCard variant="gradient" glow className="p-5 sm:p-6 md:p-8 h-full">
      <form onSubmit={handleSave} className="relative z-10 flex flex-col gap-5 sm:gap-7">
        
        <ProfileInput
          label="Display Name"
          labelClassName={customLabelClass}
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder="Enter your display name..."
        />

        <ProfileInput
          label="Email Address"
          labelClassName={customLabelClass}
          type="email"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          placeholder="Enter your email address..."
          labelRightNode={
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
          }
        />

        <div className="relative" ref={cityRef}>
          <ProfileInput
            label="Primary City"
            labelClassName={customLabelClass}
            type="text"
            value={localCity}
            onChange={(e) => { setLocalCity(e.target.value); setIsCityDropdownOpen(true); }}
            onFocus={() => setIsCityDropdownOpen(true)}
            placeholder="Enter your primary city..."
            rightElement={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            }
          />

          <AnimatePresence>
            {isCityDropdownOpen && filteredCities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="absolute top-[75px] sm:top-[85px] left-0 w-full bg-bg-surface dark:bg-bg-deep backdrop-blur-xl border border-text-main/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[200px] overflow-y-auto custom-scrollbar"
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
    </ProfileGlassCard>
  );
}