/**
 * @file layout.tsx
 * @description Specialized layout for store-related pages.
 */

import Header from "@/Components/Layout/header"; 
import Footer from "@/Components/Layout/footer";
import StoreNav from "@/Components/Sections/store_nav"; 

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <Header />
      <StoreNav />
      
      <main className="flex-1 flex flex-col w-full relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}