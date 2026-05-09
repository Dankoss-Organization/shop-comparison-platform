/**
 * @file page.tsx
 * @brief Unified Alerts Feed displaying price drops, promos, and system notifications.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type AlertType = 'price_drop' | 'target_reached' | 'promo' | 'system';

const INITIAL_ALERTS = [
  { 
    id: 1, type: 'price_drop' as AlertType, unread: true, 
    icon: "🥑", store: "Silpo", time: "10 min ago",
    title: "Price Drop Alert! 📉", 
    message: "Hass Avocados (2-pack) dropped by 15%. Now only $2.80!", 
    action: "View Deal" 
  },
  { 
    id: 2, type: 'target_reached' as AlertType, unread: true, 
    icon: "☕", store: "ATB", time: "2 hours ago",
    title: "Target Reached! 🎯", 
    message: "Jacobs Monarch 200g hit your target price of $5.00.", 
    action: "Add to Basket" 
  },
  { 
    id: 3, type: 'promo' as AlertType, unread: false, 
    icon: "💳", store: "Own Account", time: "1 day ago",
    title: "Personalized Offer 🎁", 
    message: "Because you linked your loyalty card, get -20% on all fresh fish this weekend.", 
    action: "Explore Offers" 
  },
  { 
    id: 4, type: 'system' as AlertType, unread: false, 
    icon: "💡", store: "DANKOSS", time: "3 days ago",
    title: "Weekly Summary 📊", 
    message: "You saved $12.40 this week using our optimized baskets. Great job!", 
    action: "View Stats" 
  }
];

export default function AlertsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

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
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-sm">
              Alerts Feed
            </h2>
            {unreadCount > 0 && (
              <span className="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-brand-orange px-2 text-[13px] font-bold text-white shadow-lg shadow-brand-orange/20 animate-in zoom-in">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-[15px] text-text-muted dark:text-text-primary/50">Stay updated on price drops, targets, and personal promos.</p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-[13px] font-bold text-brand-orange uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Mark all as read ✓
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 max-w-4xl">
        <AnimatePresence>
          {alerts.length === 0 ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted/20">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
               </div>
               <span className="text-[15px] text-text-muted">You have no new alerts.</span>
             </motion.div>
          ) : (
            alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative overflow-hidden rounded-[28px] transition-all duration-300 border ${
                  alert.unread 
                    ? 'bg-brand-orange/[0.03] dark:bg-brand-orange/10 border-brand-orange/30 shadow-md shadow-brand-orange/5' 
                    : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {alert.unread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange shadow-[0_0_15px_rgba(236,88,0,0.5)]" />
                )}

                <div className="flex items-start gap-5 p-6 pl-8">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[24px] shadow-sm border transition-all ${
                    alert.unread 
                      ? 'bg-brand-orange/10 border-brand-orange/20 scale-105' 
                      : 'bg-black/5 dark:bg-black/40 border-black/5 dark:border-white/10'
                  }`}>
                    {alert.icon}
                  </div>

                  <div className="flex flex-col flex-1 gap-1.5 pt-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[17px] font-bold font-serif ${alert.unread ? 'text-text-main dark:text-white' : 'text-text-main dark:text-text-primary'}`}>
                          {alert.title}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-text-muted bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
                          {alert.store}
                        </span>
                      </div>
                      <span className="text-[12px] font-medium text-text-muted whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>
                    
                    <p className={`text-[14px] leading-relaxed pr-8 ${alert.unread ? 'text-text-main dark:text-text-primary' : 'text-text-muted'}`}>
                      {alert.message}
                    </p>

                    <div className="flex items-center gap-6 mt-3">
                      <button className="text-[13px] font-black text-brand-orange uppercase tracking-wider hover:translate-x-1 transition-transform">
                        {alert.action} →
                      </button>
                      <button 
                        onClick={() => deleteAlert(alert.id)}
                        className="text-[13px] font-bold text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}