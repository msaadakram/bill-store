"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, ChevronUp } from "lucide-react";
import type { BlogSection } from "@/data/blogData";
import { slugify } from "@/lib/utils/formatting";

/** Clean table of contents — matches LESCO-style card UI */
export function TableOfContents({ sections }: { sections: BlogSection[] }) {
  const headings = useMemo(
    () => sections.filter((s) => s.type === "h2" || s.type === "h3"),
    [sections]
  );
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const numberedHeadings = useMemo(() => {
    let h2 = 0;
    let h3 = 0;
    return headings.map((h) => {
      const id = slugify(h.heading || "");
      if (h.type === "h2") {
        h2++;
        h3 = 0;
        return { heading: h.heading || "", id, number: `${h2}`, isSubItem: false };
      } else {
        h3++;
        return { heading: h.heading || "", id, number: `${h2}.${h3}`, isSubItem: true };
      }
    });
  }, [headings]);

  useEffect(() => {
    if (numberedHeadings.length < 2) return;
    const ids = numberedHeadings.map((h) => h.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [numberedHeadings]);

  if (numberedHeadings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden mb-8 sm:mb-10 font-sans"
      aria-label="Table of contents"
    >
      {/* ── Header ── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #E0F7F4 0%, #CCFBF1 100%)" }}
          >
            <List className="w-[18px] h-[18px] text-teal-600" strokeWidth={2.2} />
          </div>
          <span className="text-slate-800 text-xs sm:text-[13px] font-extrabold tracking-[0.12em] uppercase">
            Table of Contents
          </span>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronUp className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      {/* ── Items ── */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 sm:pb-6 space-y-0.5">
              {numberedHeadings.map((h, i) => {
                const isActive = h.id === activeId;
                return (
                  <motion.button
                    key={h.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.025, duration: 0.25 }}
                    onClick={() => scrollToHeading(h.id)}
                    className={`relative w-full flex items-center gap-3 sm:gap-4 rounded-lg text-left transition-all duration-200 group
                      ${h.isSubItem ? "pl-8 sm:pl-10" : "pl-3 sm:pl-4"}
                      ${isActive
                        ? "py-2.5 sm:py-3 bg-teal-50/70 border-l-[3px] border-teal-500 pr-3 sm:pr-4"
                        : "py-2.5 sm:py-3 border-l-[3px] border-transparent hover:bg-slate-50 pr-3 sm:pr-4"
                      }`}
                  >
                    {/* Number */}
                    <span
                      className={`text-[12px] sm:text-[13px] font-bold shrink-0 tabular-nums transition-colors
                        ${isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-500"}`}
                      style={{ minWidth: h.isSubItem ? "28px" : "20px" }}
                    >
                      {h.number}
                    </span>

                    {/* Heading text */}
                    <span
                      className={`text-[13px] sm:text-[14px] leading-snug transition-colors
                        ${isActive
                          ? "text-teal-700 font-semibold"
                          : "text-slate-600 group-hover:text-slate-800 font-medium"
                        }`}
                    >
                      {h.heading}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
