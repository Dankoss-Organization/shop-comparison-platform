/**
 * @file page.tsx
 * @brief Unified Alerts Feed displaying price drops, promos, and system notifications.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AlertCard, { Alert } from "@/app/profile/_components/cards/alert_card";

const INITIAL_ALERTS: Alert[] = [
  { 
    id: 1, type: 'price_drop', unread: true, 
    icon: "🥑", store: "Silpo", time: "10 min ago",
    title: "Price Drop Alert! 📉", 
    message: "Hass Avocados (2-pack) dropped by 15%. Now only $2.80!", 
    action: "View Deal" 
  },
  { 
    id: 2, type: 'target_reached', unread: true, 
    icon: "☕", store: "ATB", time: "2 hours ago",
    title: "Target Reached! 🎯", 
    message: "Jacobs Monarch 200g hit your target price of $5.00.", 
    action: "Add to Basket" 
  },
  { 
    id: 3, type: 'promo', unread: false, 
    icon: "💳", store: "Own Account", time: "1 day ago",
    title: "Personalized Offer 🎁", 
    message: "Because you linked your loyalty card, get -20% on all fresh fish this weekend.", 
    action: "Explore Offers" 
  },
  { 
    id: 4, type: 'system', unread: false, 
    icon: "💡", store: "DANKOSS", time: "3 days ago",
    title: "Weekly Summary 📊", 
    message: "You saved $12.40 this week using our optimized baskets. Great job!", 
    action: "View Stats" 
  }
];

export default function AlertsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  useEffect(() => setIsMounted(true), []);

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, unread: false })));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  if (!isMounted) return null;

  const unreadCount = alerts.filter(a => a.unread).length;

  return (
    <div className="relative flex flex-col gap-8 sm:gap-10 w-full pb-10 z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 sm:gap-6 border-b border-text-main/5 dark:border-white/5 pb-5 md:pb-6">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-sm leading-tight">
              Alerts Feed
            </h2>
            {unreadCount > 0 && (
              <span className="flex h-6 sm:h-7 min-w-[24px] sm:min-w-[28px] items-center justify-center rounded-full bg-brand-orange px-2 text-[11px] sm:text-[13px] font-bold text-white shadow-lg shadow-brand-orange/20 animate-in zoom-in">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-[14px] sm:text-[15px] text-text-muted dark:text-text-primary/50">
            Stay updated on price drops, targets, and personal promos.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-[12px] sm:text-[13px] font-bold text-brand-orange uppercase tracking-widest hover:brightness-110 transition-all mt-2 md:mt-0 bg-brand-orange/10 md:bg-transparent px-4 py-2 md:p-0 rounded-xl md:rounded-none"
          >
            Mark all as read ✓
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl">
        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center py-20 gap-4"
             >
               <div className="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted/20">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
               </div>
               <span className="text-[15px] text-text-muted">You have no new alerts.</span>
             </motion.div>
          ) : (
            alerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onDelete={deleteAlert} 
              />
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}