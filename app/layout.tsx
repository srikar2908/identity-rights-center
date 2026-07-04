import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Suspense } from "react";
import GlobalLoadingBar from "@/components/GlobalLoadingBar";
import DevPanel from "@/components/DevPanel";
import PersistentFooter from "@/components/PersistentFooter";
import ToastWrapper from "@/components/ToastWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Identity Rights Center — Truecaller",
  description: "Discover, verify, correct, and control the identity data associated with your phone number under the DPDP Act 2023.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-100 text-neutral-900 transition-colors">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AppProvider>
          <Suspense fallback={null}>
            <GlobalLoadingBar />
          </Suspense>
          
          <main id="main-content" className="flex-grow flex flex-col justify-between">
            {children}
            <PersistentFooter />
          </main>
          
          <ToastWrapper />
          <DevPanel />
        </AppProvider>
      </body>
    </html>
  );
}
