"use client";

import { useRouter } from "next/navigation";
import { Zap, Flame, Star } from "lucide-react";

/** Bottom CTA banner with gradient background and action buttons */
export function CTABanner() {
  const router = useRouter();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 50%, #7FB3B5 100%)",
          }}
        >
          {/* Decoration */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
            style={{ background: "white" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: "white" }}
          />

          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                ))}
              </div>
            </div>
            <h2
              className="text-white mb-4 font-serif"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Ready to Check Your Bill?
            </h2>
            <p
              className="text-teal-100 max-w-xl mx-auto mb-8"
              style={{ fontSize: "16px", lineHeight: 1.6 }}
            >
              Join millions of Pakistanis who check their utility bills online with BillCheck —
              it&apos;s free, fast, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push("/bill/electricity")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ fontWeight: 700, fontSize: "15px" }}
              >
                <Zap className="w-4 h-4" />
                Check Electricity Bill
              </button>
              <button
                onClick={() => router.push("/bill/gas")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/20 text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-200"
                style={{ fontWeight: 600, fontSize: "15px" }}
              >
                <Flame className="w-4 h-4" />
                Check Gas Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
