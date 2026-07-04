"use client";

import React, { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface ErrorStatePageProps {
  searchParams: Promise<{ from?: string }>;
}

export default function ErrorStatePage({ searchParams }: ErrorStatePageProps) {
  const router = useRouter();
  const { from } = use(searchParams);
  const redirectPath = from || "/profile";

  const handleRetry = () => {
    router.push(redirectPath);
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full max-w-[440px] bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2 select-none text-center"
      >
        {/* Error icon */}
        <div className="h-14 w-14 rounded-full bg-danger-light text-danger dark:bg-danger-light/10 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-7 w-7 stroke-[2px] animate-bounce-slow" />
        </div>

        {/* Headline */}
        <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
          Something didn't go through
        </h2>
        <p className="text-[13.5px] text-neutral-400 leading-relaxed mb-6">
          Nothing has changed — you can try again. The simulated developer offline/failure setting is currently enabled.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleRetry}
            className="w-full justify-center gap-2 font-semibold"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Connection</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="w-full justify-center text-[13px]"
          >
            Return to Landing
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
