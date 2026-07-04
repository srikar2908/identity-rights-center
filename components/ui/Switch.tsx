"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}

const Switch = ({ checked, onChange, id, disabled = false }: SwitchProps) => {
  return (
    <button
      type="button"
      id={id}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-200/20"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-elevation-1 ring-0",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default Switch;
