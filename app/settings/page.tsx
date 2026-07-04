"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Sun, Moon, BellRing } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Switch from "@/components/ui/Switch";
import Skeleton from "@/components/ui/Skeleton";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, settings, setDarkMode, setSmsNotifications } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Protect route
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading]);

  if (!currentUser) return null;

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
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Profile</span>
        </Link>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-neutral-900 leading-snug tracking-tight mb-1">
          Portal Settings
        </h2>
        <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
          Configure security, notifications, and portal display appearance.
        </p>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Setting 1: Dark Mode */}
            <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
              <div className="flex items-center gap-3">
                {settings.darkModeEnabled ? (
                  <Moon className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <Sun className="h-5 w-5 text-primary shrink-0" />
                )}
                <div>
                  <h4 className="text-[14px] font-bold text-neutral-900">Dark Mode</h4>
                  <p className="text-[12px] text-neutral-400">Toggle dark color themes for this session.</p>
                </div>
              </div>
              <Switch checked={settings.darkModeEnabled} onChange={setDarkMode} />
            </div>

            {/* Setting 2: SMS Notifications */}
            <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-200/10 rounded-sm bg-neutral-100/30 dark:bg-neutral-200/5">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h4 className="text-[14px] font-bold text-neutral-900">SMS Alerts</h4>
                  <p className="text-[12px] text-neutral-400">Receive an SMS when your listing updates approve.</p>
                </div>
              </div>
              <Switch checked={settings.smsNotificationsEnabled} onChange={setSmsNotifications} />
            </div>

            {/* Note */}
            <p className="text-[11px] text-neutral-400 leading-normal text-center italic mt-2">
              Settings configured here are saved locally and apply only to your active browser session.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
