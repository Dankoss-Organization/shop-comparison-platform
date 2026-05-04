/**
 * @file layout.tsx
 * @description Layout wrapper for the About Us section, ensuring consistent Header and Footer display.
 */

import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1A171A] to-[#100E10]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}