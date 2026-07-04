"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const GlobalLoadingBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450); // Finish transition

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {animating && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{
            width: ["0%", "30%", "70%", "100%"],
            transition: {
              times: [0, 0.2, 0.7, 1],
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary z-50 origin-left"
        />
      )}
    </AnimatePresence>
  );
};

export default GlobalLoadingBar;
