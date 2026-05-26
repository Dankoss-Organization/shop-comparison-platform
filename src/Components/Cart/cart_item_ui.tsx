/**
 * @file cart_item_ui.tsx
 * @description Presentation component for an individual cart item, handling its display and emitting quantity/removal actions.
 */

import Image from "next/image";
import type { DealCard as DealCardType } from "@/Data/home_data";

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
  
  const offers = item.offers || [];
  const activeOffer = item.selectedStoreId 
    ? offers.find(o => o.store_id === item.selectedStoreId) 
    : [...offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];

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
            
            <div className="flex items-center gap-2 mt-2">
              <div 
                className="relative z-10 flex items-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-text-main/10 dark:hover:border-white/10 rounded-lg px-2 py-1 transition-all"
                onClick={(e) => e.stopPropagation()} 
              >
                <svg className="w-3 h-3 mr-1.5 text-text-muted dark:text-text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>

                <select 
                  value={activeOffer?.store_id || ""}
                  onChange={(e) => onStoreChange(e.target.value)}
                  className="appearance-none bg-transparent text-[11px] font-bold uppercase tracking-wider text-text-main dark:text-text-primary outline-none cursor-pointer pr-5 w-full"
                >
                  {offers.map((offer: any) => (
                    <option key={offer.store_id} value={offer.store_id} className="bg-bg-surface dark:bg-bg-deep text-text-main dark:text-text-primary">
                      {offer.store_name} (₴{offer.pricing.current_price.toFixed(2)})
                    </option>
                  ))}
                </select>
                
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted dark:text-text-primary/40" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </div>

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