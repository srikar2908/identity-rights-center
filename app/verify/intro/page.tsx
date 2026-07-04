"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, KeyRound, Eye, ChevronLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function VerificationIntroPage() {
  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-[440px] bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2 select-none"
      >
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
          Before we check your number
        </h2>
        <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
          Under the DPDP Act, you have the right to request access and corrections. Here is how we verify and handle your data:
        </p>

        {/* Beats */}
        <div className="flex flex-col gap-5 mb-8">
          {/* Beat 1 */}
          <div className="flex gap-4 items-start">
            <div className="h-9 w-9 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center shrink-0">
              <Eye className="h-4.5 w-4.5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-neutral-900">
                Where the data comes from
              </h4>
              <p className="text-[12px] text-neutral-700 mt-0.5 leading-normal">
                Your number may be listed based on how others have saved it in their contacts uploaded to our network.
              </p>
            </div>
          </div>

          {/* Beat 2 */}
          <div className="flex gap-4 items-start">
            <div className="h-9 w-9 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center shrink-0">
              <KeyRound className="h-4.5 w-4.5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-neutral-900">
                Verifying ownership
              </h4>
              <p className="text-[12px] text-neutral-700 mt-0.5 leading-normal">
                We'll verify it's really yours with a secure, temporary one-time passcode.
              </p>
            </div>
          </div>

          {/* Beat 3 */}
          <div className="flex gap-4 items-start">
            <div className="h-9 w-9 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-4.5 w-4.5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-neutral-900">
                Radical compliance
              </h4>
              <p className="text-[12px] text-neutral-700 mt-0.5 leading-normal">
                Any changes you request go through a short review process by our safety team — they are never applied instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-3">
          <Link href="/verify" className="w-full">
            <Button className="w-full justify-center gap-2 font-semibold">
              <span>Continue to Verification</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/verify" className="w-full">
            <Button variant="ghost" className="w-full justify-center text-[13px]">
              Skip introduction
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
