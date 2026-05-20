"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { quickCompanies, stats } from "@/lib/constants/homeData";
import { SearchModal } from "@/components/SearchModal";

/** Full hero section with headline, search bar, quick companies, and stats */
export function HeroSection() {
  const router = useRouter();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchModalOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #3E8B8E20 0%, #5A9FA210 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #8B5CF620 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-teal-700" style={{ fontSize: "13px", fontWeight: 600 }}>
              Pakistan&apos;s #1 Bill Checking Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1
            className="text-slate-900 mb-4 leading-tight font-serif"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1 }}
          >
            Check Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Utility Bills
            </span>{" "}
            Online Instantly
          </h1>
          <p
            className="text-slate-500 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6 }}
          >
            Check electricity, gas, water and other utility bills from all major
            companies in Pakistan — fast, free, and secure.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-3 p-2 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100">
              <div className="flex items-center gap-3 flex-1 pl-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  readOnly
                  onClick={() => setSearchModalOpen(true)}
                  onFocus={(e) => { e.target.blur(); setSearchModalOpen(true); }}
                  placeholder="Enter your reference / consumer number..."
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 min-w-0 cursor-pointer"
                  style={{ fontSize: "15px" }}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 text-white rounded-xl shadow-md shadow-teal-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 shrink-0"
                style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)', fontSize: '14px', fontWeight: 600 }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Check Bill</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>
          </form>

          {/* Quick Companies */}
          <div className="mt-5">
            <div className="text-center text-slate-400 mb-3" style={{ fontSize: "12px", fontWeight: 500 }}>
              QUICK ACCESS
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {quickCompanies.map((company) => (
                <button
                  key={company.name}
                  onClick={() => router.push(company.path)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: company.color, fontSize: "8px", fontWeight: 800 }}
                  >
                    {company.short}
                  </div>
                  <span className="text-slate-700" style={{ fontSize: "12px", fontWeight: 600 }}>
                    {company.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-slate-900" style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div className="text-slate-400 mt-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </section>
  );
}
