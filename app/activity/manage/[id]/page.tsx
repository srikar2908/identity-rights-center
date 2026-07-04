"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Info, Calendar, FileText, XCircle, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";

interface ManageRequestPageProps {
  params: Promise<{ id: string }>;
}

export default function ManageRequestPage({ params }: ManageRequestPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { currentUser, activityTimeline, cancelPendingRequest } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) return null;

  const requestItem = activityTimeline.find((item) => item.id === id);

  const handleCancelRequest = async () => {
    if (!requestItem) return;
    setIsCancelling(true);
    try {
      await cancelPendingRequest(requestItem.id);
      router.push("/activity");
    } catch (err) {
      router.push("/error-state?from=/activity/manage/" + id);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!isLoading && !requestItem) {
    return (
      <div className="w-full flex-grow max-w-[540px] mx-auto px-4 py-16 text-center">
        <h2 className="text-[20px] font-bold text-neutral-900 mb-2">Request Not Found</h2>
        <p className="text-[13px] text-neutral-400 mb-6">
          The requested ticket details are no longer available in this session.
        </p>
        <Link href="/activity">
          <Button variant="secondary">Back to Timeline</Button>
        </Link>
      </div>
    );
  }

  // Stepper state calculations
  const isSubmitted = !!requestItem;
  const isUnderReview = requestItem?.status === "under_review" || requestItem?.status === "resolved";
  const isResolved = requestItem?.status === "resolved";
  const isCancelled = requestItem?.status === "cancelled";

  return (
    <div className="w-full flex-grow max-w-[540px] mx-auto px-4 py-8 md:py-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-1"
      >
        {/* Back Link */}
        <Link
          href="/activity"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Activity</span>
        </Link>

        {isLoading ? (
          <div className="flex flex-col gap-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-[200px] w-full rounded-md" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Title / Header */}
            <div>
              <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-1">
                Manage Request
              </h2>
              <span className="text-[12px] text-neutral-400">
                Ticket ID: {requestItem?.id}
              </span>
            </div>

            {/* Stepper block */}
            {!isCancelled ? (
              <div className="border border-neutral-200 dark:border-neutral-200/10 rounded-sm p-5 bg-neutral-100/30 dark:bg-neutral-200/5">
                <h3 className="text-[12.5px] font-bold text-neutral-400 uppercase tracking-widest mb-6 select-none">
                  Request Stepper Status
                </h3>

                <div className="flex flex-col gap-8 relative pl-6">
                  {/* Vertical Progress Line (Fills dynamically) */}
                  <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-neutral-200 dark:bg-neutral-200/20">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: isResolved ? "100%" : isUnderReview ? "50%" : "0%",
                      }}
                      transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                      className="w-full bg-primary"
                    />
                  </div>

                  {/* Step 1: Submitted */}
                  <div className="flex gap-4 relative">
                    <div className="absolute -left-[23px] h-4.5 w-4.5 rounded-full bg-primary flex items-center justify-center border-2 border-white dark:border-neutral-100 shadow-elevation-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-neutral-900 leading-none">
                        Submitted for Review
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Request logged in queue. Protected session hashed.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className="flex gap-4 relative">
                    <div
                      className={`absolute -left-[23px] h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-100 shadow-elevation-1 transition-colors duration-300 ${
                        isUnderReview ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-200/20"
                      }`}
                    >
                      {isUnderReview && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <h4
                        className={`text-[13.5px] font-bold leading-none transition-colors duration-300 ${
                          isUnderReview ? "text-neutral-900" : "text-neutral-400"
                        }`}
                      >
                        Under Active Review
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Reviewed by our Trust & Safety team to prevent malicious takeovers.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Resolved */}
                  <div className="flex gap-4 relative">
                    <div
                      className={`absolute -left-[23px] h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-100 shadow-elevation-1 transition-colors duration-300 ${
                        isResolved ? "bg-success" : "bg-neutral-200 dark:bg-neutral-200/20"
                      }`}
                    >
                      {isResolved && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <h4
                        className={`text-[13.5px] font-bold leading-none transition-colors duration-300 ${
                          isResolved ? "text-neutral-900" : "text-neutral-400"
                        }`}
                      >
                        Resolved & Applied
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Changes propagated across the public search caller ID network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Cancelled Indicator Card */
              <div className="flex gap-3 items-start border border-neutral-200 dark:border-neutral-200/10 rounded-sm p-4 bg-neutral-100/30 dark:bg-neutral-200/5 text-neutral-400">
                <XCircle className="h-5 w-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col gap-1 text-[13px]">
                  <h4 className="font-bold text-neutral-700 dark:text-neutral-400">Ticket Cancelled</h4>
                  <p className="text-[12px]">
                    This request was cancelled before resolution and is no longer pending action.
                  </p>
                </div>
              </div>
            )}

            {/* Request Info card */}
            <div className="flex flex-col gap-3.5 text-[13.5px] border-t border-neutral-200 dark:border-neutral-200/10 pt-5 text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-400">Request Type:</span>
                <span className="font-semibold capitalize text-neutral-900">{requestItem?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Ticket SLA:</span>
                <span className="font-medium text-neutral-900">3–5 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Submission Date:</span>
                <span className="font-medium text-neutral-900">
                  {requestItem &&
                    new Date(requestItem.timestamp).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>
            </div>

            {/* Cancellation action CTA (only if under review) */}
            {requestItem?.status === "under_review" && (
              <div className="flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-200/10 pt-5 mt-2">
                <Button
                  variant="destructive"
                  onClick={handleCancelRequest}
                  disabled={isCancelling}
                  isLoading={isCancelling}
                  loadingText="Cancelling…"
                  className="w-full justify-center gap-1.5 h-10 text-[13px] bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50"
                >
                  <XCircle className="h-4.5 w-4.5" />
                  <span>Cancel Active Request</span>
                </Button>
                <p className="text-[11px] text-neutral-400 text-center leading-normal">
                  Cancelling will immediately halt the Trust & Safety review queue and revert settings.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
