import { ArrowRight } from "lucide-react";
import { howItWorksSteps } from "@/lib/constants/homeData";

/** 3-step "How it works" process section */
export function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-block px-3 py-1 rounded-lg bg-teal-50 text-teal-700 mb-3"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            HOW IT WORKS
          </div>
          <h2
            className="text-slate-900 font-serif"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}
          >
            Check Your Bill in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksSteps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < 2 && (
                <div className="hidden md:block absolute top-10 left-full w-8 -translate-x-4 z-10">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              )}
              <div className="flex flex-col items-center text-center p-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: item.bg }}
                >
                  <span style={{ fontSize: "28px", fontWeight: 900, color: item.color, lineHeight: 1 }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-slate-900 mb-2" style={{ fontSize: "18px", fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p className="text-slate-500" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
