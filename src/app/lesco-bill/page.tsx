"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Hash,
  User,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Clock,
  Shield,
  Download,
  Phone,
  MapPin,
} from "lucide-react";
import type { InputMode, HistoryEntry } from "./_lib/types";
import {
  WebPageJsonLd,
  SoftwareAppJsonLd,
  FaqJsonLd,
  BreadcrumbJsonLd,
  OrganizationJsonLd,
} from "@/lib/seo/schema";
import { ElectricBg } from "./_components/ElectricBg";
import { SearchHistoryCard } from "./_components/SearchHistoryCard";
import { HowToCheckCard } from "./_components/HowToCheckCard";

const HISTORY_KEY = "lesco_search_history";
const MAX_HISTORY = 6;

function loadHistory(): HistoryEntry[] {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function saveHistoryToStorage(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {}
}

export default function LescoBillPage() {
  const router = useRouter();
  const [mode, setMode] = useState<InputMode>("reference");
  const [inputValue, setInputValue] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const maxLen = mode === "reference" ? 14 : 10;

  const addToHistory = useCallback(
    (ref: string, mode: InputMode) => {
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ref,
        mode,
        timestamp: Date.now(),
        customerName: "",
        totalPayable: 0,
        status: "unpaid",
        billMonth: "",
      };
      setHistory((prev) => {
        const updated = [entry, ...prev.filter((h) => h.ref !== ref)].slice(
          0,
          MAX_HISTORY,
        );
        saveHistoryToStorage(updated);
        return updated;
      });
    },
    [],
  );

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
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    setInputValue(val);
    setFieldError("");
  };

  const validate = () => {
    if (!inputValue.trim()) {
      setFieldError(
        mode === "reference"
          ? "Please enter your 14-digit Reference Number"
          : "Please enter your Customer ID",
      );
      return false;
    }
    if (mode === "reference" && inputValue.length !== 14) {
      setFieldError(
        `Reference Number must be exactly 14 digits (entered: ${inputValue.length})`,
      );
      return false;
    }
    if (mode === "customer" && inputValue.length < 8) {
      setFieldError("Customer ID must be at least 8 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    addToHistory(inputValue, mode);
    router.push(`/lesco-bill/${encodeURIComponent(inputValue)}?mode=${mode}`);
  };

  const switchMode = (m: InputMode) => {
    setMode(m);
    setInputValue("");
    setFieldError("");
  };

  const formatDisplay = (val: string) => {
    if (mode !== "reference") return val;
    return [val.slice(0, 4), val.slice(4, 8), val.slice(8, 14)]
      .filter(Boolean)
      .join("-");
  };

  const progress =
    mode === "reference"
      ? (inputValue.length / 14) * 100
      : Math.min((inputValue.length / 10) * 100, 100);

  const faqs = [
    {
      q: "Where can I find my 14-digit Reference Number?",
      a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every LESCO bill. It is the long number starting with your subdivision code.",
    },
    {
      q: "What is a Customer ID and how is it different?",
      a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest LESCO subdivision office.",
    },
    {
      q: "How current is the bill data?",
      a: "Bill data is fetched directly from LESCO's servers in real-time. It reflects the most recent bill issued for your connection.",
    },
    {
      q: "Can I pay my bill through this platform?",
      a: "Currently BillCheck allows you to view and download your bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized payment centre.",
    },
    {
      q: "Is my data safe on this platform?",
      a: "Yes. We do not store your reference number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <WebPageJsonLd
        url="https://billcheck.pk/lesco-bill"
        title="Check LESCO Bill Online 2026 — Instant LESCO Electricity Bill | BillCheck"
        description="Check your LESCO electricity bill online instantly. Enter your 14-digit reference number to view, download or print your LESCO bill. Free, fast, secure."
      />
      <SoftwareAppJsonLd
        name="LESCO Bill Check — BillCheck"
        description="Free online tool to check your LESCO electricity bill instantly. Enter your reference number to view, download and print your latest LESCO bill."
        url="https://billcheck.pk/lesco-bill"
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://billcheck.pk/" },
          { name: "Electricity Bills", url: "https://billcheck.pk/bill/electricity" },
          { name: "LESCO Bill", url: "https://billcheck.pk/lesco-bill" },
        ]}
      />
      <OrganizationJsonLd companyId="lesco" />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 50%, #7FB3B5 100%)",
        }}
      >
        <ElectricBg />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-6 md:mb-8"
          >
            <Link
              href="/"
              className="text-teal-100 hover:text-white transition-colors"
              style={{ fontSize: "13px" }}
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-teal-200" />
            <Link
              href="/bill/electricity"
              className="text-teal-100 hover:text-white transition-colors"
              style={{ fontSize: "13px" }}
            >
              Electricity Bill
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-teal-200" />
            <span
              className="text-white"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              LESCO Bill
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-5 md:mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
                <span
                  className="text-white"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  LESCO — Official Bill Check Portal
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white mb-4"
                style={{
                  fontSize: "clamp(32px, 6vw, 56px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Check Your LESCO Electricity Bill Online
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-teal-100 mb-6 md:mb-8"
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  lineHeight: 1.7,
                }}
              >
                Lahore Electric Supply Company (LESCO) serves over{" "}
                <strong className="text-white">5 million consumers</strong> in
                Lahore &amp; surrounding areas. Instantly check and download your
                bill.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: Shield, text: "100% Secure" },
                  { icon: Clock, text: "Real-time Data" },
                  { icon: Download, text: "Downloadable" },
                  { icon: Zap, text: "Instant Results" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm"
                  >
                    <item.icon
                      className="w-4 h-4 text-white shrink-0"
                      strokeWidth={2.5}
                    />
                    <span
                      className="text-white"
                      style={{ fontSize: "13px", fontWeight: 600 }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex items-center justify-center lg:justify-end order-first lg:order-none mb-6 lg:mb-0">
              <img
                src="/company_logos/lesco.jpg"
                alt="LESCO Logo"
                className="w-28 sm:w-36 lg:w-48 h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 48L60 42.7C120 37.3 240 26.7 360 21.3C480 16 600 16 720 21.3C840 26.7 960 37.3 1080 40C1200 42.7 1320 37.3 1380 34.7L1440 32V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-cyan-50 to-white pointer-events-none" />

                <div className="p-3 md:p-8 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 md:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0 relative overflow-hidden group bg-gradient-to-br from-cyan-500 to-cyan-700">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2
                          className="text-slate-900"
                          style={{
                            fontSize: "18px",
                            fontWeight: 800,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Check LESCO Bill
                        </h2>
                        <p
                          className="text-slate-500 font-medium"
                          style={{ fontSize: "12px" }}
                        >
                          Enter your reference number to get started
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                    <div className="flex p-1 bg-slate-50/80 rounded-lg mb-4 md:mb-6 border border-slate-100">
                      {(["reference", "customer"] as InputMode[]).map((m) => (
                        <button
                          key={m}
                          onClick={() => switchMode(m)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3.5 rounded-lg transition-all duration-300 ${
                            mode === m
                              ? "bg-white text-cyan-700 shadow-sm shadow-slate-200/50"
                              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
                          }`}
                          style={{
                            fontSize: "13px",
                            fontWeight: mode === m ? 700 : 600,
                          }}
                        >
                          {m === "reference" ? (
                            <Hash className="w-3.5 h-3.5" />
                          ) : (
                            <User className="w-3.5 h-3.5" />
                          )}
                          {m === "reference" ? "Reference No." : "Customer ID"}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="px-1 pb-1">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          {mode === "reference" ? (
                            <Hash className="w-5 h-5 text-slate-300 group-focus-within:text-cyan-500 transition-colors" />
                          ) : (
                            <User className="w-5 h-5 text-slate-300 group-focus-within:text-cyan-500 transition-colors" />
                          )}
                        </div>
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          inputMode="numeric"
                          value={
                            mode === "reference"
                              ? formatDisplay(inputValue)
                              : inputValue
                          }
                          onChange={handleInputChange}
                          placeholder={
                            mode === "reference"
                              ? "XXXX-XXXX-XXXXXX"
                              : "Enter Customer ID"
                          }
                          className={`w-full pl-11 pr-12 py-3.5 md:py-5 rounded-lg border-2 outline-none transition-all text-slate-900 placeholder-slate-300 shadow-sm ${
                            fieldError
                              ? "border-red-200 bg-red-50/50 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                              : inputValue.length === maxLen
                              ? "border-emerald-200 bg-emerald-50/30 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                              : "border-slate-200 bg-slate-50/50 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                          }`}
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            letterSpacing:
                              mode === "reference" ? "1px" : "0",
                          }}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                          <AnimatePresence>
                            {inputValue.length > 0 &&
                              inputValue.length < maxLen && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="text-slate-400 text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded-md"
                                >
                                  {inputValue.length}/{maxLen}
                                </motion.div>
                              )}
                            {inputValue.length === maxLen && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                              >
                                <CheckCircle2
                                  className="w-5 h-5 text-emerald-500"
                                  strokeWidth={3}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div
                        className="mt-[-2px] h-1 w-[calc(100%-24px)] mx-auto bg-slate-100 rounded-b-lg overflow-hidden transition-opacity duration-300"
                        style={{
                          opacity: inputValue.length > 0 ? 1 : 0,
                        }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              progress === 100
                                ? "#10B981"
                                : "linear-gradient(90deg, #3E8B8E, #7FB3B5)",
                          }}
                          animate={{ width: `${progress}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 30,
                          }}
                        />
                      </div>

                      <AnimatePresence>
                        {fieldError && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: -10,
                              height: 0,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              y: -10,
                              height: 0,
                            }}
                            className="flex items-center gap-2 mt-2.5 text-red-500 bg-red-50 p-2.5 rounded-lg"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span
                              style={{ fontSize: "12px", fontWeight: 500 }}
                            >
                              {fieldError}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 mt-4 px-5 py-3.5 rounded-lg text-white shadow-xl shadow-slate-400/20 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all disabled:opacity-70"
                        style={{
                          background:
                            "linear-gradient(135deg, #1A1F2E 0%, #2C3444 100%)",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        <Search className="w-4 h-4" />
                        {isSubmitting ? "Loading..." : "Check Bill Now"}
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5 lg:sticky lg:top-8 h-fit">
            <SearchHistoryCard
              history={history}
              onLoad={loadFromHistory}
              onDelete={deleteHistory}
              onClear={clearHistory}
            />

            <HowToCheckCard />

            {/* LESCO info card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg shadow-teal-900/10"
              style={{
                background:
                  "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 100%)",
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/10">
                    <Zap
                      className="w-6 h-6 text-yellow-300"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <div
                      className="text-white"
                      style={{ fontSize: "16px", fontWeight: 800 }}
                    >
                      LESCO
                    </div>
                    <div
                      className="text-teal-100"
                      style={{ fontSize: "13px" }}
                    >
                      Lahore Electric Supply Co.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Phone, text: "Helpline: 118" },
                    { icon: MapPin, text: "LESCO HQ, Lahore" },
                    { icon: Clock, text: "Support: 24/7" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-teal-200 shrink-0" />
                      <span
                        className="text-white font-medium"
                        style={{ fontSize: "13px" }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Other companies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 md:p-6"
            >
              <h3
                className="text-slate-900 mb-4"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                Other Companies
              </h3>
              <div className="space-y-2">
                {[
                  {
                    name: "K-Electric (KE)",
                    color: "#DC2626",
                    bg: "#FEF2F2",
                    path: "/bill/electricity",
                  },
                  {
                    name: "FESCO",
                    color: "#7C3AED",
                    bg: "#F5F3FF",
                    path: "/fesco-bill",
                  },
                  {
                    name: "IESCO",
                    color: "#0369A1",
                    bg: "#F0F9FF",
                    path: "/iesco-bill",
                  },
                ].map((co) => (
                  <Link
                    key={co.name}
                    href={co.path}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: co.bg,
                          color: co.color,
                        }}
                      >
                        <Zap className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <span
                        className="text-slate-600 group-hover:text-slate-900 transition-colors"
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      >
                        {co.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
