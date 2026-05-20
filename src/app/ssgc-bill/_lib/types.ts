/** Input mode for the SSGC bill lookup form */
export type InputMode = "reference" | "customer";

/** Current step of the bill-check wizard */
export type Step = "input" | "loading" | "result" | "error";

/** Full bill details returned by the lookup */
export interface BillDetails {
  customerName: string;
  address: string;
  referenceNo: string;
  customerId: string;
  connectionType: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  lastDate: string;
  unitsConsumed: number;
  billAmount: number;
  taxAmount: number;
  surcharge: number;
  totalPayable: number;
  previousBalance: number;
  status: "unpaid" | "overdue" | "paid";
  sanctionedLoad: string;
  meterNo: string;
  tarriffCode: string;
}

/** A single saved search-history entry */
export interface HistoryEntry {
  id: string;
  ref: string;
  mode: InputMode;
  timestamp: number;
  customerName: string;
  totalPayable: number;
  status: BillDetails["status"];
  billMonth: string;
}
