import Link from "next/link";
import { FileText, Mail, Phone, MapPin, Zap, Flame, Droplets, Wifi, ArrowRight } from "lucide-react";

const billLinks = [
  { label: "Electricity Bill", path: "/bill/electricity", icon: Zap },
  { label: "Gas Bill", path: "/bill/gas", icon: Flame },
  { label: "Water Bill", path: "/bill/water", icon: Droplets },
  { label: "Internet Bill", path: "/bill/internet", icon: Wifi },
  { label: "Other Bills", path: "/bill/other", icon: FileText },
];

const guideLinks = [
  { label: "All Articles", path: "/blog" },
  { label: "LESCO Bill Guide", path: "/blog/how-to-check-lesco-bill-online-2026" },
  { label: "K-Electric Guide", path: "/blog/k-electric-bill-check-online-guide" },
  { label: "Energy Saving Tips", path: "/blog/10-tips-reduce-electricity-bill-pakistan" },
  { label: "SNGPL Gas Bill", path: "/blog/sngpl-gas-bill-check-online-guide" },
  { label: "Go Solar in Pakistan", path: "/blog/solar-energy-pakistan-reduce-electricity-bills" },
];

const companies = ["LESCO", "FESCO", "IESCO", "MEPCO", "GEPCO", "K-Electric", "SNGPL", "SSGC"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-50 border-t border-slate-200">
      {/* Soft page-consistent background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-28 -right-20 w-[420px] h-[420px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #3E8B8E18 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-[340px] h-[340px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #5A9FA214 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        {/* CTA card */}
        <div
          className="rounded-3xl p-6 md:p-8 text-white shadow-xl mb-10"
          style={{ background: "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 55%, #7FB3B5 100%)" }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div>
              <h3 className="font-serif" style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 700 }}>
                Check Your Utility Bills Instantly
              </h3>
              <p className="text-white/85 mt-1.5" style={{ fontSize: "15px" }}>
                Same fast experience, now with a footer that matches your full website UI.
              </p>
            </div>
            <Link
              href="/bill/electricity"
              className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 bg-white text-teal-700 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ fontWeight: 700, fontSize: "14px" }}
            >
              <Zap className="w-4 h-4" />
              Check Bill Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7">
          {/* Brand + contact card */}
          <div className="sm:col-span-2 lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #3E8B8E, #5A9FA2)" }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-slate-900 font-serif" style={{ fontWeight: 700, fontSize: "17px" }}>
                  BillCheck
                </div>
                <div className="text-teal-600" style={{ fontSize: "11px", fontWeight: 600 }}>
                  Pakistan
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed" style={{ fontSize: "14px" }}>
              Pakistan&apos;s fastest utility bill checking platform. Check electricity, gas, water and internet bills
              instantly — all in one place.
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5 text-slate-600" style={{ fontSize: "13px" }}>
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                Lahore, Punjab, Pakistan
              </div>
              <div className="flex items-center gap-2.5 text-slate-600" style={{ fontSize: "13px" }}>
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                support@billcheck.pk
              </div>
              <div className="flex items-center gap-2.5 text-slate-600" style={{ fontSize: "13px" }}>
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                +92 300 1234567
              </div>
            </div>
          </div>

          {/* Bill Types */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h4 className="text-slate-900 mb-3.5 font-sans" style={{ fontSize: "14px", fontWeight: 700 }}>
              Bill Types
            </h4>
            <ul className="space-y-2.5">
              {billLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link href={link.path} className="group flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-teal-600/80 group-hover:text-teal-700 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Companies */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h4 className="text-slate-900 mb-3.5 font-sans" style={{ fontSize: "14px", fontWeight: 700 }}>
              Companies
            </h4>
            <ul className="space-y-2.5">
              {companies.map((name) => (
                <li key={name}>
                  <span className="text-sm text-slate-600 hover:text-teal-700 transition-colors cursor-pointer">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Guides */}
          <div className="sm:col-span-2 lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h4 className="text-slate-900 mb-3.5 font-sans" style={{ fontSize: "14px", fontWeight: 700 }}>
              Blog & Guides
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {guideLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="group flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors">
                    <ArrowRight className="w-3 h-3 text-teal-600/70 group-hover:text-teal-700 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500" style={{ fontSize: "13px" }}>
            © 2026 BillCheck Pakistan. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500" style={{ fontSize: "13px" }}>
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
