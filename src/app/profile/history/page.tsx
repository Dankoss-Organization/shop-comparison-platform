/**
 * @file HistoryPage.tsx
 * @description Past purchases history with adaptive glassmorphism and reorder functionality.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useUserStore, Basket } from "@/Store/user_store";
import { useCartStore } from "@/Store/use_cart_store"; 
import { ProductModal } from "@/Components/UI/product_modal";
import { type DealCard as DealCardType } from "@/Data/home_data";
import { cn } from "@/Lib/utils";

function PortalWrapper({ children }: { children: React.ReactNode }) {
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

  const getUniqueStores = (basket: Basket) => {
    const stores = new Set<string>();
    basket.items.forEach((item: any) => {
      if (item.selectedStoreId && item.offers) {
         const offer = item.offers.find((o:any) => o.store_id === item.selectedStoreId);
         if(offer) stores.add(offer.store_name);
      } 
      else if (item.offers && item.offers.length > 0) {
        const sortedOffers = [...item.offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price);
        stores.add(sortedOffers[0].store_name);
      }
    });
    
    if (stores.size === 0) {
       return basket.stores.length > 0 ? basket.stores : ["DANKOSS Checkout"];
    }

    return Array.from(stores);
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-text-main/5 dark:border-white/5 pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-sm">Basket History</h2>
          <p className="text-[15px] text-text-muted dark:text-text-primary/60">Review your past purchases and reorder your favorite sets.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-bold text-text-muted dark:text-text-primary/40 uppercase tracking-widest">Total Historical Value</span>
          <span className="text-[28px] font-black text-brand-orange drop-shadow-[0_2px_10px_rgb(var(--brand-orange)/0.2)]">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {baskets.map((basket, idx) => {
            const uniqueStores = getUniqueStores(basket);
            
            return (
            <motion.div 
              key={basket.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedBasket(basket)}
              className="group cursor-pointer relative rounded-[28px] p-[1px] bg-gradient-to-br from-text-main/10 dark:from-white/10 via-transparent to-transparent hover:from-brand-orange hover:via-brand-orange/20 transition-all duration-500 shadow-sm"
            >
              <div className="flex h-full flex-col justify-between rounded-[28px] bg-bg-surface dark:bg-[#201c20] p-6 transition-all group-hover:shadow-[0_15px_40px_rgb(var(--brand-orange)/0.15)] dark:group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[22px] font-bold text-text-main dark:text-text-primary group-hover:text-brand-orange transition-colors font-serif">{basket.name}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] border border-[#10b981]/30 rounded-full px-2.5 py-0.5">Completed</span>
                       <span className="text-[12px] text-text-muted dark:text-text-primary/50">{basket.date}</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor] transition-transform group-hover:scale-125" style={{ color: basket.color, backgroundColor: basket.color }} />
                </div>

                <div className="flex flex-col gap-5">
                   <div className="flex flex-wrap gap-2 items-center">
                      {uniqueStores.map((store, i) => (
                        <div key={i} className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-black/40 flex items-center justify-center text-[11px] font-semibold text-text-main dark:text-text-primary/80 transition-colors group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                          {store}
                        </div>
                      ))}
                   </div>
                   
                   <div className="flex justify-between items-end">
                      <span className="text-[28px] font-black text-text-main dark:text-white">${basket.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => handleReorder(e, basket.id)} 
                        className="relative z-20 flex items-center gap-1.5 rounded-[12px] bg-brand-orange/10 dark:bg-brand-orange/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-brand-orange transition-all hover:bg-brand-orange hover:text-white hover:shadow-[0_4px_15px_rgb(var(--brand-orange)/0.3)] active:scale-95"
                      >
                        Reorder
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )})}
        </AnimatePresence>
      </div>

      <PortalWrapper>
        <AnimatePresence>
          {selectedBasket && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedBasket(null)} 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                className="relative w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              >
                <div className="bg-bg-surface dark:bg-[#2a252a] p-8 relative border border-white/20 dark:border-white/5">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-text-main/10 dark:border-white/10">
                      <h3 className="text-[26px] font-bold text-text-main dark:text-text-primary font-serif">{selectedBasket.name}</h3>
                      <button onClick={() => setSelectedBasket(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                    
                    <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedBasket.items.length > 0 ? selectedBasket.items.map((item: any, idx) => (
                        <div 
                          key={idx} 
                          className={cn(
                            "flex justify-between items-center px-5 py-4 rounded-[20px] transition-all group border",
                            "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-text-main/5",
                            "dark:bg-white/5 dark:border-white/10 dark:shadow-none",
                            "hover:border-brand-orange/40 hover:scale-[1.01]"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-black/5 dark:border-white/10 shadow-inner bg-bg-main dark:bg-black/20">
                               {item.image ? (
                                  <Image src={item.image} alt={item.title || item.name} fill className="object-cover" />
                               ) : (
                                  <div className="w-full h-full flex items-center justify-center text-sm opacity-50">🛍️</div>
                               )}
                            </div>
                            
                            <div className="flex flex-col">
                              <span 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(item as DealCardType);
                                }}
                                className="text-[15px] font-bold cursor-pointer text-text-main dark:text-text-primary hover:text-brand-orange transition-colors"
                              >
                                {item.title || item.name}
                              </span>
                              <span className="text-[11px] text-text-muted dark:text-text-primary/40">
                                {item.quantity || "1 pc"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-text-muted dark:text-text-primary/40">
                                  x{item.cartQuantity || 1}
                                </span>
                                <span className="font-black text-[15px] text-brand-orange">
                                  ${(item.price * (item.cartQuantity || 1)).toFixed(2)}
                                </span>
                              </div>
                              <span className="text-[9px] text-text-muted dark:text-text-primary/30 uppercase font-black tracking-tighter">Total</span>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <span className="text-text-muted italic text-center py-10">No items found.</span>
                      )}
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <button 
                        onClick={(e) => handleReorder(e, selectedBasket.id)} 
                        className="w-full py-4 rounded-[16px] bg-brand-orange text-[14px] text-white tracking-[0.05em] font-bold shadow-[0_8px_20px_rgb(var(--brand-orange)/0.25)] hover:-translate-y-0.5 active:scale-95 transition-all"
                      >
                        REORDER BASKET
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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