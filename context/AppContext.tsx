"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import mockData from "@/data/mock.json";

export interface User {
  id: string;
  phoneNumber: string;
  maskedPhoneNumber: string;
  isVerified: boolean;
}

export interface SpamScore {
  label: string;
  level: "safe" | "warning" | "danger" | "unknown";
  reportCount: number;
  hasSufficientData: boolean;
}

export interface IdentityProfile {
  userId: string;
  displayName: string;
  pendingDisplayName: string | null;
  spamScore: SpamScore;
  timesLookedUp: number;
  lastUpdated: string;
  consentStatus: string;
  status: "none" | "under_review" | "resolved";
  sourceCount: number;
  isVerifiedBadgeVisible: boolean;
}

export interface ActivityTimelineItem {
  id: string;
  type: "correction" | "erasure" | "verification" | "system";
  description: string;
  status: "pending" | "under_review" | "resolved" | "cancelled";
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  onUndo?: () => void;
  undoCountdown?: number;
}

export interface DevSettings {
  forceNetworkError: boolean;
  autoResolveRequests: boolean;
}

interface AppContextType {
  currentUser: User | null;
  phoneNumberInput: string;
  setPhoneNumberInput: (phone: string) => void;
  identityProfile: IdentityProfile;
  activityTimeline: ActivityTimelineItem[];
  settings: {
    darkModeEnabled: boolean;
    smsNotificationsEnabled: boolean;
  };
  toast: ToastMessage | null;
  showToast: (message: string, type: "success" | "error" | "info", onUndo?: () => void) => void;
  dismissToast: () => void;
  devSettings: DevSettings;
  updateDevSettings: (settings: Partial<DevSettings>) => void;
  isFirstSubmission: boolean;
  setIsFirstSubmission: (val: boolean) => void;
  lastActionType: "erasure" | "correction" | null;
  setLastActionType: (val: "erasure" | "correction" | null) => void;
  verifyPhoneNumber: (phone: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  resendOTP: () => void;
  submitNameCorrection: (newName: string) => Promise<void>;
  submitErasureRequest: () => Promise<void>;
  cancelPendingRequest: (timelineId: string) => Promise<void>;
  simulateResolution: () => void;
  resetAllState: () => void;
  setDarkMode: (enabled: boolean) => void;
  setSmsNotifications: (enabled: boolean) => void;
  addCSATResponse: (score: "positive" | "negative") => void;
  csatResponse: "positive" | "negative" | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [identityProfile, setIdentityProfile] = useState<IdentityProfile>(mockData.identityProfile as IdentityProfile);
  const [activityTimeline, setActivityTimeline] = useState<ActivityTimelineItem[]>(
    mockData.activityTimeline as ActivityTimelineItem[]
  );
  const [settings, setSettings] = useState({
    darkModeEnabled: false,
    smsNotificationsEnabled: true,
  });
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [devSettings, setDevSettings] = useState<DevSettings>({
    forceNetworkError: false,
    autoResolveRequests: false,
  });
  const [isFirstSubmission, setIsFirstSubmission] = useState<boolean>(true);
  const [lastActionType, setLastActionType] = useState<"erasure" | "correction" | null>(null);
  const [csatResponse, setCsatResponse] = useState<"positive" | "negative" | null>(null);

  // Undo tracking state
  const [stagedAction, setStagedAction] = useState<{
    type: "erasure" | "correction";
    previousProfile: IdentityProfile;
    previousTimeline: ActivityTimelineItem[];
    originalActionId: string;
  } | null>(null);

  // Handle Toast Undo countdown auto-commits
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toast && toast.onUndo && toast.undoCountdown !== undefined && toast.undoCountdown > 0) {
      timer = setTimeout(() => {
        setToast((prev) => {
          if (prev && prev.undoCountdown !== undefined) {
            return { ...prev, undoCountdown: prev.undoCountdown - 1 };
          }
          return prev;
        });
      }, 1000);
    } else if (toast && toast.onUndo && toast.undoCountdown === 0) {
      // Clear staged actions once undo expires
      setStagedAction(null);
      dismissToast();
    }
    return () => clearTimeout(timer);
  }, [toast]);

  // Synchronize CSS class for Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.darkModeEnabled) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.darkModeEnabled]);

  const showToast = (message: string, type: "success" | "error" | "info", onUndo?: () => void) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({
      id,
      message,
      type,
      onUndo,
      undoCountdown: onUndo ? 5 : undefined,
    });

    if (!onUndo) {
      setTimeout(() => {
        setToast((prev) => (prev?.id === id ? null : prev));
      }, 4000);
    }
  };

  const dismissToast = () => {
    setToast(null);
  };

  const updateDevSettings = (newSettings: Partial<DevSettings>) => {
    setDevSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const verifyPhoneNumber = async (phone: string): Promise<boolean> => {
    if (devSettings.forceNetworkError) {
      throw new Error("Simulated network failure");
    }
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setPhoneNumberInput(phone);
    return true;
  };

  const verifyOTP = async (code: string): Promise<boolean> => {
    if (devSettings.forceNetworkError) {
      throw new Error("Simulated network failure");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (code === mockData.otp.correctCode) {
      const formatted = (phone: string) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{5})(\d{5})$/);
        if (match) {
          return `+91 ${match[1]} ${match[2]}`;
        }
        return `+91 ${phone}`;
      };

      const masked = (phone: string) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{5})(\d{5})$/);
        if (match) {
          return `+91 ${match[1]} XXXXX`;
        }
        return `+91 ${phone.substring(0, 5)} XXXXX`;
      };

      setCurrentUser({
        id: "usr_001",
        phoneNumber: formatted(phoneNumberInput || "9876543210"),
        maskedPhoneNumber: masked(phoneNumberInput || "9876543210"),
        isVerified: true,
      });

      // Add a timeline entry for verification if not already there
      const hasVerification = activityTimeline.some(item => item.type === "verification");
      if (!hasVerification) {
        setActivityTimeline(prev => [
          {
            id: `act_${Date.now()}`,
            type: "verification",
            description: "Number verified successfully",
            status: "resolved",
            timestamp: new Date().toISOString(),
          },
          ...prev
        ]);
      }
      return true;
    }
    return false;
  };

  const resendOTP = () => {
    showToast("Your code has been resent.", "info");
  };

  const submitNameCorrection = async (newName: string): Promise<void> => {
    if (devSettings.forceNetworkError) {
      throw new Error("Simulated network failure");
    }
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Save previous state for undo
    const oldProfile = { ...identityProfile };
    const oldTimeline = [...activityTimeline];
    const newActionId = `act_${Date.now()}`;

    setStagedAction({
      type: "correction",
      previousProfile: oldProfile,
      previousTimeline: oldTimeline,
      originalActionId: newActionId,
    });

    const updatedProfile: IdentityProfile = {
      ...identityProfile,
      pendingDisplayName: newName,
      status: "under_review",
    };

    const newTimelineItem: ActivityTimelineItem = {
      id: newActionId,
      type: "correction",
      description: `Correction request submitted: name updated to '${newName}'`,
      status: "under_review",
      timestamp: new Date().toISOString(),
    };

    setIdentityProfile(updatedProfile);
    setActivityTimeline([newTimelineItem, ...activityTimeline]);
    setLastActionType("correction");

    showToast("Your correction has been submitted for review.", "success", () => {
      // Undo callback
      setIdentityProfile(oldProfile);
      setActivityTimeline(oldTimeline);
      setStagedAction(null);
      setLastActionType(null);
      showToast("Submission cancelled.", "info");
    });
  };

  const submitErasureRequest = async (): Promise<void> => {
    if (devSettings.forceNetworkError) {
      throw new Error("Simulated network failure");
    }
    await new Promise((resolve) => setTimeout(resolve, 800));

    const oldProfile = { ...identityProfile };
    const oldTimeline = [...activityTimeline];
    const newActionId = `act_${Date.now()}`;

    setStagedAction({
      type: "erasure",
      previousProfile: oldProfile,
      previousTimeline: oldTimeline,
      originalActionId: newActionId,
    });

    const updatedProfile: IdentityProfile = {
      ...identityProfile,
      status: "under_review",
    };

    const newTimelineItem: ActivityTimelineItem = {
      id: newActionId,
      type: "erasure",
      description: "Erasure / unlisting request submitted",
      status: "under_review",
      timestamp: new Date().toISOString(),
    };

    setIdentityProfile(updatedProfile);
    setActivityTimeline([newTimelineItem, ...activityTimeline]);
    setLastActionType("erasure");

    showToast("Your erasure request has been submitted and is under review.", "success", () => {
      // Undo callback
      setIdentityProfile(oldProfile);
      setActivityTimeline(oldTimeline);
      setStagedAction(null);
      setLastActionType(null);
      showToast("Submission cancelled.", "info");
    });
  };

  const cancelPendingRequest = async (timelineId: string): Promise<void> => {
    if (devSettings.forceNetworkError) {
      throw new Error("Simulated network failure");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update profile status back to none
    setIdentityProfile((prev) => ({
      ...prev,
      status: "none",
      pendingDisplayName: null,
    }));

    // Update timeline item status to cancelled
    setActivityTimeline((prev) =>
      prev.map((item) =>
        item.id === timelineId ? { ...item, status: "cancelled" as const } : item
      )
    );

    showToast("Pending request cancelled.", "success");
  };

  const simulateResolution = () => {
    if (identityProfile.status !== "under_review") {
      showToast("No pending request under review to resolve.", "info");
      return;
    }

    setActivityTimeline((prevTimeline) => {
      const pendingIndex = prevTimeline.findIndex((item) => item.status === "under_review");
      if (pendingIndex === -1) return prevTimeline;

      const pendingItem = prevTimeline[pendingIndex];
      let updatedProfile = { ...identityProfile };

      if (pendingItem.type === "correction") {
        updatedProfile = {
          ...updatedProfile,
          displayName: updatedProfile.pendingDisplayName || updatedProfile.displayName,
          pendingDisplayName: null,
          status: "resolved" as const,
        };
      } else if (pendingItem.type === "erasure") {
        updatedProfile = {
          ...updatedProfile,
          displayName: "Unlisted Number",
          pendingDisplayName: null,
          status: "resolved" as const,
          timesLookedUp: 0,
          sourceCount: 0,
          consentStatus: "erased",
          spamScore: {
            label: "No Classification",
            level: "unknown" as const,
            reportCount: 0,
            hasSufficientData: false,
          },
        };
      }

      setIdentityProfile(updatedProfile);

      const resolvedTimeline = prevTimeline.map((item, idx) =>
        idx === pendingIndex
          ? {
              ...item,
              status: "resolved" as const,
              description:
                item.type === "correction"
                  ? `Correction request approved: name updated to '${updatedProfile.displayName}'`
                  : "Erasure / unlisting request completed: number unlisted from public search",
              timestamp: new Date().toISOString(),
            }
          : item
      );

      // Alert toast
      setTimeout(() => {
        showToast("Done — your identity data has been updated.", "success");
      }, 300);

      return resolvedTimeline;
    });
  };

  const resetAllState = () => {
    setCurrentUser(null);
    setPhoneNumberInput("");
    setIdentityProfile(mockData.identityProfile as IdentityProfile);
    setActivityTimeline(mockData.activityTimeline as ActivityTimelineItem[]);
    setSettings({
      darkModeEnabled: false,
      smsNotificationsEnabled: true,
    });
    setToast(null);
    setStagedAction(null);
    setIsFirstSubmission(true);
    setLastActionType(null);
    setCsatResponse(null);
    showToast("Demo state reset to default.", "info");
  };

  const setDarkMode = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, darkModeEnabled: enabled }));
  };

  const setSmsNotifications = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, smsNotificationsEnabled: enabled }));
  };

  const addCSATResponse = (score: "positive" | "negative") => {
    setCsatResponse(score);
    showToast("Thank you for your feedback!", "success");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        phoneNumberInput,
        setPhoneNumberInput,
        identityProfile,
        activityTimeline,
        settings,
        toast,
        showToast,
        dismissToast,
        devSettings,
        updateDevSettings,
        isFirstSubmission,
        setIsFirstSubmission,
        lastActionType,
        setLastActionType,
        verifyPhoneNumber,
        verifyOTP,
        resendOTP,
        submitNameCorrection,
        submitErasureRequest,
        cancelPendingRequest,
        simulateResolution,
        resetAllState,
        setDarkMode,
        setSmsNotifications,
        addCSATResponse,
        csatResponse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
