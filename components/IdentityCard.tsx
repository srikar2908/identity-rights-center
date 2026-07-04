"use client";

import React, { useEffect, useState } from "react";
import { useApp, IdentityProfile } from "@/context/AppContext";
import Badge from "./ui/Badge";
import Tooltip from "./ui/Tooltip";
import { Calendar, Users, Eye, HelpCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const IdentityCard = () => {
  const { identityProfile } = useApp();
  const [count, setCount] = useState(0);

  const targetLookupVal = identityProfile.timesLookedUp;

  // Animated Count-Up on Mount
  useEffect(() => {
    let start = 0;
    const duration = 750; // ms
    const startTime = performance.now();

    const animateCount = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out quad formula
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * targetLookupVal);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetLookupVal);
      }
    };

    requestAnimationFrame(animateCount);
  }, [targetLookupVal]);

  const spamTooltipText = "This score reflects how often this number has been reported by other users.";
  const lookupTooltipText = "An approximate count of how often your number has been searched or identified.";
  const sourceTooltipText = "This count refers to anonymized contact-book uploads from other users. Truecaller does not store raw contact books for directories, and never reveals the identity of individual uploaders.";

  // Determine spam status type
  const getSpamBadgeStatus = (level: string) => {
    if (level === "safe") return "safe" as const;
    if (level === "warning") return "warning" as const;
    if (level === "danger") return "danger" as const;
    return "unknown" as const;
  };

  return (
    <div className="bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-2 transition-all">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-200/10">
          <div>
            <h2 className="text-[20px] font-bold text-neutral-900 leading-tight">
              Your Identity Profile
            </h2>
            <p className="text-[13px] text-neutral-400 mt-1.5">
              This is based on how your number has been saved and tagged across the Truecaller network.
            </p>
          </div>
          {identityProfile.status !== "none" && (
            <Badge status={identityProfile.status} className="self-start sm:self-center" />
          )}
        </div>

        {/* Profile Identity Details */}
        <div className="flex flex-col gap-5">
          {/* Display Name */}
          <div>
            <span className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-400 uppercase tracking-[0.02em] select-none block mb-1">
              Display Name
            </span>
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  "text-[22px] font-bold text-neutral-900 tracking-tight transition-all",
                  identityProfile.pendingDisplayName ? "italic text-neutral-400" : ""
                )}
              >
                {identityProfile.displayName}
              </span>
              {identityProfile.pendingDisplayName && (
                <div className="flex items-center gap-1.5 mt-0.5 text-neutral-400">
                  <span className="text-[12px] font-medium italic">
                    Change pending review to:{" "}
                    <strong className="text-neutral-700 dark:text-neutral-400 not-italic">
                      "{identityProfile.pendingDisplayName}"
                    </strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Badge & Phone Number */}
          <div>
            <span className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-400 uppercase tracking-[0.02em] select-none block mb-1">
              Phone Number
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-neutral-900 tracking-wide">
                +91 98765 XXXXX
              </span>
              {identityProfile.isVerifiedBadgeVisible && (
                <span className="inline-flex items-center gap-1 bg-success-light text-success dark:bg-success-light/10 text-[11px] font-bold px-2 py-0.5 rounded-full select-none">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-neutral-200 dark:bg-neutral-200/10" />

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {/* Times Looked Up */}
          <div className="bg-neutral-100/50 dark:bg-neutral-200/5 p-4 rounded-md border border-neutral-200/10">
            <div className="flex items-center gap-1 select-none mb-1 text-neutral-400">
              <span className="text-[12px] font-semibold uppercase tracking-[0.02em]">
                Times Looked Up
              </span>
              <Tooltip content={lookupTooltipText}>
                <HelpCircle className="h-3.5 w-3.5 hover:text-neutral-700 transition-colors" />
              </Tooltip>
            </div>
            <div className="text-[28px] font-bold text-neutral-900 leading-none py-1">
              {count}
            </div>
            <span className="text-[11px] text-neutral-400 block mt-1">
              Searched by others
            </span>
          </div>

          {/* Spam Score Classification */}
          <div className="bg-neutral-100/50 dark:bg-neutral-200/5 p-4 rounded-md border border-neutral-200/10">
            <div className="flex items-center gap-1 select-none mb-2 text-neutral-400">
              <span className="text-[12px] font-semibold uppercase tracking-[0.02em]">
                Spam Classification
              </span>
              <Tooltip content={spamTooltipText}>
                <HelpCircle className="h-3.5 w-3.5 hover:text-neutral-700 transition-colors" />
              </Tooltip>
            </div>
            <div className="py-1">
              <Badge
                status={getSpamBadgeStatus(identityProfile.spamScore.level)}
                label={identityProfile.spamScore.label}
              />
            </div>
            <span className="text-[11px] text-neutral-400 block mt-1.5">
              {identityProfile.spamScore.reportCount} spam reports
            </span>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="flex flex-col gap-3 text-[13px] border-t border-neutral-200 dark:border-neutral-200/10 pt-5 text-neutral-400">
          {/* Source Count */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>Database Sources</span>
              <Tooltip content={sourceTooltipText}>
                <HelpCircle className="h-3.5 w-3.5 hover:text-neutral-700 transition-colors" />
              </Tooltip>
            </span>
            <span className="font-semibold text-neutral-900">
              {identityProfile.sourceCount} contact listings
            </span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Last Network Sync</span>
            </span>
            <span className="font-medium text-neutral-900">
              {new Date(identityProfile.lastUpdated).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
