"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Settings, RefreshCw, CheckCircle, WifiOff, Sun, Moon } from "lucide-react";
import Button from "./ui/Button";

const DevPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentUser,
    identityProfile,
    settings,
    setDarkMode,
    devSettings,
    updateDevSettings,
    simulateResolution,
    resetAllState,
  } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-4 w-72 shadow-elevation-3 text-neutral-900 select-none">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-200/10 pb-2 mb-3">
            <span className="text-[13px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Simulated Admin Controls
            </span>
            <Button
              variant="ghost"
              className="p-1 h-auto"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* Status Information */}
            <div className="text-[12px] bg-neutral-100 dark:bg-neutral-200/10 p-2 rounded flex flex-col gap-1">
              <div>
                <span className="font-semibold">User:</span>{" "}
                {currentUser ? `${currentUser.phoneNumber} (Verified)` : "Anonymous Non-User"}
              </div>
              <div>
                <span className="font-semibold">Profile Name:</span>{" "}
                {identityProfile.displayName}
              </div>
              <div>
                <span className="font-semibold">Review Status:</span>{" "}
                <span className="capitalize font-medium text-primary">
                  {identityProfile.status}
                </span>
              </div>
            </div>

            {/* Resolve Pending Button */}
            <div>
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2 h-9 text-[13px]"
                disabled={identityProfile.status !== "under_review"}
                onClick={simulateResolution}
              >
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Resolve Pending Request</span>
              </Button>
              {identityProfile.status !== "under_review" && (
                <p className="text-[11px] text-neutral-400 text-center mt-1">
                  (Submit a request to enable resolution simulation)
                </p>
              )}
            </div>

            {/* Toggle Error Mode */}
            <label className="flex items-center justify-between text-[13px] cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-200/20 p-1.5 rounded transition-colors">
              <span className="flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-danger" />
                <span>Simulate Network Failure</span>
              </span>
              <input
                type="checkbox"
                checked={devSettings.forceNetworkError}
                onChange={(e) =>
                  updateDevSettings({ forceNetworkError: e.target.checked })
                }
                className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4"
              />
            </label>

            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-200/10 pt-3">
              <span className="text-[13px] font-medium">Appearance</span>
              <Button
                variant="secondary"
                className="h-8 px-3 text-[12px] flex items-center gap-1.5"
                onClick={() => setDarkMode(!settings.darkModeEnabled)}
              >
                {settings.darkModeEnabled ? (
                  <>
                    <Sun className="h-3.5 w-3.5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </Button>
            </div>

            {/* Reset State */}
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 h-9 text-[13px] bg-red-600 hover:bg-red-700 mt-1"
              onClick={resetAllState}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Prototype Data</span>
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Developer controls"
        className="flex items-center justify-center h-12 w-12 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-elevation-2 border border-neutral-200/20"
      >
        <Settings className="h-5 w-5 animate-spin-slow" />
      </button>
    </div>
  );
};

export default DevPanel;
