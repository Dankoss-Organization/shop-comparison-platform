import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DANKOSS | Product Price Comparison",
  description:
    "Compare product prices, discover smart picks, and explore recipes built around the best-value ingredients.",
};

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
