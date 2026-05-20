import type { Metadata } from "next";
import { generateBillPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateBillPageMetadata("fesco");

export default function BillLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
