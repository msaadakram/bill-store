"use client";

import { motion } from "motion/react";
import {
  Shield,
  Info,
  Activity,
  BarChart3,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Star,
  List,
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100" style={{ fontSize: "12px", fontWeight: 700 }}>
            <TrendingUp className="w-3 h-3" />
            COMPLETE GUIDE
          </div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          How to Check Your SSGC Bill Online
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          A complete step-by-step guide covering every method — online portal, SMS, mobile app, and more.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #DC2626, #EF4444, #F87171, #FCA5A5)" }} />
        <div className="p-3 sm:p-6 md:p-10 lg:p-14">
          <IntroBlock />
          <TableOfContentsNav />
          <WhyCheckSection />
          <BillInfoSection />
          <MethodsSection />
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
    <div className="max-w-3xl mb-10 pl-4 border-l-4 border-red-400 bg-red-50/30 rounded-r-xl py-4 pr-4">
      <p className="text-slate-600 italic" style={{ fontSize: "16px", lineHeight: 1.85 }}>
        SSGC — the <strong className="text-slate-800">Sui Southern Gas Company</strong> — is Pakistan&apos;s leading natural gas distribution company, serving over <strong className="text-slate-800">4 million consumers across Sindh &amp; Balochistan</strong>. In the digital age, checking your gas bill no longer requires standing in long queues or waiting for a physical copy to arrive in the post. This comprehensive guide walks you through every method available to check your SSGC bill — online, via SMS, through a mobile app, and even by phone.
      </p>
    </div>
  );
}

function TableOfContentsNav() {
  const items = [
    { id: "why-check", label: "Why Check Your Bill Regularly" },
    { id: "bill-info", label: "What Information Is on Your Bill" },
    { id: "check-methods", label: "5 Ways to Check Your SSGC Bill" },
    { id: "tariff-rates", label: "SSGC Tariff Rates 2026" },
    { id: "bill-components", label: "Understanding Bill Components" },
    { id: "bill-errors", label: "What to Do If Bill Has an Error" },
    { id: "reduce-bill", label: "Tips to Reduce Your Bill" },
  ];
  return (
    <nav className="mb-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-white">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}>
          <List className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="text-slate-900" style={{ fontSize: "15px", fontWeight: 700 }}>Table of Contents</h3>
      </div>
      <div className="p-4 sm:p-5">
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-red-700 hover:bg-red-50 transition-all group">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 bg-slate-100 text-slate-500 group-hover:bg-red-100 group-hover:text-red-700 transition-colors">{i + 1}</span>
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
    "Track gas consumption trends month-to-month",
    "Never miss a due date or payment deadline",
    "Plan your monthly budget with confidence",
    "Detect unauthorized usage or meter issues",
    "Avoid late payment surcharges completely",
  ];
  return (
    <div id="why-check" className="mb-10 scroll-mt-24">
      <SectionHeading icon={Shield} iconBg="linear-gradient(135deg, #FEE2E2, #FECACA)" iconColor="text-red-700" title="Why You Should Check Your SSGC Bill Regularly" />
      <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Regular bill checking is more than just a financial habit — it is a smart utility management practice. By monitoring your SSGC gas bill each month, you can catch billing errors well before the due date, track your household or business consumption trends, plan your budget more effectively, and avoid late payment surcharges. SSGC bills include several components beyond the basic unit price — such as meter rent, GST, and the Gas Infrastructure Development Cess (GIDC).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {benefits.map((text, i) => (
          <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
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
    "Meter Number and Current Reading",
    "Units Consumed (MMBtu) this billing month",
    "Bill Amount with complete breakdown",
    "GST (17%) and other government taxes",
    "Gas Infrastructure Development Cess (GIDC)",
    "Previous Balance (if any outstanding)",
    "Due Date and Last Date for payment",
    "Connected Load and Tariff Category",
  ];
  return (
    <div id="bill-info" className="mb-10 scroll-mt-24">
      <SectionHeading icon={Info} iconBg="linear-gradient(135deg, #FFF7ED, #FEE2D5)" iconColor="text-orange-600" title="What Information Is Printed on Your SSGC Bill" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Before you dive into how to check your bill, it is worth knowing what you are looking for. Your SSGC gas bill contains several key data points. The most important is your <strong className="text-slate-800">14-digit Reference Number</strong> (also called Consumer Number), printed prominently at the top of every bill.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {points.map((point, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
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
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #FEE2E2, #FECACA)" }}><Activity className="w-4 h-4 text-red-700" strokeWidth={2.5} /></div>
        <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>5 Ways to Check Your SSGC Bill</h3>
      </div>
      <p className="text-slate-500 ml-12" style={{ fontSize: "14px", lineHeight: 1.6 }}>Choose the method that works best for you — from online platforms to a simple phone call.</p>

      <MethodCard num="1" heading="Check via BillCheck Online Portal (Fastest Method)" bg="bg-red-50">
        <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>The easiest way to check your SSGC bill is through an online platform like <strong className="text-slate-800">BillCheck</strong>, which fetches real-time data directly from SSGC servers:</p>
        <div className="space-y-3">
          {[
            "Open your browser and visit the BillCheck SSGC Bill page (you are already here!)",
            "Choose your input mode: Reference Number (14 digits) or Customer ID",
            "Type your Reference Number in the format XXXX-XXXX-XXXXXX — the platform auto-formats it",
            "Click Check Bill Now and wait 2–3 seconds for results",
            "Your full bill appears: total payable, breakdown, due date, and more",
            "Download the bill as a file or click Print to get a hard copy",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-red-700" style={{ background: "linear-gradient(135deg, #FEE2E2, #FECACA)", fontSize: "11px", fontWeight: 800 }}>{String(i + 1).padStart(2, "0")}</div>
              <p className="text-slate-600 pt-0.5" style={{ fontSize: "14px", lineHeight: 1.7 }}>{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-100">
          <Star className="w-4 h-4 text-red-600 shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-red-700" style={{ fontSize: "13px", lineHeight: 1.6 }}><strong>Pro tip:</strong> BillCheck saves your recent searches to localStorage — no need to retype reference numbers.</p>
        </div>
      </MethodCard>

      <MethodCard num="2" heading="Check via SSGC Official Website" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          SSGC operates its own official consumer portal at <strong className="text-slate-800">ssgc.com.pk</strong>. Navigate to the &ldquo;Bill Inquiry&rdquo; section, enter your 14-digit consumer number, and your current month&apos;s bill will be displayed. The official portal can occasionally experience downtime around the 5th to 10th of each month when new bills are generated — third-party platforms like BillCheck serve as a reliable fallback.
        </p>
      </MethodCard>

      <MethodCard num="3" heading="Check via SMS (No Internet Required)" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          SSGC provides a convenient SMS bill inquiry service. Simply open your SMS app, type your 14-digit Consumer Number, and send it to <strong className="text-slate-800">8118</strong>. Within moments, you&apos;ll receive an automated reply containing your current bill amount, due date, and account status. Standard SMS charges apply. Works across all major networks: Jazz, Zong, Telenor, and Ufone.
        </p>
      </MethodCard>

      <MethodCard num="4" heading="Check via SSGC Mobile App" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          SSGC has launched its official mobile app on both the <strong className="text-slate-800">Google Play Store</strong> and <strong className="text-slate-800">Apple App Store</strong>. Register using your consumer number and CNIC. Once registered, your bill appears automatically on the dashboard each month. The app supports payment via <strong className="text-slate-800">JazzCash</strong> and <strong className="text-slate-800">EasyPaisa</strong> with push notifications before due dates.
        </p>
      </MethodCard>

      <MethodCard num="5" heading="Check via SSGC Helpline (Call 1199)" bg="bg-slate-50">
        <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
          Dial <strong className="text-slate-800">1199</strong> free of charge from any mobile or landline, follow the IVR menu, and select bill inquiry. Enter your 14-digit consumer number and the automated system will announce your current bill amount and due date. This number also handles billing complaint registration and service issues — available 24/7.
        </p>
      </MethodCard>
    </div>
  );
}

function MethodCard({ num, heading, bg, children }: { num: string; heading: string; bg: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-xl border border-slate-100 overflow-hidden" style={{ borderLeft: "4px solid #DC2626" }}>
      <div className={`flex items-center gap-3 px-5 py-4 ${bg}`}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)", fontSize: "13px", fontWeight: 800 }}>{num}</div>
        <h4 className="text-slate-800 font-serif" style={{ fontSize: "16px", fontWeight: 800 }}>{heading}</h4>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function TariffRatesSection() {
  const rows = [
    { slab: "1", units: "0 – 0.5", rate: "121", est: "≈ PKR 60", cat: "Protected", color: "#059669" },
    { slab: "2", units: "0.5 – 1.0", rate: "300", est: "≈ PKR 300", cat: "Low Use", color: "#DC2626" },
    { slab: "3", units: "1.0 – 2.0", rate: "553", est: "≈ PKR 1,100", cat: "Moderate", color: "#0369A1" },
    { slab: "4", units: "2.0 – 3.0", rate: "738", est: "≈ PKR 2,200", cat: "Standard", color: "#DC2626" },
    { slab: "5", units: "3.0 – 4.0", rate: "1,107", est: "≈ PKR 4,400", cat: "High Use", color: "#D97706" },
    { slab: "6", units: "4.0+", rate: "1,460", est: "≈ PKR 5,840+", cat: "Peak", color: "#991B1B" },
  ];
  return (
    <div id="tariff-rates" className="mb-10 scroll-mt-24">
      <SectionHeading icon={BarChart3} iconBg="linear-gradient(135deg, #FEE2E2, #FECACA)" iconColor="text-red-600" title="SSGC Gas Tariff Rates 2026" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>SSGC uses a progressive slab-based tariff structure for domestic consumers set by OGRA. The more MMBtu you consume, the higher the per-unit rate.</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[480px]">
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Slab</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Units (MMBtu)</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Rate (PKR/MMBtu)</th>
                <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase hidden sm:table-cell">Category</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.slab} className={`border-t border-slate-100 transition-colors hover:bg-red-50/40 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
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
            Rates are approximate based on OGRA-approved tariff schedule for FY 2025-26. Actual bills include GIDC, GST, meter rent, and other levies.
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100">
        <Star className="w-4 h-4 text-red-600 shrink-0 mt-0.5" strokeWidth={2.5} />
        <p className="text-red-700" style={{ fontSize: "13px", lineHeight: 1.6 }}><strong>Tip:</strong> Reducing just 0.3–0.5 MMBtu can drop you into a lower slab and save PKR 500–1,500 per month.</p>
      </div>
    </div>
  );
}

function BillComponentsSection() {
  const items = [
    { term: "Fixed / Meter Rent Charges", def: "A base charge applied every month regardless of consumption, covering the cost of the gas meter and connection infrastructure." },
    { term: "Variable / Gas Charges", def: "Charges based on actual MMBtu units consumed, calculated using OGRA-approved progressive tariff slabs for your consumer category." },
    { term: "Gas Infrastructure Dev Cess (GIDC)", def: "A levy applied on gas consumption to fund the development of gas infrastructure projects, including new pipelines and storage facilities." },
    { term: "GST (17%)", def: "General Sales Tax applied on the total energy and fixed charges, collected on behalf of the FBR." },
    { term: "Previous Balance", def: "Any outstanding amount from your last billing cycle that was not cleared before the due date." },
    { term: "Security Deposit Adjustment", def: "A refundable deposit held by SSGC against unpaid bills; may be adjusted across billing cycles based on consumption category." },
  ];
  return (
    <div id="bill-components" className="mb-10 scroll-mt-24">
      <SectionHeading icon={BarChart3} iconBg="linear-gradient(135deg, #FFF7ED, #FEE2D5)" iconColor="text-orange-600" title="Understanding Your SSGC Bill Components" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>When you check your SSGC bill, you will notice several line items that together make up the total payable amount. Here is a plain-language breakdown:</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.term} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
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
        If you notice a discrepancy — incorrect meter reading, unexpected spike in MMBtu consumption, wrong tariff category, or unexplained charge — visit your nearest SSGC regional office with your CNIC and a copy of the bill. Submit a written complaint at the customer service counter. Alternatively, call <strong className="text-slate-800">1199</strong> or file a complaint at <strong className="text-slate-800">ssgc.com.pk</strong>. Under OGRA regulations, SSGC must respond within <strong className="text-slate-800">15 working days</strong>.
      </p>
    </div>
  );
}

function ReduceBillSection() {
  const tips = [
    "Switch to energy-efficient gas appliances with higher BTU ratings — they consume less gas for the same output.",
    "Insulate your water geyser and pipes to retain heat and reduce re-heating gas usage.",
    "Use a pressure cooker for cooking — cuts cooking time and gas usage by up to 50%.",
    "Turn off the gas geyser pilot light when not in use — a pilot can consume significant gas per month.",
    "Schedule gas geyser usage — heat water only during times you actually need it rather than 24/7.",
    "Consider a solar water heater as a supplement — reducing gas geyser usage can save thousands per month.",
  ];
  return (
    <div id="reduce-bill" className="mb-8 scroll-mt-24">
      <SectionHeading icon={TrendingUp} iconBg="linear-gradient(135deg, #ECFDF5, #D1FAE5)" iconColor="text-emerald-600" title="Practical Tips to Reduce Your SSGC Gas Bill" />
      <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>Checking your bill regularly is the first step — reducing it is the real win. Even a modest 10–15% reduction in daily gas usage can drop you into a lower slab and produce significant savings.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}><CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} /></div>
            <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConclusionBlock() {
  return (
    <div className="rounded-xl p-6 md:p-8 border-l-4 border-red-500" style={{ background: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 50%, #FECACA 100%)" }}>
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle2 className="w-6 h-6 text-red-700 shrink-0" strokeWidth={2.5} />
        <h4 className="text-red-900 font-serif" style={{ fontSize: "18px", fontWeight: 800 }}>Final Word</h4>
      </div>
      <p className="text-red-800 italic" style={{ fontSize: "15px", lineHeight: 1.85 }}>
        Checking your SSGC gas bill online has never been more accessible. Whether you prefer the instant convenience of <strong>BillCheck</strong>, the official SSGC portal, the no-internet simplicity of SMS to 8118, the mobile app, or the free helpline on 1199 — multiple reliable methods are available. Make bill checking a regular monthly habit: verify your charges, monitor consumption trends, and act immediately on any discrepancy you spot. Bookmark this page and use the SSGC Bill Check tool at the top of this page to fetch your latest bill right now.
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
