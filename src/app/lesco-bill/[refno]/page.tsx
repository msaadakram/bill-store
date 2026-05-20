"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Zap,
  Hash,
  User,
  Download,
  Printer,
  Calendar,
  Activity,
  MapPin,
  Clock,
  Building2,
  BarChart3,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { AnimatedNumber } from "../_components/AnimatedNumber";

const TOKEN = "dltUxN3F1zaT6K3bsC0iN_3YmcxJYntiOX1xA7pTZie-xkzRXXyQRijHW94kljqVOtPFEp4lNs8HG19vmaTyZug_zWiz9uonytecveXelzo1";

interface BillData {
  customerName: string;
  address: string;
  referenceNo: string;
  consumerId: string;
  connectionType: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  lastDate: string;
  unitsConsumed: number;
  billAmount: number;
  totalPayable: number;
  status: "paid" | "unpaid" | "overdue";
  meterNo: string;
  tariffCode: string;
  sanctionedLoad: string;
  amountAfterDue: number;
  amountPaid: number;
  paymentDate: string;
  connectionDate: string;
  division: string;
  subDivision: string;
}

interface ApiResponse {
  success: boolean;
  data?: BillData;
  error?: string;
  redirectUrl?: string;
}

async function fetchBillFromApi(
  refno: string,
  type: string,
): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/bill/lesco", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refno, type: type || "U" }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error while fetching bill" };
  }
}

async function fetchBillViaPitcPage(
  refno: string,
  type: string,
): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/bill/lesco/redirect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refno, type: type || "U" }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

export default function LescoBillDetailPage({
  params,
}: {
  params: Promise<{ refno: string }>;
}) {
  const { refno } = use(params);
  const [bill, setBill] = useState<BillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pitcRedirect, setPitcRedirect] = useState("");

  const fetchBill = async () => {
    setLoading(true);
    setError("");
    setBill(null);
    setPitcRedirect("");

    // First try: via our API (direct POST with token)
    const result = await fetchBillFromApi(refno, "U");
    if (result.success && result.data) {
      setBill(result.data);
      setLoading(false);
      return;
    }

    // Second try: If PITC redirected us, use the redirect-based API to follow through
    if (result.error && result.error.includes("redirect")) {
      setPitcRedirect(result.redirectUrl || `https://bill.pitc.com.pk/gbill.aspx?refno=${refno}&type=U`);
    }

    // Third try: attempt via the redirect-following endpoint
    const redirectResult = await fetchBillViaPitcPage(refno, "U");
    if (redirectResult.success && redirectResult.data) {
      setBill(redirectResult.data);
      setLoading(false);
      return;
    }

    setError(result.error || redirectResult.error || "Consumer not found");
    setLoading(false);
  };

  useEffect(() => {
    fetchBill();
  }, [refno]);

  const handleRetry = () => {
    fetchBill();
  };

  const handleOpenPitc = () => {
    if (pitcRedirect) {
      window.open(pitcRedirect, "_blank", "noopener,noreferrer");
    } else {
      window.open(
        `https://bill.pitc.com.pk/gbill.aspx?refno=${encodeURIComponent(refno)}&type=U`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const handleCopy = () => {
    if (!bill) return;
    navigator.clipboard.writeText(bill.referenceNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!bill) return;
    const txt = [
      `LESCO BILL STATEMENT`,
      `${"=".repeat(40)}`,
      `Customer: ${bill.customerName}`,
      `Address: ${bill.address}`,
      `Reference No: ${bill.referenceNo}`,
      `Consumer ID: ${bill.consumerId}`,
      `Bill Month: ${bill.billMonth}`,
      `Meter No: ${bill.meterNo}`,
      `Connection: ${bill.connectionType}`,
      `Sanctioned Load: ${bill.sanctionedLoad}`,
      `Units Consumed: ${bill.unitsConsumed} kWh`,
      `Bill Amount: PKR ${bill.billAmount.toLocaleString()}`,
      `Total Payable: PKR ${bill.totalPayable.toLocaleString()}`,
      `Amount After Due: PKR ${bill.amountAfterDue.toLocaleString()}`,
      `Due Date: ${bill.dueDate}`,
      `Status: ${bill.status.toUpperCase()}`,
      bill.amountPaid
        ? `Amount Paid: PKR ${bill.amountPaid.toLocaleString()}`
        : "",
      bill.paymentDate ? `Payment Date: ${bill.paymentDate}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const blob = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `LESCO-Bill-${bill.referenceNo}.txt`;
    a.click();
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F8FAFC" }}
      >
        <div className="text-center px-4">
          <div className="relative mb-6 mx-auto w-24 h-24">
            <div className="w-24 h-24 rounded-full border-4 border-teal-100" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent"
              style={{ borderTopColor: "#3E8B8E" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-9 h-9 text-teal-600" strokeWidth={2.5} />
            </div>
          </div>
          <p
            className="text-slate-800 mb-2"
            style={{ fontSize: "17px", fontWeight: 700 }}
          >
            Fetching LESCO Bill…
          </p>
          <p className="text-slate-400" style={{ fontSize: "13px" }}>
            Connecting to LESCO servers for reference #{refno}
          </p>

          <div className="flex gap-2 justify-center mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-teal-300"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
          <p className="text-slate-400 mt-4" style={{ fontSize: "11px" }}>
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F8FAFC" }}
      >
        <div className="text-center px-4 max-w-lg">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
          </div>
          <h2
            className="text-slate-800 mb-2"
            style={{ fontSize: "20px", fontWeight: 800 }}
          >
            Consumer Not Found
          </h2>
          <p
            className="text-slate-500 mb-2"
            style={{ fontSize: "14px", lineHeight: 1.7 }}
          >
            We couldn&apos;t find a LESCO bill for reference number{" "}
            <strong className="text-slate-700 font-mono">{refno}</strong>.
          </p>
          <p
            className="text-slate-400 mb-6"
            style={{ fontSize: "13px", lineHeight: 1.6 }}
          >
            {error ||
              "The reference number may be incorrect, or the LESCO server may be temporarily unavailable."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #3E8B8E, #5A9FA2)",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={handleOpenPitc}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-teal-300 bg-white text-teal-700 hover:border-teal-400 hover:bg-teal-50 transition-all"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              <ExternalLink className="w-4 h-4" />
              Check on PITC Portal
            </button>
            <Link
              href="/lesco-bill"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </div>
          <p className="text-slate-400 mt-6" style={{ fontSize: "12px" }}>
            Tip: A valid LESCO reference number is 14 digits. Find it at the top of your physical bill.
          </p>
        </div>
      </div>
    );
  }

  const statusMap = {
    paid: {
      label: "Paid",
      bg: "#ECFDF5",
      color: "#059669",
      dot: "#10B981",
    },
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

  const items = [
    {
      icon: User,
      label: "Customer Name",
      value: bill.customerName,
      color: "#0D9488",
    },
    {
      icon: Hash,
      label: "Reference No.",
      value: bill.referenceNo,
      color: "#14B8A6",
      copy: true,
    },
    {
      icon: Building2,
      label: "Consumer ID",
      value: bill.consumerId || bill.referenceNo,
      color: "#0F766E",
    },
    {
      icon: Activity,
      label: "Meter No.",
      value: bill.meterNo || "—",
      color: "#059669",
    },
    {
      icon: Zap,
      label: "Units Consumed",
      value: bill.unitsConsumed > 0 ? `${bill.unitsConsumed} kWh` : "—",
      color: "#F59E0B",
    },
    {
      icon: BarChart3,
      label: "Connection Type",
      value: bill.connectionType || "Residential (LT)",
      color: "#5A9FA2",
    },
    {
      icon: Calendar,
      label: "Bill Month",
      value: bill.billMonth || "—",
      color: "#0D9488",
    },
    {
      icon: Clock,
      label: "Due Date",
      value: bill.dueDate || "—",
      color: "#DC2626",
    },
  ];

  const breakdown = [
    { label: "Bill Amount", value: bill.billAmount || bill.totalPayable, color: "#0F172A" },
  ];

  if (bill.amountAfterDue && bill.amountAfterDue !== bill.totalPayable) {
    breakdown.push({
      label: "After Due Date",
      value: bill.amountAfterDue,
      color: "#DC2626",
    });
  }

  if (bill.amountPaid) {
    breakdown.push({
      label: "Amount Paid",
      value: bill.amountPaid,
      color: "#059669",
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              style={{ fontSize: "13px" }}
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link
              href="/lesco-bill"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              style={{ fontSize: "13px" }}
            >
              LESCO Bill
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span
              className="text-slate-800"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {bill.referenceNo}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
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
                <Zap
                  className="w-5 h-5 md:w-6 md:h-6 text-yellow-300"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <div
                  className="text-white"
                  style={{ fontSize: "15px", fontWeight: 800 }}
                >
                  LESCO Bill Statement
                </div>
                <div className="text-teal-100" style={{ fontSize: "12px" }}>
                  {bill.billMonth || "Current Bill"}
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
              <span style={{ fontSize: "12px", fontWeight: 700 }}>
                {st.label}
              </span>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            {/* Total Amount */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden rounded-xl p-5 md:p-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, #F0FAFB 0%, #D9F2F4 50%, #B3E5E9 100%)",
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
              {bill.dueDate && (
                <div
                  className="mt-1.5 text-red-500"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Due by {bill.dueDate}
                </div>
              )}
              {bill.paymentDate && (
                <div
                  className="mt-1 text-emerald-600"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  Paid on {bill.paymentDate}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2 text-xs justify-center">
                {breakdown.map((b, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#0D9488", "#DC2626", "#059669"][i],
                      }}
                    />
                    <span
                      className="text-slate-500"
                      style={{ fontSize: "11px" }}
                    >
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Breakdown table */}
            {breakdown.length > 1 && (
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <span
                    className="text-slate-600"
                    style={{ fontSize: "12px", fontWeight: 700 }}
                  >
                    BILL SUMMARY
                  </span>
                </div>
                {breakdown.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                    className={`flex items-center justify-between px-4 py-3 ${
                      i < breakdown.length - 1
                        ? "border-b border-slate-50"
                        : ""
                    }`}
                  >
                    <span
                      className="text-slate-500"
                      style={{ fontSize: "13px" }}
                    >
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
              </div>
            )}

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
            {bill.address && (
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
            )}

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
                  background:
                    "linear-gradient(135deg, #1A1F2E 0%, #2C3444 100%)",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <Download className="w-4 h-4" />
                Download Bill
              </button>
              <button
                onClick={handleOpenPitc}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-teal-300 bg-white text-teal-700 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                <ExternalLink className="w-4 h-4" />
                View on Official Portal
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                <Printer className="w-4 h-4" />
                Print Bill
              </button>
            </motion.div>

            {/* Back to search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center pt-1"
            >
              <Link
                href="/lesco-bill"
                className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 transition-colors"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Check another LESCO bill
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
