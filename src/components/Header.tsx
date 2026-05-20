"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap,
  Menu,
  X,
  FileText,
  Search,
} from "lucide-react";
import { SearchModal } from "@/components/SearchModal";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "LESCO Bill", path: "/lesco-bill" },
  { label: "Electricity Bill", path: "/bill/electricity" },
  { label: "Gas Bill", path: "/bill/gas" },
  { label: "Blog", path: "/blog" },
  { label: "Other Bills", path: "/bill/other" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)' }}>
              <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-slate-900 font-serif"
                style={{ fontSize: "15px", fontWeight: 700, lineHeight: "1.1" }}
              >
                BillCheck
              </span>
              <span
                className="text-teal-600"
                style={{ fontSize: "10px", fontWeight: 500, lineHeight: "1" }}
              >
                Pakistan
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                style={{ fontWeight: isActive(link.path) ? 600 : 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search icon + CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-teal-600 transition-colors"
              title="Quick Bill Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => router.push("/bill/electricity")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-white rounded-xl shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-300 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)', fontSize: '13px', fontWeight: 600 }}
            >
              <Zap className="w-4 h-4" />
              Check Bill
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive(link.path)
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                style={{ fontWeight: isActive(link.path) ? 600 : 500 }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => {
                  router.push("/bill/electricity");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-xl"
                style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)', fontSize: '14px', fontWeight: 600 }}
              >
                <Zap className="w-4 h-4" />
                Check Bill Now
              </button>
            </div>
          </div>
        )}
      </div>

      <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </header>
  );
}
