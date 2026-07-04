"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Info, Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

function ExpectationSettingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "submission";

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full max-w-[440px] bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2 select-none text-center"
      >
        {/* Verification Icon */}
        <div className="h-14 w-14 rounded-full bg-success-light text-success dark:bg-success-light/10 flex items-center justify-center mx-auto mb-6">
          <Clock className="h-7 w-7 stroke-[2.25px] animate-pulse-slow" />
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
          Here's what happens next
        </h2>
        <p className="text-[13.5px] text-neutral-700 leading-relaxed mb-6">
          Your {from === "erasure" ? "erasure request" : "name correction"} has been received and logged in our system.
        </p>

        {/* Steps Info block */}
        <div className="flex flex-col gap-4 text-left border-t border-b border-neutral-200 dark:border-neutral-200/10 py-5 my-6 text-[13px] text-neutral-700">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-success shrink-0 stroke-[2px]" />
            <div>
              <h4 className="font-bold text-neutral-900">Safety Review</h4>
              <p className="text-[12px] text-neutral-400 mt-0.5 leading-normal">
                Most requests are reviewed by our Trust & Safety team within <strong className="text-neutral-700">3–5 business days</strong> to prevent spoofing.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-success shrink-0 stroke-[2px]" />
            <div>
              <h4 className="font-bold text-neutral-900">Timeline Tracking</h4>
              <p className="text-[12px] text-neutral-400 mt-0.5 leading-normal">
                You'll see real-time status updates right here in your Activity Timeline. There is no need to check anywhere else.
              </p>
            </div>
          </div>
        </div>

        {/* Continue trigger */}
        <Link href="/profile">
          <Button className="w-full justify-center gap-2 font-semibold">
            <span>Go to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ExpectationSettingPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex-grow flex items-center justify-center p-6">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    }>
      <ExpectationSettingContent />
    </Suspense>
  );
}
