/**
 * @file overview_page.tsx
 * @description The main orchestrator for the user profile dashboard overview. 
 * Combines profile headers, impact statistics, recent activity, and orchestrates nested modals for deeper interaction.
 */

"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore, Basket } from "@/Store/user_store";
import { createPortal } from "react-dom";
import { type DealCard as DealCardType } from "@/Data/home_data";
import { ProductModal } from "@/Components/UI/product_modal";

import ProfileHeaderSection from "@/app/profile/_components/sections/profile_header_section";
import ImpactStatsSection from "@/app/profile/_components/sections/impact_stats_section";
import RecentBasketCard from "@/app/profile/_components/cards/recent_basket_card";
import PriceAlertsPreview from "@/app/profile/_components/cards/price_alerts_preview";
import BasketDetailsModal from "@/app/profile/_components/modals/basket_details_modal";
/**
 * A utility component that safely mounts its children into the document body using a React Portal.
 * * * Features:
 * - SSR Compatibility: Uses a local `mounted` state to ensure the portal is only created on the client side, preventing hydration mismatches.
 * - Stacking Context Escape: Ideal for rendering modals, tooltips, and toasts that need to break out of localized CSS `overflow: hidden` or `z-index` contexts.
 * * @param {object} props
 * @param {React.ReactNode} props.children - The elements to render inside the portal.
 * @returns {React.ReactPortal | null} The rendered portal, or null if rendering on the server.
 */
export function PortalWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
}
/**
 * Main dashboard overview page component.
 * * * Features:
 * - Data Aggregation: Pulls the user's historical baskets from `useUserStore` and automatically calculates the most recent purchase (`latestBasket`).
 * - Section Orchestration: Composes high-level dashboard widgets (`ProfileHeaderSection`, `ImpactStatsSection`, `RecentBasketCard`, `PriceAlertsPreview`) into a responsive layout.
 * - Modal State Management: Maintains local state for viewing deeper details without leaving the page (e.g., clicking a recent basket opens `BasketDetailsModal`, clicking an item inside opens `ProductModal`).
 * - Hydration Safety: Employs an `isMounted` check to prevent server/client rendering mismatches.
 * * @returns {JSX.Element | null} The rendered Overview Page or null during SSR.
 */
export default function OverviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DealCardType | null>(null);
  
  const { baskets } = useUserStore();
  // Sort baskets by ID (assuming higher ID = more recent) to find the latest transaction
  const latestBasket = baskets.length > 0
    ? [...baskets].sort((a, b) => b.id - a.id)[0]
    : null;
  // Ensure client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10">
      {/* Top Profile Header & Level Progress */}
      <ProfileHeaderSection />
      {/* Numerical Impact Statistics */}
      <ImpactStatsSection />
      {/* Main Content Grid: Recent Activity & Quick Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        <RecentBasketCard 
          basket={latestBasket} 
          onClick={() => setSelectedBasket(latestBasket)} 
        />
        <PriceAlertsPreview />
      </div>
      {/* Modals wrapped in portals to avoid clipping issues */}
      {/* Selected Basket Details Modal */}
      <PortalWrapper>
        <AnimatePresence>
          {selectedBasket && (
            <BasketDetailsModal 
              basket={selectedBasket}
              onClose={() => setSelectedBasket(null)}
              onReorder={() => {}} 
              onProductClick={(item) => setSelectedProduct(item as DealCardType)}
            />
          )}
        </AnimatePresence>
      </PortalWrapper>
      {/* Individual Product View Modal */}
      <PortalWrapper>
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)}>
              <ProductModal.Window>
                <ProductModal.LeftColumn>
                  <ProductModal.ImageGallery />
                  <ProductModal.Reviews />
                </ProductModal.LeftColumn>
                <ProductModal.RightColumn>
                  <ProductModal.Header categoryTitle={selectedProduct.category ?? "Unknown"} />
                  <ProductModal.Actions categoryTitle={selectedProduct.category ?? "Unknown"} />
                  <ProductModal.Details categoryTitle={selectedProduct.category ?? "Unknown"} />
                </ProductModal.RightColumn>
              </ProductModal.Window>
            </ProductModal>
          )}
        </AnimatePresence>
      </PortalWrapper>

    </div>
  );
}