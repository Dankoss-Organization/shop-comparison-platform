"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);

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

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}