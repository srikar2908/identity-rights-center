"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  onUndo?: () => void;
  undoCountdown?: number;
}

const Toast = ({ isOpen, message, type, onClose, onUndo, undoCountdown }: ToastProps) => {
  const iconConfig = {
    success: { icon: CheckCircle2, color: "text-success" },
    error: { icon: AlertCircle, color: "text-danger" },
    info: { icon: Info, color: "text-primary" },
  };

  const currentIcon = iconConfig[type] || iconConfig.info;
  const Icon = currentIcon.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.35 }}
          role="alert"
          aria-live="polite"
          className={cn(
            "fixed z-50 flex items-center justify-between gap-4 p-4 rounded-md shadow-elevation-2 border border-neutral-200/50 dark:border-neutral-200/10",
            "bg-white dark:bg-neutral-100 text-neutral-900",
            "bottom-6 right-6 left-6 md:left-auto md:w-auto md:max-w-md"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className={cn("h-5 w-5 shrink-0 stroke-[2px]", currentIcon.color)} />
            <p className="text-[14px] font-medium leading-tight">{message}</p>
          </div>

          <div className="flex items-center gap-2">
            {onUndo && undoCountdown !== undefined && (
              <button
                onClick={onUndo}
                className="text-[13px] font-semibold text-primary hover:text-primary-dark underline focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 select-none shrink-0"
              >
                Undo ({undoCountdown}s)
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close notification"
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-200/50 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
