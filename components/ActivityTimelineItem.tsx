"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Trash2, Key, Info, ChevronRight } from "lucide-react";
import Badge, { BadgeStatus } from "./ui/Badge";
import { ActivityTimelineItem as TimelineItemType } from "@/context/AppContext";

interface ActivityTimelineItemProps {
  item: TimelineItemType;
  showConnector: boolean;
}

const ActivityTimelineItem = ({ item, showConnector }: ActivityTimelineItemProps) => {
  const iconConfig = {
    correction: { icon: UserCheck, bg: "bg-primary-light text-primary" },
    erasure: { icon: Trash2, bg: "bg-danger-light text-danger" },
    verification: { icon: Key, bg: "bg-success-light text-success" },
    system: { icon: Info, bg: "bg-neutral-100 text-neutral-400 dark:bg-neutral-200/10" },
  };

  const currentIcon = iconConfig[item.type] || iconConfig.system;
  const Icon = currentIcon.icon;

  const isPending = item.status === "under_review";

  const formattedDate = new Date(item.timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getBadgeStatus = (status: string): BadgeStatus => {
    if (status === "resolved") return "resolved";
    if (status === "cancelled") return "cancelled";
    return "under_review";
  };

  return (
    <div className="flex gap-4 relative">
      {/* Icon & Connector line */}
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentIcon.bg} z-10 border border-neutral-200/20 shadow-elevation-1`}>
          <Icon className="h-5 w-5 stroke-[1.75px]" />
        </div>
        {showConnector && (
          <div className="w-[1.5px] bg-neutral-200 dark:bg-neutral-200/10 grow min-h-[40px] my-1" />
        )}
      </div>

      {/* Item Body Card */}
      <div className="grow pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 shadow-elevation-1 hover:shadow-elevation-2 hover:border-neutral-200 transition-all">
          <div className="flex flex-col gap-1.5 grow">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[14px] font-bold text-neutral-900 leading-snug">
                {item.description}
              </span>
              <Badge status={getBadgeStatus(item.status)} />
            </div>
            <span className="text-[12px] text-neutral-400">
              {formattedDate}
            </span>
          </div>

          {/* Action Trigger Link for Pending Submissions */}
          {isPending && (
            <Link
              href={`/activity/manage/${item.id}`}
              className="inline-flex items-center gap-1.5 self-start sm:self-center text-[13px] font-semibold text-primary hover:text-primary-dark select-none mt-2 sm:mt-0"
            >
              <span>Manage Request</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelineItem;
