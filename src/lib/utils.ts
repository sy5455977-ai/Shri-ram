import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes sensitive information from strings to prevent information disclosure.
 * Redacts email addresses and long alphanumeric identifiers (IDs/Tokens).
 */
export function sanitize(text: string): string {
  if (!text) return text;

  // Redact email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  // Redact potential IDs (e.g., Firestore IDs, Firebase UIDs) - 20+ chars
  const idRegex = /[a-zA-Z0-9-_]{20,}/g;

  return text
    .replace(emailRegex, '[EMAIL_REDACTED]')
    .replace(idRegex, '[ID_REDACTED]');
}
