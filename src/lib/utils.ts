import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts Personally Identifiable Information (PII) from strings.
 * Targeted at emails and common Firestore-style unique identifiers.
 */
export function redactPII(text: string): string {
  if (!text) return text;

  // Redact emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let redacted = text.replace(emailRegex, '[EMAIL]');

  // Redact potential IDs (20+ chars alphanumeric, common for Firestore UIDs and Document IDs)
  const idRegex = /\b[A-Za-z0-9]{20,}\b/g;
  redacted = redacted.replace(idRegex, '[ID]');

  return redacted;
}
