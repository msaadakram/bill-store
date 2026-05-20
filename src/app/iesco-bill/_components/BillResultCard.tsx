"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Hash,
  User,
  Download,
  Printer,
  RotateCcw,
  Calendar,
  Activity,
  MapPin,
  Clock,
  Building2,
  BarChart3,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import type { BillDetails } from "../_lib/types";
import { AnimatedNumber } from "./AnimatedNumber";

const PITC_URL = "https://bill.pitc.com.pk/iescobill/general?refno=";

export function BillResultCard({
  bill,
  onReset,
}: {
  bill: BillDetails;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const statusMap = {
    paid: { label: "Paid", bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
    unpaid: {
      label: "Unpaid",
      bg: "#FFF7ED",
      color: "#D97706",
      dot: "#F59E0B",
    },
    overdue: {
      label: "Overdue",
      bg: "#FEF2F2",
      color: "#DC2626",
      dot: "#EF4444",
    },
  };
  const st = statusMap[bill.status];

  const handleCopy = () => {
    navigator.clipboard.writeText(bill.referenceNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const txt = `IESCO BILL STATEMENT\n${"=".repeat(40)}\nCustomer: ${bill.customerName}\nAddress: ${bill.address}\nReference No: ${bill.referenceNo}\nCustomer ID: ${bill.customerId}\nBill Month: ${bill.billMonth}\nMeter No: ${bill.meterNo}\nConnection: ${bill.connectionType}\nUnits Consumed: ${bill.unitsConsumed} kWh\nBill Amount: PKR ${bill.billAmount.toLocaleString()}\nTax (17%): PKR ${bill.taxAmount.toLocaleString()}\nSurcharge: PKR ${bill.surcharge.toLocaleString()}\nPrevious Balance: PKR ${bill.previousBalance.toLocaleString()}\nTotal Payable: PKR ${bill.totalPayable.toLocaleString()}\nDue Date: ${bill.dueDate}\nStatus: ${bill.status.toUpperCase()}`;
    const blob = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `IESCO-Bill-${bill.referenceNo}.txt`;
    a.click();
  };

  const items = [
    {
      icon: User,
      label: "Customer Name",
      value: bill.customerName,
      color: "#3E8B8E",
    },
    {
      icon: Hash,
      label: "Reference No.",
      value: bill.referenceNo,
      color: "#5A9FA2",
      copy: true,
    },
    {
      icon: Building2,
      label: "Customer ID",
      value: bill.customerId,
      color: "#2C6E70",
    },
    { icon: Activity, label: "Meter No.", value: bill.meterNo, color: "#059669" },
    {
      icon: Zap,
      label: "Units Consumed",
      value: `${bill.unitsConsumed} kWh`,
      color: "#F59E0B",
    },
    {
      icon: BarChart3,
      label: "Connection Type",
      value: bill.connectionType,
      color: "#7FB3B5",
    },
    {
      icon: Calendar,
      label: "Bill Month",
      value: bill.billMonth,
      color: "#3E8B8E",
    },
    {
      icon: Clock,
      label: "Due Date",
      value: bill.dueDate,
      color: "#DC2626",
    },
  ];

  const breakdown = [
    { label: "Bill Amount", value: bill.billAmount, color: "#0F172A" },
    { label: "GST (17%)", value: bill.taxAmount, color: "#64748B" },
    { label: "Surcharge", value: bill.surcharge, color: "#64748B" },
    { label: "Previous Balance", value: bill.previousBalance, color: "#DC2626" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 md:px-6 py-5 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 60%, #7FB3B5 100%)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 right-16 w-24 h-24 rounded-full bg-white/5" />
        <div className="flex items-center gap-3 md:gap-4 relative">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" strokeWidth={2.5} />
          </div>
          <div>
            <div
              className="text-white"
              style={{ fontSize: "15px", fontWeight: 800 }}
            >
              IESCO Bill Statement
            </div>
            <div className="text-teal-200" style={{ fontSize: "12px" }}>
              {bill.billMonth}
            </div>
          </div>
        </div>
        <div
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
          style={{
            backgroundColor: `${st.bg}20`,
            borderColor: `${st.dot}50`,
            color: "white",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: st.dot }}
          />
          <span style={{ fontSize: "12px", fontWeight: 700 }}>{st.label}</span>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        {/* Total Amount */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-xl p-5 md:p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, #F0F9FF 0%, #E0F7FA 50%, #B2EBF2 100%)",
          }}
        >
          <div
            className="text-slate-500 mb-1"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            Total Payable Amount
          </div>
          <div
            className="text-teal-700"
            style={{
              fontSize: "clamp(32px, 8vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            PKR <AnimatedNumber value={bill.totalPayable} />
          </div>
          <div
            className="mt-1.5 text-red-500"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            Due by {bill.dueDate}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs justify-center">
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: [
                      "#3E8B8E",
                      "#5A9FA2",
                      "#F59E0B",
                      "#DC2626",
                    ][i],
                  }}
                />
                <span className="text-slate-500" style={{ fontSize: "11px" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bill Breakdown */}
        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <span
              className="text-slate-600"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              BILL BREAKDOWN
            </span>
          </div>
          {breakdown.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
              className={`flex items-center justify-between px-4 py-3 ${
                i < breakdown.length - 1 ? "border-b border-slate-50" : ""
              }`}
            >
              <span className="text-slate-500" style={{ fontSize: "13px" }}>
                {row.label}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: row.color,
                }}
              >
                PKR {row.value.toLocaleString()}
              </span>
            </motion.div>
          ))}
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{
              background:
                "linear-gradient(135deg, #3E8B8E 0%, #5A9FA2 100%)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              Total Payable
            </span>
            <span style={{ fontSize: "16px", fontWeight: 800 }}>
              PKR {bill.totalPayable.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                }}
              >
                <item.icon className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-slate-400"
                  style={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {item.label}
                </div>
                <div
                  className="text-slate-900 truncate"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  {item.value}
                </div>
              </div>
              {(item as any).copy && (
                <button
                  onClick={handleCopy}
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Address */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex items-start gap-3 p-4 rounded-lg bg-slate-50"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600">
            <MapPin className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div>
            <div
              className="text-slate-400 mb-0.5"
              style={{ fontSize: "11px", fontWeight: 500 }}
            >
              Service Address
            </div>
            <div
              className="text-slate-900"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {bill.address}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #1A1F2E 0%, #2C3444 100%)",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            <Download className="w-4 h-4" />
            Download Bill
          </button>
          <a
            href={PITC_URL + bill.referenceNo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            <ExternalLink className="w-4 h-4" />
            View on Official Portal
          </a>
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            <Printer className="w-4 h-4" />
            Print Bill
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center pt-1"
        >
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 transition-colors"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Check another bill
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
