"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Zap, ChevronRight } from "lucide-react";
import { SearchHistoryCard } from "./SearchHistoryCard";
import { HowToCheckCard } from "./HowToCheckCard";
import type { HistoryEntry } from "../_lib/types";

export function IescoSidebar({
  history,
  onLoad,
  onDelete,
  onClear,
}: {
  history: HistoryEntry[];
  onLoad: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-5 lg:sticky lg:top-8 h-fit">
      <SearchHistoryCard
        history={history}
        onLoad={onLoad}
        onDelete={onDelete}
        onClear={onClear}
      />

      <HowToCheckCard />

      {/* IESCO info card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl overflow-hidden shadow-lg shadow-teal-900/10"
        style={{
          background: "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 100%)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/10">
              <Zap className="w-6 h-6 text-yellow-300" strokeWidth={2.5} />
            </div>
            <div>
              <div
                className="text-white"
                style={{ fontSize: "16px", fontWeight: 800 }}
              >
                IESCO
              </div>
              <div className="text-teal-200" style={{ fontSize: "13px" }}>
                Islamabad Electric Supply Co.
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { text: "Helpline: 118" },
              { text: "IESCO HQ, Islamabad" },
              { text: "Support: 24/7" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
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

      {/* Other companies card */}
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
              name: "LESCO Bill Check",
              color: "#1D4ED8",
              bg: "#EFF6FF",
              path: "/lesco-bill",
            },
            {
              name: "FESCO Online Bill",
              color: "#7C3AED",
              bg: "#F5F3FF",
              path: "/fesco-bill",
            },
            {
              name: "K-Electric Bill Check",
              color: "#DC2626",
              bg: "#FEF2F2",
              path: "/bill/electricity",
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
                  style={{ backgroundColor: co.bg, color: co.color }}
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
  );
}
