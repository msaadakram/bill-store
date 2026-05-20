import { LescoBillDetailClient } from "./LescoBillDetailClient";
import {
  fetchLescoBill,
  fetchLescoBillRedirect,
} from "@/lib/server/lescoPitc";

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

  let bill: BillData | null = null;
  let error = "";
  let pitcRedirect = "";
  let typeUsed = typesToTry[0] || "U";

  for (const type of typesToTry) {
    typeUsed = type;
    const result = await fetchLescoBill(refno, type);
    if (result.success && result.data) {
      bill = result.data;
      break;
    }

    if (result.redirectUrl) {
      pitcRedirect = result.redirectUrl;
    }

    const redirectResult = await fetchLescoBillRedirect(refno, type);
    if (redirectResult.success && redirectResult.data) {
      bill = redirectResult.data;
      break;
    }

    if (redirectResult.redirectUrl) {
      pitcRedirect = redirectResult.redirectUrl;
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
