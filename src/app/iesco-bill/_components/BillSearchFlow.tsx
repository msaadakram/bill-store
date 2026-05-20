"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, ExternalLink, Sparkles,
} from "lucide-react";

// Brand colors per company for the loading animation
const LOADING_COLORS: Record<string, { primary: string; secondary: string; light: string }> = {
  fesco: { primary: "#7C3AED", secondary: "#A78BFA", light: "#C4B5FD" },
  lesco: { primary: "#3E8B8E", secondary: "#5A9FA2", light: "#7FB3B5" },
  iesco: { primary: "#3E8B8E", secondary: "#5A9FA2", light: "#7FB3B5" },
  mepco: { primary: "#065F46", secondary: "#059669", light: "#10B981" },
  gepco: { primary: "#92400E", secondary: "#D97706", light: "#F59E0B" },
  ke: { primary: "#DC2626", secondary: "#EF4444", light: "#FCA5A5" },
  sngpl: { primary: "#1D4ED8", secondary: "#3B82F6", light: "#93C5FD" },
  ssgc: { primary: "#DC2626", secondary: "#EF4444", light: "#FCA5A5" },
};

export function BillSearchFlow({
  companyId,
  companyName,
  pitcUrl,
  onReset,
  referenceNumber,
}: {
  companyId: string;
  companyName: string;
  pitcUrl: string | null;
  onReset: () => void;
  referenceNumber: string;
}) {
  const [phase, setPhase] = useState<"connecting" | "searching" | "processing" | "ready">("connecting");
  const [countdown, setCountdown] = useState(5);
  const c = LOADING_COLORS[companyId] || LOADING_COLORS.lesco;
  const isGas = companyId === "sngpl" || companyId === "ssgc";
  const IconEl = isGas ? Flame : Sparkles;

  // Animated phase progression
  useEffect(() => {
    const phases: Array<"connecting" | "searching" | "processing" | "ready"> = [
      "connecting", "searching", "processing", "ready",
    ];
    let idx = 0;
    const timer = setInterval(() => {
      idx++;
      if (idx < phases.length) {
        setPhase(phases[idx]);
      } else {
        clearInterval(timer);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Countdown from 5 to 0
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const phaseLabels: Record<string, string> = {
    connecting: `Connecting to ${companyName} servers…`,
    searching: "Searching bill database…",
    processing: "Processing bill details…",
    ready: "Bill is ready!",
  };

  const handleViewBill = () => {
    if (pitcUrl) {
      window.location.href = pitcUrl + referenceNumber;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* Top colored bar */}
      <div
        className="h-20 flex items-center px-6 gap-4"
        style={{ background: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 100%)` }}
      >
        <div className="w-12 h-12 rounded-xl bg-white/20 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-white/20 rounded-full w-44 animate-pulse" />
          <div className="h-2 bg-white/20 rounded-full w-28 animate-pulse" />
        </div>
        <div className="w-20 h-7 bg-white/20 rounded-full animate-pulse" />
      </div>

      {/* Body skeleton */}
      <div className="p-6 space-y-5 opacity-30">
        <div className="h-28 rounded-xl animate-pulse" style={{ background: `linear-gradient(135deg, ${c.light}20, ${c.light}10)` }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex-1 h-12 rounded-lg animate-pulse" style={{ backgroundColor: `${c.primary}15` }} />
          <div className="flex-1 h-12 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence mode="wait">
        {phase !== "ready" ? (
          <motion.div
            key="loading"
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl"
          >
            {/* Spinner */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4" style={{ borderColor: `${c.light}40` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent"
                style={{ borderTopColor: c.primary }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                  <IconEl className="w-9 h-9" style={{ color: c.primary }} strokeWidth={2.5} />
                </motion.div>
              </div>
            </div>

            {/* Phase label */}
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-slate-800 mb-2"
              style={{ fontSize: "17px", fontWeight: 700 }}
            >
              {phaseLabels[phase]}
            </motion.p>
            <p className="text-slate-400" style={{ fontSize: "13px" }}>
              Please wait — this will take a few seconds
            </p>

            {/* Phase dots indicator */}
            <div className="flex gap-2 mt-5">
              {(["connecting", "searching", "processing"] as const).map((s, i) => {
                const isActive = phase === s;
                const isDone = ["connecting", "searching", "processing"].indexOf(phase) > i;
                return (
                  <motion.div
                    key={s}
                    className="w-3 h-3 rounded-full"
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      backgroundColor: isDone ? c.secondary : isActive ? c.primary : "#E2E8F0",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </div>

            {/* Countdown */}
            <p className="text-slate-400 mt-4" style={{ fontSize: "12px" }}>
              {countdown > 0 ? `Ready in ${countdown}s…` : "Almost there…"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, ${c.primary}15, ${c.secondary}20)`,
                boxShadow: `0 8px 32px -8px ${c.primary}40`,
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-10 h-10"
                style={{ color: c.primary }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-800 mb-1"
              style={{ fontSize: "18px", fontWeight: 800 }}
            >
              Bill Found!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 mb-6 text-center px-6"
              style={{ fontSize: "13px", lineHeight: 1.6 }}
            >
              Your {companyName} bill for ref #{referenceNumber.slice(0, 10)}… has been located.
              Click below to view your complete bill on the official portal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={handleViewBill}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 100%)`,
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                <ExternalLink className="w-5 h-5" />
                View Bill on Official Portal
              </button>
              <button
                onClick={onReset}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                Check Another Bill
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 mt-4"
              style={{ fontSize: "11px" }}
            >
              You will be redirected to the official {companyName} portal
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
