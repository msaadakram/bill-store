"use client";

import { motion } from "motion/react";
import { Hash, Zap, Download, Printer, CheckCircle2, Search } from "lucide-react";

const FAKE_REF = "0521-7563-984210";

export function renderHowToPreview(activeStep: number, typedText: string): React.ReactNode {
  if (activeStep === 0)
    return (
      <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-emerald-200/70 bg-emerald-50/40">
        <Hash className="w-3 h-3 text-emerald-500 shrink-0" />
        <div className="flex-1 font-mono text-slate-700 flex items-center overflow-hidden" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px" }}>
          <span className="truncate">{typedText}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.55 }} className="inline-block w-[2px] h-3 bg-emerald-500 ml-0.5 shrink-0 rounded-full" />
        </div>
      </div>
    );
  if (activeStep === 1)
    return (
      <div className="mt-2.5 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }} className="w-4 h-4 rounded-full border-2 border-emerald-100 border-t-emerald-500 shrink-0" />
        <div className="flex gap-1 items-end">
          {[0, 1, 2].map((j) => (
            <motion.div key={j} className="w-1 rounded-full bg-emerald-400" animate={{ height: ["4px", "10px", "4px"] }} transition={{ repeat: Infinity, duration: 0.75, delay: j * 0.18 }} />
          ))}
        </div>
        <span className="text-emerald-600" style={{ fontSize: "10px", fontWeight: 600 }}>Connecting to MEPCO…</span>
      </div>
    );
  if (activeStep === 2)
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-2.5 rounded-xl overflow-hidden border border-emerald-100 shadow-md shadow-emerald-100/60">
        <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}>
          <span className="text-white" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em" }}>MEPCO BILL READY</span>
          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}><CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={2.5} /></motion.div>
        </div>
        <div className="bg-white px-3 py-2.5 flex items-center justify-between">
          <div>
            <div className="text-slate-400" style={{ fontSize: "9px", fontWeight: 500 }}>Total Payable</div>
            <div className="text-emerald-700" style={{ fontSize: "15px", fontWeight: 800 }}>PKR 4,200</div>
          </div>
          <div className="flex gap-1.5">
            {[Download, Printer].map((Icon, k) => (
              <motion.div key={k} whileHover={{ scale: 1.15 }} className="w-6 h-6 rounded-lg flex items-center justify-center bg-slate-100"><Icon className="w-3 h-3 text-slate-500" /></motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  return null;
}

export const HOW_TO_STEPS = [
  { icon: Hash, title: "Enter Reference No.", desc: "Type your 14-digit reference number", color: "#065F46", color2: "#059669", shadow: "rgba(6,95,70,0.30)" },
  { icon: Search, title: "Click Check Bill", desc: "Fetching your bill from MEPCO servers", color: "#0369A1", color2: "#0EA5E9", shadow: "rgba(14,165,233,0.28)" },
  { icon: CheckCircle2, title: "View & Download", desc: "Your bill is ready — save or print it", color: "#059669", color2: "#10B981", shadow: "rgba(16,185,129,0.28)" },
] as const;
