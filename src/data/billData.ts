export type BillType = "electricity" | "gas" | "water" | "internet" | "other";

export interface Company {
  id: string;
  name: string;
  short: string;
  color: string;
  bg: string;
  description: string;
}

export interface BillTypeInfo {
  type: BillType;
  label: string;
  description: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  bgLight: string;
  companies: Company[];
}

export const billTypes: BillTypeInfo[] = [
  {
    type: "electricity",
    label: "Electricity Bill",
    description: "Check bills from major electricity distribution companies",
    iconColor: "#F59E0B",
    gradientFrom: "#FEF3C7",
    gradientTo: "#FDE68A",
    bgLight: "#FFFBEB",
    companies: [
      {
        id: "lesco",
        name: "Lahore Electric Supply Company",
        short: "LESCO",
        color: "#1D4ED8",
        bg: "#EFF6FF",
        description: "Lahore & surrounding areas",
      },
      {
        id: "ke",
        name: "K-Electric",
        short: "KE",
        color: "#DC2626",
        bg: "#FEF2F2",
        description: "Karachi & surrounding areas",
      },
      {
        id: "fesco",
        name: "Faisalabad Electric Supply Company",
        short: "FESCO",
        color: "#7C3AED",
        bg: "#F5F3FF",
        description: "Faisalabad & central Punjab",
      },
      {
        id: "iesco",
        name: "Islamabad Electric Supply Company",
        short: "IESCO",
        color: "#3E8B8E",
        bg: "#F0F9FF",
        description: "Islamabad & Rawalpindi",
      },
      {
        id: "mepco",
        name: "Multan Electric Power Company",
        short: "MEPCO",
        color: "#065F46",
        bg: "#ECFDF5",
        description: "Multan & south Punjab",
      },
      {
        id: "gepco",
        name: "Gujranwala Electric Power Company",
        short: "GEPCO",
        color: "#92400E",
        bg: "#FFFBEB",
        description: "Gujranwala & north Punjab",
      },
    ],
  },
  {
    type: "gas",
    label: "Gas Bill",
    description: "Check bills from national gas distribution companies",
    iconColor: "#EF4444",
    gradientFrom: "#FEE2E2",
    gradientTo: "#FECACA",
    bgLight: "#FEF2F2",
    companies: [
      {
        id: "sngpl",
        name: "Sui Northern Gas Pipelines Limited",
        short: "SNGPL",
        color: "#1D4ED8",
        bg: "#EFF6FF",
        description: "Northern Pakistan gas supply",
      },
      {
        id: "ssgc",
        name: "Sui Southern Gas Company",
        short: "SSGC",
        color: "#DC2626",
        bg: "#FEF2F2",
        description: "Southern Pakistan gas supply",
      },
    ],
  },
  {
    type: "water",
    label: "Water Bill",
    description: "Check water utility bills from local authorities",
    iconColor: "#5A9FA2",
    gradientFrom: "#E0F2FE",
    gradientTo: "#BAE6FD",
    bgLight: "#F0F9FF",
    companies: [
      {
        id: "wasa-lahore",
        name: "Water & Sanitation Agency Lahore",
        short: "WASA LHR",
        color: "#3E8B8E",
        bg: "#F0F9FF",
        description: "Lahore water & sewerage",
      },
      {
        id: "wasa-fsd",
        name: "Water & Sanitation Agency Faisalabad",
        short: "WASA FSD",
        color: "#4D9699",
        bg: "#ECFEFF",
        description: "Faisalabad water & sewerage",
      },
      {
        id: "kw-sewerage",
        name: "Karachi Water & Sewerage Board",
        short: "KWSB",
        color: "#065F46",
        bg: "#ECFDF5",
        description: "Karachi water & sewerage",
      },
    ],
  },
  {
    type: "internet",
    label: "Internet Bill",
    description: "Check broadband and internet service provider bills",
    iconColor: "#8B5CF6",
    gradientFrom: "#EDE9FE",
    gradientTo: "#DDD6FE",
    bgLight: "#F5F3FF",
    companies: [
      {
        id: "ptcl",
        name: "Pakistan Telecommunication Company",
        short: "PTCL",
        color: "#1D4ED8",
        bg: "#EFF6FF",
        description: "Nationwide telecom & internet",
      },
      {
        id: "stormfiber",
        name: "StormFiber",
        short: "StormFiber",
        color: "#7C3AED",
        bg: "#F5F3FF",
        description: "Fiber optic internet",
      },
      {
        id: "transworld",
        name: "Transworld Internet",
        short: "TWA",
        color: "#065F46",
        bg: "#ECFDF5",
        description: "Business & home internet",
      },
      {
        id: "nayatel",
        name: "Nayatel",
        short: "Nayatel",
        color: "#DC2626",
        bg: "#FEF2F2",
        description: "Islamabad fiber internet",
      },
    ],
  },
  {
    type: "other",
    label: "Other Bills",
    description: "Check telephone, municipal and other utility bills",
    iconColor: "#10B981",
    gradientFrom: "#D1FAE5",
    gradientTo: "#A7F3D0",
    bgLight: "#ECFDF5",
    companies: [
      {
        id: "ptcl-telephone",
        name: "PTCL Telephone",
        short: "PTCL Tel",
        color: "#1D4ED8",
        bg: "#EFF6FF",
        description: "Landline telephone bills",
      },
      {
        id: "sui-gas-meter",
        name: "Gas Meter Charges",
        short: "Gas Meter",
        color: "#DC2626",
        bg: "#FEF2F2",
        description: "Gas meter maintenance charges",
      },
      {
        id: "municipal",
        name: "Municipal Corporation Tax",
        short: "MCT",
        color: "#065F46",
        bg: "#ECFDF5",
        description: "Local municipal taxes",
      },
    ],
  },
];

export function getBillTypeInfo(type: string): BillTypeInfo | undefined {
  return billTypes.find((b) => b.type === type);
}
