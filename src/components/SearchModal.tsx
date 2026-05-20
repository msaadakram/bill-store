"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, ExternalLink, Zap, Flame } from "lucide-react";
import { detectCompany, type CompanyMatch } from "@/lib/utils/companyDetector";

const PHASE_LABELS: Record<string, string> = {
  connecting: "Connecting to servers…",
  searching: "Searching bill database…",
  processing: "Processing bill details…",
  ready: "Bill is ready!",
};

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [refNo, setRefNo] = useState("");
  const [company, setCompany] = useState<CompanyMatch | null>(null);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<"idle" | "connecting" | "searching" | "processing" | "ready">("idle");
  const [countdown, setCountdown] = useState(5);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setRefNo("");
      setCompany(null);
      setError("");
      setPhase("idle");
      setCountdown(5);
    }
  }, [open]);

  // Phase progression during loading
  useEffect(() => {
    if (phase === "idle" || phase === "ready") return;
    const phases: Array<"connecting" | "searching" | "processing" | "ready"> = [
      "connecting", "searching", "processing", "ready",
    ];
    let idx = phases.indexOf(phase);
    const timer = setInterval(() => {
      idx++;
      if (idx < phases.length) {
        setPhase(phases[idx]);
      } else {
        clearInterval(timer);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, [phase === "idle"]);

  // Countdown
  useEffect(() => {
    if (phase !== "ready" || countdown <= 0) return;
    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 14);
    setRefNo(val);
    setError("");
    if (val.length >= 6) {
      const detected = detectCompany(val);
      setCompany(detected);
      if (!detected && val.length >= 10) {
        setError("Could not identify the company. Please check your reference number.");
      }
    } else {
      setCompany(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNo || refNo.length < 6) {
      setError("Please enter a valid reference number (at least 6 digits).");
      return;
    }
    if (!company) {
      setError("Could not identify the company. Please check your reference number.");
      return;
    }
    setError("");
    setPhase("connecting");
    setCountdown(5);
  };

  const handleViewBill = () => {
    if (company) {
      window.open(company.pitcUrl + refNo, "_blank");
      onClose();
    }
  };

  const handleBack = () => {
    setPhase("idle");
    setRefNo("");
    setCompany(null);
    setCountdown(5);
  };

  const c = company || { name: "", short: "", color: "#3E8B8E", id: "lesco" };
  const isGas = c.id === "sngpl" || c.id === "ssgc";
  const IconEl = isGas ? Flame : Zap;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={phase === "idle" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            {phase === "idle" && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {phase === "idle" && (
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #3E8B8E, #5A9FA2)" }}>
                    <Search className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-slate-900 font-bold" style={{ fontSize: "22px" }}>Quick Bill Check</h2>
                  <p className="text-slate-500 mt-1" style={{ fontSize: "14px" }}>
                    Enter your reference number — we&apos;ll automatically detect your company
                  </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={refNo}
                      onChange={handleInputChange}
                      placeholder="Enter reference number..."
                      autoFocus
                      className={`w-full pl-11 pr-4 py-4 rounded-xl border-2 outline-none transition-all text-slate-900 placeholder-slate-400 ${
                        error
                          ? "border-red-200 bg-red-50/30"
                          : company
                          ? "border-emerald-200 bg-emerald-50/30"
                          : "border-slate-200 bg-slate-50/50 focus:border-teal-400 focus:bg-white"
                      }`}
                      style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "1px" }}
                    />

                    {/* Detected company badge */}
                    {company && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-10 left-4 flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ background: company.color }}
                      >
                        <IconEl className="w-3 h-3" />
                        {company.short} — {company.name}
                      </motion.div>
                    )}
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 mt-2 text-sm px-1"
                      style={{ fontSize: "12px" }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 mt-8 px-5 py-4 rounded-xl text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: company
                        ? `linear-gradient(135deg, ${company.color}, ${company.color}CC)`
                        : "linear-gradient(135deg, #3E8B8E, #5A9FA2)",
                      fontSize: "16px",
                    }}
                  >
                    <Search className="w-5 h-5" />
                    Check Bill Now
                  </button>
                </form>

                {/* Quick tip */}
                <p className="text-slate-400 text-center mt-5" style={{ fontSize: "12px" }}>
                  Works with LESCO, FESCO, IESCO, MEPCO, GEPCO, K-Electric, SNGPL & SSGC
                </p>
              </div>
            )}

            {/* Loading / Ready States */}
            <AnimatePresence mode="wait">
              {(phase === "connecting" || phase === "searching" || phase === "processing") && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 sm:p-8"
                  style={{ minHeight: "380px" }}
                >
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    {/* Spinner */}
                    <div className="relative mb-8">
                      <div className="w-24 h-24 rounded-full border-4" style={{ borderColor: `${c.color}20` }} />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent"
                        style={{ borderTopColor: c.color }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                          <IconEl className="w-9 h-9" style={{ color: c.color }} strokeWidth={2.5} />
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
                      {PHASE_LABELS[phase]}
                    </motion.p>
                    <p className="text-slate-400" style={{ fontSize: "13px" }}>
                      Please wait — fetching your {c.short} bill
                    </p>

                    {/* Phase dots */}
                    <div className="flex gap-2 mt-6">
                      {(["connecting", "searching", "processing"] as const).map((s, i) => {
                        const isActive = phase === s;
                        const phaseOrder = ["connecting", "searching", "processing"];
                        const isDone = phaseOrder.indexOf(phase) > i;
                        return (
                          <motion.div
                            key={s}
                            className="w-3 h-3 rounded-full"
                            animate={{
                              scale: isActive ? 1.3 : 1,
                              backgroundColor: isDone ? c.color : isActive ? c.color : "#E2E8F0",
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {phase === "ready" && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 sm:p-8"
                  style={{ minHeight: "380px" }}
                >
                  <div className="flex flex-col items-center justify-center h-full py-4">
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}15, ${c.color}25)`,
                        boxShadow: `0 8px 32px -8px ${c.color}40`,
                      }}
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-10 h-10"
                        style={{ color: c.color }}
                      >
                        <motion.path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-800 mb-1"
                      style={{ fontSize: "20px", fontWeight: 800 }}
                    >
                      Bill Found!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-slate-500 mb-2 text-center"
                      style={{ fontSize: "13px", lineHeight: 1.6 }}
                    >
                      Your {c.short} bill for ref #{refNo} has been located.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-slate-400 mb-6"
                      style={{ fontSize: "13px" }}
                    >
                      {countdown > 0
                        ? `Page ready in ${countdown}s…`
                        : "Ready! Click below to view your bill."}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-3 w-full"
                    >
                      <button
                        onClick={handleViewBill}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${c.color}, ${c.color}CC)`,
                          fontSize: "15px",
                          fontWeight: 700,
                        }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Bill on Official Portal
                      </button>
                      <button
                        onClick={handleBack}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
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
                      You will be redirected to the official {c.short} portal
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
