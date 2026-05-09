/**
 * @file page.tsx
 * @brief Personal Info and Settings page with adaptive light/dark glassmorphism.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/Store/user_store";

const UKRAINIAN_CITIES = [
  "Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia", 
  "Vinnytsia", "Poltava", "Chernihiv", "Chernivtsi", "Ivano-Frankivsk", 
  "Ternopil", "Lutsk", "Rivne", "Zhytomyr", "Sumy", "Cherkasy", 
  "Kropyvnytskyi", "Mykolaiv", "Kherson", "Uzhhorod", "Khmelnytskyi"
];

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { displayName: globalName, email: globalEmail, primaryCity: globalCity, setDisplayName, setEmail, setPrimaryCity } = useUserStore();

  const [localName, setLocalName] = useState(globalName);
  const [localEmail, setLocalEmail] = useState(globalEmail);
  const [localCity, setLocalCity] = useState(globalCity);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const filteredCities = UKRAINIAN_CITIES.filter(city => 
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
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px] opacity-[0.03] dark:opacity-[0.02] text-text-main dark:text-text-primary" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="flex flex-col gap-2 relative">
        <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary leading-none font-serif drop-shadow-sm">
          Personal Info
        </h2>
        <p className="text-[15px] text-text-muted dark:text-text-primary/50 tracking-wide">
          Manage your account details, connected loyalty cards, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
            Account Details
          </h3>
          
          <div className="relative rounded-[36px] p-[1px] bg-gradient-to-br from-brand-orange via-black/5 dark:via-white/10 to-transparent shadow-xl dark:shadow-2xl">
            <div className="flex flex-col rounded-[36px] bg-white/40 dark:bg-white/5 backdrop-blur-[20px] p-8 h-full border border-white/20 dark:border-transparent">
              <form onSubmit={handleSave} className="flex flex-col gap-7">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-black text-text-muted uppercase tracking-wider pl-2">Display Name</label>
                  <input 
                    type="text" 
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="Enter your display name..."
                    className="w-full rounded-[18px] border-none px-6 py-4 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/30 focus:ring-2 focus:ring-brand-orange/50"
                    style={{ background: "rgba(0, 0, 0, 0.03)", boxShadow: "2px 2px 0px #EC5800", backdropFilter: "blur(5px)" }}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end pl-2">
                    <label className="text-[13px] font-black text-text-muted uppercase tracking-wider">Email Address</label>
                    <AnimatePresence mode="wait">
                      {isEmailVerified ? (
                        <motion.span key="verified" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6 9 17l-5-5"/></svg>
                          Verified
                        </motion.span>
                      ) : (
                        <motion.span key="unverified" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-text-muted bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/5 dark:border-white/10">
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
                    className="w-full rounded-[18px] border-none px-6 py-4 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/30 focus:ring-2 focus:ring-brand-orange/50"
                    style={{ background: "rgba(0, 0, 0, 0.03)", boxShadow: "2px 2px 0px #EC5800", backdropFilter: "blur(5px)" }}
                  />
                </div>

                <div className="flex flex-col gap-2 relative" ref={cityRef}>
                  <label className="text-[13px] font-black text-text-muted uppercase tracking-wider pl-2">Primary City</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={localCity}
                      onChange={(e) => {
                        setLocalCity(e.target.value);
                        setIsCityDropdownOpen(true);
                      }}
                      onFocus={() => setIsCityDropdownOpen(true)}
                      placeholder="Enter your primary city..."
                      className="w-full rounded-[18px] border-none px-6 py-4 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/30 focus:ring-2 focus:ring-brand-orange/50"
                      style={{ background: "rgba(0, 0, 0, 0.03)", boxShadow: "2px 2px 0px #EC5800", backdropFilter: "blur(5px)" }}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isCityDropdownOpen && filteredCities.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute top-[70px] left-0 w-full bg-white/95 dark:bg-bg-surface/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[200px] overflow-y-auto custom-scrollbar"
                      >
                        {filteredCities.map((city) => (
                          <div 
                            key={city}
                            onClick={() => {
                              setLocalCity(city);
                              setIsCityDropdownOpen(false);
                            }}
                            className="px-6 py-3.5 text-[14px] text-text-main dark:text-text-primary hover:bg-brand-orange/10 hover:text-brand-orange cursor-pointer transition-colors border-b border-black/[0.03] dark:border-white/[0.03] last:border-none"
                          >
                            {city}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex justify-end pt-6 border-t border-black/5 dark:border-white/5">
                  <button 
                    type="submit" 
                    disabled={isSaving || isSaved}
                    className={`relative overflow-hidden flex items-center justify-center rounded-[18px] w-full md:w-[180px] h-[52px] text-[14px] font-black uppercase tracking-widest text-white transition-all duration-300 ${
                      isSaved 
                        ? 'bg-green-500 shadow-lg' 
                        : 'bg-brand-orange shadow-md hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-brand-orange/20'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSaving ? (
                        <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} /><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /></motion.div>
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

        <div className="flex flex-col gap-10">
          
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-end pl-1 pr-2">
              <h3 className="text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif">
                Loyalty Cards
              </h3>
              <span className="text-[12px] font-medium text-text-muted">For personalized deals</span>
            </div>
            
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-brand-orange/30 via-black/5 dark:via-white/10 to-transparent">
              <div className="flex flex-col gap-4 rounded-[32px] bg-white/40 dark:bg-white/5 backdrop-blur-[20px] p-6 border border-white/20 dark:border-transparent">
                
                <div className="group flex items-center justify-between p-5 rounded-[22px] bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-18 items-center justify-center rounded-lg bg-[#EC5800] shadow-md">
                      <span className="text-[11px] font-black text-white italic tracking-wider">СІЛЬПО</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-[16px] font-bold font-serif dark:text-text-primary`}>Власний Рахунок</span>
                        <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-1.5 rounded-sm border border-green-500/20">Verified</span>
                      </div>
                      <span className="text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 4123</span>
                    </div>
                  </div>
                  <button className="text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest">Remove</button>
                </div>

                <div className="group flex items-center justify-between p-5 rounded-[22px] bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-18 items-center justify-center rounded-lg bg-[#0047AB] shadow-md">
                      <span className="text-[13px] font-black text-white tracking-widest">АТБ</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-[16px] font-bold font-serif dark:text-text-primary`}>Картка АТБ</span>
                        <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-1.5 rounded-sm border border-green-500/20">Verified</span>
                      </div>
                      <span className="text-[12px] text-text-muted tracking-widest font-mono mt-0.5 opacity-80">**** 8802</span>
                    </div>
                  </div>
                  <button className="text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-widest">Remove</button>
                </div>

                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 py-4 text-[13px] font-black uppercase tracking-widest text-text-muted transition-all hover:border-brand-orange/40 hover:text-brand-orange hover:bg-brand-orange/5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Link New Card
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif pl-1">
              General Preferences
            </h3>
            
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-brand-orange/30 via-black/5 dark:via-white/10 to-transparent shadow-lg">
              <div className="flex flex-col gap-4 rounded-[32px] bg-white/40 dark:bg-white/5 backdrop-blur-[20px] p-7 border border-white/20 dark:border-transparent">
                
                <div onClick={() => setIsDarkMode(!isDarkMode)} className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-brand-orange transition-all scale-110">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={isDarkMode ? "moon" : "sun"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                          {isDarkMode ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m8-8h2M2 12h2"/></svg>}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold font-serif dark:text-text-primary">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                      <span className="text-[12px] text-text-muted opacity-80">{isDarkMode ? "Reduces eye strain" : "High contrast interface"}</span>
                    </div>
                  </div>
                  <button className={`flex h-[30px] w-[54px] items-center rounded-full p-1 transition-all duration-500 shadow-inner ${isDarkMode ? 'bg-brand-orange shadow-brand-orange/20' : 'bg-black/10 dark:bg-white/10'}`}>
                     <motion.div layout className="h-[22px] w-[22px] rounded-full bg-white shadow-md" animate={{ x: isDarkMode ? 24 : 0 }} />
                  </button>
                </div>

                <div onClick={() => setEmailAlerts(!emailAlerts)} className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-text-muted group-hover:text-brand-orange transition-colors">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold font-serif dark:text-text-primary">Email Alerts</span>
                      <span className="text-[12px] text-text-muted opacity-80">Get notified of 10%+ price drops</span>
                    </div>
                  </div>
                  <button className={`flex h-[30px] w-[54px] items-center rounded-full p-1 transition-all duration-500 shadow-inner ${emailAlerts ? 'bg-brand-orange' : 'bg-black/10'}`}>
                     <motion.div layout className="h-[22px] w-[22px] rounded-full bg-white shadow-md" animate={{ x: emailAlerts ? 24 : 0 }} />
                  </button>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}