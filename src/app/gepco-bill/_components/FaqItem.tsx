"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm"
      whileHover={{ y: -2, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left bg-white hover:bg-amber-50 transition-colors"
      >
        <span className="text-slate-900 pr-4" style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.5 }}>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 bg-white" style={{ fontSize: "14px", lineHeight: 1.7 }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
