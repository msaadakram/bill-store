"use client";

import { motion, AnimatePresence } from "motion/react";
import { Flame, History, Trash2, X } from "lucide-react";
import type { HistoryEntry } from "../_lib/types";

export function SearchHistoryCard({
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
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #DC2626, #EF4444, #FCA5A5)",
          }}
        />
        <div className="p-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <History className="w-4 h-4 text-red-500" />
            </div>
            <h3
              className="text-slate-900"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              Recent Searches
            </h3>
          </div>
          <div className="flex flex-col items-center py-5 text-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
              }}
            >
              <History className="w-5 h-5 text-red-300" />
            </div>
            <p
              className="text-slate-500"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              No searches yet
            </p>
            <p className="text-slate-400 mt-1" style={{ fontSize: "11px" }}>
              Your recent bill checks will appear here
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #DC2626, #EF4444, #FCA5A5)",
        }}
      />

      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <History className="w-3.5 h-3.5 text-red-600" />
          </div>
          <span
            className="text-slate-900"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            Recent Searches
          </span>
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
              color: "#DC2626",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            {history.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
          style={{ fontSize: "11px", fontWeight: 600 }}
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="px-3 pb-3 space-y-2">
        <AnimatePresence>
          {history.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-lg border border-slate-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, #FFFAFA 0%, #FEF2F2 100%)",
              }}
              onClick={() => onLoad(entry)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: "#DC2626" }}
              />
              <div className="flex items-center gap-3 pl-4 pr-3 py-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
                  }}
                >
                  <Flame
                    className="w-3.5 h-3.5 text-red-700"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-slate-800 font-mono block"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      wordBreak: "break-all",
                    }}
                  >
                    {entry.ref}
                  </span>
                  <span
                    className="text-slate-400 block truncate mt-0.5"
                    style={{ fontSize: "11px" }}
                  >
                    {entry.customerName}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="w-5 h-5 rounded-md flex items-center justify-center bg-slate-100 hover:bg-red-50 transition-colors shrink-0"
                >
                  <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
