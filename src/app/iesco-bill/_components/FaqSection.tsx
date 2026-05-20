"use client";

import { motion } from "motion/react";
import { FaqItem } from "./FaqItem";

export const faqs = [
  { q: "Where can I find my 14-digit Reference Number?", a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every IESCO bill. It is the long number starting with your subdivision code." },
  { q: "What is a Customer ID and how is it different?", a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest IESCO subdivision office. Both Reference Number and Customer ID can be used to fetch your bill." },
  { q: "How current is the bill data?", a: "Bill data is fetched directly from IESCO's servers in real-time. It reflects the most recent bill issued for your connection." },
  { q: "Can I pay my bill through this platform?", a: "Currently BillCheck allows you to view and download your bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized payment centre." },
  { q: "Is my data safe on this platform?", a: "Yes. We do not store your reference number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties." },
  { q: "How can I check my IESCO bill online by reference number?", a: "Enter your 14-digit IESCO reference number (found at the top of any previous bill) into the BillCheck IESCO Bill Check tool at the top of this page. Click Check Bill Now and your current bill appears instantly with full breakdown — units consumed (kWh), NEPRA tariff, FPA, GST, due date, and total payable amount. No registration required." },
  { q: "How do I download a duplicate IESCO bill?", a: "To download a duplicate IESCO bill, enter your 14-digit reference number in the BillCheck IESCO bill checker above. Once your bill loads, click the Download/Print button to save a PDF copy. A duplicate IESCO bill contains the same information as the original — consumer name, address, reference number, meter readings, units consumed, bill amount, and due date. This is useful if you lost your original bill or need an extra copy for payment records in Islamabad or Rawalpindi." },
];

export function FaqSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100" style={{ fontSize: "12px", fontWeight: 700 }}>COMMON QUESTIONS</div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>Find answers to common questions about checking your IESCO electricity bill online.</p>
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
