"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Hash, User, Search, ArrowRight, CheckCircle2, AlertCircle,
} from "lucide-react";
import type { InputMode, Step, BillDetails, HistoryEntry } from "./_lib/types";

import {
  WebPageJsonLd,
  SoftwareAppJsonLd,
  FaqJsonLd,
  BreadcrumbJsonLd,
  OrganizationJsonLd,
} from "@/lib/seo/schema";
import { MepcoHero } from "./_components/MepcoHero";
import { BillSearchFlow } from "./_components/BillSearchFlow";
import { BillResultCard } from "./_components/BillResultCard";
import { MepcoSidebar } from "./_components/MepcoSidebar";
import { BlogGuideSection } from "./_components/BlogGuideSection";
import { FaqSection, faqs } from "./_components/FaqSection";
import { CtaSection } from "./_components/CtaSection";

const PITC_URL = "https://bill.pitc.com.pk/mepcobill/general?refno=";


const MAX_HISTORY = 6;
const HISTORY_KEY = "mepco_search_history";

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { const s = localStorage.getItem(HISTORY_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
}
function saveHistoryToStorage(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(entries)); } catch {}
}

export default function MepcoBillPage() {
  const [mode, setMode] = useState<InputMode>("reference");
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [bill, setBill] = useState<BillDetails | null>(null);
  const [fieldError, setFieldError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const inputRef = useRef<HTMLInputElement>(null!);

  const maxLen = mode === "reference" ? 14 : 10;

  const addToHistory = useCallback((billData: BillDetails, ref: string, mode: InputMode) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ref, mode, timestamp: Date.now(),
      customerName: billData.customerName,
      totalPayable: billData.totalPayable,
      status: billData.status,
      billMonth: billData.billMonth,
    };
    setHistory((prev) => {
      const updated = [entry, ...prev.filter((h) => h.ref !== ref)].slice(0, MAX_HISTORY);
      saveHistoryToStorage(updated);
      return updated;
    });
  }, []);

  const deleteHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistoryToStorage([]);
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setMode(entry.mode);
    setInputValue(entry.ref);
    setFieldError("");
    setStep("input");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    setInputValue(val);
    setFieldError("");
  };

  const validate = () => {
    if (!inputValue.trim()) {
      setFieldError(mode === "reference" ? "Please enter your 14-digit Reference Number" : "Please enter your Customer ID");
      return false;
    }
    if (mode === "reference" && inputValue.length !== 14) {
      setFieldError(`Reference Number must be exactly 14 digits (entered: ${inputValue.length})`);
      return false;
    }
    if (mode === "customer" && inputValue.length < 8) {
      setFieldError("Customer ID must be at least 8 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep("loading");
  };

  const handleReset = () => {
    setStep("input"); setBill(null); setInputValue(""); setFieldError("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const switchMode = (m: InputMode) => { setMode(m); setInputValue(""); setFieldError(""); };

  const formatDisplay = (val: string) => {
    if (mode !== "reference") return val;
    return [val.slice(0, 4), val.slice(4, 8), val.slice(8, 14)].filter(Boolean).join("-");
  };

  const progress = mode === "reference" ? (inputValue.length / 14) * 100 : Math.min((inputValue.length / 10) * 100, 100);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <WebPageJsonLd
        url="https://billcheck.pk/mepco-bill"
        title="Check MEPCO Bill Online 2026 — Instant MEPCO Electricity Bill | BillCheck"
        description="Check your MEPCO electricity bill online instantly. Enter your reference number to view, download or print your MEPCO bill. Serving Multan & south Punjab. Free, fast, secure."
      />
      <SoftwareAppJsonLd
        name="BillCheck — MEPCO Bill Check"
        description="Check your MEPCO electricity bill online instantly. Enter your reference number to view, download or print your MEPCO bill."
        url="https://billcheck.pk/mepco-bill"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://billcheck.pk" },
          { name: "Electricity Bill", url: "https://billcheck.pk/bill/electricity" },
          { name: "MEPCO Bill", url: "https://billcheck.pk/mepco-bill" },
        ]}
      />
      <OrganizationJsonLd companyId="mepco" />
      <FaqJsonLd faqs={faqs} />

      <MepcoHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── Form / Result Column ── */}
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="lg:col-span-2">
                <FormCard
                  mode={mode} switchMode={switchMode} inputValue={inputValue} maxLen={maxLen}
                  formatDisplay={formatDisplay} handleInputChange={handleInputChange}
                  fieldError={fieldError} progress={progress} handleSubmit={handleSubmit}
                  inputRef={inputRef}
                />
              </motion.div>
            )}

            {step === "loading" && (
  <div key="loading" className="lg:col-span-2">
    <BillSearchFlow
      companyId="mepco"
      companyName="MEPCO"
      pitcUrl={PITC_URL}
      referenceNumber={inputValue}
      onReset={handleReset}
    />
  </div>
)}

            {step === "result" && bill && (
              <div key="result" className="lg:col-span-2"><BillResultCard bill={bill} onReset={handleReset} /></div>
            )}

            {step === "error" && (
              <motion.div key="error" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:col-span-2 bg-white rounded-2xl border border-red-100 shadow-lg p-6 sm:p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center"><AlertCircle className="w-7 h-7 text-red-500" /></div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Something went wrong</h3>
                <p className="text-slate-500 text-sm mb-5">We couldn&apos;t fetch your bill right now. Please check your reference number and try again.</p>
                <button onClick={handleReset} className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #065F46, #10B981)" }}>Try Again</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Sidebar ── */}
          {step === "input" && (
            <MepcoSidebar history={history} onLoad={loadFromHistory} onDelete={deleteHistory} onClear={clearHistory} />
          )}
        </div>

        <BlogGuideSection />
        <FaqSection />
        <CtaSection />
      </div>
    </div>
  );
}

/* ─── FormCard sub-component ─── */
function FormCard({
  mode, switchMode, inputValue, maxLen, formatDisplay, handleInputChange,
  fieldError, progress, handleSubmit, inputRef,
}: {
  mode: InputMode; switchMode: (m: InputMode) => void; inputValue: string; maxLen: number;
  formatDisplay: (v: string) => string; handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldError: string; progress: number; handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-emerald-50 to-white pointer-events-none" />
      <div className="p-3 md:p-8 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0 relative overflow-hidden group bg-gradient-to-br from-emerald-600 to-emerald-800">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-slate-900" style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.01em" }}>Check MEPCO Bill</h2>
              <p className="text-slate-500 font-medium" style={{ fontSize: "12px" }}>Enter your reference number to get started</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100">
          <div className="flex p-1 bg-slate-50/80 rounded-lg mb-4 md:mb-6 border border-slate-100">
            {(["reference", "customer"] as InputMode[]).map((m) => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3.5 rounded-lg transition-all duration-300 ${mode === m ? "bg-white text-emerald-700 shadow-sm shadow-slate-200/50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"}`}
                style={{ fontSize: "13px", fontWeight: mode === m ? 700 : 600 }}>
                {m === "reference" ? <Hash className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                {m === "reference" ? "Reference No." : "Customer ID"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-1 pb-1">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {mode === "reference" ? <Hash className="w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" /> : <User className="w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />}
              </div>
              <input ref={inputRef} type="text" inputMode="numeric"
                value={mode === "reference" ? formatDisplay(inputValue) : inputValue}
                onChange={handleInputChange}
                placeholder={mode === "reference" ? "XXXX-XXXX-XXXXXX" : "Enter Customer ID"}
                className={`w-full pl-11 pr-12 py-3.5 md:py-5 rounded-lg border-2 outline-none transition-all text-slate-900 placeholder-slate-300 shadow-sm ${fieldError ? "border-red-200 bg-red-50/50 focus:border-red-400 focus:ring-4 focus:ring-red-100" : inputValue.length === maxLen ? "border-emerald-200 bg-emerald-50/30 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" : "border-slate-200 bg-slate-50/50 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"}`}
                style={{ fontSize: "15px", fontWeight: 600, letterSpacing: mode === "reference" ? "1px" : "0" }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <AnimatePresence>
                  {inputValue.length > 0 && inputValue.length < maxLen && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-slate-400 text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded-md">{inputValue.length}/{maxLen}</motion.div>
                  )}
                  {inputValue.length === maxLen && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}><CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={3} /></motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-[-2px] h-1 w-[calc(100%-24px)] mx-auto bg-slate-100 rounded-b-lg overflow-hidden transition-opacity duration-300" style={{ opacity: inputValue.length > 0 ? 1 : 0 }}>
              <motion.div className="h-full rounded-full" style={{ background: progress === 100 ? "#10B981" : "linear-gradient(90deg, #065F46, #10B981)" }} animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
            </div>

            <AnimatePresence>
              {fieldError && (
                <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }} className="flex items-center gap-2 mt-2.5 text-red-500 bg-red-50 p-2.5 rounded-lg">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>{fieldError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button type="submit" whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 mt-4 px-5 py-3.5 rounded-lg text-white shadow-xl shadow-slate-400/20 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all"
              style={{ background: "linear-gradient(135deg, #1A1F2E 0%, #2C3444 100%)", fontSize: "14px", fontWeight: 700 }}>
              <Search className="w-4 h-4" />Check Bill Now<ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
