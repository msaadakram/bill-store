"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/** Shows "~X min left" indicator near the top as user reads */
export function EstimatedReadBar({ readTime }: { readTime: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, []);

  const minsLeft = Math.max(0, Math.ceil(readTime * (1 - progress / 100)));

  return (
    <AnimatePresence>
      {progress > 5 && progress < 95 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-[3px] right-4 sm:right-6 z-[60] px-3 py-1.5 rounded-b-lg bg-white/90 backdrop-blur-sm border border-t-0 border-slate-200 shadow-sm"
        >
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
            ~{minsLeft} min left
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
