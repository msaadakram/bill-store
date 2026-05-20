/**
 * Text utilities used across the application.
 */

/** Convert a heading string into a URL-safe slug */
export function slugify(text: string): string {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Format large view counts with K suffix */
export function formatViews(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

/** Format currency to PKR locale string */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-PK");
}
