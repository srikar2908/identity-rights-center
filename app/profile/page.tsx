"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trash2,
  FileText,
  HelpCircle,
  ChevronRight,
  Settings,
  X,
  Compass,
  ThumbsUp,
  ThumbsDown,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Database
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Skeleton from "@/components/ui/Skeleton";
import IdentityCard from "@/components/IdentityCard";
import Tooltip from "@/components/ui/Tooltip";

export default function ProfilePage() {
  const router = useRouter();
  const {
    currentUser,
    identityProfile,
    activityTimeline,
    submitErasureRequest,
    isFirstSubmission,
    setIsFirstSubmission,
    addCSATResponse,
    csatResponse
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [isErasureOpen, setIsErasureOpen] = useState(false);
  const [isSubmittingErasure, setIsSubmittingErasure] = useState(false);
  const [isTradeoffExpanded, setIsTradeoffExpanded] = useState(false);
  const [showCoachMark, setShowCoachMark] = useState(true);

  // Skeleton Loader for 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) {
    return (
      <div className="w-full flex-grow flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
    );
  }

  const handleErasureConfirm = async () => {
    setIsSubmittingErasure(true);
    try {
      await submitErasureRequest();
      setIsErasureOpen(false);

      if (isFirstSubmission) {
        setIsFirstSubmission(false);
        router.push("/verify/success?from=erasure");
      }
    } catch (err) {
      router.push("/error-state?from=/profile");
    } finally {
      setIsSubmittingErasure(false);
    }
  };

  // Check if there are active submissions in review
  const hasPendingSubmissions = identityProfile.status === "under_review";
  const hasResolvedSubmissions = identityProfile.status === "resolved";

  // Check if returning user
  const isReturningUser = activityTimeline.length > 3;

  return (
    <div className="w-full flex-grow max-w-[1120px] mx-auto px-4 md:px-6 py-6 md:py-12 select-none">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Side Skeleton */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-[360px] w-full rounded-md" />
            </div>

            {/* Right Side Skeleton */}
            <div className="flex flex-col gap-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-[220px] w-full rounded-md" />
              <Skeleton className="h-[120px] w-full rounded-md" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* MAIN LEFT COLUMN */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Empathetic / Context greetings */}
              <div className="flex flex-col gap-1">
                <h1 className="text-[24px] md:text-[28px] font-bold text-neutral-900 tracking-tight">
                  {isReturningUser ? "Welcome back" : "Review Your Privacy Listing"}
                </h1>
                <p className="text-[14px] text-neutral-700 leading-relaxed">
                  {isReturningUser
                    ? "Monitor your active data correction and erasure tickets below."
                    : "This is your data, presented clearly — take your time."}
                </p>
              </div>

              {/* Elevated Identity Card */}
              <IdentityCard />
            </div>

            {/* SIDEBAR RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Action Buttons Panel */}
              <div className="bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 shadow-elevation-1">
                <h3 className="text-[14px] font-bold text-neutral-400 uppercase tracking-widest mb-4 select-none">
                  Available Rights Actions
                </h3>

                <div className="flex flex-col gap-3 relative">
                  {/* Name correction button */}
                  <Link href="/correction" className="w-full">
                    <Button
                      variant="secondary"
                      className="w-full justify-between"
                      disabled={hasPendingSubmissions}
                    >
                      <span className="flex items-center gap-2">
                        <User className="h-4.5 w-4.5 text-neutral-700" />
                        <span>Edit Listing Name</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-neutral-400" />
                    </Button>
                  </Link>

                  {/* Erasure button */}
                  <div className="relative">
                    <Button
                      variant="destructive"
                      onClick={() => setIsErasureOpen(true)}
                      className="w-full justify-between bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50"
                      disabled={hasPendingSubmissions}
                    >
                      <span className="flex items-center gap-2">
                        <Trash2 className="h-4.5 w-4.5" />
                        <span>Request Erasure</span>
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Coach Mark tooltip */}
                    {showCoachMark && !hasPendingSubmissions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-neutral-900 text-white p-3.5 rounded shadow-elevation-2 border border-neutral-700/50 z-20 flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[12px] font-bold text-primary">
                            Data Portability Right
                          </span>
                          <button
                            onClick={() => setShowCoachMark(false)}
                            className="text-neutral-400 hover:text-white"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] leading-relaxed text-neutral-400">
                          This is always available — nothing is locked behind a paywall or extra steps.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Data transparency panel links */}
              <div className="bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 shadow-elevation-1 flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-neutral-400 uppercase tracking-widest select-none">
                  Data Portability & Info
                </h3>

                <Link
                  href="/profile/sources"
                  className="flex items-center justify-between text-[13px] font-semibold text-neutral-900 hover:text-primary group border-b border-neutral-200 dark:border-neutral-200/10 pb-3"
                >
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-neutral-700" />
                    <span>Where does this come from?</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/profile/download"
                  className="flex items-center justify-between text-[13px] font-semibold text-neutral-900 hover:text-primary group border-b border-neutral-200 dark:border-neutral-200/10 pb-3"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-neutral-700" />
                    <span>Download copy of data</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center justify-between text-[13px] font-semibold text-neutral-900 hover:text-primary group border-b border-neutral-200 dark:border-neutral-200/10 pb-3"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-neutral-700" />
                    <span>Portal Settings</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/activity"
                  className="flex items-center justify-between text-[13px] font-semibold text-neutral-900 hover:text-primary group"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-neutral-700" />
                    <span>View Activity Timeline</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* CSAT Micro Survey Panel (Shows after any resolution or if user wants to rate) */}
              {(hasResolvedSubmissions || csatResponse) && (
                <div className="bg-neutral-100/50 dark:bg-neutral-200/5 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-5 shadow-elevation-1">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Help Desk Feedback
                  </span>
                  <h4 className="text-[13px] font-semibold text-neutral-900 mb-3">
                    Was this rights lookup clear and helpful?
                  </h4>

                  {!csatResponse ? (
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        onClick={() => addCSATResponse("positive")}
                        className="flex-grow flex items-center justify-center gap-1.5 h-9 text-[12px] py-0"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>Yes</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => addCSATResponse("negative")}
                        className="flex-grow flex items-center justify-center gap-1.5 h-9 text-[12px] py-0"
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span>No</span>
                      </Button>
                    </div>
                  ) : (
                    <span className="text-[12px] text-neutral-400 italic">
                      ✓ Thank you for your feedback!
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* CONFIRM ERASURE MODAL DIALOG */}
            <Dialog
              isOpen={isErasureOpen}
              onClose={() => setIsErasureOpen(false)}
              title="Request to remove your number?"
              description="Under DPDP Act 2023, you can request unlisting."
            >
              <div className="flex flex-col gap-4 select-none">
                <p className="text-[13.5px] text-neutral-700 leading-relaxed">
                  This will queue your phone number for unlisting. It will remove your display name and tag listings from public searches.
                </p>

                {/* Progressive disclosure details */}
                <div className="border border-neutral-200 dark:border-neutral-200/10 rounded-sm">
                  <button
                    onClick={() => setIsTradeoffExpanded(!isTradeoffExpanded)}
                    className="w-full flex items-center justify-between text-left p-3.5 text-[13px] font-bold text-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    <span>What does this mean for call protection?</span>
                    <span className="text-neutral-400">{isTradeoffExpanded ? "Collapse" : "Expand"}</span>
                  </button>
                  {isTradeoffExpanded && (
                    <div className="p-3.5 pt-0 border-t border-neutral-200 dark:border-neutral-200/10 text-[12px] text-neutral-700 bg-neutral-100/50 dark:bg-neutral-200/5 flex flex-col gap-2">
                      <p>
                        This will remove spam labels and identification details. Calls made to your number may see reduced spam classification accuracy because we can no longer maintain historical identification stats for it.
                      </p>
                      <div className="flex items-center gap-1.5 text-neutral-400 mt-1">
                        <Info className="h-3.5 w-3.5 shrink-0" />
                        <span>Human-reviewed by our Trust & Safety team. SLA: 3–5 business days.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal actions */}
                <div className="flex gap-3 justify-end border-t border-neutral-200 dark:border-neutral-200/10 pt-4 mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsErasureOpen(false)}
                    disabled={isSubmittingErasure}
                    className="h-10 text-[13px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleErasureConfirm}
                    disabled={isSubmittingErasure}
                    isLoading={isSubmittingErasure}
                    loadingText="Requesting…"
                    className="h-10 text-[13px] bg-red-600 hover:bg-red-700"
                  >
                    Request Erasure
                  </Button>
                </div>
              </div>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
