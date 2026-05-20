"use client";

import { motion } from "motion/react";
import {
  Shield,
  Activity,
  BarChart3,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Star,
  List,
  Download,
  Info,
} from "lucide-react";

export function BlogGuideSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="mt-14 md:mt-20 lg:mt-24"
    >
      {/* Section header */}
      <div className="text-center mb-10 md:mb-14">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100" style={{ fontSize: "12px", fontWeight: 700 }}>
            <TrendingUp className="w-3 h-3" />
            COMPLETE GUIDE
          </div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          How to Check Your MEPCO Bill Online
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          A complete step-by-step guide covering every method — online portal, MEPCO duplicate bill download, SMS, mobile app, and more.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #065F46, #059669, #34D399, #A7F3D0)" }} />
        <div className="p-3 sm:p-6 md:p-10 lg:p-14">
          {/* Intro */}
          <IntroBlock />
          {/* Table of Contents */}
          <TableOfContentsNav />
          {/* Sections */}
          <WhyCheckSection />
          <BillInfoSection />
          <MethodsSection />
          <DuplicateBillSection />
          <TariffRatesSection />
          <BillComponentsSection />
          <BillErrorsSection />
          <ReduceBillSection />
          <ConclusionBlock />
        </div>
      </div>
    </motion.section>
  );
}

function IntroBlock() {
  return (
    <div className="max-w-3xl mb-10 pl-4 border-l-4 border-emerald-400 bg-emerald-50/30 rounded-r-xl py-4 pr-4">
      <p className="text-slate-600 italic" style={{ fontSize: "16px", lineHeight: 1.85 }}>
        MEPCO — the <strong className="text-slate-800">Multan Electric Power Company</strong> — is one of Pakistan&quot;s major electricity distribution companies, serving over <strong className="text-slate-800">4 million consumers</strong> across Multan, Bahawalpur, DG Khan, and south Punjab districts. When you see &quot;MEPCO on bill&quot; printed on your electricity invoice, it confirms your connection falls under the Multan Electric Power Company distribution network — regulated by NEPRA tariff schedules. In the digital age, checking your electricity bill no longer requires standing in long queues or waiting for a physical copy to arrive in the post. This comprehensive guide walks you through every method available to check your MEPCO bill online — via SMS, through a mobile app, and even by phone.
      </p>
    </div>
  );
}

function TableOfContentsNav() {
  const items = [
    { id: "why-check", label: "Why Check Your Bill Regularly" },
    { id: "bill-info", label: "What Information Is on Your Bill" },
    { id: "check-methods", label: "5 Ways to Check Your MEPCO Bill" },
    { id: "duplicate-bill", label: "MEPCO Duplicate Bill" },
    { id: "tariff-rates", label: "MEPCO Tariff Rates 2026" },
    { id: "bill-components", label: "Understanding Bill Components" },
    { id: "bill-errors", label: "What to Do If Bill Has an Error" },
    { id: "reduce-bill", label: "Tips to Reduce Your Bill" },
  ];
  return (
    <nav className="mb-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-white">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}>
          <List className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-slate-900" style={{ fontSize: "15px", fontWeight: 700 }}>Table of Contents</h3>
      </div>
      <div className="p-4 sm:p-5">
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all group">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">{i + 1}</span>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function WhyCheckSection() {
  const benefits = [
    "Catch billing errors early before overpaying",
    "Track consumption trends month-to-month",
    "Never miss a due date or payment deadline",
    "Plan your monthly budget with confidence",
    "Detect unauthorized usage or meter tampering",
    "Avoid late payment surcharges completely",
  ];
  return (
    <div id="why-check" className="mb-10 scroll-mt-24">
      <SectionHeading icon={Shield} iconBg="linear-gradient(135deg, #D1FAE5, #A7F3D0)" iconColor="text-emerald-700" title="Why You Should Check Your MEPCO Bill Regularly" />
      <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Regular bill checking is more than just a financial habit — it is a smart utility management practice. By monitoring your MEPCO electricity bill each month, you can catch billing errors well before the due date, track your household or business consumption trends, plan your budget more effectively, and avoid late payment surcharges. MEPCO bills include several components beyond the basic unit price — such as tariff adjustments, Fuel Price Adjustment (FPA), and government taxes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {benefits.map((text, i) => (
          <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
            <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillInfoSection() {
  const points = [
    "Reference Number (Consumer No.) — 14 digits",
    "Customer Name and Service Address",
    "Meter Number and Meter Reading",
    "Units Consumed (kWh) this billing month",
    "Bill Amount with complete breakdown",
    "GST (17%) and other government taxes",
    "Fuel Price Adjustment (FPA) component",
    "Previous Balance (if any outstanding)",
    "Due Date and Last Date for payment",
    "Sanctioned Load and Tariff Category",
  ];
  return (
    <div id="bill-info" className="mb-10 scroll-mt-24">
      <SectionHeading icon={BarChart3} iconBg="linear-gradient(135deg, #FFF7ED, #FEE2D5)" iconColor="text-orange-600" title="What Information Is Printed on Your MEPCO Bill" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Before you dive into how to check your bill, it is worth knowing what you are looking for. Your MEPCO electricity bill contains several key data points. The most important is your <strong className="text-slate-800">14-digit Reference Number</strong> (also called Consumer Number), printed prominently at the top of every bill.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {points.map((point, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
            <span className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.5 }}>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MethodsSection() {
  return (
    <div id="check-methods" className="mb-8 scroll-mt-24">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)" }}><Activity className="w-4 h-4 text-emerald-700" strokeWidth={2.5} /></div>
        <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>5 Ways to Check Your MEPCO Bill</h3>
      </div>
      <p className="text-slate-500 ml-12" style={{ fontSize: "14px", lineHeight: 1.6 }}>Choose the method that works best for you — from online platforms to a simple phone call.</p>

      <MethodCard num="1" heading="Check via BillCheck Online Portal (Fastest Method)" bg="bg-emerald-50">
        <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>The easiest way to check your MEPCO bill is through an online platform like <strong className="text-slate-800">BillCheck</strong>, which fetches real-time data directly from MEPCO servers:</p>
        <div className="space-y-3">
          {[
            "Open your browser and visit the BillCheck MEPCO Bill page (you are already here!)",
            "Choose your input mode: Reference Number (14 digits) or Customer ID",
            "Type your Reference Number in the format XXXX-XXXX-XXXXXX — the platform auto-formats it",
            "Click Check Bill Now and wait 2–3 seconds for results",
            "Your full bill appears: total payable, breakdown, due date, and more",
            "Download the bill as a file or click Print to get a hard copy",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-emerald-700" style={{ background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)", fontSize: "11px", fontWeight: 800 }}>{String(i + 1).padStart(2, "0")}</div>
              <p className="text-slate-600 pt-0.5" style={{ fontSize: "14px", lineHeight: 1.7 }}>{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-100">
          <Star className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-emerald-700" style={{ fontSize: "13px", lineHeight: 1.6 }}><strong>Pro tip:</strong> BillCheck saves your recent searches to localStorage — no need to retype reference numbers.</p>
        </div>
      </MethodCard>

      <MethodCard num="2" heading="Check via MEPCO Official Website" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          MEPCO operates its own official consumer portal at <strong className="text-slate-800">mepco.gov.pk</strong>. Navigate to the &ldquo;Bill Inquiry&rdquo; section, enter your 14-digit consumer number, and your current month&apos;s bill will be displayed. The official portal can occasionally experience downtime around the 5th to 10th of each month when new bills are generated — third-party platforms like BillCheck serve as a reliable fallback.
        </p>
      </MethodCard>

      <MethodCard num="3" heading="Check via SMS (No Internet Required)" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          MEPCO provides a convenient SMS bill inquiry service. Simply open your SMS app, type your 14-digit Consumer Number, and send it to <strong className="text-slate-800">8118</strong>. Within moments, you&apos;ll receive an automated reply containing your current bill amount, due date, and account status. Standard SMS charges apply. Works across all major networks: Jazz, Zong, Telenor, and Ufone.
        </p>
      </MethodCard>

      <MethodCard num="4" heading="Check via MEPCO Mobile App" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          MEPCO has launched its official mobile app on both the <strong className="text-slate-800">Google Play Store</strong> and <strong className="text-slate-800">Apple App Store</strong>. Register using your consumer number and CNIC. Once registered, your bill appears automatically on the dashboard each month. The app supports payment via <strong className="text-slate-800">JazzCash</strong> and <strong className="text-slate-800">EasyPaisa</strong> with push notifications before due dates.
        </p>
      </MethodCard>

      <MethodCard num="5" heading="Check via MEPCO Helpline (Call 118)" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          Dial <strong className="text-slate-800">118</strong> free of charge from any mobile or landline, follow the IVR menu, and select bill inquiry. Enter your 14-digit consumer number and the automated system will announce your current bill amount and due date. This number also handles billing complaint registration and service issues — available 24/7.
        </p>
      </MethodCard>
    </div>
  );
}

function MethodCard({ num, heading, bg, children }: { num: string; heading: string; bg: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-xl border border-slate-100 overflow-hidden" style={{ borderLeft: "4px solid #065F46" }}>
      <div className={`flex items-center gap-3 px-5 py-4 ${bg}`}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg, #065F46, #059669)", fontSize: "13px", fontWeight: 800 }}>{num}</div>
        <h4 className="text-slate-800 font-serif" style={{ fontSize: "16px", fontWeight: 800 }}>{heading}</h4>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function DuplicateBillSection() {
  return (
    <div id="duplicate-bill" className="mb-10 scroll-mt-24">
      <SectionHeading icon={Download} iconBg="linear-gradient(135deg, #D1FAE5, #A7F3D0)" iconColor="text-emerald-700" title="MEPCO Duplicate Bill — Download Instantly" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        If you have misplaced your original MEPCO electricity bill or need a copy for record-keeping, you can download a <strong className="text-slate-800">duplicate MEPCO bill</strong> in seconds. A duplicate bill is an exact digital reprint of your original bill — containing the same reference number, consumer details, units consumed, NEPRA tariff breakdown, and total payable amount.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {[
          { step: "1", text: "Use the BillCheck form above — enter your 14-digit reference number and click Check Bill Now." },
          { step: "2", text: "Your bill appears instantly. Click the Download button to save the duplicate MEPCO bill as a PDF." },
          { step: "3", text: "Alternatively, visit mepco.gov.pk, go to Bill Inquiry, and enter your consumer number." },
          { step: "4", text: "For SMS-based duplicate bill, send your reference number to 8118 and receive a text summary." },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}>{item.step}</div>
            <span className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.6 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
        <Star className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
        <p className="text-emerald-700" style={{ fontSize: "13px", lineHeight: 1.6 }}>
          <strong>Did you know?</strong> MEPCO serves over 4 million consumers across Multan, Bahawalpur, DG Khan, and the entire south Punjab region. All bills are calculated using the NEPRA tariff structure — the duplicate bill reflects the exact same charges as your original, including FPA, GST, and any applicable surcharges.
        </p>
      </div>
    </div>
  );
}

function TariffRatesSection() {
  const rows = [
    { slab: "1", units: "1 – 100", rate: "7.74", est: "≈ PKR 774", cat: "Protected", color: "#059669" },
    { slab: "2", units: "101 – 200", rate: "11.56", est: "≈ PKR 1,930", cat: "Low Use", color: "#065F46" },
    { slab: "3", units: "201 – 300", rate: "16.60", est: "≈ PKR 3,590", cat: "Moderate", color: "#0369A1" },
    { slab: "4", units: "301 – 400", rate: "22.65", est: "≈ PKR 5,855", cat: "Standard", color: "#065F46" },
    { slab: "5", units: "401 – 500", rate: "27.20", est: "≈ PKR 8,575", cat: "High Use", color: "#D97706" },
    { slab: "6", units: "501 – 600", rate: "30.50", est: "≈ PKR 11,625", cat: "Heavy", color: "#EA580C" },
    { slab: "7", units: "601 – 700", rate: "33.40", est: "≈ PKR 14,965", cat: "Very High", color: "#DC2626" },
    { slab: "8", units: "700+", rate: "35.00+", est: "≈ PKR 17,465+", cat: "Peak", color: "#991B1B" },
  ];
  return (
    <div id="tariff-rates" className="mb-10 scroll-mt-24">
      <SectionHeading icon={BarChart3} iconBg="linear-gradient(135deg, #D1FAE5, #A7F3D0)" iconColor="text-emerald-600" title="MEPCO Electricity Tariff Rates 2026" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>MEPCO uses a progressive slab-based tariff structure for residential consumers across Multan, Bahawalpur, DG Khan, and south Punjab — set by NEPRA. The more units you consume, the higher the per-unit rate.</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[480px]">
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Slab</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Units (kWh)</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Rate (PKR/kWh)</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase hidden sm:table-cell">Category</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.slab} className={`border-t border-slate-100 transition-colors hover:bg-emerald-50/40 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="px-4 sm:px-5 py-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold" style={{ background: `${row.color}15`, color: row.color }}>{row.slab}</span></td>
                  <td className="px-4 sm:px-5 py-3 text-slate-700 font-semibold" style={{ fontSize: "14px" }}>{row.units}</td>
                  <td className="px-4 sm:px-5 py-3"><span className="text-slate-900 font-bold" style={{ fontSize: "14px" }}>{row.rate}</span></td>
                  <td className="px-4 sm:px-5 py-3 hidden sm:table-cell"><span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold" style={{ background: `${row.color}12`, color: row.color }}>{row.cat}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-slate-400 flex items-start gap-2" style={{ fontSize: "11px", lineHeight: 1.5 }}>
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            Rates are approximate based on NEPRA-approved tariff schedule for FY 2025-26. Actual bills include FPA, GST, TV Fee, and other levies.
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
        <Star className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
        <p className="text-emerald-700" style={{ fontSize: "13px", lineHeight: 1.6 }}><strong>Tip:</strong> Reducing just 50–60 units can drop you into a lower slab and save PKR 1,000–2,000 per month.</p>
      </div>
    </div>
  );
}

function BillComponentsSection() {
  const items = [
    { term: "Fixed Charges", def: "A base charge applied every month regardless of consumption, calculated according to your sanctioned load (kW)." },
    { term: "Variable / Energy Charges", def: "Charges based on actual kWh units consumed, calculated using NEPRA-approved progressive tariff slabs." },
    { term: "Fuel Price Adjustment (FPA)", def: "A monthly component that rises or falls depending on the domestic and global cost of fuel used in electricity generation." },
    { term: "GST (17%)", def: "General Sales Tax applied on the total energy and fixed charges, collected on behalf of the FBR." },
    { term: "TV Fee", def: "A nominal charge collected on behalf of Pakistan Television Corporation (PTV) as mandated by federal law." },
    { term: "Previous Balance", def: "Any outstanding amount from your last billing cycle that was not cleared before the due date." },
  ];
  return (
    <div id="bill-components" className="mb-10 scroll-mt-24">
      <SectionHeading icon={BarChart3} iconBg="linear-gradient(135deg, #FFF7ED, #FEE2D5)" iconColor="text-orange-600" title="Understanding Your MEPCO Bill Components" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>When you check your MEPCO bill, you will notice several line items that together make up the total payable amount. Here is a plain-language breakdown:</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.term} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
            <div>
              <div className="text-slate-900 mb-1 font-serif" style={{ fontSize: "14px", fontWeight: 700 }}>{item.term}</div>
              <div className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.7 }}>{item.def}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillErrorsSection() {
  return (
    <div id="bill-errors" className="mb-10 scroll-mt-24">
      <SectionHeading icon={AlertCircle} iconBg="linear-gradient(135deg, #FEF2F2, #FEE2E2)" iconColor="text-red-600" title="What to Do If Your Bill Has an Error" />
      <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        If you notice a discrepancy — incorrect meter reading, unexpected spike in units, wrong tariff category, or unexplained charge — visit your nearest MEPCO subdivision office in Multan, Bahawalpur, DG Khan, or other south Punjab service areas with your CNIC and a copy of the bill. Submit a written complaint at the customer service counter. Alternatively, call <strong className="text-slate-800">118</strong> or file a complaint at <strong className="text-slate-800">mepco.gov.pk</strong>. Under NEPRA regulations, MEPCO must respond within <strong className="text-slate-800">15 working days</strong>.
      </p>
    </div>
  );
}

function ReduceBillSection() {
  const tips = [
    "Replace incandescent bulbs with LED lights — they use up to 80% less electricity.",
    "Upgrade to inverter ACs — 30–50% more energy-efficient than conventional units.",
    "Set your AC thermostat to 26°C rather than 18–20°C — each degree below 26°C increases consumption by ~6%.",
    "Switch appliances off at the power socket rather than leaving them on standby.",
    "Run washing machines during off-peak hours (late night or early morning).",
    "Consider rooftop solar panels — MEPCO&apos;s net metering policy lets you export surplus energy to offset your bill.",
  ];
  return (
    <div id="reduce-bill" className="mb-8 scroll-mt-24">
      <SectionHeading icon={TrendingUp} iconBg="linear-gradient(135deg, #ECFDF5, #D1FAE5)" iconColor="text-emerald-600" title="Practical Tips to Reduce Your MEPCO Bill" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>Checking your bill regularly is the first step — reducing it is the real win. Even a modest 10–15% reduction in daily usage can drop you into a lower slab and produce significant savings.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #065F46, #059669)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
            <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConclusionBlock() {
  return (
    <div className="rounded-xl p-6 md:p-8 border-l-4 border-emerald-500" style={{ background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%)" }}>
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" strokeWidth={2.5} />
        <h4 className="text-emerald-900 font-serif" style={{ fontSize: "18px", fontWeight: 800 }}>Final Word</h4>
      </div>
      <p className="text-emerald-800 italic" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Checking your MEPCO bill online has never been more accessible. Whether you prefer the instant convenience of <strong>BillCheck</strong>, the official MEPCO portal, downloading a duplicate MEPCO bill, the no-internet simplicity of SMS to 8118, the mobile app, or the free helpline on 118 — multiple reliable methods are available across Multan, Bahawalpur, DG Khan, and all of south Punjab. Make bill checking a regular monthly habit: verify your charges, monitor consumption trends, and act immediately on any discrepancy you spot. Bookmark this page and use the MEPCO Bill Check tool at the top of this page to fetch your latest bill right now.
      </p>
    </div>
  );
}

function SectionHeading({ icon: Icon, iconBg, iconColor, title }: { icon: any; iconBg: string; iconColor: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
        <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2.5} />
      </div>
      <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>{title}</h3>
    </div>
  );
}
