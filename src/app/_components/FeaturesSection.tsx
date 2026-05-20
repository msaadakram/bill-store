"use client";

import { features } from "@/lib/constants/homeData";

/** "Why Choose Us" feature-cards grid */
export function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-block px-3 py-1 rounded-lg bg-teal-50 text-teal-700 mb-3"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            WHY CHOOSE US
          </div>
          <h2
            className="text-slate-900 font-serif"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}
          >
            Fast, Secure & Reliable
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: feat.bg, color: feat.color }}
              >
                <feat.icon className="w-6 h-6" />
              </div>
              <h4
                className="text-slate-900 mb-2"
                style={{ fontSize: "16px", fontWeight: 700 }}
              >
                {feat.title}
              </h4>
              <p className="text-slate-500" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
