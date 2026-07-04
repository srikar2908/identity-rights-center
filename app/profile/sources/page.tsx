"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Info, HelpCircle, Database, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Skeleton from "@/components/ui/Skeleton";
import Tooltip from "@/components/ui/Tooltip";

export default function DataSourcesPage() {
  const router = useRouter();
  const { currentUser, identityProfile } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Route protection
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) return null;

  const hasSources = identityProfile.sourceCount > 0;

  return (
    <div className="w-full flex-grow max-w-[720px] mx-auto px-4 py-8 md:py-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-1"
      >
        {/* Back Link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Profile</span>
        </Link>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-1">
          Data Sources & Transparency
        </h2>
        <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
          Review the aggregated directory source lists sync contributions for your phone number.
        </p>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : hasSources ? (
          <div className="flex flex-col gap-6">
            {/* Source Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact uploads */}
              <div className="p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
                <span className="text-[12px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Contact Sync Uploads
                </span>
                <span className="text-[22px] font-bold text-neutral-900">
                  {identityProfile.sourceCount} uploads
                </span>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Anonymized lists uploaded by other users sync contact names for this number.
                </p>
              </div>

              {/* Business Directories */}
              <div className="p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
                <span className="text-[12px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Public Directories
                </span>
                <span className="text-[22px] font-bold text-neutral-900">
                  0 matched directories
                </span>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  We check public whitepages or registered business registries for listings.
                </p>
              </div>
            </div>

            {/* Retention explainers */}
            <div className="border border-primary/20 bg-primary-light/50 dark:bg-primary-light/5 p-4 rounded-sm flex gap-3 text-neutral-900">
              <Info className="h-5 w-5 text-primary shrink-0 stroke-[2px]" />
              <div className="flex flex-col gap-1 text-[13px]">
                <h4 className="font-bold">Identity Retention Policy</h4>
                <p className="text-[12.5px] leading-relaxed text-neutral-700">
                  Identity data is retained only while your number remains active in the network graph. Erasure requests are typically reviewed and completely unlisted within 5 business days.
                </p>
              </div>
            </div>

            {/* General FAQ clarification */}
            <p className="text-[12.5px] text-neutral-400 italic text-center mt-2 border-t border-neutral-200 dark:border-neutral-200/10 pt-4">
              To preserve consent privacy, contact names are aggregated. We never expose the names or details of individual uploaders.
            </p>
          </div>
        ) : (
          /* Empty State if 0 uploads */
          <div className="flex flex-col items-center justify-center py-8 text-center select-none">
            <div className="h-14 w-14 rounded-full bg-neutral-100 dark:bg-neutral-200/10 flex items-center justify-center mb-4 text-neutral-400">
              <Database className="h-7 w-7" />
            </div>
            <h3 className="text-[16px] font-bold text-neutral-900 mb-1">
              No data linked yet
            </h3>
            <p className="text-[13px] text-neutral-400 max-w-[280px] leading-relaxed">
              This number is currently unlisted or has zero active contributing contact uploads.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
