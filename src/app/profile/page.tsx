/**
 * @file page.tsx
 * @brief Dashboard Overview orchestrator.
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

export function PortalWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
}

export default function OverviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DealCardType | null>(null);
  
  const { baskets } = useUserStore();
  
  const latestBasket = baskets.length > 0
    ? [...baskets].sort((a, b) => b.id - a.id)[0]
    : null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10">
      
      <ProfileHeaderSection />

      <ImpactStatsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        <RecentBasketCard 
          basket={latestBasket} 
          onClick={() => setSelectedBasket(latestBasket)} 
        />
        <PriceAlertsPreview />
      </div>

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
                  <ProductModal.Header categoryTitle="Historical Item" />
                  <ProductModal.Actions categoryTitle="Historical Item" />
                  <ProductModal.Details categoryTitle="Historical Item" />
                </ProductModal.RightColumn>
              </ProductModal.Window>
            </ProductModal>
          )}
        </AnimatePresence>
      </PortalWrapper>

    </div>
  );
}