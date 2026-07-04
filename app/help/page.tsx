"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, LifeBuoy, Mail, UserCheck, ShieldAlert, ArrowLeft } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function HelpPage() {
  const { currentUser } = useApp();
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const faqItems = [
    {
      id: "faq_1",
      question: "Why does Truecaller have my phone number if I never signed up?",
      answer:
        "Truecaller maintains a directory based on contact sync lists uploaded by registered users. If someone saves your phone details in their address book and uploads it, we index the aggregated name hash for spam blocking and caller identification.",
    },
    {
      id: "faq_2",
      question: "How long do name corrections or erasure requests take?",
      answer:
        "Most correction and erasure requests are routed to our Trust & Safety queue for review. They are typically reviewed, approved, and updated across the live identification network within 3 to 5 business days.",
    },
    {
      id: "faq_3",
      question: "Can I cancel a pending erasure request?",
      answer:
        "Yes. You can manage, review, and cancel active name-correction or erasure tickets at any time from your Activity Timeline before they reach a resolved status.",
    },
    {
      id: "faq_4",
      question: "What rights do I have under the DPDP Act 2023?",
      answer:
        "As a Data Principal in India, you hold the right to seek confirmation of data processing, request correction of inaccurate details, ask for erasure of records where consent is withdrawn, and raise grievances with our designated Grievance Officer.",
    },
  ];

  const handleContactOfficer = () => {
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      alert("Mock Grievance ticket created. A copy of the grievance complaint has been logged against your verified session details.");
    }, 400);
  };

  return (
    <div className="w-full flex-grow max-w-[720px] mx-auto px-4 py-8 md:py-16 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.35 }}
        className="w-full bg-white dark:bg-neutral-100 rounded-md border border-neutral-200/50 dark:border-neutral-200/10 p-6 md:p-8 shadow-elevation-1"
      >
        {/* Back Link */}
        <Link
          href={currentUser ? "/profile" : "/"}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{currentUser ? "Back to Profile" : "Back to Home"}</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-200 dark:border-neutral-200/10 mb-6">
          <div className="h-9 w-9 rounded-full bg-primary-light text-primary dark:bg-primary-light/10 flex items-center justify-center">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-neutral-900 leading-none">
              Help & Grievance Desk
            </h2>
            <p className="text-[12px] text-neutral-400 mt-1">
              Find answers to common privacy queries and contact compliance officers.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h3 className="text-[12.5px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
            Frequently Asked Questions
          </h3>
          <Accordion items={faqItems} />
        </div>

        {/* Grievance Officer details */}
        <div className="border border-neutral-200 dark:border-neutral-200/10 rounded-sm p-6 bg-neutral-100/30 dark:bg-neutral-200/5">
          <h3 className="text-[13px] font-bold text-neutral-900 flex items-center gap-2 mb-4">
            <ShieldAlert className="h-4.5 w-4.5 text-primary" />
            <span>Designated Grievance Officer</span>
          </h3>

          <div className="text-[13px] text-neutral-700 flex flex-col gap-2.5 mb-6">
            <div className="flex justify-between">
              <span className="text-neutral-400">Officer Name:</span>
              <span className="font-semibold text-neutral-950">Srikanth Menon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Designation:</span>
              <span className="font-medium">Chief Data Grievance Officer</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Address:</span>
              <span className="text-right">Truecaller India Office, Bengaluru, Karnataka</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Officer Hours:</span>
              <span>10:00 AM – 5:00 PM (Mon – Fri)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Response SLA:</span>
              <span className="text-success font-semibold">Under 72 Hours</span>
            </div>
          </div>

          <Button
            onClick={handleContactOfficer}
            className="w-full justify-center gap-2 font-semibold"
          >
            <Mail className="h-4.5 w-4.5" />
            <span>File Grievance Complaint</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
