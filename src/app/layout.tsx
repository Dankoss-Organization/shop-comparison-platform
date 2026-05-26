/**
 * @file layout.tsx
 * @description Root layout component establishing the HTML document structure and global Next.js metadata.
 */
import type { Metadata } from "next";
import "@/app/globals.css";
import { CartDrawer } from "@/Components/Cart/cart_drawer";
import { ThemeProvider } from "@/Components/theme_provider";

/**
 * @description Core SEO and descriptive metadata configuration exported for Next.js indexers.
 */
export const metadata: Metadata = {
  title: "DANKOSS | Product Price Comparison",
  description:
    "Compare product prices, discover smart picks, and explore recipes built around the best-value ingredients.",
};

/**
 * @description The highest-level wrapper for the Next.js application.
 * @param {Object} props - The layout properties.
 * @param {React.ReactNode} props.children - The inner pages and components routed by Next.js.
 * @param {React.ReactNode} props.authModal - The intercepted route slot for the authentication modal.
 * @returns {JSX.Element} The foundational `<html>` and `<body>` tags.
 */

export default function RootLayout({ 
  children,
  authModal 
}: { 
  children: React.ReactNode;
  authModal: React.ReactNode; 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartDrawer />
          
          {children}
          
          {authModal}
          
        </ThemeProvider>
      </body>
    </html>
  );
}