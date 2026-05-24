/**
 * @file PreferencesPage.tsx
 * @description User lifestyle and dietary preferences page.
 */

"use client";

import { useUserStore } from "@/Store/user_store";
import { motion } from "framer-motion";

import { containerVariants, itemVariants } from "@/app/profile/_components/ui/animations";
import ProfileSectionCard from "@/app/profile/_components/ui/profile_section_card";
import TogglePill from "@/app/profile/_components/ui/toggle_pill";

const allergiesList = ["Lactose", "Gluten", "Nuts", "Soy", "Shellfish"];
const healthList = ["Low Sugar (Diabetes)", "Low Sodium", "Heart Healthy"];
const dietList = ["Keto", "Vegan", "High Protein", "Vegetarian"];
const lifestyleList = ["Eco-Packaging", "Local Farmers", "Organic"];

const icons = {
  allergies: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  fitness: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  medical: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  lifestyle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 sm:w-7 sm:h-7"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
};

export default function PreferencesPage() {
  const { preferences, toggleAllergy, toggleHealthGoal, setDiet, toggleLifestyle } = useUserStore();

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-[1000px] mx-auto pb-10">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">Lifestyle Profile</h1>
        <p className="text-[14px] sm:text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Shape your personal DANKOSS ecosystem.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        
        <ProfileSectionCard
          title="Allergies & Intolerances"
          description="Items with these ingredients get flagged."
          icon={icons.allergies}
          variants={itemVariants}
          className="md:col-span-2"
          glowClassName="bg-red-500/5 dark:bg-red-500/10 -bottom-[50%] -right-[10%] w-[60%] h-[100%]"
          iconClassName="bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 shadow-sm"
        >
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-1 sm:mt-2">
            {allergiesList.map(a => (
              <TogglePill key={a} label={a} isActive={preferences.allergies.includes(a)} onClick={() => toggleAllergy(a)} />
            ))}
          </div>
        </ProfileSectionCard>
        <ProfileSectionCard
          title="Fitness Goals"
          icon={icons.fitness}
          variants={itemVariants}
          glowClassName="bg-green-500/5 dark:bg-green-400/10 -top-[20%] -right-[20%] w-[80%] h-[80%]"
          iconClassName="bg-green-50 dark:bg-green-500/10 text-green-500 border border-green-100 dark:border-green-500/20 shadow-sm"
          contentClassName="justify-between"
        >
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {dietList.map(d => (
              <TogglePill key={d} label={d} isActive={preferences.diet === d} onClick={() => setDiet(preferences.diet === d ? null : d)} />
            ))}
          </div>
        </ProfileSectionCard>
        <ProfileSectionCard
          title="Medical"
          icon={icons.medical}
          variants={itemVariants}
          glowClassName="bg-blue-500/5 dark:bg-blue-500/10 -bottom-[20%] -left-[20%] w-[90%] h-[90%]"
          iconClassName="bg-blue-50 dark:bg-blue-500/10 text-blue-500 border border-blue-100 dark:border-blue-500/20 shadow-sm"
          contentClassName="justify-between"
        >
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {healthList.map(h => (
              <TogglePill key={h} label={h} isActive={preferences.healthGoals.includes(h)} onClick={() => toggleHealthGoal(h)} />
            ))}
          </div>
        </ProfileSectionCard>
        <ProfileSectionCard
          title="Lifestyle & Ethics"
          description="Support brands that align with your values."
          icon={icons.lifestyle}
          variants={itemVariants}
          className="md:col-span-2"
          glowClassName="bg-brand-orange/5 dark:bg-brand-orange/10 -top-[50%] -left-[10%] w-[50%] h-[150%]"
          iconClassName="bg-orange-50 dark:bg-brand-orange/10 text-brand-orange border border-orange-100 dark:border-brand-orange/20 shadow-sm"
        >
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-1 sm:mt-2">
            {lifestyleList.map(l => (
              <TogglePill key={l} label={l} isActive={preferences.lifestyle.includes(l)} onClick={() => toggleLifestyle(l)} />
            ))}
          </div>
        </ProfileSectionCard>

      </motion.div>
    </div>
  );
}