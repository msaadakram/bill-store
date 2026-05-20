import type { Company } from "@/data/billData";
import type { BillData } from "@/components/BillResult";

/** Generate a randomised mock bill for demo purposes */
export function generateMockBill(refNum: string, company: Company): BillData {
  const statuses: BillData["status"][] = ["unpaid", "overdue", "paid"];
  const months = [
    "January 2026",
    "February 2026",
    "December 2025",
    "November 2025",
  ];
  const addresses = [
    "House #12, Street 5, Gulberg III, Lahore",
    "Plot 45-B, F-7/2, Islamabad",
    "Flat 3C, Block 14, Gulshan-e-Iqbal, Karachi",
    "House #88, Model Town Extension, Faisalabad",
  ];
  const names = [
    "Muhammad Ali Khan",
    "Ahmed Hassan",
    "Fatima Malik",
    "Asif Raza",
    "Sara Noor",
    "Bilal Akbar",
  ];

  const amount = (Math.floor(Math.random() * 8000) + 1500).toLocaleString();
  const units = Math.floor(Math.random() * 500) + 100;
  const dueDay = Math.floor(Math.random() * 15) + 10;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const month = months[Math.floor(Math.random() * months.length)];
  const address = addresses[Math.floor(Math.random() * addresses.length)];
  const name = names[Math.floor(Math.random() * names.length)];

  return {
    customerName: name,
    referenceNumber: refNum,
    amount,
    dueDate: `${dueDay} February 2026`,
    units:
      company.id.includes("gas") ||
      company.id.includes("ssgc") ||
      company.id.includes("sngpl")
        ? undefined
        : String(units),
    billMonth: month,
    status,
    address,
  };
}
