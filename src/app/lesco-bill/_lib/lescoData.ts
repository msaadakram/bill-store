/** FAQ items for the LESCO page */
export const lescoFaqs = [
  {
    q: "Where can I find my 14-digit Reference Number?",
    a: "Your 14-digit Reference Number (also called Consumer Number) is printed on the top portion of every LESCO bill. It is the long number starting with your subdivision code.",
  },
  {
    q: "What is a Customer ID and how is it different?",
    a: "The Customer ID is a shorter identifier linked to your account. You can find it on your bill or by visiting your nearest LESCO subdivision office. Both Reference Number and Customer ID can be used to fetch your bill.",
  },
  {
    q: "How current is the bill data?",
    a: "Bill data is fetched directly from LESCO's servers in real-time. It reflects the most recent bill issued for your connection.",
  },
  {
    q: "Can I pay my bill through this platform?",
    a: "Currently BillCheck allows you to view and download your bill. You can pay through any bank, mobile banking app (JazzCash, EasyPaisa), or authorized payment centre.",
  },
  {
    q: "Is my data safe on this platform?",
    a: "Yes. We do not store your reference number or any personal data on our servers. All queries are made in real-time and your information is never shared with third parties.",
  },
] as const;

/** Other electricity companies shown in the sidebar */
export const otherCompanies = [
  { name: "K-Electric (KE)", color: "#DC2626", bg: "#FEF2F2", path: "/bill/electricity" },
  { name: "FESCO", color: "#7C3AED", bg: "#F5F3FF", path: "/bill/electricity" },
  { name: "IESCO", color: "#0369A1", bg: "#F0F9FF", path: "/bill/electricity" },
] as const;
