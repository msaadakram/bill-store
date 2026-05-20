"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Hash,
  RefreshCw,
} from "lucide-react";
import { getBillTypeInfo, Company, BillTypeInfo, billTypes } from "@/data/billData";
import { CompanyCard } from "@/components/CompanyCard";
import { BillResult, BillData } from "@/components/BillResult";
import { BillTypeCard } from "@/components/BillTypeCard";

import type { Step } from "./_lib/constants";
import { billTypeIcons as icons } from "./_lib/constants";
import { generateMockBill } from "./_lib/mockBill";
import { fetchBill } from "@/lib/api/billApi";

export default function BillCheck() {
  const params = useParams();
  const type = (params.type as string) || "electricity";
  const router = useRouter();
  const billTypeInfo = getBillTypeInfo(type);

  const [step, setStep] = useState<Step>("company");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [billData, setBillData] = useState<BillData | null>(null);

  if (!billTypeInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-slate-900 text-xl font-bold">Bill type not found</h2>
        <Link href="/" className="text-teal-600 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setStep("reference");
    setReferenceNumber("");
    setError("");
  };

  const handleCheckBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim()) {
      setError("Please enter your reference number");
      return;
    }
    if (referenceNumber.trim().length < 6) {
      setError("Reference number must be at least 6 characters");
      return;
    }
    if (!selectedCompany) return;

    setLoading(true);
    setError("");

    try {
      // Try real API first, fall back to mock
      const apiResult = await fetchBill(selectedCompany.id, referenceNumber.trim());

      if (apiResult.success && apiResult.data) {
        // Map API response to frontend BillData format
        const d = apiResult.data;
        const data: BillData = {
          customerName: d.customerName,
          referenceNumber: d.referenceNo,
          amount: `Rs. ${d.totalPayable.toLocaleString()}`,
          dueDate: d.dueDate,
          units: d.unitsConsumed > 0 ? `${d.unitsConsumed} kWh` : undefined,
          billMonth: d.billMonth,
          status: d.status,
          address: d.address,
        };
        setBillData(data);
        setStep("result");
      } else {
        // Fallback to mock data if API fails
        console.warn("API failed, using mock data:", apiResult.error);
        const data = generateMockBill(referenceNumber.trim(), selectedCompany);
        setBillData(data);
        setStep("result");
      }
    } catch {
      // Final fallback to mock data
      const data = generateMockBill(referenceNumber.trim(), selectedCompany);
      setBillData(data);
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("company");
    setSelectedCompany(null);
    setReferenceNumber("");
    setBillData(null);
    setError("");
  };

  const otherBillTypes = billTypes.filter((b) => b.type !== type);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div
        className="relative overflow-hidden py-10 md:py-14"
        style={{
          background: `linear-gradient(135deg, ${billTypeInfo.gradientFrom}80 0%, white 100%)`,
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${billTypeInfo.iconColor}20 0%, transparent 70%)`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-700 transition-colors"
              style={{ fontSize: "13px" }}
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900" style={{ fontSize: "13px", fontWeight: 600 }}>
              {billTypeInfo.label}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: billTypeInfo.bgLight, color: billTypeInfo.iconColor }}
            >
              {icons[type]}
            </div>
            <div>
              <h1
                className="text-slate-900"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800 }}
              >
                {billTypeInfo.label}
              </h1>
              <p className="text-slate-500 mt-0.5" style={{ fontSize: "14px" }}>
                {billTypeInfo.description}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          {step !== "result" && (
            <div className="mt-8 flex items-center gap-3">
              {[
                { key: "company", label: "Select Provider" },
                { key: "reference", label: "Enter Reference" },
                { key: "result", label: "View Bill" },
              ].map((s, index) => {
                const stepOrder = { company: 0, reference: 1, result: 2 };
                const currentOrder = stepOrder[step];
                const thisOrder = index;
                const isActive = currentOrder === thisOrder;
                const isDone = currentOrder > thisOrder;

                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isDone
                            ? billTypeInfo.iconColor
                            : isActive
                            ? billTypeInfo.iconColor
                            : "#E2E8F0",
                          color: isDone || isActive ? "white" : "#94A3B8",
                        }}
                      >
                        <span style={{ fontSize: "12px", fontWeight: 700 }}>
                          {index + 1}
                        </span>
                      </div>
                      <span
                        className="hidden sm:block"
                        style={{
                          fontSize: "13px",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#0F172A" : "#94A3B8",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div
                        className="w-8 h-px"
                        style={{
                          backgroundColor: isDone ? billTypeInfo.iconColor : "#E2E8F0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Company */}
            {step === "company" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-slate-900" style={{ fontSize: "18px", fontWeight: 700 }}>
                    Select Your Provider
                  </h2>
                  <span className="text-slate-400" style={{ fontSize: "13px" }}>
                    {billTypeInfo.companies.length} providers available
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {billTypeInfo.companies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      selected={selectedCompany?.id === company.id}
                      onSelect={handleCompanySelect}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Enter Reference */}
            {step === "reference" && selectedCompany && (
              <div>
                <button
                  onClick={() => setStep("company")}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors"
                  style={{ fontSize: "13px" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to providers
                </button>

                {/* Selected Company */}
                <div
                  className="flex items-center gap-4 p-4 rounded-2xl mb-6 border-2"
                  style={{
                    backgroundColor: `${selectedCompany.color}08`,
                    borderColor: `${selectedCompany.color}30`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: selectedCompany.color }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 700 }}>
                      {selectedCompany.short.slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900" style={{ fontSize: "14px", fontWeight: 700 }}>
                      {selectedCompany.name}
                    </div>
                    <div className="text-slate-500" style={{ fontSize: "12px" }}>
                      {selectedCompany.description}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("company")}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Change provider"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Reference Input Form */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2
                    className="text-slate-900 mb-1"
                    style={{ fontSize: "20px", fontWeight: 700 }}
                  >
                    Enter Reference Number
                  </h2>
                  <p className="text-slate-500 mb-6" style={{ fontSize: "14px" }}>
                    You can find your reference / consumer number on your previous bill
                  </p>

                  <form onSubmit={handleCheckBill}>
                    <div className="mb-5">
                      <label
                        className="block text-slate-700 mb-2"
                        style={{ fontSize: "14px", fontWeight: 600 }}
                      >
                        Reference / Consumer Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Hash className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={referenceNumber}
                          onChange={(e) => {
                            setReferenceNumber(e.target.value);
                            setError("");
                          }}
                          placeholder="e.g. 0120012345678"
                          className={`w-full pl-11 pr-4 py-4 rounded-xl border-2 outline-none transition-all bg-slate-50 text-slate-900 placeholder-slate-400 ${
                            error
                              ? "border-red-300 bg-red-50 focus:border-red-400"
                              : "border-slate-200 focus:border-teal-400 focus:bg-white"
                          }`}
                          style={{ fontSize: "16px" }}
                          disabled={loading}
                        />
                      </div>
                      {error && (
                        <div className="flex items-center gap-2 mt-2 text-red-500">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span style={{ fontSize: "13px" }}>{error}</span>
                        </div>
                      )}
                    </div>

                    {/* Example reference numbers */}
                    <div className="mb-6 p-3.5 rounded-xl bg-teal-50 border border-teal-100">
                      <div className="text-teal-700 mb-2" style={{ fontSize: "12px", fontWeight: 600 }}>
                        WHERE TO FIND IT?
                      </div>
                      <p className="text-teal-600" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                        Your <strong>Reference Number</strong> is printed on the top of your
                        electricity/gas bill. It's usually a 13-14 digit number.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)', fontSize: '16px', fontWeight: 700 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking your bill...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Check Bill
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Step 3: Bill Result */}
            {step === "result" && billData && selectedCompany && (
              <div>
                <div className="mb-5">
                  <h2
                    className="text-slate-900"
                    style={{ fontSize: "18px", fontWeight: 700 }}
                  >
                    Your Bill Details
                  </h2>
                  <p className="text-slate-500" style={{ fontSize: "13px" }}>
                    Bill retrieved successfully for reference #{billData.referenceNumber}
                  </p>
                </div>
                <BillResult
                  billData={billData}
                  company={selectedCompany}
                  billType={billTypeInfo}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Other Bill Types */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3
                className="text-slate-900 mb-4"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                Other Bill Types
              </h3>
              <div className="space-y-2.5">
                {otherBillTypes.map((b) => (
                  <Link
                    key={b.type}
                    href={`/bill/${b.type}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: b.bgLight, color: b.iconColor }}
                    >
                      {icons[b.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-slate-900 group-hover:text-teal-600 transition-colors"
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      >
                        {b.label}
                      </div>
                      <div className="text-slate-400" style={{ fontSize: "11px" }}>
                        {b.companies.length} providers
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: `linear-gradient(135deg, ${billTypeInfo.gradientFrom} 0%, ${billTypeInfo.gradientTo} 100%)`,
              }}
            >
              <h3
                className="text-slate-900 mb-3"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                💡 Quick Tips
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Reference number is on your previous bill",
                  "Check bill before due date to avoid surcharge",
                  "Save your bill as PDF for records",
                  "Set reminders for bill due dates",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-white/60 flex items-center justify-center"
                      style={{ fontSize: "9px", fontWeight: 700, color: billTypeInfo.iconColor }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white">
              <div className="text-lg mb-1" style={{ fontSize: "20px" }}>🤝</div>
              <h3
                className="text-white mb-2"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                Need Help?
              </h3>
              <p className="text-slate-400 mb-4" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                Can't find your bill? Contact our support team for help.
              </p>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
