"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, HelpCircle, FileSearch, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import ActivityTimelineItem from "@/components/ActivityTimelineItem";
import Skeleton from "@/components/ui/Skeleton";

export default function ActivityTimelinePage() {
  const router = useRouter();
  const { currentUser, activityTimeline } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  // 400ms skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) return null;

  const hasActivity = activityTimeline.length > 0;

  return (
    <div className="w-full flex-grow max-w-[720px] mx-auto px-4 py-8 select-none">
      {/* Sticky Mini Header for Scrolling Context */}
      <div className="sticky top-0 bg-white/90 dark:bg-neutral-100/90 backdrop-blur-md z-20 flex items-center justify-between py-4 border-b border-neutral-200 dark:border-neutral-200/10 mb-8 transition-colors">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5 stroke-[2px]" />
          <span>Profile</span>
        </Link>
        <h2 className="text-[15px] font-bold text-neutral-900">Your Activity History</h2>
        <div className="w-12 h-4" /> {/* Spacer to center title */}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </motion.div>
        ) : hasActivity ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            {activityTimeline.map((item, index) => (
              <ActivityTimelineItem
                key={item.id}
                item={item}
                showConnector={index < activityTimeline.length - 1}
              />
            ))}
          </motion.div>
        ) : (
          /* Empty State Illustration Block */
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-200/10 flex items-center justify-center mb-6 text-neutral-400">
              <FileSearch className="h-8 w-8" />
            </div>
            <h3 className="text-[18px] font-bold text-neutral-900 mb-1">
              No activity yet
            </h3>
            <p className="text-[13px] text-neutral-400 max-w-[280px] leading-relaxed">
              Once you submit a name correction or erasure request, you'll see its progress here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
