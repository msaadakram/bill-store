"use client";

import { useState, useEffect } from "react";
import {
  Zap, Hash, Search, CheckCircle2, Download, Printer, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/** Animated 3-step "How to check bill" card with live-loop preview */
export function HowToCheckCard() {
  const [activeStep, setActiveStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const FAKE_REF = "0341-2567-894231";
  const STEP_MS = 3000;

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), STEP_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (activeStep !== 0) {
      setTypedText("");
      return;
    }
    let i = 0;
    setTypedText("");
    const t = setInterval(() => {
      i++;
      setTypedText(FAKE_REF.slice(0, i));
      if (i >= FAKE_REF.length) clearInterval(t);
    }, 95);
    return () => clearInterval(t);
  }, [activeStep]);

  const steps = [
    { icon: Hash,         title: "Enter Reference No.",  desc: "Type your 14-digit reference number",   color: "#3E8B8E", color2: "#5A9FA2", shadow: "rgba(62,139,142,0.30)" },
    { icon: Search,       title: "Click Check Bill",     desc: "Fetching your bill from LESCO servers", color: "#0369A1", color2: "#0EA5E9", shadow: "rgba(14,165,233,0.28)" },
    { icon: CheckCircle2, title: "View & Download",      desc: "Your bill is ready — save or print it", color: "#059669", color2: "#10B981", shadow: "rgba(16,185,129,0.28)" },
  ];

  const renderPreview = (i: number) => {
    if (i === 0)
      return (
        <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-teal-200/70 bg-teal-50/40">
          <Hash className="w-3 h-3 text-teal-500 shrink-0" />
          <div
            className="flex-1 font-mono text-slate-700 flex items-center overflow-hidden"
            style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px" }}
          >
            <span className="truncate">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.55 }}
              className="inline-block w-[2px] h-3 bg-teal-500 ml-0.5 shrink-0 rounded-full"
            />
          </div>
        </div>
      );
    if (i === 1)
      return (
        <div className="mt-2.5 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
            className="w-4 h-4 rounded-full border-2 border-blue-100 border-t-blue-500 shrink-0"
          />
          <div className="flex gap-1 items-end">
            {[0, 1, 2].map((j) => (
              <motion.div
                key={j}
                className="w-1 rounded-full bg-blue-400"
                animate={{ height: ["4px", "10px", "4px"] }}
                transition={{ repeat: Infinity, duration: 0.75, delay: j * 0.18 }}
              />
            ))}
          </div>
          <span className="text-blue-600" style={{ fontSize: "10px", fontWeight: 600 }}>
            Connecting to LESCO…
          </span>
        </div>
      );
    if (i === 2)
      return (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 rounded-xl overflow-hidden border border-emerald-100 shadow-md shadow-emerald-100/60"
        >
          <div
            className="px-3 py-1.5 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}
          >
            <span className="text-white" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em" }}>
              LESCO BILL READY
            </span>
            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
          <div className="bg-white px-3 py-2.5 flex items-center justify-between">
            <div>
              <div className="text-slate-400" style={{ fontSize: "9px", fontWeight: 500 }}>Total Payable</div>
              <div className="text-emerald-700" style={{ fontSize: "15px", fontWeight: 800 }}>PKR 3,450</div>
            </div>
            <div className="flex gap-1.5">
              {[Download, Printer].map((Icon, k) => (
                <motion.div
                  key={k}
                  whileHover={{ scale: 1.15 }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center bg-slate-100"
                >
                  <Icon className="w-3 h-3 text-slate-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl overflow-hidden"
      style={{ boxShadow: "0 8px 32px -8px rgba(20,40,60,0.18)" }}
    >
      {/* ── Dark header ── */}
      <div
        className="relative overflow-hidden px-5 py-5"
        style={{ background: "linear-gradient(135deg, #1A1F2E 0%, #2C3444 60%, #3E4B5E 100%)" }}
      >
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(127,179,181,0.18) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-4 left-4 w-16 h-16 rounded-full" style={{ background: "radial-gradient(circle, rgba(90,159,162,0.15) 0%, transparent 70%)" }} />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(105deg, transparent 30%, rgba(127,179,181,0.08) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-100% 0%"],
            opacity: [0.4, 0.8, 0.6, 1, 0.4],
          }}
          transition={{
            backgroundPosition: { repeat: Infinity, duration: 3.5, ease: "linear" },
            opacity: { repeat: Infinity, duration: 3.5, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/15"
              style={{ background: "linear-gradient(135deg, rgba(127,179,181,0.25), rgba(62,139,142,0.35))" }}
            >
              <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                <Zap className="w-5 h-5 text-yellow-300" strokeWidth={2.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-0.01em" }}>How to Check Bill</h3>
              <p className="text-slate-400" style={{ fontSize: "11px", fontWeight: 500 }}>3 simple steps · live loop preview</p>
            </div>
          </div>
          <div className="flex gap-1.5 items-center">
            {steps.map((s, idx) => (
              <motion.div
                key={idx}
                className="h-1.5 rounded-full"
                animate={{
                  width: activeStep === idx ? 16 : 6,
                  backgroundColor: activeStep === idx ? s.color : "rgba(255,255,255,0.18)",
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Steps body ── */}
      <div className="bg-white p-4">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const isDone = activeStep > i;
          return (
            <div key={i}>
              <motion.div
                animate={{ backgroundColor: isActive ? "#FAFFFE" : "#F8FAFC" }}
                transition={{ duration: 0.3 }}
                className="relative flex gap-3.5 rounded-xl p-3.5"
                style={{
                  border: `1.5px solid ${isActive ? step.color + "38" : "transparent"}`,
                  boxShadow: isActive ? `0 4px 20px -4px ${step.shadow}` : "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Icon */}
                <div className="shrink-0">
                  <div className="relative w-9 h-9">
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{ border: `2px solid ${step.color}` }}
                        animate={{ scale: [1, 1.55], opacity: [0.75, 0] }}
                        transition={{ repeat: Infinity, duration: 1.3, ease: "easeOut" }}
                      />
                    )}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${step.color}, ${step.color2})`
                          : isDone
                            ? "linear-gradient(135deg, #10B981, #059669)"
                            : "#E2E8F0",
                        boxShadow: isActive ? `0 3px 12px -2px ${step.shadow}` : "none",
                        transition: "background 0.35s, box-shadow 0.35s",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isDone ? (
                          <motion.div key={`done-${i}`} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div key={`icon-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.22 }}>
                            <step.icon className="w-4 h-4" style={{ color: isActive ? "white" : "#94A3B8" }} strokeWidth={2.5} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Text + preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span style={{ fontSize: "13px", fontWeight: 700, color: isActive ? "#0F172A" : isDone ? "#64748B" : "#94A3B8", transition: "color 0.3s" }}>
                      {step.title}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-white shrink-0"
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        background: isActive
                          ? `linear-gradient(135deg, ${step.color}, ${step.color2})`
                          : isDone
                            ? "linear-gradient(135deg, #10B981, #059669)"
                            : "linear-gradient(135deg, #CBD5E1, #94A3B8)",
                        opacity: isActive || isDone ? 1 : 0.7,
                        transition: "background 0.3s, opacity 0.3s",
                      }}
                    >
                      {isDone ? "Done \u2713" : `Step ${i + 1}`}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", lineHeight: 1.5, color: isActive ? "#64748B" : "#94A3B8", transition: "color 0.3s" }}>
                    {step.desc}
                  </p>
                  <div style={{ minHeight: 52, overflow: "hidden" }}>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`preview-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                        >
                          {renderPreview(i)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Connector line */}
              {i < 2 && (
                <div className="ml-[27px] py-0.5 flex">
                  <div className="relative w-0.5 h-5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full rounded-full"
                      style={{ background: `linear-gradient(180deg, ${step.color}, ${steps[i + 1].color})` }}
                      animate={{ height: isDone ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 px-1">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
          />
          <span className="text-slate-400" style={{ fontSize: "11px" }}>
            Results appear instantly — no account needed
          </span>
        </div>
      </div>
    </motion.div>
  );
}
