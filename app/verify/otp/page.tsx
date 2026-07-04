"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { ChevronLeft, Lock, Loader2, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import OTPInput from "@/components/OTPInput";
import { useApp } from "@/context/AppContext";

export default function OTPPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { verifyOTP, resendOTP, phoneNumberInput, currentUser } = useApp();

  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  // Auto resend cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;
    resendOTP();
    setCooldown(30);
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otpValues.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await verifyOTP(code);
      if (success) {
        setIsSuccess(true);
        // Delay navigation to let checkmark animation play out
        setTimeout(() => {
          router.push("/profile");
        }, 1200);
      } else {
        setError("That code didn't match. Please try again.");
        setOtpValues(Array(6).fill("")); // Reset inputs
      }
    } catch (err) {
      router.push("/error-state?from=/verify/otp");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger verify automatically when 6 digits are typed
  useEffect(() => {
    if (otpValues.join("").length === 6) {
      handleVerify();
    }
  }, [otpValues]);

  const maskedPhone = () => {
    if (!phoneNumberInput) return "+91 98765 XXXXX";
    const cleaned = phoneNumberInput.replace(/\D/g, "");
    return `+91 ${cleaned.substring(0, 5)} XXXXX`;
  };

  const isButtonDisabled = otpValues.join("").length !== 6;

  // Animation values for the bottom-sheet sliding up on mobile
  const sheetVariants: Variants = {
    hidden: { y: "100%", opacity: prefersReducedMotion ? 1 : 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
      {/* Step Indicator (Desktop only) */}
      <div className="hidden md:flex w-full max-w-[440px] items-center justify-between px-1 mb-2 text-neutral-400 select-none text-[12px] font-bold uppercase tracking-wider">
        <span>Step 2 of 2</span>
        <span>Secure Code Entry</span>
      </div>

      {/* Main card/sheet wrapper */}
      <motion.div
        variants={sheetVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-white dark:bg-neutral-100 shadow-elevation-3 border border-neutral-200/50 dark:border-neutral-200/10 select-none max-h-[85vh] md:max-h-none overflow-y-auto
          /* Mobile Bottom Sheet Styles */
          fixed bottom-0 left-0 right-0 rounded-t-lg p-6 z-30
          /* Desktop Card Styles Override */
          md:relative md:bottom-auto md:left-auto md:right-auto md:rounded-md md:p-8 md:max-w-[440px] md:z-10 md:shadow-elevation-2"
      >
        {/* Drag Handle for Mobile Sheet */}
        <div className="h-1.5 w-12 rounded-full bg-neutral-200 dark:bg-neutral-200/20 mx-auto mb-6 md:hidden" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="otp-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Back Arrow */}
              <Link
                href="/verify"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Link>

              {/* Title */}
              <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
                Enter the code
              </h2>
              <p className="text-[13px] text-neutral-400 leading-relaxed mb-4">
                We've sent a 6-digit code to <strong className="text-neutral-900">{maskedPhone()}</strong>.
              </p>

              {/* OTP Boxes */}
              <OTPInput
                value={otpValues}
                onChange={setOtpValues}
                isError={!!error}
                clearError={() => setError("")}
              />

              {/* Error block */}
              {error && (
                <div className="text-[12px] font-semibold text-danger text-center my-3" aria-live="assertive">
                  {error}
                </div>
              )}

              {/* Cooldown Timer */}
              <div className="text-center text-[13px] text-neutral-400 my-4">
                {cooldown > 0 ? (
                  <span>Resend code in 0:{cooldown < 10 ? `0${cooldown}` : cooldown}</span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-primary hover:text-primary-dark font-semibold focus:outline-none focus:underline"
                  >
                    Resend code
                  </button>
                )}
              </div>

              {/* Lock Indicator */}
              <div className="flex items-center justify-center gap-1.5 text-neutral-400 dark:text-neutral-400 text-[12px] font-medium border-t border-neutral-200 dark:border-neutral-200/10 pt-5 mt-6">
                <Lock className="h-4 w-4 text-success" />
                <span>Secured session • Verification mock is active</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              {/* Checkmark Animation */}
              <div className="h-16 w-16 rounded-full bg-success-light text-success dark:bg-success-light/10 flex items-center justify-center mb-6">
                <motion.svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </motion.svg>
              </div>

              <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
                Number Verified
              </h2>
              <p className="text-[13px] text-neutral-400 max-w-[240px]">
                Loading your Truecaller Identity profile...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Overlay to dim background when mobile bottom sheet is open */}
      <div className="md:hidden fixed inset-0 bg-[#111318]/20 z-20 pointer-events-none" />
    </div>
  );
}
