"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  question: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-200/10 last:border-b-0 py-4">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left font-semibold text-[15px] text-neutral-900 focus:outline-none group py-1"
      >
        <span className="group-hover:text-primary transition-colors">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-neutral-400 shrink-0 ml-4 group-hover:text-primary transition-colors"
        >
          <ChevronDown className="h-4.5 w-4.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="text-[14px] text-neutral-700 dark:text-neutral-700/80 leading-relaxed pt-2.5 pb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  className?: string;
}

const Accordion = ({ items, className }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("w-full bg-white dark:bg-neutral-100 rounded-md p-4 border border-neutral-200/50 dark:border-neutral-200/10 shadow-elevation-1", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
