"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Shield,
  Clock,
  Download,
  Flame,
  ChevronRight,
} from "lucide-react";
import { GasBg } from "./GasBg";

export function SsgcHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #FCA5A5 100%)",
      }}
    >
      <GasBg />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-6 md:mb-8"
        >
          <Link
            href="/"
            className="text-red-200 hover:text-white transition-colors"
            style={{ fontSize: "13px" }}
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-red-300" />
          <Link
            href="/bill/gas"
            className="text-red-200 hover:text-white transition-colors"
            style={{ fontSize: "13px" }}
          >
            Gas Bill
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-red-300" />
          <span
            className="text-white"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            SSGC Bill
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            {/* Badge */}
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
                SSGC — Official Bill Check Portal
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
              Check your SSGC gas bill online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-red-100 mb-6 md:mb-8"
              style={{
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.7,
              }}
            >
              Sui Southern Gas Company (SSGC) serves over{" "}
              <strong className="text-white">4 million consumers across Sindh &amp; Balochistan</strong>.
              Instantly check and download your gas bill.
            </motion.p>

            {/* Highlights */}
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
                { icon: Flame, text: "Instant Results" },
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
        </div>
      </div>

      {/* Wave bottom */}
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
  );
}
