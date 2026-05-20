"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Flame, ArrowRight, Star } from "lucide-react";

export function CtaSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-16 md:mt-24 mb-8">
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-16 text-center shadow-2xl shadow-red-900/10" style={{ background: "linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #FCA5A5 100%)" }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "white" }} />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10 blur-3xl" style={{ background: "white" }} />
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute w-0.5 rounded-full"
              style={{ left: `${15 + i * 18}%`, top: 0, height: "100%", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.6, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-6 h-6 text-yellow-300 fill-yellow-300 drop-shadow-sm" />))}
            </div>
          </div>
          <h2 className="text-white mb-6" style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, lineHeight: 1.1 }}>Need to check another bill?</h2>
          <p className="text-red-100 max-w-xl mx-auto mb-10" style={{ fontSize: "16px", lineHeight: 1.6, fontWeight: 500 }}>Check gas, electricity and other utility bills from all major companies in Pakistan — free, fast and secure.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bill/gas" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ fontWeight: 700, fontSize: "15px" }}>
              <Flame className="w-5 h-5" />Check All Gas Bills Online
            </Link>
            <Link href="/" className="flex items-center justify-center gap-2 px-8 py-4 bg-red-800/20 text-white border border-white/20 rounded-lg hover:bg-red-800/30 transition-all duration-300 backdrop-blur-sm" style={{ fontWeight: 600, fontSize: "15px" }}>
              <ArrowRight className="w-5 h-5" />Check All Utility Bills
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
