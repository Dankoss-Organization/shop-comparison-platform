/**
 * @file cart_drawer.tsx
 * @description The main interactive shopping cart drawer UI.
 * Acts as an Observer to the `useCartStore`, automatically re-rendering when the global 
 * cart state changes. Orchestrates interactions between individual cart items and the checkout FSM.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCartStore } from "@/Store/use_cart_store";
import Image from "next/image";
import { CheckoutButton } from "./checkout_button";
import { ProductModal } from "../UI/product_modal";
import { type DealCard as DealCardType } from "@/Data/home_data";
import { cn } from "@/Lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setOpen, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice,
    fulfillmentType,
    setFulfillmentType,
    toggleItemLock,
    updateSelectedStore,
    applyOptimizedCart
  } = useCartStore();
  
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DealCardType | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen || isStrategyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isStrategyModalOpen]);

  const handleClearAll = () => {
    setIsClearing(true); 
    setTimeout(() => {
      clearCart(); 
      const totalAnimationTime = (items.length * 80) + 350;
      setTimeout(() => {
        setIsClearing(false);
      }, totalAnimationTime);
    }, 10);
  };

  const executeOptimization = async (selectedStrategy: "optimal" | "cheapest" | "closest") => {
    setIsStrategyModalOpen(false);
    setIsOptimizing(true);
    
    try {
      let userLocation = { lat: 50.4501, lng: 30.5234 };
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        );
        userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      } catch {
      }

      const cartItems = items.map((item: any) => {
        const activeOffer = item.selectedStoreId
          ? item.offers?.find((o: any) => o.store_id === item.selectedStoreId)
          : item.offers?.sort((a: any, b: any) => a.pricing.current_price - b.pricing.current_price)[0];

        return {
          itemId: item.id,
          productId: item.internalId ?? item.id,
          quantity: item.cartQuantity,
          selectedStoreId: activeOffer?.store_id ?? "unknown",
          isLocked: item.isLocked ?? false,
        };
      });

      const res = await fetch("/api/v1/cart/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userLocation, fulfillmentType, cartItems }),
      });

      if (!res.ok) throw new Error("Optimization failed");
      const data = await res.json();

      const chosenScenario = data[selectedStrategy];
      
      if (chosenScenario?.isFeasible) {
        const optimizedAssignments = chosenScenario.items.map((i: any) => ({
          itemId: i.itemId,
          storeId: i.storeId
        }));
        
        applyOptimizedCart(optimizedAssignments);

        const cheapestItemsCost = chosenScenario.items.reduce((sum: number, i: any) => {
        const cartItem = items.find((ci: any) => ci.id === i.itemId);
        const offer = cartItem?.offers?.find((o: any) => o.store_id === i.storeId);
        const price = offer?.pricing.current_price ?? 0;
        const qty = cartItem?.cartQuantity ?? 1;
        return sum + price * qty;
      }, 0);

        alert(
          `✅ Applied ${selectedStrategy.toUpperCase()} strategy!\n\n` +
          `Items: ₴${cheapestItemsCost.toFixed(2)}\n` +          // ✅ swap this
          `Delivery: ₴${chosenScenario.deliveryCost.toFixed(2)}\n` +
          `Total: ₴${(cheapestItemsCost + chosenScenario.deliveryCost).toFixed(2)}\n\n` +  // ✅ and recalculate total
          `Stores: ${chosenScenario.stores.map((s: any) => s.storeName ?? s.storeId).join(", ")}`
        );
      } else {
        alert(`The ${selectedStrategy} scenario is not feasible for this cart combination.`);
      }
    } catch (e) {
      alert("Optimization failed. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <aside 
        className={cn(
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[420px] overflow-hidden bg-bg-surface/95 dark:bg-bg-deep/30 p-6 backdrop-blur-3xl border-l border-text-main/5 dark:border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.15)] dark:shadow-[-30px_0_60px_rgba(0,0,0,0.6)]" : "translate-x-full shadow-none"
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-[400px] w-[400px] rounded-full bg-brand-orange opacity-[0.08] dark:opacity-30 blur-[100px]" />

        <div className="relative z-10 flex h-full flex-col">
          
          <div className="flex items-center justify-between border-b border-text-main/10 dark:border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-text-primary font-serif">YOUR BASKET</h2>
              
              <AnimatePresence>
                {items.length > 0 && !isClearing && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    onClick={handleClearAll}
                    className="group relative flex items-center gap-1.5 overflow-hidden rounded-[16px] border border-semantic-danger/20 bg-semantic-danger/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-semantic-danger shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-semantic-danger/40 hover:bg-semantic-danger/20 hover:shadow-[0_4px_15px_rgb(var(--semantic-danger)/0.25)] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      CLEAR
                    </span>
                    <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                      <div className="h-full w-[20px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-semantic-danger/30 to-transparent" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setOpen(false)} 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-text-main/10 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm dark:shadow-none text-text-muted dark:text-text-primary/60 transition-all hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:text-brand-orange"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar pb-24">
            <AnimatePresence mode="wait">
              {items.length === 0 && !isClearing ? (
                <motion.div 
                  key="empty-basket"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col items-center justify-center px-6 text-center"
                >
                  <div className="relative mb-8 flex h-[144px] w-[144px] cursor-default items-center justify-center rounded-full border border-text-main/5 dark:border-white/5 bg-white/50 dark:bg-black/30 shadow-inner">
                    <Image 
                      src="/basket.svg" 
                      alt="Empty basket" 
                      width={64} 
                      height={64} 
                      className="opacity-40 transition-transform duration-500 hover:scale-105"
                      style={{ filter: "var(--logo-filter)" }}
                    />
                  </div>
                  <h3 className="mb-3 text-[22px] font-bold tracking-tight text-text-main dark:text-text-primary font-serif">The court is empty</h3>
                  <p className="mb-10 text-[13px] leading-relaxed text-text-muted dark:text-text-primary/60 max-w-[280px]">
                    You haven't added any hits to your basket yet. Let's find some solid deals to score.
                  </p>
                  
                  <button 
                    onClick={() => setOpen(false)}
                    className="group relative flex h-[48px] w-full max-w-[240px] items-center justify-center overflow-hidden rounded-[24px] border border-text-main/10 dark:border-transparent bg-white dark:bg-bg-deepest/60 text-[12px] font-black tracking-[0.15em] text-text-main dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))] backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-md dark:hover:shadow-[0_0_20px_rgb(var(--brand-orange)/0.4)] hover:text-brand-orange active:scale-95"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                      BROWSE HITS
                      <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </span>
                    <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                      <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-brand-orange/10 to-transparent" />
                    </div>
                  </button>
                </motion.div>
              ) : (
                <motion.div key="items-list" className="flex w-full flex-col">
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id || item.title}
                        layout
                        initial={{ opacity: 0, height: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, height: "auto", scale: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          scale: 0.9,
                          x: isClearing ? -150 : -20,
                          transition: { 
                            duration: 0.35, 
                            delay: isClearing ? index * 0.08 : 0, 
                            ease: "backIn" 
                          }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden border-b border-text-main/5 dark:border-white/5 last:border-0"
                      >
                        <CartItemUI 
                          item={item as any}
                          onIncrease={() => updateQuantity(item.id, 1)}
                          onDecrease={() => updateQuantity(item.id, -1)}
                          onRemove={() => removeItem(item.id)}
                          onToggleLock={() => toggleItemLock(item.id)}
                          onStoreChange={(storeId) => updateSelectedStore(item.id, storeId)}
                          onClick={() => setSelectedItem(item as DealCardType)} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {items.length > 0 && !isClearing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-text-main/10 dark:border-white/10 pt-6"
              >
                <div className="mb-6 flex rounded-xl bg-text-main/5 dark:bg-white/5 p-1">
                  <button
                    onClick={() => setFulfillmentType("delivery")}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${fulfillmentType === "delivery" ? "bg-white dark:bg-bg-deep shadow-sm text-text-main dark:text-text-primary" : "text-text-muted hover:text-text-main"}`}
                  >
                    DELIVERY
                  </button>
                  <button
                    onClick={() => setFulfillmentType("pickup")}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${fulfillmentType === "pickup" ? "bg-white dark:bg-bg-deep shadow-sm text-text-main dark:text-text-primary" : "text-text-muted hover:text-text-main"}`}
                  >
                    PICKUP
                  </button>
                </div>

                <div className="mb-6 flex items-end justify-between px-2">
                  <span className="text-sm font-bold uppercase tracking-widest text-text-muted dark:text-text-primary/60">Total cost</span>
                  <span className="text-3xl font-black leading-none text-brand-orange drop-shadow-[0_0_15px_rgb(var(--brand-orange)/0.2)]">
                    ₴{getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setIsStrategyModalOpen(true)}
                  disabled={isOptimizing}
                  className={`group relative mb-3 flex h-[48px] w-full items-center justify-center overflow-hidden rounded-[24px] text-[13px] font-black tracking-[0.2em] transition-all duration-300 backdrop-blur-md ${
                    isOptimizing
                      ? "bg-white dark:bg-bg-deepest/60 text-text-muted dark:text-text-primary/50 cursor-not-allowed border border-text-main/10 dark:border-white/10"
                      : "bg-white dark:bg-bg-deepest/40 border border-brand-orange/40 dark:border-brand-orange/50 text-brand-orange dark:text-text-primary shadow-sm dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))] hover:-translate-y-[2px] hover:shadow-md dark:hover:shadow-[0_0_20px_rgb(var(--brand-orange)/0.4)] hover:border-brand-orange active:scale-95"
                  }`}
                >
                  {isOptimizing ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>OPTIMIZING...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        SMART OPTIMIZE
                      </span>
                      <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                        <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />
                      </div>
                    </>
                  )}
                </button>

                <CheckoutButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      <AnimatePresence>
        {isStrategyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsStrategyModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[24px] bg-bg-surface dark:bg-bg-deep border border-text-main/10 dark:border-white/10 shadow-2xl p-6"
            >
              <h3 className="text-lg font-bold font-serif text-center mb-1 text-text-main dark:text-text-primary">Choose Strategy</h3>
              <p className="text-center text-sm text-text-muted dark:text-text-primary/60 mb-6">How would you like to optimize your cart?</p>
              
              <div className="flex flex-col gap-3">
                {[
                  { id: "cheapest", label: "CHEAPEST", desc: "Prioritize lowest total cost" },
                  { id: "optimal", label: "OPTIMAL", desc: "Best balance of cost and distance" },
                  { id: "closest", label: "CLOSEST", desc: "Prioritize nearest store available" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => executeOptimization(opt.id as any)}
                    className="flex flex-col items-start w-full p-4 rounded-xl border border-text-main/10 dark:border-white/10 bg-white dark:bg-black/20 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all group"
                  >
                    <span className="text-sm font-black tracking-widest text-text-main dark:text-text-primary group-hover:text-brand-orange transition-colors">
                      {opt.label}
                    </span>
                    <span className="text-xs text-text-muted dark:text-text-primary/50 mt-1">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setIsStrategyModalOpen(false)}
                className="w-full mt-4 py-3 text-xs font-bold text-text-muted hover:text-text-main dark:hover:text-white transition-colors"
              >
                CANCEL
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)}>
          <ProductModal.Window>
            <ProductModal.LeftColumn>
              <ProductModal.ImageGallery />
              <ProductModal.Reviews />
            </ProductModal.LeftColumn>
            <ProductModal.RightColumn>
              <ProductModal.Header categoryTitle="Groceries" />
              <ProductModal.Actions categoryTitle="Groceries" />
              <ProductModal.Details categoryTitle="Groceries" />
            </ProductModal.RightColumn>
          </ProductModal.Window>
        </ProductModal>
      )}
    </>
  );
}

export interface CartItemType extends DealCardType {
  cartQuantity: number;
  selectedStoreId?: string;
  isLocked?: boolean; 
}

export function CartItemUI({ 
  item, 
  onIncrease, 
  onDecrease, 
  onRemove,
  onToggleLock,
  onStoreChange, 
  onClick
}: { 
  item: CartItemType; 
  onIncrease: () => void; 
  onDecrease: () => void; 
  onRemove: () => void;
  onToggleLock: () => void;
  onStoreChange: (storeId: string) => void;
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleInteract = () => setDropdownOpen(false);
    window.addEventListener('scroll', handleInteract, true);
    window.addEventListener('click', handleInteract);
    window.addEventListener('resize', handleInteract);

    return () => {
      window.removeEventListener('scroll', handleInteract, true);
      window.removeEventListener('click', handleInteract);
      window.removeEventListener('resize', handleInteract);
    };
  }, [dropdownOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownCoords({ 
        top: rect.bottom + 6, 
        left: rect.left, 
        width: Math.max(rect.width, 180) 
      });
    }
    setDropdownOpen(!dropdownOpen);
  };

  const offers = item.offers || [];
  const activeOffer = item.selectedStoreId 
    ? offers.find(o => o.store_id === item.selectedStoreId) 
    : [...offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];

  const DropdownMenu = () => {
    if (!mounted) return null;
    return createPortal(
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ 
              top: dropdownCoords.top, 
              left: dropdownCoords.left, 
              minWidth: dropdownCoords.width 
            }}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[99999] flex flex-col py-1.5 overflow-hidden rounded-xl bg-bg-surface dark:bg-[#1a1310] border border-text-main/10 dark:border-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            {offers.map((offer: any) => {
              const isSelected = activeOffer?.store_id === offer.store_id;
              return (
                <button
                  key={offer.store_id}
                  onClick={() => {
                    onStoreChange(offer.store_id);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-[11px] font-bold tracking-wider uppercase transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                    isSelected ? 'bg-black/5 dark:bg-white/5' : ''
                  }`}
                >
                  <span className={isSelected ? 'text-brand-orange' : 'text-text-main dark:text-white/80'}>
                    {offer.store_name}
                  </span>
                  <span className={`font-mono text-[11px] ${isSelected ? 'text-brand-orange' : 'text-text-muted dark:text-white/60'}`}>
                    (₴{offer.pricing.current_price.toFixed(2)})
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <div className={`flex gap-4 py-5 w-full transition-opacity ${item.isLocked ? 'bg-brand-orange/5 rounded-xl px-2' : ''}`}>
      <div 
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-bg-deep border border-text-main/5 dark:border-white/5 shadow-sm dark:shadow-inner cursor-pointer transition-transform hover:scale-105"
        onClick={onClick}
      >
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 80px" />
      </div>
      
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div className="cursor-pointer group flex-1" onClick={onClick}>
            <h4 className="font-bold text-text-main dark:text-text-primary leading-tight transition-colors group-hover:text-brand-orange dark:group-hover:text-brand-orange">{item.title}</h4>
            
            <div className="flex items-center gap-2 mt-2 relative">
              
              <button 
                ref={triggerRef}
                onClick={toggleDropdown}
                className="flex items-center gap-1.5 rounded-lg border border-transparent bg-black/5 dark:bg-white/5 px-2 py-1 transition-all hover:border-text-main/10 dark:hover:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <svg className="w-3 h-3 text-text-muted dark:text-text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>

                <span className="text-[11px] font-bold uppercase tracking-wider text-text-main dark:text-text-primary">
                  {activeOffer?.store_name || "Select Store"} (₴{activeOffer ? activeOffer.pricing.current_price.toFixed(2) : "0.00"})
                </span>
                
                <svg className={`w-3 h-3 ml-0.5 text-text-muted dark:text-text-primary/40 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>

              <DropdownMenu />

              <button 
                onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
                className={`p-1.5 rounded-lg flex items-center transition-all ${item.isLocked ? 'text-brand-orange bg-brand-orange/10 shadow-[0_0_10px_rgb(var(--brand-orange)/0.2)]' : 'text-text-muted dark:text-text-primary/30 hover:bg-black/5 dark:hover:bg-white/5'}`}
                title={item.isLocked ? "Store locked" : "Allow algorithm to change store"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {item.isLocked ? (
                    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>
                  ) : (
                    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></>
                  )}
                </svg>
              </button>
            </div>

          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              onRemove();
            }} 
            className="p-1 text-text-muted dark:text-text-primary/30 hover:text-semantic-danger dark:hover:text-semantic-danger transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <p className="font-black text-brand-orange text-lg">
            ₴{activeOffer ? activeOffer.pricing.current_price.toFixed(2) : "0.00"}
          </p>
          <div className="flex items-center gap-1.5 rounded-full border border-text-main/10 dark:border-white/10 bg-white dark:bg-black/20 p-1 shadow-sm dark:shadow-none">
            <button onClick={onDecrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-main dark:bg-bg-deepest text-text-muted dark:text-text-primary/60 hover:text-text-main dark:hover:text-text-primary transition">-</button>
            <span className="w-6 text-center text-xs font-black text-text-main dark:text-text-primary">{item.cartQuantity}</span>
            <button onClick={onIncrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-main dark:bg-bg-deepest text-text-muted dark:text-text-primary/60 hover:text-text-main dark:hover:text-text-primary transition">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}