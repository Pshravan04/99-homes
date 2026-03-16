import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

export const metadata: Metadata = {
  title: "99 Homes - Premium Real Estate in Vasai-Virar",
  description: "Find your dream home in Vasai-Virar with 99 Homes. Trusted real estate agency with verified listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <LeadPopup />
        <Footer />
      </body>
    </html>
  );
}
