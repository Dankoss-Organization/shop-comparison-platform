/**
 * @file HistoryPage.tsx
 * @description Past purchases history orchestrator.
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUserStore, Basket } from "@/Store/user_store";
import { useCartStore } from "@/Store/use_cart_store"; 
import { ProductModal } from "@/Components/UI/product_modal";
import { type DealCard as DealCardType } from "@/Data/home_data";
import BasketCard from "@/app/profile/_components/cards/basket_card";
import BasketDetailsModal from "@/app/profile/_components/modals/basket_details_modal";

export function PortalWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
}

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { baskets } = useUserStore(); 
  const { items: cartItems, addItem, setOpen } = useCartStore(); 

  const [error, setError] = useState<string | null>(null);
  const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DealCardType | null>(null);

  useEffect(() => setIsMounted(true), []);

  const totalSpent = baskets.reduce((sum, basket) => sum + basket.price, 0);

  const handleReorder = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    
    if (cartItems.length > 0) {
      setError("Your current basket is not empty. Please clear it before reordering.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    const historicalBasket = baskets.find(b => b.id === id);
    
    if (historicalBasket && historicalBasket.items.length > 0) {
      historicalBasket.items.forEach((item: any) => {
        const reorderedItem = {
          id: item.id || `reorder_${Date.now()}_${Math.random()}`, 
          title: item.title || item.name,
          image: item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop",
          rating: item.rating || "5.0",
          description: item.description || "Reordered from history.",
          quantity: item.quantity || "1 pc",
          nutrition: item.nutrition || { calories: "0 kcal", carbs: "0 g", fats: "0 g", protein: "0 g", fiber: "0 g", sugar: "0 g" },
          offers: item.offers && item.offers.length > 0 ? item.offers : [
            {
              store_id: item.selectedStoreId || "historical_store",
              store_name: "Historical Price",
              is_in_stock: true,
              pricing: {
                current_price: item.price || 0,
                regular_price: item.price || 0,
                discount_percent: 0
              }
            }
          ],
          selectedStoreId: item.selectedStoreId || "historical_store",
          cartQuantity: item.cartQuantity || 1
        };
        addItem(reorderedItem as any);
      });
      setOpen(true);
      setSelectedBasket(null);
    } else {
      setError("This basket is empty or not found.");
      setTimeout(() => setError(null), 4000);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <PortalWrapper>
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-24 right-10 z-[200] bg-semantic-danger/90 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgb(var(--semantic-danger)/0.3)] border border-white/20 max-w-xs"
            >
              <div className="flex gap-3 items-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span className="text-[13px] font-bold leading-tight">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalWrapper>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-text-main/5 dark:border-white/5 pb-5 md:pb-6">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-sm leading-tight">Basket History</h2>
          <p className="text-[14px] sm:text-[15px] text-text-muted dark:text-text-primary/60">Review your past purchases and reorder your favorite sets.</p>
        </div>
        <div className="flex flex-col items-start md:items-end w-full md:w-auto bg-text-main/5 dark:bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
          <span className="text-[10px] sm:text-[11px] font-bold text-text-muted dark:text-text-primary/40 uppercase tracking-widest">Total Historical Value</span>
          <span className="text-[24px] sm:text-[28px] font-black text-brand-orange drop-shadow-[0_2px_10px_rgb(var(--brand-orange)/0.2)]">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {baskets.map((basket, idx) => (
            <BasketCard 
              key={basket.id}
              basket={basket}
              index={idx}
              onSelect={() => setSelectedBasket(basket)}
              onReorder={(e) => handleReorder(e, basket.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <PortalWrapper>
        <AnimatePresence>
          {selectedBasket && (
            <BasketDetailsModal 
              basket={selectedBasket}
              onClose={() => setSelectedBasket(null)}
              onReorder={(e) => handleReorder(e, selectedBasket.id)}
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