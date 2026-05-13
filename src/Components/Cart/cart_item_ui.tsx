/**
 * @file CartItemUI.tsx
 * @description Presentation component for an individual cart item, handling its display and emitting quantity/removal actions.
 */
import Image from "next/image";
import type { DealCard as DealCardType } from "@/Data/home_data";

export interface CartItemType extends DealCardType {
  cartQuantity: number;
  selectedStoreId?: string; 
}

export function CartItemUI({ 
  item, 
  onIncrease, 
  onDecrease, 
  onRemove,
  onClick
}: { 
  item: CartItemType; 
  onIncrease: () => void; 
  onDecrease: () => void; 
  onRemove: () => void;
  onClick: () => void;
}) {
  
  const activeOffer = item.selectedStoreId 
    ? item.offers?.find(o => o.store_id === item.selectedStoreId) 
    : [...(item.offers || [])].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];

  return (
    <div className="flex gap-4 py-5 w-full">
      <div 
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-bg-main dark:bg-bg-deep border border-text-main/5 dark:border-white/5 shadow-inner cursor-pointer transition-transform hover:scale-105"
        onClick={onClick}
      >
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div className="cursor-pointer group flex-1" onClick={onClick}>
            <h4 className="font-bold text-text-main dark:text-text-primary leading-tight transition-colors group-hover:text-brand-orange dark:group-hover:text-brand-orange">{item.title}</h4>
            <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-primary/60 mt-1">
              {activeOffer ? activeOffer.store_name : "Unknown Store"}
            </p>
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
            ${activeOffer ? activeOffer.pricing.current_price.toFixed(2) : "0.00"}
          </p>
          <div className="flex items-center gap-1.5 rounded-full border border-text-main/10 dark:border-white/10 bg-text-main/5 dark:bg-black/20 p-1">
            <button onClick={onDecrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated dark:bg-bg-deepest text-text-muted dark:text-text-primary/60 hover:text-text-main dark:hover:text-text-primary shadow-sm dark:shadow-none transition">-</button>
            <span className="w-6 text-center text-xs font-black text-text-main dark:text-text-primary">{item.cartQuantity}</span>
            <button onClick={onIncrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated dark:bg-bg-deepest text-text-muted dark:text-text-primary/60 hover:text-text-main dark:hover:text-text-primary shadow-sm dark:shadow-none transition">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}