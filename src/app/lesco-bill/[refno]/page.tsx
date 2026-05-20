import { headers } from "next/headers";
import { LescoBillDetailClient } from "./LescoBillDetailClient";

interface BillData {
  customerName: string;
  address: string;
  referenceNo: string;
  consumerId: string;
  connectionType: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  lastDate: string;
  unitsConsumed: number;
  billAmount: number;
  totalPayable: number;
  status: "paid" | "unpaid" | "overdue";
  meterNo: string;
  tariffCode: string;
  sanctionedLoad: string;
  amountAfterDue: number;
  amountPaid: number;
  paymentDate: string;
  connectionDate: string;
  division: string;
  subDivision: string;
}

interface ApiResponse {
  success: boolean;
  data?: BillData;
  error?: string;
  redirectUrl?: string;
}

function getBaseUrl() {
  const hdrs = headers();
  const proto = hdrs.get("x-forwarded-proto") || "http";
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000";
  return `${proto}://${host}`;
}

async function fetchBillFromApi(baseUrl: string, refno: string, type: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${baseUrl}/api/bill/lesco`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refno, type: type || "U" }),
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error while fetching bill" };
  }
}

async function fetchBillViaPitcPage(baseUrl: string, refno: string, type: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${baseUrl}/api/bill/lesco/redirect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refno, type: type || "U" }),
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

function getTypesToTry(mode: string | undefined) {
  const typeFromMode = mode === "customer" ? "C" : mode === "reference" ? "R" : "U";
  return Array.from(new Set([typeFromMode, "U", "R", "C"]));
}

export default async function LescoBillDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ refno: string }>;
  searchParams?: Promise<{ mode?: string }>;
}) {
  const { refno } = await params;
  const mode = (await searchParams)?.mode;
  const typesToTry = getTypesToTry(mode);
  const baseUrl = getBaseUrl();

  let bill: BillData | null = null;
  let error = "";
  let pitcRedirect = "";
  let typeUsed = typesToTry[0] || "U";

  for (const type of typesToTry) {
    typeUsed = type;
    const result = await fetchBillFromApi(baseUrl, refno, type);
    if (result.success && result.data) {
      bill = result.data;
      break;
    }

    if (result.error && result.error.includes("redirect")) {
      pitcRedirect =
        result.redirectUrl ||
        `https://bill.pitc.com.pk/gbill.aspx?refno=${refno}&type=${type}`;
    }

    const redirectResult = await fetchBillViaPitcPage(baseUrl, refno, type);
    if (redirectResult.success && redirectResult.data) {
      bill = redirectResult.data;
      break;
    }

    error = result.error || redirectResult.error || error;
  }

  return (
    <LescoBillDetailClient
      refno={refno}
      bill={bill}
      error={error || (!bill ? "Consumer not found" : "")}
      pitcRedirect={pitcRedirect}
      pitcType={typeUsed}
    />
  );
}
