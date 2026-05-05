import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes sensitive information (PII) from strings to prevent leakage in logs or UI.
 * Redacts email addresses and long alphanumeric identifiers.
 */
export function sanitize(text: string | null | undefined): string {
  if (!text) return '';

  // Redact email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Redact long alphanumeric identifiers (e.g., Firebase UIDs, Document IDs)
  // Typically these are 20+ characters
  const idRegex = /[a-zA-Z0-9\-_]{20,}/g;

  return text
    .replace(emailRegex, '[EMAIL_REDACTED]')
    .replace(idRegex, '[ID_REDACTED]');
}
