"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, LifeBuoy } from "lucide-react";
import { useApp } from "@/context/AppContext";

const PersistentFooter = () => {
  const { currentUser } = useApp();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-200/10 bg-white dark:bg-neutral-100/50 py-6 mt-12 transition-colors">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Security Badge */}
        <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-400">
          <ShieldCheck className="h-4.5 w-4.5 text-success stroke-[2px]" />
          <span className="text-[12px] font-medium leading-none">
            {currentUser ? "Verified Session" : "Secured Environment"}
          </span>
          <span className="h-3 w-[1px] bg-neutral-200 dark:bg-neutral-200/20" />
          <Lock className="h-3.5 w-3.5" />
          <span className="text-[12px] font-medium leading-none">DPDP Compliant</span>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
          <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-1">
            <LifeBuoy className="h-4 w-4" />
            <span>Help & Grievance Desk</span>
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Mock Privacy Policy: Under DPDP Act 2023, data subjects have the right to request access, correction, and erasure of their contact entries.");
            }}
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Mock Data Handling explainer: All identity listing records are aggregated contact uploads. Truecaller does not store raw contact books for directories; lookup is based on indexed hash hashes.");
            }}
            className="hover:text-primary transition-colors"
          >
            How your data is handled
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PersistentFooter;
