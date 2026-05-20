"use client";

import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Info, Star } from "lucide-react";
import type { BlogSection } from "@/data/blogData";
import { slugify } from "@/lib/utils/formatting";

/** Render bold text with dash or colon splitting */
function renderBoldText(text: string) {
  const dashSplit = text.split(/\s[—–]\s/);
  if (dashSplit.length >= 2) {
    return (
      <>
        <strong className="text-slate-900 font-semibold">{dashSplit[0]}</strong>
        <span className="text-slate-400 mx-1">—</span>
        <span>{dashSplit.slice(1).join(" — ")}</span>
      </>
    );
  }
  const colonIdx = text.indexOf(": ");
  if (colonIdx > 0 && colonIdx < 60) {
    return (
      <>
        <strong className="text-slate-900 font-semibold">{text.slice(0, colonIdx)}</strong>
        <span>: {text.slice(colonIdx + 2)}</span>
      </>
    );
  }
  return text;
}

/** Animated renderer for a single blog content section */
export function RenderSection({ section, index }: { section: BlogSection; index: number }) {
  const id = (section.type === "h2" || section.type === "h3") && section.heading
    ? slugify(section.heading)
    : undefined;

  const wrapper = (children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );

  switch (section.type) {
    case "intro":
      return wrapper(
        <p className="text-slate-600 leading-relaxed text-[15.5px] sm:text-[17.5px]" style={{ lineHeight: 1.95, letterSpacing: "0.01em" }}>
          {section.text}
        </p>
      );

    case "h2":
      return wrapper(
        <h2
          id={id}
          className="text-slate-900 mt-10 sm:mt-12 mb-4 font-serif scroll-mt-24"
          style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, lineHeight: 1.2 }}
        >
          {section.heading}
        </h2>
      );

    case "h3":
      return wrapper(
        <h3
          id={id}
          className="text-slate-800 mt-7 sm:mt-8 mb-3 font-serif scroll-mt-24"
          style={{ fontSize: "clamp(17px, 2.5vw, 20px)", fontWeight: 700, lineHeight: 1.3 }}
        >
          {section.heading}
        </h3>
      );

    case "p":
      return wrapper(
        <p className="text-slate-600 text-[15px] sm:text-[16.5px]" style={{ lineHeight: 1.9, letterSpacing: "0.01em" }}>
          {section.text}
        </p>
      );

    case "ul":
      return wrapper(
        <div className="my-4 space-y-2.5">
          {section.items?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-300"
            >
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}
              >
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-slate-700 text-[13.5px] sm:text-[15px]" style={{ lineHeight: 1.75 }}>
                {renderBoldText(item)}
              </span>
            </motion.div>
          ))}
        </div>
      );

    case "ol":
      return wrapper(
        <div className="my-4 space-y-2.5">
          {section.items?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-300"
            >
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-white mt-0.5"
                style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", fontSize: "10px", fontWeight: 800 }}
              >
                {i + 1}
              </div>
              <span className="text-slate-700 text-[13.5px] sm:text-[15px]" style={{ lineHeight: 1.75 }}>
                {renderBoldText(item)}
              </span>
            </motion.div>
          ))}
        </div>
      );

    case "callout": {
      const styles: Record<string, { bg: string; border: string; text: string; icon: typeof Info }> = {
        info: { bg: "#EFF6FF", border: "#93C5FD", text: "#1D4ED8", icon: Info },
        success: { bg: "#ECFDF5", border: "#6EE7B7", text: "#059669", icon: CheckCircle2 },
        warning: { bg: "#FFFBEB", border: "#FCD34D", text: "#D97706", icon: AlertCircle },
        error: { bg: "#FEF2F2", border: "#FCA5A5", text: "#DC2626", icon: AlertCircle },
      };
      const s = styles[section.variant || "info"];
      const Icon = s.icon;
      return wrapper(
        <div
          className="rounded-xl p-4 sm:p-5 my-4 border-l-4 flex items-start gap-3"
          style={{ backgroundColor: s.bg, borderColor: s.border }}
        >
          <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: s.text }} />
          <p className="italic text-[13px] sm:text-[15px]" style={{ lineHeight: 1.8, color: s.text, fontWeight: 500 }}>
            &ldquo;{section.text}&rdquo;
          </p>
        </div>
      );
    }

    case "tip":
      return wrapper(
        <div className="rounded-xl p-4 sm:p-5 my-4 border-l-4 border-teal-400 bg-teal-50/80 flex items-start gap-3">
          <Star className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <p className="italic text-teal-700 text-[13px] sm:text-[15px]" style={{ lineHeight: 1.8, fontWeight: 500 }}>
            &ldquo;{section.text}&rdquo;
          </p>
        </div>
      );

    case "warning":
      return wrapper(
        <div className="rounded-xl p-4 sm:p-5 my-4 border-l-4 border-red-400 bg-red-50/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="italic text-red-700 text-[13px] sm:text-[15px]" style={{ lineHeight: 1.8, fontWeight: 500 }}>
            &ldquo;{section.text}&rdquo;
          </p>
        </div>
      );

    case "table":
      return wrapper(
        <div className="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-sm -mx-1 sm:mx-0">
          <table className="w-full min-w-[340px] border-collapse">
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #1A1F2E, #2C3444)" }}>
                {section.headers?.map((h, i) => (
                  <th key={i} className="text-left px-3 sm:px-4 py-2.5 sm:py-3 text-white text-[11px] sm:text-xs font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} className={`${ri % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-teal-50/30 transition-colors`}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-slate-100 text-slate-700 text-[12px] sm:text-[13px]" style={{ lineHeight: 1.5 }}>
                      {ci === 0 ? <span className="font-semibold">{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return (
        <div className="my-8 sm:my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-teal-300" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
      );

    default:
      return null;
  }
}
