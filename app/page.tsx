"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Eye, ToggleLeft, Shield, AlertTriangle, ArrowRight, UserCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion();
  const [showAccordion, setShowAccordion] = useState(false);

  // Accordion details for "Learn how this works"
  const explainerFAQ = [
    {
      id: "exp_1",
      question: "How does Truecaller get my name if I never signed up?",
      answer:
        "Truecaller relies on crowdsourced contact books. When someone else uploads their contact lists to sync caller ID spam records, your name and phone number might be included, even if you do not use our services.",
    },
    {
      id: "exp_2",
      question: "What is the Identity Rights Center?",
      answer:
        "It is a dedicated, self-serve interface designed to meet data privacy laws (like DPDP Act 2023). It allows any phone number owner to verify their identity via a secure one-time code and choose how their details are listed, corrected, or erased from search results.",
    },
    {
      id: "exp_3",
      question: "What happens if I request erasure?",
      answer:
        "Your number is unlisted and will no longer show a display name in public search results. Note that this may limit spam classification services for calls made to your number, as we can no longer maintain identification status records for it.",
    },
  ];

  // Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center py-12 md:py-24 px-4 select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[720px] w-full flex flex-col items-center text-center gap-8"
      >
        {/* Brand/Product Identity Pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 text-[12px] font-bold uppercase tracking-[0.02em]"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Truecaller Privacy Safeguard</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-[32px] sm:text-[44px] font-bold text-neutral-900 leading-[1.15] tracking-tight max-w-lg"
        >
          Your number.
          <br />
          Your identity. <span className="text-primary">Your control.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-[16px] sm:text-[18px] text-neutral-700 max-w-xl leading-relaxed"
        >
          See what Truecaller knows about your phone number — and decide what happens next. Exercise your data principal rights securely.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link href="/verify/intro" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-8 gap-2 font-semibold">
              <span>Check My Number</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setShowAccordion(!showAccordion)}
            className="w-full sm:w-auto text-[14px]"
          >
            {showAccordion ? "Hide details" : "Learn how this works"}
          </Button>
        </motion.div>

        {/* Accordion Explainer Beat */}
        {showAccordion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full text-left"
          >
            <Accordion items={explainerFAQ} className="mt-4" />
          </motion.div>
        )}

        {/* Onboarding Visual Progress Ribbon */}
        <motion.div
          variants={itemVariants}
          className="w-full border-t border-neutral-200 dark:border-neutral-200/10 pt-10 mt-6"
        >
          <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
            Three Steps to Privacy Rights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="flex flex-col gap-2.5 p-4 rounded-md bg-neutral-100/50 dark:bg-neutral-200/5 border border-neutral-200/10 hover:border-neutral-200 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center font-bold text-[13px]">
                <Shield className="h-4 w-4 stroke-[2px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-neutral-900">
                  1. Secure Verification
                </h4>
                <p className="text-[12px] text-neutral-700 mt-1 leading-normal">
                  Confirm ownership of your phone number using a standard 6-digit OTP code.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2.5 p-4 rounded-md bg-neutral-100/50 dark:bg-neutral-200/5 border border-neutral-200/10 hover:border-neutral-200 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center font-bold text-[13px]">
                <Eye className="h-4 w-4 stroke-[2px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-neutral-900">
                  2. Review Profile
                </h4>
                <p className="text-[12px] text-neutral-700 mt-1 leading-normal">
                  View display name listing entries, spam classifications, and network search stats.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-2.5 p-4 rounded-md bg-neutral-100/50 dark:bg-neutral-200/5 border border-neutral-200/10 hover:border-neutral-200 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center font-bold text-[13px]">
                <ToggleLeft className="h-4 w-4 stroke-[2px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-neutral-900">
                  3. Correct or Erase
                </h4>
                <p className="text-[12px] text-neutral-700 mt-1 leading-normal">
                  Update database records to reflect correct spelling or unlist your number entirely.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
