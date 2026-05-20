"use client";

import { CheckCircle2 } from "lucide-react";
import { Company } from "@/data/billData";

interface Props {
  company: Company;
  selected: boolean;
  onSelect: (company: Company) => void;
}

export function CompanyCard({ company, selected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(company)}
      className={`group relative w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-md shadow-teal-100"
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="w-5 h-5 text-teal-500" strokeWidth={2.5} />
        </div>
      )}

      <div className="p-4">
        {/* Logo placeholder */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: company.color }}
        >
          <span style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1 }}>
            {company.short.slice(0, 2)}
          </span>
        </div>

        {/* Short name badge */}
        <span
          className="inline-block px-2 py-0.5 rounded-md mb-2"
          style={{
            backgroundColor: company.bg,
            color: company.color,
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          {company.short}
        </span>

        {/* Full name */}
        <h4
          className="text-slate-900 mb-1 leading-tight"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          {company.name}
        </h4>
        <p className="text-slate-500" style={{ fontSize: "12px" }}>
          {company.description}
        </p>
      </div>
    </button>
  );
}
