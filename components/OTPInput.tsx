"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  isError: boolean;
  clearError: () => void;
}

const OTPInput = ({ value, onChange, isError, clearError }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const controls = useAnimation();

  // Trigger shake animation when error is detected
  useEffect(() => {
    if (isError) {
      controls.start({
        x: [0, -8, 8, -8, 8, -4, 4, 0],
        transition: { duration: 0.4 },
      });
    }
  }, [isError, controls]);

  // Focus the first box on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, eVal: string) => {
    const numericVal = eVal.replace(/[^0-9]/g, "");
    if (!numericVal) {
      // Clear current cell
      const newOtp = [...value];
      newOtp[index] = "";
      onChange(newOtp);
      return;
    }

    clearError();
    const newOtp = [...value];
    newOtp[index] = numericVal.substring(numericVal.length - 1); // Take last digit
    onChange(newOtp);

    // Auto-advance focus to next cell if digit was entered
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      clearError();
      const newOtp = [...value];
      
      // If current cell has a digit, clear it
      if (newOtp[index]) {
        newOtp[index] = "";
        onChange(newOtp);
      } else if (index > 0) {
        // If current cell is empty, clear previous cell and focus it
        newOtp[index - 1] = "";
        onChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearError();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return; // Only process clean 6-digit numbers

    const digits = pastedData.split("");
    onChange(digits);
    
    // Focus the last input box
    inputRefs.current[5]?.focus();
  };

  return (
    <motion.div animate={controls} className="w-full flex justify-between gap-2 max-w-sm mx-auto my-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-14 md:w-14 md:h-16 text-center text-[22px] font-bold rounded-sm border bg-white dark:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            isError ? "border-danger text-danger focus:ring-danger/20 focus:border-danger animate-pulse-fast" : "border-neutral-200 text-neutral-900"
          )}
        />
      ))}
    </motion.div>
  );
};

export default OTPInput;
