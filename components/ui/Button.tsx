"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      isLoading = false,
      loadingText,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-40 select-none h-11 px-5 rounded-md text-[14px]";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-elevation-1",
      secondary:
        "bg-white dark:bg-neutral-100 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-200 active:bg-neutral-200 dark:active:bg-neutral-200 shadow-elevation-1",
      destructive:
        "bg-danger text-white hover:bg-red-700 active:bg-red-800 shadow-elevation-1 focus:ring-danger",
      ghost:
        "bg-transparent text-primary hover:bg-primary-light active:bg-primary-light px-3 h-auto focus:ring-offset-0",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={prefersReducedMotion || disabled || isLoading ? undefined : { scale: 0.98 }}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        )}
        <span className="flex items-center gap-2">
          {isLoading && loadingText ? loadingText : children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
