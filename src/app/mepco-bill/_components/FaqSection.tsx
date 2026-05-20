"use client";

import { motion } from "motion/react";
import { FaqItem } from "./FaqItem";

export const faqs = [
  { q: "How can I check my MEPCO bill online by reference number?", a: "Enter your 14-digit Reference Number (printed on the top of your MEPCO bill) into the BillCheck lookup form above. Click 'Check Bill Now' and your full bill — including total payable, units consumed, due date, and tax breakdown — appears in 2–3 seconds. The reference number typically starts with '0521' for Multan and other area-specific codes across south Punjab. This is the fastest way to check your MEPCO electricity bill online." },
  { q: "How do I download a duplicate MEPCO bill?", a: "A duplicate MEPCO bill is a reprint of your original bill. On BillCheck, once you fetch your bill by reference number, click the Download button to save a PDF copy to your device. You can also visit mepco.gov.pk, enter your consumer number in the Bill Inquiry section, and download the duplicate bill from the official portal. Alternatively, send your reference number via SMS to 8118 to receive a text summary of your current bill." },
  { q: "What is MEPCO on bill?", a: "'MEPCO on bill' refers to the MEPCO branding and consumer details printed on every electricity bill issued by the Multan Electric Power Company. It appears at the top-left of your bill along with your reference number, consumer name, address, meter number, and billing month. 'MEPCO' stands for Multan Electric Power Company, the electricity distribution company serving Multan, Bahawalpur, DG Khan, and the entire south Punjab region. If you see 'MEPCO' on your bill, it confirms your connection falls under MEPCO's distribution network." },
  { q: "Where can I find my 14-digit MEPCO Reference Number?", a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every MEPCO bill. It is the long number starting with your subdivision code (typically starts with '0521')." },
  { q: "What is a Customer ID and how is it different?", a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest MEPCO subdivision office in Multan, Bahawalpur, DG Khan, or other service areas. Both Reference Number and Customer ID can be used to fetch your bill." },
  { q: "How current is the MEPCO bill data?", a: "Bill data is fetched directly from MEPCO's servers in real-time. It reflects the most recent bill issued for your connection across the Multan and south Punjab region." },
  { q: "Can I pay my MEPCO bill through this platform?", a: "Currently BillCheck allows you to view and download your bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized MEPCO payment centre located across Multan, Bahawalpur, DG Khan, and other cities." },
  { q: "Is my data safe on this platform?", a: "Yes. We do not store your reference number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties." },
];

export function FaqSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100" style={{ fontSize: "12px", fontWeight: 700 }}>COMMON QUESTIONS</div>
        </div>
        <h2 className="text-slate-900 mb-4 font-serif" style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4" style={{ fontSize: "16px", lineHeight: 1.6 }}>Find answers to common questions about checking your MEPCO electricity bill online.</p>
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
