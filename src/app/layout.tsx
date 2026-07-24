import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanket Logistics | Reliable Transport & Supply Chain Solutions",
  description: "Experience premium, secure, and smart logistics with Sanket Logistics. We offer road, air, ocean freight, state-of-the-art warehousing, and live package tracking.",
  keywords: ["transport", "logistics", "freight", "cargo", "sanket logistics", "shipping", "warehousing", "supply chain"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
