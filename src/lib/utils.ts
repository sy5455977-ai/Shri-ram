import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes a string by redacting PII (emails) and long identifiers.
 */
export function sanitize(text: string): string {
  if (!text) return text;

  // Redact email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let sanitized = text.replace(emailRegex, '[EMAIL_REDACTED]');

  // Redact long alphanumeric identifiers (typically 20+ chars)
  // This helps mask Firestore UIDs, document IDs, etc.
  const idRegex = /[a-zA-Z0-9\-_]{20,}/g;
  sanitized = sanitized.replace(idRegex, '[ID_REDACTED]');

  return sanitized;
}
