"use client";

import { motion } from "motion/react";
import { FaqItem } from "./FaqItem";

export const faqs = [
  { q: "How can I check my SNGPL gas bill online?", a: "Enter your 14-digit consumer number in the SNGPL Bill Check tool at the top of this page. Click Check Bill Now and your complete SNGPL gas bill — including gas consumption in MMBtu, bill amount, due date, OGRA tariff breakdown, and pressure factor details — appears in seconds." },
  { q: "How do I get a duplicate SNGPL gas bill?", a: "Getting a duplicate SNGPL gas bill is easy. Enter your 14-digit consumer number in the bill checker above, and your current duplicate SNGPL gas bill loads instantly. You can view, download, or print the duplicate bill — it includes all the same details as your original: consumer number, gas consumption in MMBtu, bill amount, due date, OGRA tariff, and meter number. If you need an older duplicate bill, visit your nearest SNGPL regional office in Punjab or KPK." },
  { q: "What is a consumer number and where can I find it on my SNGPL bill?", a: "Your consumer number (also called Reference Number) is a 14-digit identifier printed prominently on the top portion of every SNGPL gas bill. It typically starts with a region code such as 0821 for Lahore region. You can also find it near the meter number and billing address section. Both consumer number and Customer ID can be used to fetch your SNGPL bill online." },
  { q: "Where can I find my 14-digit Reference Number?", a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every SNGPL gas bill. It is the long number starting with your region code (typically 0821 for Lahore region)." },
  { q: "What is a Customer ID and how is it different?", a: "The Customer ID is a shorter identifier linked to your gas account. You can find it on your bill or by visiting your nearest SNGPL regional office. Both Reference Number and Customer ID can be used to fetch your bill." },
  { q: "How current is the bill data?", a: "Bill data is fetched directly from SNGPL's servers in real-time. It reflects the most recent gas bill issued for your connection. Gas consumption in MMBtu, OGRA tariff rates, and bill amount are always up-to-date." },
  { q: "Can I pay my gas bill through this platform?", a: "Currently BillCheck allows you to view and download your gas bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized SNGPL payment centre." },
  { q: "Is my data safe on this platform?", a: "Yes. We do not store your consumer number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties." },
];

export function FaqSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100" style={{ fontSize: "12px", fontWeight: 700 }}>COMMON QUESTIONS</div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>Find answers to common questions about checking your SNGPL gas bill online.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4 px-4 sm:px-0">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}>
            <FaqItem q={faq.q} a={faq.a} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
