import { Clock, Shield, Smartphone, TrendingUp, type LucideIcon } from "lucide-react";

/** Quick-access company buttons shown on the home hero */
export const quickCompanies = [
  { name: "LESCO", short: "LE", path: "/bill/electricity", color: "#1D4ED8", bg: "#EFF6FF" },
  { name: "FESCO", short: "FE", path: "/bill/electricity", color: "#7C3AED", bg: "#F5F3FF" },
  { name: "IESCO", short: "IE", path: "/bill/electricity", color: "#3E8B8E", bg: "#F0F9FF" },
  { name: "K-Electric", short: "KE", path: "/bill/electricity", color: "#DC2626", bg: "#FEF2F2" },
  { name: "MEPCO", short: "ME", path: "/bill/electricity", color: "#065F46", bg: "#ECFDF5" },
  { name: "GEPCO", short: "GE", path: "/bill/electricity", color: "#92400E", bg: "#FFFBEB" },
  { name: "SNGPL", short: "SN", path: "/bill/gas", color: "#1D4ED8", bg: "#EFF6FF" },
  { name: "SSGC", short: "SS", path: "/bill/gas", color: "#DC2626", bg: "#FEF2F2" },
] as const;

/** Feature highlights for the "Why Choose Us" section */
export const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
}[] = [
  {
    icon: Clock,
    title: "Instant Results",
    desc: "Check your bill in under 3 seconds",
    color: "#4D9699",
    bg: "#ECFEFF",
  },
  {
    icon: Shield,
    title: "100% Secure",
    desc: "Your data is never stored or shared",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Works perfectly on any device",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: TrendingUp,
    title: "Always Updated",
    desc: "Real-time data from all providers",
    color: "#D97706",
    bg: "#FFFBEB",
  },
];

/** Stats row displayed at the bottom of the hero */
export const stats = [
  { value: "10M+", label: "Bills Checked" },
  { value: "6+", label: "Electricity Companies" },
  { value: "2", label: "Gas Companies" },
  { value: "99.9%", label: "Uptime" },
] as const;

/** "How it works" 3-step process data */
export const howItWorksSteps = [
  {
    step: "01",
    title: "Select Bill Type",
    desc: "Choose from electricity, gas, water, internet or other utility bills",
    color: "#4D9699",
    bg: "#ECFEFF",
  },
  {
    step: "02",
    title: "Choose Provider",
    desc: "Select your utility company from the list of all major providers",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    step: "03",
    title: "Enter Reference",
    desc: "Enter your reference or consumer number and view your bill instantly",
    color: "#059669",
    bg: "#ECFDF5",
  },
] as const;

/** Blog teaser articles shown on the home page */
export const blogTeaserArticles = [
  {
    title: "How to Check Your LESCO Bill Online in 2026",
    excerpt: "Step-by-step guide to checking your LESCO electricity bill using your reference number.",
    category: "Electricity Bills",
    readTime: 7,
    slug: "how-to-check-lesco-bill-online-2026",
    image: "https://images.unsplash.com/photo-1748322972624-84bf8b9baba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    catColor: "#C2410C",
    catBg: "#FFF7ED",
  },
  {
    title: "10 Tips to Reduce Your Electricity Bill in Pakistan",
    excerpt: "Practical tips that can cut your monthly electricity bill by up to 40%.",
    category: "Energy Saving",
    readTime: 8,
    slug: "10-tips-reduce-electricity-bill-pakistan",
    image: "https://images.unsplash.com/photo-1668752752839-1ca9a96331fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    catColor: "#059669",
    catBg: "#ECFDF5",
  },
  {
    title: "Going Solar in Pakistan: Slash Your Bills by 60–100%",
    excerpt: "Everything you need to know about rooftop solar and net metering in Pakistan.",
    category: "Energy Saving",
    readTime: 9,
    slug: "solar-energy-pakistan-reduce-electricity-bills",
    image: "https://images.unsplash.com/photo-1761158495585-eac721decf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    catColor: "#059669",
    catBg: "#ECFDF5",
  },
] as const;
