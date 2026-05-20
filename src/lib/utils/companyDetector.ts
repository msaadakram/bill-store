/**
 * Detects the utility company from a reference number pattern.
 * Each company has specific reference number characteristics.
 */

export interface CompanyMatch {
  id: string;
  name: string;
  short: string;
  color: string;
  pitcUrl: string;
}

const electricityCompanies: CompanyMatch[] = [
  {
    id: "lesco",
    name: "Lahore Electric Supply Company",
    short: "LESCO",
    color: "#3E8B8E",
    pitcUrl: "https://bill.pitc.com.pk/lescobill/general?refno=",
  },
  {
    id: "fesco",
    name: "Faisalabad Electric Supply Company",
    short: "FESCO",
    color: "#7C3AED",
    pitcUrl: "https://bill.pitc.com.pk/fescobill/general?refno=",
  },
  {
    id: "iesco",
    name: "Islamabad Electric Supply Company",
    short: "IESCO",
    color: "#3E8B8E",
    pitcUrl: "https://bill.pitc.com.pk/iescobill/general?refno=",
  },
  {
    id: "mepco",
    name: "Multan Electric Power Company",
    short: "MEPCO",
    color: "#065F46",
    pitcUrl: "https://bill.pitc.com.pk/mepcobill/general?refno=",
  },
  {
    id: "gepco",
    name: "Gujranwala Electric Power Company",
    short: "GEPCO",
    color: "#92400E",
    pitcUrl: "https://bill.pitc.com.pk/gepcobill/general?refno=",
  },
  {
    id: "ke",
    name: "K-Electric",
    short: "KE",
    color: "#DC2626",
    pitcUrl: "https://bill.pitc.com.pk/kebill/general?refno=",
  },
];

const gasCompanies: CompanyMatch[] = [
  {
    id: "sngpl",
    name: "Sui Northern Gas Pipelines Limited",
    short: "SNGPL",
    color: "#1D4ED8",
    pitcUrl: "https://bill.pitc.com.pk/sngplbill/general?refno=",
  },
  {
    id: "ssgc",
    name: "Sui Southern Gas Company",
    short: "SSGC",
    color: "#DC2626",
    pitcUrl: "https://bill.pitc.com.pk/ssgcbill/general?refno=",
  },
];

const allCompanies = [...electricityCompanies, ...gasCompanies];

/**
 * Reference number prefixes/ranges by company.
 * LESCO: 13-14 digits, starts with 13 or 14
 * FESCO: 14 digits, starts with 10 or 08
 * IESCO: 14 digits, starts with 15 or 16
 * MEPCO: 14 digits, starts with 09 or 07
 * GEPCO: 14 digits, starts with 05 or 06
 * KE: 10-11 digits
 * SNGPL: 10-12 digits, starts with 02 or 03
 * SSGC: 10-14 digits, starts with 04 or 01
 */
export function detectCompany(refNo: string): CompanyMatch | null {
  const cleaned = refNo.replace(/\D/g, "");

  if (cleaned.length < 6) return null;

  // KE: 10-11 digits
  if (cleaned.length === 10 || cleaned.length === 11) {
    return allCompanies.find((c) => c.id === "ke") || null;
  }

  // SNGPL: starts with 02 or 03, 10-12 digits
  if ((cleaned.startsWith("02") || cleaned.startsWith("03")) && cleaned.length >= 10 && cleaned.length <= 12) {
    return allCompanies.find((c) => c.id === "sngpl") || null;
  }

  // SSGC: starts with 04 or 01, 10-14 digits
  if ((cleaned.startsWith("04") || cleaned.startsWith("01")) && cleaned.length >= 10 && cleaned.length <= 14) {
    return allCompanies.find((c) => c.id === "ssgc") || null;
  }

  // FESCO: starts with 10 or 08, 14 digits
  if ((cleaned.startsWith("10") || cleaned.startsWith("08")) && cleaned.length === 14) {
    return allCompanies.find((c) => c.id === "fesco") || null;
  }

  // MEPCO: starts with 09 or 07, 14 digits
  if ((cleaned.startsWith("09") || cleaned.startsWith("07")) && cleaned.length === 14) {
    return allCompanies.find((c) => c.id === "mepco") || null;
  }

  // GEPCO: starts with 05 or 06, 14 digits
  if ((cleaned.startsWith("05") || cleaned.startsWith("06")) && cleaned.length === 14) {
    return allCompanies.find((c) => c.id === "gepco") || null;
  }

  // IESCO: starts with 15 or 16, 14 digits
  if ((cleaned.startsWith("15") || cleaned.startsWith("16")) && cleaned.length === 14) {
    return allCompanies.find((c) => c.id === "iesco") || null;
  }

  // LESCO: 13-14 digits, starts with 13 or 14
  if ((cleaned.startsWith("13") || cleaned.startsWith("14")) && cleaned.length >= 13 && cleaned.length <= 14) {
    return allCompanies.find((c) => c.id === "lesco") || null;
  }

  // Fallback: if 13-14 digits, default to LESCO
  if (cleaned.length >= 13 && cleaned.length <= 14) {
    return allCompanies.find((c) => c.id === "lesco") || null;
  }

  // Fallback: if 10-12 digits, default to SNGPL
  if (cleaned.length >= 10 && cleaned.length <= 12) {
    return allCompanies.find((c) => c.id === "sngpl") || null;
  }

  return null;
}

export function getAllCompanies(): CompanyMatch[] {
  return allCompanies;
}

export function getCompanyById(id: string): CompanyMatch | undefined {
  return allCompanies.find((c) => c.id === id);
}
