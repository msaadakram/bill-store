"use client";

import {
  Shield, Info, Activity, BarChart3, TrendingUp,
  CheckCircle2, AlertCircle, Star, List,
} from "lucide-react";

/** Full LESCO blog-style guide section (TOC, methods, tariff table, tips) */
export function BlogGuideSection() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Decorative top bar */}
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #0D9488, #14B8A6, #5EEAD4, #99F6E4)" }} />

      <div className="p-3 sm:p-6 md:p-10 lg:p-14">
        {/* Intro */}
        <div className="max-w-3xl mb-10 pl-4 border-l-4 border-teal-400 bg-teal-50/30 rounded-r-xl py-4 pr-4">
          <p className="text-slate-600 italic" style={{ fontSize: "16px", lineHeight: 1.85 }}>
            LESCO — the <strong className="text-slate-800">Lahore Electric Supply Company</strong> — is one of
            Pakistan&apos;s largest electricity distribution companies, serving over{" "}
            <strong className="text-slate-800">5 million consumers</strong> across Lahore, Sheikhupura, Nankana
            Sahib, and Kasur districts. In the digital age, checking your electricity bill no longer requires
            standing in long queues or waiting for a physical copy to arrive in the post. This comprehensive guide
            walks you through every method available to check your LESCO bill — online, via SMS, through a mobile
            app, and even by phone — helping you stay on top of your consumption and payment deadlines every single
            month.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-white">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
              <List className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900" style={{ fontSize: "15px", fontWeight: 700 }}>Table of Contents</h3>
          </div>
          <div className="p-4 sm:p-5">
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {[
                { id: "why-check", label: "Why Check Your Bill Regularly" },
                { id: "bill-info", label: "What Information Is on Your Bill" },
                { id: "check-methods", label: "5 Ways to Check Your LESCO Bill" },
                { id: "tariff-rates", label: "LESCO Tariff Rates 2026" },
                { id: "bill-components", label: "Understanding Bill Components" },
                { id: "bill-errors", label: "What to Do If Bill Has an Error" },
                { id: "reduce-bill", label: "Tips to Reduce Your Bill" },
              ].map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all group"
                  >
                    <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* ── Why check regularly ── */}
        <div id="why-check" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)" }}>
              <Shield className="w-4 h-4 text-teal-700" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Why You Should Check Your LESCO Bill Regularly
            </h3>
          </div>
          <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            Regular bill checking is more than just a financial habit — it is a smart utility management practice. By monitoring your LESCO electricity bill each month, you can catch billing errors well before the due date, track your household or business consumption trends, plan your budget more effectively, and avoid late payment surcharges that can add up over time. LESCO bills include several components beyond the basic unit price — such as tariff adjustments, Fuel Price Adjustment (FPA), and government taxes. Understanding these line items keeps you fully informed and financially prepared for every billing cycle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {[
              "Catch billing errors early before overpaying",
              "Track consumption trends month-to-month",
              "Never miss a due date or payment deadline",
              "Plan your monthly budget with confidence",
              "Detect unauthorized usage or meter tampering",
              "Avoid late payment surcharges completely",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
                  <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── What's on the bill ── */}
        <div id="bill-info" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #FFF7ED, #FEE2D5)" }}>
              <Info className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              What Information Is Printed on Your LESCO Bill
            </h3>
          </div>
          <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            Before you dive into how to check your bill, it is worth knowing what you are looking for. Your LESCO electricity bill is a dense document containing several key data points. The most important is your <strong className="text-slate-800">14-digit Reference Number</strong> (also called Consumer Number), printed prominently at the top of every bill. This number is your primary identifier across all online platforms and SMS services. Other key fields include your meter number, sanctioned load, tariff category, units consumed for the billing month, and a full breakdown of all charges applied.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
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
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #3E8B8E, #7FB3B5)" }}>
                  <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.5 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── 5 Methods heading ── */}
        <div id="check-methods" className="mb-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)" }}>
              <Activity className="w-4 h-4 text-teal-700" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              5 Ways to Check Your LESCO Bill
            </h3>
          </div>
          <p className="text-slate-500 ml-12" style={{ fontSize: "14px", lineHeight: 1.6 }}>
            Choose the method that works best for you — from online platforms to a simple phone call.
          </p>
        </div>

        {/* Method 1 */}
        <div className="mb-8 rounded-xl border border-teal-100 overflow-hidden" style={{ borderLeft: "4px solid #0D9488" }}>
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "linear-gradient(135deg, #F0FAFB 0%, #D9F2F4 100%)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", fontSize: "13px", fontWeight: 800 }}>1</div>
            <h4 className="text-teal-800 font-serif" style={{ fontSize: "16px", fontWeight: 800 }}>Check via BillCheck Online Portal (Fastest Method)</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
              The easiest and most modern way to check your LESCO bill is through an online bill checking platform like <strong className="text-slate-800">BillCheck</strong>. This platform fetches real-time data directly from LESCO servers and presents it in a clean, mobile-friendly interface. Here is exactly how to use it:
            </p>
            <div className="space-y-3">
              {[
                { n: "01", step: "Open your browser and visit the BillCheck LESCO Bill page (you are already here!)" },
                { n: "02", step: 'Choose your input mode: "Reference Number" (14 digits) or "Customer ID" (shorter code)' },
                { n: "03", step: "Type your Reference Number in the format XXXX-XXXX-XXXXXX — the platform auto-formats it as you type" },
                { n: "04", step: 'Click the "Check Bill Now" button and wait 2–3 seconds for results to load' },
                { n: "05", step: "Your full bill appears: total payable, breakdown, due date, consumption details, and more" },
                { n: "06", step: "Download the bill as a file or click Print to get a hard copy instantly from your browser" },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-teal-700" style={{ background: "linear-gradient(135deg, #CCFBF1, #99F6E4)", fontSize: "11px", fontWeight: 800 }}>
                    {item.n}
                  </div>
                  <p className="text-slate-600 pt-0.5" style={{ fontSize: "14px", lineHeight: 1.7 }}>{item.step}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-lg bg-teal-50 border border-teal-100">
              <Star className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-teal-700" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                <strong>Pro tip:</strong> BillCheck automatically saves your recent searches to localStorage. Next time you visit, your previous reference numbers appear in the &quot;Recent Searches&quot; panel — no need to retype them.
              </p>
            </div>
          </div>
        </div>

        {/* Method 2 */}
        <MethodCard num={2} title="Check via LESCO Official Website">
          <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            LESCO operates its own official consumer portal at <strong className="text-slate-800">lesco.gov.pk</strong>. This is the authoritative source for your bill and is maintained directly by the company. To check your bill through the official website, navigate to the &quot;Bill Inquiry&quot; or &quot;Consumer Services&quot; section from the homepage, enter your 14-digit consumer number in the search field, and hit Submit. Your current month&apos;s bill will be displayed in full. Bear in mind that the official portal can occasionally experience downtime — particularly around the 5th to 10th of each month when new bills are generated en masse. During such periods, third-party platforms like BillCheck serve as a reliable fallback that draws from the same underlying data source.
          </p>
        </MethodCard>

        {/* Method 3 */}
        <MethodCard num={3} title="Check via SMS (No Internet Required)">
          <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            LESCO provides a convenient SMS bill inquiry service that works on any mobile phone — even a basic handset without internet connectivity. This is particularly useful for consumers in areas with limited or unreliable internet. Simply open your SMS app, type your 14-digit Consumer Number as the message body, and send it to <strong className="text-slate-800">8118</strong>. Within moments, you will receive an automated SMS reply containing your current bill amount, the due date, and your account status. Standard SMS charges apply depending on your mobile network operator. This service is operational 24 hours a day, 7 days a week, and works across all major networks including Jazz, Zong, Telenor, and Ufone.
          </p>
        </MethodCard>

        {/* Method 4 */}
        <MethodCard num={4} title="Check via LESCO Mobile App">
          <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            LESCO has launched its official mobile application available on both the <strong className="text-slate-800">Google Play Store</strong> and the <strong className="text-slate-800">Apple App Store</strong>. After downloading the app, register using your consumer number and CNIC. Once registered, your bill is displayed automatically on the dashboard each month as soon as it is generated. The app also supports payment integration with <strong className="text-slate-800">JazzCash</strong> and <strong className="text-slate-800">EasyPaisa</strong>, meaning you can check and pay in one convenient place. Push notifications alert you when a new bill arrives and again a few days before the due date — a genuinely practical feature for busy households and businesses that want to stay ahead of payment deadlines.
          </p>
        </MethodCard>

        {/* Method 5 */}
        <div className="mb-10 rounded-xl border border-slate-100 overflow-hidden" style={{ borderLeft: "4px solid #0D9488" }}>
          <div className="flex items-center gap-3 px-5 py-4 bg-slate-50">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", fontSize: "13px", fontWeight: 800 }}>5</div>
            <h4 className="text-slate-800 font-serif" style={{ fontSize: "16px", fontWeight: 800 }}>Check via LESCO Helpline (Call 118)</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-600" style={{ fontSize: "15px", lineHeight: 1.85 }}>
              For those who prefer the traditional route, LESCO&apos;s dedicated helpline <strong className="text-slate-800">118</strong> is available free of charge from any mobile or landline number across Pakistan. Dial 118, follow the IVR (Interactive Voice Response) menu, and select the bill inquiry option. When prompted, enter your 14-digit consumer number using your phone&apos;s keypad. The automated system will announce your current bill amount and due date clearly. This same number can also be used to register complaints about billing discrepancies, power outages, meter faults, and other service issues. The LESCO helpline operates 24 hours a day, 7 days a week without interruption.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── Tariff Rates Table ── */}
        <div id="tariff-rates" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)" }}>
              <BarChart3 className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              LESCO Electricity Tariff Rates 2026
            </h3>
          </div>
          <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            LESCO uses a progressive slab-based tariff structure for residential consumers set by NEPRA. The more units you consume, the higher the per-unit rate. Staying within lower slabs can save you thousands every month.
          </p>
          <TariffTable />
          <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-violet-50 border border-violet-100">
            <Star className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-violet-700" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              <strong>Tip:</strong> If your monthly consumption is around 300–350 units, reducing just 50–60 units can drop you into a lower slab and save PKR 1,000–2,000 per month.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── Understanding bill components ── */}
        <div id="bill-components" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #FFF7ED, #FEE2D5)" }}>
              <BarChart3 className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Understanding Your LESCO Bill Components
            </h3>
          </div>
          <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            When you check your LESCO bill, you will notice several line items that together make up the total payable amount. Understanding each one helps you verify accuracy and dispute any discrepancies with confidence. Here is a plain-language breakdown of every charge you will typically encounter on a standard LESCO electricity bill:
          </p>
          <div className="space-y-3">
            {[
              { term: "Fixed Charges", def: "A base charge applied every month regardless of consumption, calculated according to your sanctioned load (kW). Even if you consume zero units in a month, this charge still appears on your bill." },
              { term: "Variable / Energy Charges", def: "Charges based on your actual kWh units consumed, calculated using NEPRA-approved progressive tariff slabs. Higher consumption levels attract higher per-unit rates, making conservation genuinely rewarding." },
              { term: "Fuel Price Adjustment (FPA)", def: "A monthly component that rises or falls depending on the domestic and global cost of fuel used in electricity generation. This figure changes every billing cycle and can be positive or negative." },
              { term: "GST (17%)", def: "General Sales Tax applied on the total energy and fixed charges. This is a federal government levy collected by LESCO on behalf of the Federal Board of Revenue (FBR)." },
              { term: "TV Fee", def: "A nominal charge collected on behalf of Pakistan Television Corporation (PTV) as mandated by federal law. This fee is applied to most residential and commercial connections across the country." },
              { term: "Previous Balance", def: "Any outstanding amount from your last billing cycle that was not cleared before the due date. Unpaid balances carry forward and may attract additional surcharges if left unpaid beyond the last date." },
            ].map((item) => (
              <div key={item.term} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
                  <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-slate-900 mb-1 font-serif" style={{ fontSize: "14px", fontWeight: 700 }}>{item.term}</div>
                  <div className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.7 }}>{item.def}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── Error handling ── */}
        <div id="bill-errors" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #FEF2F2, #FEE2E2)" }}>
              <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              What to Do If Your Bill Has an Error
            </h3>
          </div>
          <p className="text-slate-600 mb-4" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            After checking your LESCO bill, if you notice a discrepancy — such as an incorrect meter reading, an unexpected spike in units consumed, a wrong tariff category, or an unexplained charge — do not simply pay and move on. Billing errors do occur and LESCO has formal channels to address them. Visit your nearest LESCO subdivision office with your CNIC and a printed or downloaded copy of the incorrect bill. Submit a written complaint at the customer service counter. Alternatively, call <strong className="text-slate-800">118</strong> or file an online complaint directly at <strong className="text-slate-800">lesco.gov.pk</strong>. Under NEPRA regulations, LESCO is required to investigate and formally respond to billing complaints within <strong className="text-slate-800">15 working days</strong>. If the error is confirmed, a corresponding adjustment will be reflected in your next bill.
          </p>
        </div>

        <div className="border-t border-slate-100 mb-10" />

        {/* ── Tips to reduce ── */}
        <div id="reduce-bill" className="mb-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" }}>
              <TrendingUp className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-serif" style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Practical Tips to Reduce Your LESCO Bill
            </h3>
          </div>
          <p className="text-slate-600 mb-5" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            Checking your bill regularly is the first step — reducing it is the real win. Pakistan&apos;s progressive electricity tariff structure means that as you consume more units each month, the per-unit rate rises steeply across multiple slabs. Even a modest 10–15% reduction in daily usage can drop you into a lower slab and produce significant savings on your monthly bill. The following practical measures are widely recommended and cost-effective to implement:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Replace all incandescent bulbs with LED lights — they deliver the same brightness while consuming up to 80% less electricity.",
              "Upgrade to inverter air conditioners. Modern inverter ACs are 30–50% more energy-efficient than conventional fixed-speed units.",
              "Set your AC thermostat to 26°C rather than 18–20°C. Each degree below 26°C increases electricity consumption by approximately 6%.",
              "Switch appliances off at the power socket rather than leaving them on standby. TVs, computers, and phone chargers still draw power 24/7 when on standby.",
              "Run washing machines and dishwashers during off-peak hours (late night or early morning) to help reduce peak-hour load charges.",
              "Consider rooftop solar panels. LESCO\u2019s net metering policy allows you to export surplus solar energy to the grid and offset your bill significantly each month.",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
                  <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="rounded-xl p-6 md:p-8 border-l-4 border-teal-500" style={{ background: "linear-gradient(135deg, #F0FAFB 0%, #D9F2F4 50%, #B3E5E9 100%)" }}>
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-teal-700 shrink-0" strokeWidth={2.5} />
            <h4 className="text-teal-900 font-serif" style={{ fontSize: "18px", fontWeight: 800 }}>Final Word</h4>
          </div>
          <p className="text-teal-800 italic" style={{ fontSize: "15px", lineHeight: 1.85 }}>
            Checking your LESCO bill online has never been more accessible. Whether you prefer the instant convenience of a platform like <strong>BillCheck</strong>, the authority of the official LESCO portal at lesco.gov.pk, the no-internet simplicity of an SMS to 8118, the app-based approach through the LESCO mobile app, or the personal touch of calling the free helpline on 118 — multiple reliable methods are readily available to every consumer. The key is to make bill checking a regular monthly habit: verify your charges as soon as the bill is generated, monitor consumption trends, plan your budget with confidence, and act immediately on any discrepancy you spot. Bookmark this page and use the LESCO Bill Check tool at the top of this page to fetch your latest bill right now — completely free, completely instant, and fully secure.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Private sub-components used only here       */
/* ───────────────────────────────────────────── */

/** Reusable method card wrapper (methods 2-4 share the same layout) */
function MethodCard({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 rounded-xl border border-slate-100 overflow-hidden" style={{ borderLeft: "4px solid #0D9488" }}>
      <div className="flex items-center gap-3 px-5 py-4 bg-slate-50">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", fontSize: "13px", fontWeight: 800 }}>
          {num}
        </div>
        <h4 className="text-slate-800 font-serif" style={{ fontSize: "16px", fontWeight: 800 }}>{title}</h4>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/** LESCO tariff rates table */
function TariffTable() {
  const rows = [
    { slab: "1", units: "1 – 100",  rate: "7.74",   est: "≈ PKR 774",      cat: "Protected", color: "#059669" },
    { slab: "2", units: "101 – 200", rate: "11.56",  est: "≈ PKR 1,930",    cat: "Low Use",   color: "#0D9488" },
    { slab: "3", units: "201 – 300", rate: "16.60",  est: "≈ PKR 3,590",    cat: "Moderate",  color: "#0369A1" },
    { slab: "4", units: "301 – 400", rate: "22.65",  est: "≈ PKR 5,855",    cat: "Standard",  color: "#7C3AED" },
    { slab: "5", units: "401 – 500", rate: "27.20",  est: "≈ PKR 8,575",    cat: "High Use",  color: "#D97706" },
    { slab: "6", units: "501 – 600", rate: "30.50",  est: "≈ PKR 11,625",   cat: "Heavy",     color: "#EA580C" },
    { slab: "7", units: "601 – 700", rate: "33.40",  est: "≈ PKR 14,965",   cat: "Very High", color: "#DC2626" },
    { slab: "8", units: "700+",      rate: "35.00+", est: "≈ PKR 17,465+",  cat: "Peak",      color: "#991B1B" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[480px]">
          <thead>
            <tr style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)" }}>
              <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Slab</th>
              <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Units (kWh)</th>
              <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Rate (PKR/kWh)</th>
              <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase">Monthly Est.</th>
              <th className="px-4 sm:px-5 py-3.5 text-white text-[11px] font-bold tracking-wider uppercase hidden sm:table-cell">Category</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.slab}
                className={`border-t border-slate-100 transition-colors hover:bg-teal-50/40 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <td className="px-4 sm:px-5 py-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold" style={{ background: `${row.color}15`, color: row.color }}>
                    {row.slab}
                  </span>
                </td>
                <td className="px-4 sm:px-5 py-3 text-slate-700 font-semibold" style={{ fontSize: "14px" }}>{row.units}</td>
                <td className="px-4 sm:px-5 py-3">
                  <span className="text-slate-900 font-bold" style={{ fontSize: "14px" }}>{row.rate}</span>
                </td>
                <td className="px-4 sm:px-5 py-3 text-slate-500" style={{ fontSize: "13px" }}>{row.est}</td>
                <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold" style={{ background: `${row.color}12`, color: row.color }}>
                    {row.cat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-slate-400 flex items-start gap-2" style={{ fontSize: "11px", lineHeight: 1.5 }}>
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          Rates are approximate based on NEPRA-approved tariff schedule for FY 2025-26. Actual bills include Fuel Price Adjustment (FPA), GST (17%), TV Fee, and other levies. Monthly estimates assume full consumption within that slab.
        </p>
      </div>
    </div>
  );
}
