/**
 * @file page.tsx
 * * Main page wrapper for the store locator feature.
 */

"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";


const LocationsMap = dynamic<{}>(() => 
  import("@/Components/Sections/locations_map").then(mod => mod.default as ComponentType<{}>),
  { ssr: false }
);

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-bg-main">
      <LocationsMap />
    </main>
  );
}