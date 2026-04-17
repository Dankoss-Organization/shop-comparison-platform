/**
 * @file layout.tsx
 * @description Root layout component establishing the HTML document structure and global Next.js metadata.
 */
import type { Metadata } from "next";
import "@/app/globals.css";

/**
 * @description Core SEO and descriptive metadata configuration exported for Next.js indexers.
 */
export const metadata: Metadata = {
  title: "DANKOSS | Product Price Comparison",
  description:
    "Compare product prices, discover smart picks, and explore recipes built around the best-value ingredients.",
};

/**
 * @description The highest-level wrapper for the Next.js application, enforcing the HTML language attribute and importing global styles.
 * * @param {Object} props - The layout properties.
 * @param {React.ReactNode} props.children - The inner pages and components routed by Next.js.
 * @returns {JSX.Element} The foundational `<html>` and `<body>` tags.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}