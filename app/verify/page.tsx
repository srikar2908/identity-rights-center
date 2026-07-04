"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";

export default function PhoneEntryPage() {
  const router = useRouter();
  const { verifyPhoneNumber } = useApp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clean raw digits, strip leading Indian country code if present, cap at 10
  const sanitizeInput = (val: string) => {
    let digits = val.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.substring(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.substring(1);
    }
    return digits.substring(0, 10);
  };

  // Visually format display digits: e.g. 78945 63210
  const formatDisplayNumber = (rawVal: string) => {
    if (rawVal.length > 5) {
      return `${rawVal.substring(0, 5)} ${rawVal.substring(5)}`;
    }
    return rawVal;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setPhoneNumber(sanitized);
    setError("");
  };

  const validatePhone = (raw: string) => {
    if (raw.length !== 10) {
      setError("Please enter a valid 10-digit number.");
      return false;
    }
    return true;
  };

  const handleBlur = () => {
    if (phoneNumber && !validatePhone(phoneNumber)) {
      // Do nothing, error already set
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneNumber)) return;

    setIsLoading(true);
    try {
      await verifyPhoneNumber(phoneNumber);
      router.push("/verify/otp");
    } catch (err) {
      router.push("/error-state?from=/verify");
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = phoneNumber.length !== 10;

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
      {/* Step Indicator */}
      <div className="w-full max-w-[440px] flex items-center justify-between px-1 mb-2 text-neutral-400 select-none text-[12px] font-bold uppercase tracking-wider">
        <span>Step 1 of 2</span>
        <span>Phone Verification</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-[440px] bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2 select-none"
      >
        <form onSubmit={handleSubmit} noValidate>
          {/* Back Arrow */}
          <Link
            href="/verify/intro"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>

          {/* Title */}
          <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
            Verify your number
          </h2>
          <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
            We'll send a one-time code to confirm this number belongs to you.
          </p>

          {/* Input field */}
          <div className="mb-6">
            <Input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              label="Phone number"
              placeholder="Enter 10-digit mobile number"
              prefixText="+91"
              value={formatDisplayNumber(phoneNumber)}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              error={error}
              autoFocus
              disabled={isLoading}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center font-semibold"
            disabled={isButtonDisabled || isLoading}
            isLoading={isLoading}
            loadingText="Sending…"
          >
            <span>Send Code</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
