/**
 * @file LocationsPage.tsx
 * @description Manage user locations with adaptive glassmorphism for Light/Dark themes.
 */

"use client";

import { useUserStore } from "@/Store/user_store";
import { motion } from "framer-motion";

import { containerVariants, itemVariants } from "@/app/profile/_components/ui/animations";

import SmartLocationToggle from "@/app/profile/_components/cards/smart_location_toggle";
import LocationCard from "@/app/profile/_components/cards/location_card";
import AddLocationButton from "@/app/profile/_components/cards/add_location_button";
import LocationMapPreview from "@/app/profile/_components/sections/location_map_preview";

export default function LocationsPage() {
  const { locations, isSmartLocationActive, toggleSmartLocation, setDefaultLocation, deleteLocation } = useUserStore();

  const activeLocationTitle = locations.find(l => l.isDefault)?.title || "None";

  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto pb-10">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">My Locations</h1>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Manage your price-tracking zones for hyper-local deals.</p>
      </div>

      <SmartLocationToggle 
        isActive={isSmartLocationActive} 
        onToggle={toggleSmartLocation} 
      />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        
        {locations.map((loc) => (
          <motion.div variants={itemVariants} key={loc.id}>
             <LocationCard 
               location={loc as any}
               onSetDefault={() => setDefaultLocation(loc.id)}
               onDelete={() => deleteLocation(loc.id)}
             />
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <AddLocationButton />
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
           <LocationMapPreview activeTitle={activeLocationTitle} />
        </motion.div>

      </motion.div>
    </div>
  );
}