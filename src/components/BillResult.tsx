"use client";

import {
  User,
  Hash,
  DollarSign,
  Calendar,
  Zap,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { Company, BillTypeInfo } from "@/data/billData";

export interface BillData {
  customerName: string;
  referenceNumber: string;
  amount: string;
  dueDate: string;
  units?: string;
  billMonth: string;
  status: "paid" | "unpaid" | "overdue";
  address: string;
}

interface Props {
  billData: BillData;
  company: Company;
  billType: BillTypeInfo;
  onReset: () => void;
}

function handlePrint() {
  window.print();
}

function handleDownload(billData: BillData, company: Company) {
  const content = `
BILL STATEMENT
==============
Company: ${company.name} (${company.short})
Customer Name: ${billData.customerName}
Reference No: ${billData.referenceNumber}
Bill Month: ${billData.billMonth}
Address: ${billData.address}
${billData.units ? `Units Consumed: ${billData.units} kWh` : ""}
Amount Due: PKR ${billData.amount}
Due Date: ${billData.dueDate}
Status: ${billData.status.toUpperCase()}
  `.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bill-${billData.referenceNumber}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

const statusConfig = {
  paid: { label: "Paid", bg: "#ECFDF5", color: "#059669", icon: CheckCircle2 },
  unpaid: { label: "Unpaid", bg: "#FEF3C7", color: "#D97706", icon: AlertCircle },
  overdue: { label: "Overdue", bg: "#FEF2F2", color: "#DC2626", icon: AlertCircle },
};

export function BillResult({ billData, company, billType, onReset }: Props) {
  const status = statusConfig[billData.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div
        className="px-6 py-5 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${company.color}15 0%, ${company.color}05 100%)`,
          borderBottom: `1px solid ${company.color}20`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: company.color }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              {company.short.slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="text-slate-900" style={{ fontSize: "14px", fontWeight: 700 }}>
              {company.short} — Bill Statement
            </div>
            <div className="text-slate-500" style={{ fontSize: "12px" }}>
              {billData.billMonth}
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: status.bg, color: status.color }}
        >
          <StatusIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span style={{ fontSize: "12px", fontWeight: 700 }}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Bill Details */}
      <div className="p-6">
        {/* Amount highlight */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-50 border border-teal-100 text-center">
          <div className="text-slate-500 mb-1" style={{ fontSize: "13px" }}>
            Total Amount Payable
          </div>
          <div
            className="text-slate-900"
            style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1.1 }}
          >
            PKR {billData.amount}
          </div>
          <div className="mt-2 text-slate-500" style={{ fontSize: "12px" }}>
            Due by{" "}
            <span className="text-red-500" style={{ fontWeight: 600 }}>
              {billData.dueDate}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: User,
              label: "Customer Name",
              value: billData.customerName,
              color: "#4D9699",
            },
            {
              icon: Hash,
              label: "Reference Number",
              value: billData.referenceNumber,
              color: "#7C3AED",
            },
            {
              icon: Calendar,
              label: "Due Date",
              value: billData.dueDate,
              color: "#DC2626",
            },
            {
              icon: Building2,
              label: "Service Provider",
              value: company.name,
              color: company.color,
            },
            ...(billData.units
              ? [
                  {
                    icon: Zap,
                    label: "Units Consumed",
                    value: `${billData.units} kWh`,
                    color: "#F59E0B",
                  },
                ]
              : []),
            {
              icon: DollarSign,
              label: "Bill Month",
              value: billData.billMonth,
              color: "#10B981",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                <item.icon className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-slate-400" style={{ fontSize: "11px", fontWeight: 500 }}>
                  {item.label}
                </div>
                <div className="text-slate-900" style={{ fontSize: "13px", fontWeight: 600 }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="p-3.5 rounded-xl bg-slate-50 mb-6">
          <div className="text-slate-400 mb-0.5" style={{ fontSize: "11px", fontWeight: 500 }}>
            Service Address
          </div>
          <div className="text-slate-900" style={{ fontSize: "13px", fontWeight: 600 }}>
            {billData.address}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleDownload(billData, company)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3E8B8E] to-[#5A9FA2] text-white rounded-xl shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-300 transition-all duration-200 hover:-translate-y-0.5"
            style={{ fontWeight: 600, fontSize: "14px" }}
          >
            <Download className="w-4 h-4" />
            Download Bill
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-700 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
            style={{ fontWeight: 600, fontSize: "14px" }}
          >
            <Printer className="w-4 h-4" />
            Print Bill
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onReset}
            className="text-teal-600 hover:text-teal-700 transition-colors"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            ← Check another bill
          </button>
        </div>
      </div>
    </div>
  );
}
