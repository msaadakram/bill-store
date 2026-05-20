"use client";

import { motion } from "motion/react";
import { FaqItem } from "./FaqItem";

export const faqs = [
  { q: "How can I check my K-Electric bill online?", a: "Enter your 14-digit reference number (also called consumer number) in the K-Electric Bill Check tool at the top of this page. Click Check Bill Now and your complete K-Electric electricity bill — including units consumed, bill amount, due date, and NEPRA tariff breakdown — appears in seconds. You can also check via the official portal at KE.com.pk, SMS your consumer number to 8119, or use the KE mobile app." },
  { q: "How do I check my KE electricity bill by reference number?", a: "Your 14-digit reference number is the quickest way to fetch your K-Electric bill. Type it into the bill checker above in the format XXXX-XXXX-XXXXXX (starting with your Karachi subdivision code). The tool auto-formats it and fetches your real-time bill data — no login, no registration required." },
  { q: "How do I get a duplicate K-Electric bill?", a: "Getting a duplicate K-Electric bill is easy. Enter your 14-digit reference number in the bill checker above, and your current duplicate KE bill loads instantly. You can view, download, or print the duplicate bill — it includes all the same details as your original: reference number, units consumed, bill amount, due date, and NEPRA tariff breakdown. If you need an older duplicate bill, visit your nearest KE customer service centre in Karachi." },
  { q: "What is the K-Electric helpline number?", a: "The K-Electric helpline is 118 — available 24/7 free of charge from any mobile or landline. You can also reach KE via SMS by sending your consumer number to 8119 for instant bill information. For online support, visit the official website at KE.com.pk or use the BillCheck KE Bill tool at the top of this page." },
  { q: "Where can I find my 14-digit Reference Number?", a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every K-Electric bill. It is the long number starting with your subdivision code (typically 0721 for Karachi consumers)." },
  { q: "What is a Customer ID and how is it different?", a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest K-Electric customer service centre. Both Reference Number and Customer ID can be used to fetch your bill." },
  { q: "How current is the bill data?", a: "Bill data is fetched directly from K-Electric's servers in real-time. It reflects the most recent bill issued for your connection. Units consumed (kWh) and bill amount are always up-to-date." },
  { q: "Can I pay my bill through this platform?", a: "Currently BillCheck allows you to view and download your bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized K-Electric payment centre before the due date shown on your bill." },
  { q: "Is my data safe on this platform?", a: "Yes. We do not store your reference number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties." },
];

export function FaqSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100" style={{ fontSize: "12px", fontWeight: 700 }}>COMMON QUESTIONS</div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently Asked Questions About K-Electric Electricity Bill</h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>Find answers to common questions about checking your K-Electric electricity bill online, including duplicate bills and reference number lookups.</p>
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
