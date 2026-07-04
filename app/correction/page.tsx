"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";

export default function CorrectionPage() {
  const router = useRouter();
  const {
    currentUser,
    identityProfile,
    submitNameCorrection,
    isFirstSubmission,
    setIsFirstSubmission
  } = useApp();

  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isPageLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isPageLoading]);

  if (!currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter a name with at least 2 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await submitNameCorrection(trimmedName);

      if (isFirstSubmission) {
        setIsFirstSubmission(false);
        router.push("/verify/success?from=correction");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      router.push("/error-state?from=/correction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    if (error) setError("");
  };

  const isButtonDisabled = newName.trim().length < 2;

  return (
    <div className="w-full flex-grow max-w-[480px] mx-auto px-4 py-8 md:py-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2"
      >
        <form onSubmit={handleSubmit}>
          {/* Back Arrow */}
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Cancel</span>
          </Link>

          {/* Title */}
          <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-2">
            Update your display name
          </h2>
          <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
            Correct how your number is identified to callers. Truecaller reviews name updates to prevent abuse.
          </p>

          {isPageLoading ? (
            <div className="flex flex-col gap-4 mb-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-6 mb-6">
              {/* Current Name Card */}
              <div className="p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Current Listed Name
                </span>
                <span className="text-[15px] font-bold text-neutral-700 select-all">
                  {identityProfile.displayName}
                </span>
              </div>

              {/* New Name Input */}
              <Input
                type="text"
                label="Correct Name"
                placeholder="Enter your true display name"
                value={newName}
                onChange={handleNameChange}
                error={error}
                helperText="Reviewed by our Trust & Safety team — not fully automated."
                disabled={isLoading}
                autoFocus
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 justify-end border-t border-neutral-200 dark:border-neutral-200/10 pt-5 mt-6">
            <Link href="/profile">
              <Button
                type="button"
                variant="secondary"
                disabled={isLoading}
                className="h-10 text-[13px]"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              disabled={isButtonDisabled || isLoading}
              isLoading={isLoading}
              loadingText="Submitting…"
              className="h-10 text-[13px] font-semibold gap-1.5"
            >
              <span>Submit for Review</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
