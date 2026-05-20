/**
 * SEO keyword data extracted from Google Keyword Planner (April 2025 – March 2026).
 * All keywords have LOW competition — ranking is achievable with on-page optimization.
 */

export interface CompanyKeywords {
  companyId: string;
  companyName: string;
  companyFull: string;
  category: "electricity" | "gas";
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  lsiKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1Text: string;
  duplicateBillKeywords: string[];
  regionName: string;
  consumerCount: string;
}

export const companyKeywords: Record<string, CompanyKeywords> = {
  lesco: {
    companyId: "lesco",
    companyName: "LESCO",
    companyFull: "Lahore Electric Supply Company",
    category: "electricity",
    primaryKeywords: [
      "Check LESCO Bill Online",
      "LESCO Bill Check",
      "LESCO Bill Online",
      "LESCO Electricity Bill",
    ],
    secondaryKeywords: [
      "lesco bill duplicate",
      "lesco bill on line",
      "check lesco bill online",
      "bill check lesco",
      "online bill check lesco",
      "lesco wapda bill",
    ],
    longTailKeywords: [
      "lesco bill check online 2026",
      "lesco bill online check by reference number",
      "how to check lesco electricity bill online",
      "lesco duplicate bill download",
      "lesco bill view online free",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Lahore",
      "NEPRA tariff", "kWh", "sanctioned load",
    ],
    metaTitle:
      "Check LESCO Bill Online 2026 — Instant LESCO Electricity Bill | BillCheck",
    metaDescription:
      "Check your LESCO electricity bill online instantly. Enter your 14-digit reference number to view, download or print your LESCO bill. Free, fast, secure. Serving Lahore & surrounding areas.",
    h1Text: "Check Your LESCO Electricity Bill Online",
    duplicateBillKeywords: [
      "lesco duplicate bill",
      "duplicate bill lesco",
      "lesco bill duplicate online",
    ],
    regionName: "Lahore & surrounding areas",
    consumerCount: "5 million",
  },

  fesco: {
    companyId: "fesco",
    companyName: "FESCO",
    companyFull: "Faisalabad Electric Supply Company",
    category: "electricity",
    primaryKeywords: [
      "FESCO Online Bill Check",
      "Check FESCO Bill",
      "FESCO Bill Online",
      "FESCO Electricity Bill",
      "FESCO Bill Check Online",
    ],
    secondaryKeywords: [
      "fescobill",
      "fasco bill check",
      "fesco bill chak",
      "fesco bill on line",
      "fesco billing online",
      "online fesco bill check",
      "duplicate bill fesco",
      "check fesco bill online",
    ],
    longTailKeywords: [
      "fesco bill check online 2026",
      "fesco bill online check by reference number",
      "how to check fesco electricity bill online",
      "fesco duplicate bill download",
      "fesco online bill check free",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Faisalabad",
      "NEPRA tariff", "kWh", "sanctioned load", "central Punjab",
    ],
    metaTitle:
      "Check FESCO Bill Online 2026 — Instant FESCO Electricity Bill | BillCheck",
    metaDescription:
      "Check your FESCO electricity bill online instantly. Enter your 14-digit reference number to view, download or print your FESCO bill. Free, fast, and secure. Serving Faisalabad & central Punjab.",
    h1Text: "Check Your FESCO Electricity Bill Online",
    duplicateBillKeywords: [
      "fesco duplicate bill",
      "duplicate bill fesco",
      "fesco bill duplicate download",
    ],
    regionName: "Faisalabad & central Punjab",
    consumerCount: "4 million",
  },

  iesco: {
    companyId: "iesco",
    companyName: "IESCO",
    companyFull: "Islamabad Electric Supply Company",
    category: "electricity",
    primaryKeywords: [
      "IESCO Bill Check",
      "Check IESCO Bill Online",
      "IESCO Online Bill",
      "IESCO Bill Online Check",
    ],
    secondaryKeywords: [
      "iesco bill check online",
      "iesco bill on line",
      "iesco online bills",
      "duplicate bill iesco",
      "duplicate iesco bill",
      "check iesco bill online",
      "bill check online iesco",
    ],
    longTailKeywords: [
      "iesco bill online check by reference number",
      "iesco electricity bill online check",
      "iesco duplicate bill download",
      "how to check iesco bill online 2026",
      "iesco online bill check free",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Islamabad",
      "Rawalpindi", "NEPRA tariff", "kWh", "sanctioned load",
    ],
    metaTitle:
      "Check IESCO Bill Online 2026 — Instant IESCO Electricity Bill | BillCheck",
    metaDescription:
      "Check your IESCO electricity bill online instantly. Enter your reference number to view, download or print your IESCO bill. Serving Islamabad & Rawalpindi. Free & secure.",
    h1Text: "Check Your IESCO Electricity Bill Online",
    duplicateBillKeywords: [
      "iesco duplicate bill",
      "duplicate iesco bill",
      "duplicate bill iesco",
    ],
    regionName: "Islamabad & Rawalpindi",
    consumerCount: "3.5 million",
  },

  mepco: {
    companyId: "mepco",
    companyName: "MEPCO",
    companyFull: "Multan Electric Power Company",
    category: "electricity",
    primaryKeywords: [
      "MEPCO Online Bill",
      "MEPCO Bill Check",
      "Check MEPCO Bill Online",
      "MEPCO Electricity Bill",
    ],
    secondaryKeywords: [
      "mepco on bill",
      "mepco check bill",
      "mepco check online bill",
      "online mepco bill check",
      "check online mepco bill",
      "duplicate bill mepco",
      "bill check online mepco",
    ],
    longTailKeywords: [
      "mepco bill check online 2026",
      "mepco online bill check by reference number",
      "how to check mepco electricity bill online",
      "mepco duplicate bill download",
      "mepco wapda bill online check",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Multan",
      "south Punjab", "NEPRA tariff", "kWh", "sanctioned load",
      "Bahawalpur", "DG Khan",
    ],
    metaTitle:
      "Check MEPCO Bill Online 2026 — Instant MEPCO Electricity Bill | BillCheck",
    metaDescription:
      "Check your MEPCO electricity bill online instantly. Enter your reference number to view, download or print your MEPCO bill. Serving Multan & south Punjab. Free, fast, secure.",
    h1Text: "Check Your MEPCO Electricity Bill Online",
    duplicateBillKeywords: [
      "mepco duplicate bill",
      "duplicate bill mepco",
      "mepco bill duplicate download",
    ],
    regionName: "Multan & south Punjab",
    consumerCount: "4 million",
  },

  gepco: {
    companyId: "gepco",
    companyName: "GEPCO",
    companyFull: "Gujranwala Electric Power Company",
    category: "electricity",
    primaryKeywords: [
      "GEPCO Online Bill",
      "GEPCO Bill Check",
      "Check GEPCO Bill Online",
      "GEPCO Electricity Bill",
    ],
    secondaryKeywords: [
      "gepco billing",
      "gepco on line bill",
      "gepco bill online",
      "duplicate bill gepco",
      "gepco bill duplicate",
      "online bill check gepco",
      "gapco bill check",
    ],
    longTailKeywords: [
      "gepco bill check online 2026",
      "gepco online bill check by reference number",
      "how to check gepco electricity bill online",
      "gepco duplicate bill download",
      "gepco bill online check free",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Gujranwala",
      "north Punjab", "Sialkot", "NEPRA tariff", "kWh",
    ],
    metaTitle:
      "Check GEPCO Bill Online 2026 — Instant GEPCO Electricity Bill | BillCheck",
    metaDescription:
      "Check your GEPCO electricity bill online instantly. Enter your reference number to view, download or print your GEPCO bill. Serving Gujranwala & north Punjab. Free & secure.",
    h1Text: "Check Your GEPCO Electricity Bill Online",
    duplicateBillKeywords: [
      "gepco duplicate bill",
      "duplicate bill gepco",
      "gepco bill duplicate download",
    ],
    regionName: "Gujranwala & north Punjab",
    consumerCount: "3 million",
  },

  ke: {
    companyId: "ke",
    companyName: "K-Electric",
    companyFull: "K-Electric",
    category: "electricity",
    primaryKeywords: [
      "K Electric Bill Check",
      "KE Bill Check Online",
      "K-Electric Online Bill",
      "Check KE Bill",
    ],
    secondaryKeywords: [
      "k electric online bill",
      "k electric bill online check",
      "ke bill check",
      "k electric electricity bill",
      "online bill check k electric",
    ],
    longTailKeywords: [
      "k electric bill check online 2026",
      "ke duplicate bill download",
      "how to check k electric bill online",
      "k electric bill online check free",
    ],
    lsiKeywords: [
      "electricity bill", "reference number", "consumer number",
      "units consumed", "due date", "bill amount", "Karachi",
      "NEPRA tariff", "kWh", "sanctioned load",
    ],
    metaTitle:
      "Check K-Electric Bill Online 2026 — Instant KE Electricity Bill | BillCheck",
    metaDescription:
      "Check your K-Electric (KE) electricity bill online instantly. Enter your reference number to view, download or print your KE bill. Serving Karachi. Free, fast & secure.",
    h1Text: "Check Your K-Electric Electricity Bill Online",
    duplicateBillKeywords: [
      "ke duplicate bill",
      "k electric duplicate bill",
      "duplicate bill k electric",
    ],
    regionName: "Karachi & surrounding areas",
    consumerCount: "3.5 million",
  },

  sngpl: {
    companyId: "sngpl",
    companyName: "SNGPL",
    companyFull: "Sui Northern Gas Pipelines Limited",
    category: "gas",
    primaryKeywords: [
      "SNGPL Bill Check Online",
      "Check SNGPL Gas Bill",
      "SNGPL Online Bill",
      "SNGPL Gas Bill Check",
    ],
    secondaryKeywords: [
      "online bill check sngpl",
      "sngpl check bill online",
      "sngpl gas bill online",
      "sui northern gas bill check",
      "sngpl duplicate bill",
    ],
    longTailKeywords: [
      "sngpl bill check online 2026",
      "sngpl gas bill online check by consumer number",
      "how to check sngpl gas bill online",
      "sngpl duplicate bill download",
      "sui northern gas bill online check",
    ],
    lsiKeywords: [
      "gas bill", "consumer number", "MMBtu", "due date",
      "bill amount", "OGRA", "meter number", "gas consumption",
      "Punjab", "KPK", "pressure factor",
    ],
    metaTitle:
      "Check SNGPL Gas Bill Online 2026 — Instant SNGPL Bill | BillCheck",
    metaDescription:
      "Check your SNGPL gas bill online instantly. Enter your consumer number to view, download or print your Sui Northern gas bill. Free, fast, and secure. Serving Punjab & KPK.",
    h1Text: "Check Your SNGPL Gas Bill Online",
    duplicateBillKeywords: [
      "sngpl duplicate bill",
      "sngpl duplicate gas bill",
      "duplicate bill sngpl",
    ],
    regionName: "Punjab & KPK",
    consumerCount: "6 million",
  },

  ssgc: {
    companyId: "ssgc",
    companyName: "SSGC",
    companyFull: "Sui Southern Gas Company",
    category: "gas",
    primaryKeywords: [
      "SSGC Bill Check Online",
      "Check SSGC Gas Bill",
      "SSGC Online Bill",
      "SSGC Gas Bill Check",
    ],
    secondaryKeywords: [
      "ssgc duplicate bill",
      "ssgc gas bill online",
      "sui southern gas bill check",
      "online ssgc bill check",
      "ssgc bill online check",
    ],
    longTailKeywords: [
      "ssgc bill check online 2026",
      "ssgc gas bill online check by consumer number",
      "how to check ssgc gas bill online",
      "ssgc duplicate bill download",
      "sui southern gas bill online check",
    ],
    lsiKeywords: [
      "gas bill", "consumer number", "MMBtu", "due date",
      "bill amount", "OGRA", "meter number", "gas consumption",
      "Karachi", "Sindh", "Balochistan", "pressure factor",
    ],
    metaTitle:
      "Check SSGC Gas Bill Online 2026 — Instant SSGC Bill | BillCheck",
    metaDescription:
      "Check your SSGC gas bill online instantly. Enter your consumer number to view, download or print your Sui Southern gas bill. Free, fast, and secure. Serving Karachi, Sindh & Balochistan.",
    h1Text: "Check Your SSGC Gas Bill Online",
    duplicateBillKeywords: [
      "ssgc duplicate bill",
      "ssgc duplicate gas bill",
      "duplicate bill ssgc",
    ],
    regionName: "Karachi, Sindh & Balochistan",
    consumerCount: "4 million",
  },
};

export function getCompanyKeywords(id: string): CompanyKeywords | undefined {
  return companyKeywords[id];
}
