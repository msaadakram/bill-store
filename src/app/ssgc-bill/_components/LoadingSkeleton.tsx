"use client";

import { motion } from "motion/react";
import { Flame } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative"
      style={{ minHeight: "400px" }}
    >
      <div
        className="h-20 flex items-center px-6 gap-4"
        style={{ background: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)" }}
      >
        <div className="w-12 h-12 rounded-xl bg-white/20 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-white/20 rounded-full w-40 animate-pulse" />
          <div className="h-2 bg-white/20 rounded-full w-24 animate-pulse" />
        </div>
        <div className="w-20 h-7 bg-white/20 rounded-full animate-pulse" />
      </div>
      <div className="p-6 space-y-5">
        <div className="h-28 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-red-100 rounded-lg animate-pulse" />
          <div className="flex-1 h-12 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm rounded-2xl">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-red-100" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-red-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <Flame className="w-7 h-7 text-red-600" strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>
        <p className="text-slate-700" style={{ fontSize: "15px", fontWeight: 600 }}>Fetching your bill…</p>
        <p className="text-slate-400 mt-1" style={{ fontSize: "13px" }}>Connecting to SSGC servers</p>
        <div className="flex gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-red-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
