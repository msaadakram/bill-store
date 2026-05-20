import { getCompanyKeywords, type CompanyKeywords } from "./keywords";

/**
 * Generate a complete Next.js Metadata object for a bill page.
 * Used by each company's page.tsx `metadata` export.
 */
export function generateBillPageMetadata(companyId: string): {
  title: string;
  description: string;
  keywords: string[];
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
  alternates: { canonical: string };
  robots: string;
} {
  const kw = getCompanyKeywords(companyId);
  if (!kw) {
    return {
      title: "BillCheck — Check Utility Bills Online",
      description: "Check your electricity, gas, water and internet bills online instantly.",
      keywords: ["bill check", "electricity bill", "gas bill", "utility bill"],
      openGraph: {},
      twitter: {},
      alternates: { canonical: `https://billcheck.pk/${companyId}-bill` },
      robots: "index, follow",
    };
  }

  const allKeywords = [
    ...kw.primaryKeywords,
    ...kw.secondaryKeywords,
    ...kw.longTailKeywords.slice(0, 3),
  ];

  const baseUrl = "https://billcheck.pk";

  return {
    title: kw.metaTitle,
    description: kw.metaDescription,
    keywords: allKeywords,
    openGraph: {
      title: kw.metaTitle,
      description: kw.metaDescription,
      type: "website",
      url: `${baseUrl}/${companyId}-bill`,
      siteName: "BillCheck Pakistan",
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title: kw.metaTitle,
      description: kw.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${companyId}-bill`,
    },
    robots: "index, follow",
  };
}
