/**
 * @file PreferencesPage.tsx
 * @description User lifestyle and dietary preferences page with adaptive colors for Light/Dark themes.
 */

"use client";

import { useUserStore } from "@/Store/user_store";
import { motion, Variants } from "framer-motion";

interface TogglePillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function PreferencesPage() {
  const { preferences, toggleAllergy, toggleHealthGoal, setDiet, toggleLifestyle } = useUserStore();

  const allergiesList = ["Lactose", "Gluten", "Nuts", "Soy", "Shellfish"];
  const healthList = ["Low Sugar (Diabetes)", "Low Sodium", "Heart Healthy"];
  const dietList = ["Keto", "Vegan", "High Protein", "Vegetarian"];
  const lifestyleList = ["Eco-Packaging", "Local Farmers", "Organic"];

  const TogglePill = ({ label, isActive, onClick }: TogglePillProps) => (
    <button
      onClick={onClick}
      className={`relative overflow-hidden flex items-center justify-center rounded-[12px] border px-4 py-2 text-[13px] font-medium transition-all duration-300 hover:-translate-y-[2px] active:scale-95 ${
        isActive 
          ? "bg-brand-orange text-white border-brand-orange shadow-[2px_2px_1px_rgba(236,88,0,0.5)]" 
          : "bg-white/5 dark:bg-white/5 border-transparent text-text-muted dark:text-text-primary/60 hover:text-text-main dark:hover:text-text-primary hover:border-black/5 dark:hover:border-[#FFDEBA]/20 hover:shadow-sm"
      }`}
      style={{
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out animate-in fade-in">
            <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
    </button>
  );

  const container: Variants = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
};

const item: Variants = { 
  hidden: { opacity: 0, y: 20 }, 
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } 
};
  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">Lifestyle Profile</h1>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Shape your personal DANKOSS ecosystem.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div variants={item} className="group relative col-span-1 md:col-span-2 overflow-hidden rounded-[36px] bg-white/50 dark:bg-white/5 p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 transition-all hover:shadow-md">
          <div className="absolute -bottom-[50%] -right-[10%] w-[60%] h-[100%] rounded-full bg-red-500/5 dark:bg-red-500/10 blur-[60px] pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div>
                <h2 className="text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase">Allergies & Intolerances</h2>
                <p className="text-[13px] tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Items with these ingredients get flagged.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {allergiesList.map(a => <TogglePill key={a} label={a} isActive={preferences.allergies.includes(a)} onClick={() => toggleAllergy(a)} />)}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="group relative col-span-1 overflow-hidden rounded-[36px] bg-white/50 dark:bg-white/5 p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 transition-all hover:shadow-md">
          <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-green-500/5 dark:bg-green-400/10 blur-[50px] pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-5 h-full">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-green-50 dark:bg-green-500/10 text-green-500 border border-green-100 dark:border-green-500/20 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h2 className="text-[18px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase leading-tight">Fitness Goals</h2>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-auto">
              {dietList.map(d => <TogglePill key={d} label={d} isActive={preferences.diet === d} onClick={() => setDiet(preferences.diet === d ? null : d)} />)}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="group relative col-span-1 overflow-hidden rounded-[36px] bg-white/50 dark:bg-white/5 p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 transition-all hover:shadow-md">
           <div className="absolute -bottom-[20%] -left-[20%] w-[90%] h-[90%] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[50px] pointer-events-none" />
           <div className="relative z-10 flex flex-col gap-5 h-full">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-blue-50 dark:bg-blue-500/10 text-blue-500 border border-blue-100 dark:border-blue-500/20 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h2 className="text-[18px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase leading-tight">Medical</h2>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-auto">
              {healthList.map(h => <TogglePill key={h} label={h} isActive={preferences.healthGoals.includes(h)} onClick={() => toggleHealthGoal(h)} />)}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="group relative col-span-1 md:col-span-2 overflow-hidden rounded-[36px] bg-white/50 dark:bg-white/5 p-8 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,222,186,0.05),_0_8px_30px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 transition-all hover:shadow-md">
           <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[150%] rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 blur-[60px] pointer-events-none" />
           <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-orange-50 dark:bg-brand-orange/10 text-brand-orange border border-orange-100 dark:border-brand-orange/20 shadow-sm">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <div>
                <h2 className="text-[20px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase">Lifestyle & Ethics</h2>
                <p className="text-[13px] tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Support brands that align with your values.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {lifestyleList.map(l => <TogglePill key={l} label={l} isActive={preferences.lifestyle.includes(l)} onClick={() => toggleLifestyle(l)} />)}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}