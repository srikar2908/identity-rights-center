"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clock, Eye, Check, AlertCircle, HelpCircle, XCircle } from "lucide-react";

export type BadgeStatus =
  | "pending"
  | "under_review"
  | "resolved"
  | "cancelled"
  | "safe"
  | "warning"
  | "danger"
  | "unknown";

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const Badge = ({ status, label, className }: BadgeProps) => {
  const config: Record<BadgeStatus, { bg: string; text: string; icon: React.ComponentType<any>; defaultLabel: string }> = {
    pending: {
      bg: "bg-warning-light text-warning dark:bg-warning-light/10 dark:text-warning",
      text: "text-warning",
      icon: Clock,
      defaultLabel: "Pending",
    },
    under_review: {
      bg: "bg-warning-light text-warning dark:bg-warning-light/10 dark:text-warning",
      text: "text-warning",
      icon: Eye,
      defaultLabel: "Under Review",
    },
    resolved: {
      bg: "bg-success-light text-success dark:bg-success-light/10 dark:text-success",
      text: "text-success",
      icon: Check,
      defaultLabel: "Resolved",
    },
    cancelled: {
      bg: "bg-neutral-100 text-neutral-700 dark:bg-neutral-200/10 dark:text-neutral-400",
      text: "text-neutral-700 dark:text-neutral-400",
      icon: XCircle,
      defaultLabel: "Cancelled",
    },
    safe: {
      bg: "bg-success-light text-success dark:bg-success-light/10 dark:text-success",
      text: "text-success",
      icon: Check,
      defaultLabel: "Not Spam",
    },
    warning: {
      bg: "bg-warning-light text-warning dark:bg-warning-light/10 dark:text-warning",
      text: "text-warning",
      icon: Clock,
      defaultLabel: "Attention Needed",
    },
    danger: {
      bg: "bg-danger-light text-danger dark:bg-danger-light/10 dark:text-danger",
      text: "text-danger",
      icon: AlertCircle,
      defaultLabel: "Spam / Danger",
    },
    unknown: {
      bg: "bg-neutral-100 text-neutral-700 dark:bg-neutral-200/10 dark:text-neutral-400",
      text: "text-neutral-700 dark:text-neutral-400",
      icon: HelpCircle,
      defaultLabel: "No Classification",
    },
  };

  const current = config[status] || config.unknown;
  const Icon = current.icon;
  const badgeLabel = label || current.defaultLabel;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.02em] select-none border border-transparent transition-all duration-300",
        current.bg,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 stroke-[2.25px]" aria-hidden="true" />
      <span>{badgeLabel}</span>
    </span>
  );
};

export default Badge;
