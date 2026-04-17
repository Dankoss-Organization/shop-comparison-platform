/**
 * @file catalog_context.tsx
 * @description Global state management for the application's catalog/mega-menu using the React Context API.
 * @pattern Context Provider: Wraps the application to provide shared menu state without prop drilling.
 * @pattern Custom Hook: Exposes a safe `useCatalog` hook to consume the state from anywhere in the tree.
 */

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Defines the shape of the catalog's global state and its mutator functions.
 * * @property {boolean} isCatalogOpen - Tracks whether the global catalog dropdown is currently visible.
 * @property {(isOpen: boolean) => void} setIsCatalogOpen - Toggles the catalog menu visibility.
 * @property {string | null} activeCategory - The currently hovered or focused category name.
 * @property {(category: string | null) => void} setActiveCategory - Updates the active (hovered) category.
 * @property {string | null} lockedCategory - The explicitly clicked/pinned category. When set, prevents hover events from changing the view.
 * @property {(category: string | null) => void} setLockedCategory - Sets or unsets the pinned category.
 * @property {() => void} closeCatalog - Helper utility to completely close the menu and reset all selections.
 */

interface CatalogContextType {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (isOpen: boolean) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  lockedCategory: string | null;
  setLockedCategory: (category: string | null) => void;
  closeCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

/**
 * Context Provider component that initializes and manages the local state for the catalog.
 * This should ideally wrap the root layout or the specific section of the app that needs menu access.
 *
 * @param {Object} props - The component properties.
 * @param {ReactNode} props.children - The child components that will inherit this context.
 * @returns {JSX.Element} The Provider component wrapping the children.
 */

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);

  /**
   * Resets all catalog states to their default closed/null values.
   * Useful for routing changes or clicking outside the menu.
   */
  const closeCatalog = () => {
    setIsCatalogOpen(false);
    setLockedCategory(null);
    setActiveCategory(null);
  };

  return (
    <CatalogContext.Provider
      value={{
        isCatalogOpen,
        setIsCatalogOpen,
        activeCategory,
        setActiveCategory,
        lockedCategory,
        setLockedCategory,
        closeCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

/**
 * Custom hook to safely consume the Catalog context.
 * * @throws {Error} Will throw an error if used inside a component that is not a child of `<CatalogProvider>`.
 * @returns {CatalogContextType} The current catalog state and modifier functions.
 */

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}