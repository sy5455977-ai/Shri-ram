import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes sensitive information from strings, such as email addresses
 * and long alphanumeric identifiers (UIDs, Document IDs).
 */
export function sanitize(text: string): string {
  if (!text) return text;
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]')
    .replace(/[a-zA-Z0-9\-_]{20,}/g, '[ID_REDACTED]');
}
