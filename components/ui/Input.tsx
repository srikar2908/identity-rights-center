"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, prefixText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-400 uppercase tracking-[0.02em] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixText && (
            <span className="absolute left-4 text-neutral-400 font-medium select-none text-[15px]">
              {prefixText}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-sm border border-neutral-200 bg-white dark:bg-neutral-100 px-4 text-[15px] transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-40",
              prefixText ? "pl-12" : "pl-4",
              error ? "border-danger focus:ring-danger/20 focus:border-danger" : "",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error ? (
          <span className="flex items-center gap-1 text-[12px] font-medium text-danger mt-0.5" aria-live="polite">
            <AlertCircle className="h-3.5 w-3.5 stroke-[2px]" />
            {error}
          </span>
        ) : helperText ? (
          <span className="text-[12px] text-neutral-400 mt-0.5">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
