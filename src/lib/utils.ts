import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * shadcn/ui compatible cn() helper.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a large number with K / M suffixes.
 * @example formatNumber(12500) → "12.5K"
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

/**
 * Format a number as a percentage string.
 * @example formatPercent(0.1234) → "12.3%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format currency (USD by default).
 * @example formatCurrency(1500) → "$1,500.00"
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Slugify a string for use in URLs or IDs.
 * @example slugify("Hello World") → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Generate a short random ID (non-cryptographic).
 */
export function shortId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
