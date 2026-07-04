"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, FileJson, FileText, Download } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

export default function DataDownloadPage() {
  const router = useRouter();
  const { currentUser, identityProfile } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [downloadRequested, setDownloadRequested] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) return null;

  const handleRequestDownload = () => {
    setDownloadRequested(true);
  };

  return (
    <div className="w-full flex-grow max-w-[540px] mx-auto px-4 py-8 md:py-16 select-none">
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
          Download Your Data
        </h2>
        <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
          Request a secure copy of all historical identity index records associated with your number.
        </p>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : !downloadRequested ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {/* Option 1: JSON */}
              <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
                <div className="flex items-center gap-3">
                  <FileJson className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h4 className="text-[14px] font-bold text-neutral-900">Machine Readable (JSON)</h4>
                    <p className="text-[12px] text-neutral-400">Structured data format, suitable for porting.</p>
                  </div>
                </div>
                <span className="text-[12px] font-bold text-neutral-400">JSON</span>
              </div>

              {/* Option 2: PDF */}
              <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h4 className="text-[14px] font-bold text-neutral-900">Readable Report (PDF)</h4>
                    <p className="text-[12px] text-neutral-400">A clean, formatted overview of search stats.</p>
                  </div>
                </div>
                <span className="text-[12px] font-bold text-neutral-400">PDF</span>
              </div>
            </div>

            {/* Explainer / Warning */}
            <p className="text-[12px] text-neutral-400 leading-relaxed bg-neutral-100 dark:bg-neutral-200/10 p-3.5 rounded-sm">
              We compile your request across active directory segments. The download package compiles Display Name history, contributing uploads count, and lookups indexes.
            </p>

            {/* Download CTA */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleRequestDownload}
                className="w-full justify-center gap-2 font-semibold"
              >
                <Download className="h-4.5 w-4.5" />
                <span>Request Download Bundle</span>
              </Button>
              <p className="text-[11px] text-neutral-400 text-center leading-normal mt-1">
                We'll email this data bundle to your verified number's linked contact record or dispatch a secure link via SMS.
              </p>
            </div>
          </div>
        ) : (
          /* Success Request Interstitial */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center select-none"
          >
            <div className="h-14 w-14 rounded-full bg-success-light text-success dark:bg-success-light/10 flex items-center justify-center mb-4">
              <Download className="h-7 w-7" />
            </div>
            <h3 className="text-[16px] font-bold text-neutral-900 mb-1">
              Data Bundle Requested
            </h3>
            <p className="text-[13px] text-neutral-400 max-w-[280px] leading-relaxed mb-6">
              Your request has been queued. We are packaging your identity profile data. You will receive an SMS containing a secure download link shortly.
            </p>
            <Button
              variant="secondary"
              onClick={() => setDownloadRequested(false)}
              className="px-6"
            >
              Request another copy
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
