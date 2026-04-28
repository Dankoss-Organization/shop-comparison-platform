"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/Components/Layout/header"; 
import Footer from "@/Components/Layout/footer";
import { useUserStore } from "@/Store/user_store";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUserStore();

  const navItems = [
    { name: "Overview", path: "/profile", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )},
    { name: "Personal Info", path: "/profile/settings", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
    { name: "My Locations", path: "/profile/locations", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    )},
    { name: "Preferences", path: "/profile/preferences", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    )},
    { name: "Basket History", path: "/profile/history", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    )},
    { name: "Alerts Feed", path: "/profile/alerts", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    )},
    { name: "Security", path: "/profile/security", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    )},
    { name: "Help & Support", path: "/profile/support", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
    )}
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 gap-8 p-6 md:p-8 xl:p-10">
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
          <div className="absolute top-[-10%] left-[10%] h-[600px] w-[600px] rounded-full bg-[#EC5800]/15 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[5%] h-[500px] w-[500px] rounded-full bg-[#EC5800]/10 blur-[130px]" />
        </div>

        <aside className="hidden w-[280px] shrink-0 flex-col gap-6 lg:flex z-10">
          <div className="flex flex-col gap-1 px-2">
            <h1 className="text-[24px] font-bold tracking-[1px] text-[#FFDEBA] uppercase font-serif">Dashboard</h1>
            <p className="text-[13px] text-[#FFDEBA]/50">Manage your DANKOSS experience</p>
          </div>

          <div className="flex flex-col flex-1 gap-6">
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-[#EC5800]/30 via-[#FFDEBA]/5 to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col gap-2 rounded-[32px] bg-[rgba(30,26,30,0.4)] backdrop-blur-[20px] p-3 w-full">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link key={item.name} href={item.path}
                      className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${isActive ? "bg-[rgba(70,59,70,0.5)] shadow-inner" : "hover:bg-[rgba(70,59,70,0.3)]"}`}
                    >
                      {isActive && (
                        <motion.div layoutId="active-nav" className="absolute left-0 h-[60%] w-[3px] rounded-r-full bg-[#EC5800] shadow-[0_0_10px_#EC5800]" />
                      )}
                      <div className={`transition-colors ${isActive ? "text-[#EC5800]" : "text-[#FFDEBA]/50 group-hover:text-[#EC5800]"}`}>{item.icon}</div>
                      <span className={`text-[15px] font-medium transition-colors ${isActive ? "text-[#FFDEBA]" : "text-[#FFDEBA]/70 group-hover:text-[#FFDEBA]"}`}>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="group flex items-center gap-4 rounded-2xl px-7 py-4 text-[15px] font-bold text-[#FFDEBA]/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 mt-auto border border-transparent hover:border-red-500/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:-translate-x-1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </aside>

        <div className="relative flex-1 z-10 rounded-[40px] p-[1px] bg-gradient-to-br from-[#EC5800]/40 via-[#FFDEBA]/5 to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <main className="h-full w-full overflow-hidden rounded-[40px] bg-[rgba(30,26,30,0.4)] backdrop-blur-[25px]">
            <div className="h-full w-full p-8 xl:p-12 overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}