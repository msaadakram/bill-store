"use client";

import { motion } from "motion/react";
import { FaqItem } from "./FaqItem";

export const faqs = [
  { q: "How can I check my SSGC gas bill online?", a: "Enter your 14-digit consumer number (also called reference number) in the SSGC Bill Check tool at the top of this page. Click Check Bill Now and your complete SSGC gas bill — including MMBtu consumed, OGRA tariff breakdown, bill amount, and due date — appears in seconds. Your SSGC gas bill is fetched directly from Sui Southern Gas Company servers in real-time." },
  { q: "How do I get a duplicate SSGC gas bill?", a: "Getting a duplicate SSGC gas bill is easy. Enter your 14-digit consumer number in the bill checker above, and your current duplicate SSGC gas bill loads instantly. You can view, download, or print the duplicate bill — it includes all the same details as your original: consumer number, meter number, MMBtu consumed, bill amount, due date, and OGRA tariff breakdown. If you need an older duplicate bill, visit your nearest SSGC regional office in Karachi, Sindh, or Balochistan." },
  { q: "How can I check my Sui Southern gas bill by consumer number?", a: "To check your Sui Southern gas bill by consumer number, enter your 14-digit consumer number in the SSGC Bill Check tool above. The consumer number is printed at the top of every Sui Southern Gas Company bill and starts with your subdivision code. Your bill details — including gas consumption in MMBtu, meter number, OGRA-approved tariff, and due date — load in seconds." },
  { q: "Where can I find my 14-digit Consumer Number?", a: "Your 14-digit Consumer Number (also called Reference Number) is printed on the top portion of every SSGC bill. It is the long number starting with the subdivision code (usually 0921 for SSGC consumers in Karachi). Your meter number is also listed nearby for cross-reference." },
  { q: "What is a Customer ID and how is it different?", a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest SSGC regional office in Karachi, Sindh, or Balochistan. Both Consumer Number and Customer ID can be used to fetch your SSGC gas bill." },
  { q: "Can I pay my bill through this platform?", a: "Currently BillCheck allows you to view and download your SSGC gas bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized payment centre before the due date shown on your bill." },
  { q: "Is my data safe on this platform?", a: "Yes. We do not store your consumer number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties." },
];

export function FaqSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100" style={{ fontSize: "12px", fontWeight: 700 }}>COMMON QUESTIONS</div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently Asked Questions About SSGC Gas Bill</h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>Find answers to common questions about checking your Sui Southern gas bill online, including duplicate bills and consumer number lookups.</p>
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
