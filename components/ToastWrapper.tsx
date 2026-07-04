"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Toast from "./ui/Toast";

const ToastWrapper = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  return (
    <Toast
      isOpen={!!toast}
      message={toast.message}
      type={toast.type}
      onClose={dismissToast}
      onUndo={toast.onUndo}
      undoCountdown={toast.undoCountdown}
    />
  );
};

export default ToastWrapper;
