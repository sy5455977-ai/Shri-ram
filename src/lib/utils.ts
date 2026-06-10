import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts Personally Identifiable Information (PII) from strings.
 * Targeted at masking emails and Firebase/Firestore IDs.
 */
export function redactPII(text: string): string {
  if (!text) return text;

  // Redact email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Redact Firebase/Firestore IDs (UIDs and Document IDs are typically 20+ chars alphanumeric)
  const idRegex = /\b[A-Za-z0-9]{20,}\b/g;

  return text
    .replace(emailRegex, "[REDACTED_EMAIL]")
    .replace(idRegex, "[REDACTED_ID]");
}
