"use client";

import { useUserStore } from "@/Store/user_store";
import { motion } from "framer-motion";

export default function PreferencesPage() {
  const { preferences, toggleAllergy, toggleHealthGoal, setDiet, toggleLifestyle } = useUserStore();

  const allergiesList = ["Lactose", "Gluten", "Nuts", "Soy", "Shellfish"];
  const healthList = ["Low Sugar (Diabetes)", "Low Sodium", "Heart Healthy"];
  const dietList = ["Keto", "Vegan", "High Protein", "Vegetarian"];
  const lifestyleList = ["Eco-Packaging", "Local Farmers", "Organic"];

interface TogglePillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColor?: string; 
}

const TogglePill = ({ label, isActive, onClick, activeColor = "bg-[#EC5800]" }: TogglePillProps) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
      isActive 
        ? "text-white shadow-[0_0_15px_rgba(236,88,0,0.3)]" 
        : "bg-[rgba(70,59,70,0.3)] text-[#FFDEBA]/60 hover:bg-[rgba(70,59,70,0.6)] hover:text-[#FFDEBA]"
    }`}
  >
    {isActive && (
      <motion.div
        layoutId={`pill-bg-${label}`}
        className={`absolute inset-0 ${activeColor} z-0`}
        initial={false}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);

  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-[#FFDEBA]">Lifestyle Profile</h1>
        <p className="text-[15px] text-[#FFDEBA]/50">Customize your DANKOSS experience to find the best prices for your specific needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="flex flex-col gap-5 rounded-[32px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-7 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#FFDEBA]">Allergies & Intolerances</h2>
          </div>
          <p className="text-[13px] text-[#FFDEBA]/50 leading-relaxed">Products containing these ingredients will be flagged in your search results.</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {allergiesList.map(item => (
              <TogglePill 
                key={item} 
                label={item} 
                isActive={preferences.allergies.includes(item)} 
                onClick={() => toggleAllergy(item)}
                activeColor="bg-red-500"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-[32px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-7 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4ADE80]/10 text-[#4ADE80]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#FFDEBA]">Fitness Goals</h2>
          </div>
          <p className="text-[13px] text-[#FFDEBA]/50 leading-relaxed">Optimize your Smart Baskets to hit your macros for the lowest price.</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {dietList.map(item => (
              <TogglePill 
                key={item} 
                label={item} 
                isActive={preferences.diet === item} 
                onClick={() => setDiet(preferences.diet === item ? null : item)}
                activeColor="bg-[#4ADE80]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-[32px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-7 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#FFDEBA]">Medical & Health</h2>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {healthList.map(item => (
              <TogglePill 
                key={item} 
                label={item} 
                isActive={preferences.healthGoals.includes(item)} 
                onClick={() => toggleHealthGoal(item)}
                activeColor="bg-[#3B82F6]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-[32px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-7 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EC5800]/10 text-[#EC5800]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#FFDEBA]">Lifestyle & Ethics</h2>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {lifestyleList.map(item => (
              <TogglePill 
                key={item} 
                label={item} 
                isActive={preferences.lifestyle.includes(item)} 
                onClick={() => toggleLifestyle(item)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}