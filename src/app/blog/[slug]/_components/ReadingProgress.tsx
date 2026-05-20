"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

/** Fixed teal gradient progress bar at the very top of the viewport */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-100/80 z-[60]">
      <motion.div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0D9488, #14B8A6, #5EEAD4)",
        }}
        transition={{ duration: 0.08 }}
      />
    </div>
  );
}
