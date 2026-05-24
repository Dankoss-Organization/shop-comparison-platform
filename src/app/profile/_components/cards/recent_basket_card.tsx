"use client";

import Link from "next/link";
import { Basket } from "@/Store/user_store";

interface RecentBasketCardProps {
  basket: Basket | null;
  onClick: () => void;
}

export default function RecentBasketCard({ basket, onClick }: RecentBasketCardProps) {
  const getUniqueStores = (basketData: any) => {
    const stores = new Set<string>();
    basketData.items?.forEach((item: any) => {
      if (item.selectedStoreId && item.offers) {
        const offer = item.offers.find((o: any) => o.store_id === item.selectedStoreId);
        if (offer) stores.add(offer.store_name);
      } else if (item.offers && item.offers.length > 0) {
        const sortedOffers = [...item.offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price);
        stores.add(sortedOffers[0].store_name);
      }
    });
    if (stores.size === 0) {
      return basketData.stores?.length > 0 ? basketData.stores : ["DANKOSS Checkout"];
    }
    return Array.from(stores);
  };

  const stores = basket ? getUniqueStores(basket) : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end pl-1 pr-2">
        <h3 className="text-[20px] font-bold tracking-[1px] text-text-main font-serif cursor-default select-none drop-shadow-sm">Recent Baskets</h3>
        <Link href="/profile/history" className="text-[12px] font-bold text-brand-orange uppercase tracking-wide hover:brightness-110 transition-all drop-shadow-sm">
          View All
        </Link>
      </div>
      
      {basket ? (
        <div onClick={onClick}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[36px] bg-white/50 dark:bg-white/5 backdrop-blur-[20px] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-md cursor-pointer">
          <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-text-main drop-shadow-sm">{basket.name}</span>
                    <span className="text-[12px] text-text-muted">{basket.date}</span>
                  </div>
                </div>
                <span className="text-[20px] font-black text-brand-orange drop-shadow-sm">${basket.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-bold uppercase tracking-[1px] text-text-muted">Optimized across:</span>
              <div className="flex items-center gap-3">
                {stores.slice(0, 2).map((store: string) => (
                  <div key={store} className="flex h-12 min-w-[80px] items-center justify-center rounded-xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/10 text-[11px] font-bold text-text-main shadow-inner">{store}</div>
                ))}
                {stores.length > 2 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-black/40 text-[11px] font-bold text-text-muted border border-black/5 dark:border-white/5">+{stores.length - 2}</div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-orange/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-brand-orange/20" />
        </div>
      ) : (
         <div className="flex h-full items-center justify-center rounded-[36px] bg-white/30 border border-dashed border-black/10 p-8 text-text-muted">
           No recent baskets yet.
         </div>
      )}
    </div>
  );
}