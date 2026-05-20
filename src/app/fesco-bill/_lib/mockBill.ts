import type { BillDetails, InputMode } from "./types";

/** Generate a randomised mock FESCO bill for demo purposes */
export function mockBill(ref: string, mode: InputMode): BillDetails {
  const names = [
    "Muhammad Asim Khan",
    "Fatima Malik",
    "Ahmed Hassan Raza",
    "Sara Noor Butt",
    "Bilal Akbar Sheikh",
    "Zainab Tariq",
    "Usman Ghani",
    "Ayesha Iqbal",
  ];
  const addresses = [
    "House #12-A, Street 7, Gulberg III, Faisalabad",
    "Plot 88, Model Town Extension, Faisalabad",
    "Bungalow 45, Canal Road, Faisalabad",
    "House #102, Madina Town, Faisalabad",
    "Flat 3B, Jinnah Colony, Faisalabad",
    "Shop #7, Ghanta Ghar Bazaar, Faisalabad",
  ];
  const conn = ["Residential (LT)", "Commercial (LT)", "Industrial (HT)", "Agricultural (LT)"];
  const months = ["January 2026", "February 2026", "December 2025", "November 2025"];
  const statuses: BillDetails["status"][] = ["unpaid", "overdue", "paid"];
  const r = (a: number, b: number) => Math.floor(Math.random() * (b - a) + a);

  const units = r(120, 900);
  const bill = r(1800, 12000);
  const tax = Math.round(bill * 0.17);
  const prev = r(0, 3000);
  const sur = Math.round(bill * 0.01);
  const total = bill + tax + sur + prev;
  const dueDay = r(10, 25);

  return {
    customerName: names[r(0, names.length)],
    address: addresses[r(0, addresses.length)],
    referenceNo: mode === "reference" ? ref : `0421${ref.padEnd(10, "0").slice(0, 10)}`,
    customerId: mode === "customer" ? ref : `FID-${ref.slice(0, 6)}`,
    connectionType: conn[r(0, conn.length)],
    billMonth: months[r(0, months.length)],
    issueDate: `${r(1, 10)} February 2026`,
    dueDate: `${dueDay} February 2026`,
    lastDate: `${dueDay + 5} February 2026`,
    unitsConsumed: units,
    billAmount: bill,
    taxAmount: tax,
    surcharge: sur,
    totalPayable: total,
    previousBalance: prev,
    status: statuses[r(0, statuses.length)],
    sanctionedLoad: `${r(1, 10)} kW`,
    meterNo: `M${r(1000000, 9999999)}`,
    tarriffCode: ["A1", "B1", "C1", "D1"][r(0, 4)],
  };
}
