/**
 * Frontend API client for the BillCheck Admin API.
 * Connects to the admin backend (default: http://localhost:3001) to fetch real bill data.
 */

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3001";

// ─── Types (mirroring admin types) ───

export interface BillData {
  customerName: string;
  address: string;
  referenceNo: string;
  consumerNo: string;
  connectionType: string;
  companyId: string;
  companyName: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  lastDate: string;
  unitsConsumed: number;
  billAmount: number;
  arrears: number;
  surcharge: number;
  taxAmount: number;
  totalPayable: number;
  previousBalance: number;
  status: "paid" | "unpaid" | "overdue";
  meterNo: string;
  tariffCode: string;
  sanctionedLoad: string;
}

export interface BillApiResponse {
  success: boolean;
  data?: BillData;
  error?: string;
  cached?: boolean;
  responseTime?: number;
}

export interface CompanyInfo {
  id: string;
  name: string;
  short: string;
  parser: string;
  active: boolean;
  color: string;
}

// ─── API Functions ───

/**
 * Fetch a bill from the admin API.
 * @param company - Company ID (e.g. "iesco", "lesco", "ke")
 * @param refNo - Reference / consumer number
 */
export async function fetchBill(company: string, refNo: string): Promise<BillApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/bill`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, refNo }),
    });

    const json: BillApiResponse = await res.json();
    return json;
  } catch (error) {
    return {
      success: false,
      error: "Unable to connect to the bill service. Please try again later.",
    };
  }
}

/**
 * Fetch a bill using the GET endpoint.
 * @param company - Company ID (e.g. "fesco")
 * @param refNo - Reference number
 */
export async function fetchBillByGet(company: string, refNo: string): Promise<BillApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/bill/${company}?refno=${encodeURIComponent(refNo)}`);
    const json: BillApiResponse = await res.json();
    return json;
  } catch (error) {
    return {
      success: false,
      error: "Unable to connect to the bill service. Please try again later.",
    };
  }
}

/**
 * Get the list of supported companies from the admin API.
 */
export async function fetchCompanies(): Promise<CompanyInfo[]> {
  try {
    const res = await fetch(`${API_BASE}/api/companies`);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}
