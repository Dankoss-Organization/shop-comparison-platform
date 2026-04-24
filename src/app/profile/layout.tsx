/**
 * @file layout.tsx
 * @brief Dashboard layout for the user profile, featuring a persistent glassmorphic sidebar.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/profile", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )},
    { name: "Personal Info", path: "/profile/settings", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
    { name: "My Baskets", path: "/profile/baskets", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    )},
    { name: "Price Alerts", path: "/profile/alerts", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    )},
    { name: "Recipe Cookbook", path: "/profile/recipes", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    )},
    { name: "Security", path: "/profile/security", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    )}
  ];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-85px)] w-full max-w-[1440px] gap-8 p-6 md:p-8 xl:p-10">
      
      <aside className="hidden w-[280px] shrink-0 flex-col gap-8 lg:flex z-10">
        <div className="flex flex-col gap-1 px-2">
          <h1 className="text-[24px] font-bold tracking-[1px] text-[#FFDEBA] uppercase font-serif">
            Dashboard
          </h1>
          <p className="text-[13px] text-[#FFDEBA]/50">Manage your DANKOSS experience</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                  isActive 
                    ? "bg-[rgba(70,59,70,0.4)] shadow-[inset_0_1px_0_rgba(255,222,186,0.1),_0_10px_20px_rgba(0,0,0,0.2)]" 
                    : "hover:bg-[rgba(70,59,70,0.2)]"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 h-[60%] w-[3px] rounded-r-full bg-[#EC5800] shadow-[0_0_10px_#EC5800]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className={`flex items-center justify-center transition-colors duration-300 ${
                  isActive ? "text-[#EC5800]" : "text-[#FFDEBA]/50 group-hover:text-[#EC5800]"
                }`}>
                  {item.icon}
                </div>
                
                <span className={`text-[15px] font-medium transition-colors duration-300 ${
                  isActive ? "text-[#FFDEBA]" : "text-[#FFDEBA]/70 group-hover:text-[#FFDEBA]"
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto rounded-3xl bg-[linear-gradient(135deg,rgba(236,88,0,0.1),rgba(30,26,30,0.2))] p-5 border border-[#EC5800]/10 relative overflow-hidden backdrop-blur-md">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#EC5800]/20 blur-xl" />
          <h3 className="text-[14px] font-bold text-[#FFDEBA] mb-1">DANKOSS Pro</h3>
          <p className="text-[12px] text-[#FFDEBA]/60 leading-relaxed mb-3">
            You are in the top 10% of smart shoppers this month!
          </p>
          <button className="text-[12px] font-bold text-[#EC5800] uppercase tracking-wide hover:text-white transition-colors">
            View Stats →
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden rounded-[40px] bg-[rgba(30,26,30,0.3)] backdrop-blur-[20px] border border-[#FFDEBA]/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10">
        <div className="h-full w-full p-8 xl:p-12 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

    </div>
  );
}