/**
 * @file locations_page.tsx
 * @description The main page component for managing user locations and price-tracking zones.
 * Orchestrates global state, animated layouts, and responsive glassmorphic UI elements.
 */

"use client";

import { useUserStore } from "@/Store/user_store";
import { motion } from "framer-motion";

import { containerVariants, itemVariants } from "@/app/profile/_components/ui/animations";

import SmartLocationToggle from "@/app/profile/_components/cards/smart_location_toggle";
import LocationCard from "@/app/profile/_components/cards/location_card";
import AddLocationButton from "@/app/profile/_components/cards/add_location_button";
import LocationMapPreview from "@/app/profile/_components/sections/location_map_preview";
/**
 * A composite dashboard page for location management.
 * * * Features:
 * - Global State Integration: Connects directly to `useUserStore` to manage saved addresses, smart location toggles, and deletion logic.
 * - Staggered Animations: Utilizes shared `containerVariants` and `itemVariants` with `framer-motion` to create a smooth, staggered cascading entrance for all grid items.
 * - Dynamic Data Mapping: Automatically extracts the currently active (default) location to feed contextual data into the `LocationMapPreview` component.
 * - Responsive Grid Layout: Employs a CSS grid that transitions from a single column on mobile to a two-column layout on medium screens, allowing the map preview to dynamically span full width.
 * * @returns {JSX.Element} The rendered locations management page.
 */
export default function LocationsPage() {
  // Extract state and actions from the global user store
  const { locations, isSmartLocationActive, toggleSmartLocation, setDefaultLocation, deleteLocation } = useUserStore();
// Determine the title of the active location for the map preview
  const activeLocationTitle = locations.find(l => l.isDefault)?.title || "None";

  return (
    <div className="flex flex-col gap-8 max-w-[1000px] mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-text-main dark:text-text-primary uppercase tracking-[1px]">My Locations</h1>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Manage your price-tracking zones for hyper-local deals.</p>
      </div>
    {/* Global Smart Location Toggle */}
      <SmartLocationToggle 
        isActive={isSmartLocationActive} 
        onToggle={toggleSmartLocation} 
      />
      {/* Animated Grid Container */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Render Saved Locations */}
        {locations.map((loc) => (
          <motion.div variants={itemVariants} key={loc.id}>
             <LocationCard 
               location={loc as any}
               onSetDefault={() => setDefaultLocation(loc.id)}
               onDelete={() => deleteLocation(loc.id)}
             />
          </motion.div>
        ))}
        {/* Action Button to Add New Location */}
        <motion.div variants={itemVariants}>
          <AddLocationButton />
        </motion.div>
        {/* Full-Width Map Preview */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
           <LocationMapPreview activeTitle={activeLocationTitle} />
        </motion.div>

      </motion.div>
    </div>
  );
}