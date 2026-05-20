"use client";

import { useRouter } from "next/navigation";
import { Zap, Flame, Droplets, Wifi, MoreHorizontal, ChevronRight } from "lucide-react";
import { BillTypeInfo } from "@/data/billData";

interface Props {
  bill: BillTypeInfo;
  featured?: boolean;
}

const icons: Record<string, React.ReactNode> = {
  electricity: <Zap className="w-6 h-6" strokeWidth={2.5} />,
  gas: <Flame className="w-6 h-6" strokeWidth={2.5} />,
  water: <Droplets className="w-6 h-6" strokeWidth={2.5} />,
  internet: <Wifi className="w-6 h-6" strokeWidth={2.5} />,
  other: <MoreHorizontal className="w-6 h-6" strokeWidth={2.5} />,
};

export function BillTypeCard({ bill, featured = false }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/bill/${bill.type}`)}
      className="group relative w-full text-left bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${bill.gradientFrom}, ${bill.gradientTo})` }}
      />

      <div className="p-5 pt-6">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: bill.bgLight, color: bill.iconColor }}
        >
          {icons[bill.type]}
        </div>

        {/* Content */}
        <h3
          className="text-slate-900 mb-1.5"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          {bill.label}
        </h3>
        <p className="text-slate-500 leading-relaxed mb-4" style={{ fontSize: "13px" }}>
          {bill.description}
        </p>

        {/* Companies count */}
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-1 rounded-lg"
            style={{
              backgroundColor: bill.bgLight,
              color: bill.iconColor,
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {bill.companies.length} {bill.companies.length === 1 ? "Provider" : "Providers"}
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ backgroundColor: bill.bgLight, color: bill.iconColor }}
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </button>
  );
}
