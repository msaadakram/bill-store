import type { BillDetails, InputMode } from "./types";

/** Generate a randomised mock MEPCO bill for demo purposes */
export function mockBill(ref: string, mode: InputMode): BillDetails {
  const names = [
    "Rana Shahid Mehmood",
    "Saima Akhtar",
    "Ghulam Mustafa Qureshi",
    "Nadia Javed",
    "Tariq Mehmood Bhutta",
    "Hina Sohail",
    "Waseem Abbas",
    "Kalsoom Bibi",
  ];
  const addresses = [
    "House #23-C, Street 4, Multan Cantt, Multan",
    "Plot 156, Model Town, Multan",
    "Bungalow 72, Bosan Road, Multan",
    "House #89, Shah Rukn-e-Alam Colony, Multan",
    "Flat 5A, Nishtar Road, Multan",
    "Shop #12, Ghanta Ghar Chowk, Bahawalpur",
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
    referenceNo: mode === "reference" ? ref : `0521${ref.padEnd(10, "0").slice(0, 10)}`,
    customerId: mode === "customer" ? ref : `MEP-${ref.slice(0, 6)}`,
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
