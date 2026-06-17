import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts Personally Identifiable Information (PII) from strings,
 * such as emails and Firebase UIDs/Document IDs.
 */
export function redactPII(text: string): string {
  if (!text) return text;

  // Redact emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let redacted = text.replace(emailRegex, "[EMAIL_REDACTED]");

  // Redact long alphanumeric strings (potential UIDs or Doc IDs)
  // Matches 20+ characters of alphanumeric, underscore, or hyphen
  const idRegex = /\b[A-Za-z0-9_-]{20,}\b/g;
  redacted = redacted.replace(idRegex, "[ID_REDACTED]");

  return redacted;
}
