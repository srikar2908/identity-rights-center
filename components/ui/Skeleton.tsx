"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("shimmer rounded bg-neutral-200 dark:bg-neutral-200/20", className)}
      {...props}
    />
  );
};

export default Skeleton;
