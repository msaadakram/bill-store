import { getCompanyKeywords } from "./keywords";

interface FaqItem { q: string; a: string }

/**
 * JSON-LD structured data components for rich SERP results.
 * Schema.org types: WebPage, SoftwareApplication, FAQPage, BreadcrumbList, Organization.
 */

export function WebPageJsonLd({
  url, title, description, datePublished,
}: {
  url: string; title: string; description: string; datePublished?: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: title,
    description,
    datePublished: datePublished || "2025-01-01",
    inLanguage: "en-PK",
    isAccessibleForFree: true,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function SoftwareAppJsonLd({
  name, description, url, operatingSystem,
}: {
  name: string; description: string; url: string; operatingSystem?: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: operatingSystem || "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function OrganizationJsonLd({ companyId }: { companyId: string }) {
  const kw = getCompanyKeywords(companyId);
  if (!kw) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: kw.companyFull,
    alternateName: kw.companyName,
    description: `${kw.companyFull} (${kw.companyName}) is a ${kw.category} distribution company serving over ${kw.consumerCount} consumers in ${kw.regionName}, Pakistan.`,
    areaServed: { "@type": "City", name: kw.regionName },
    country: "PK",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
