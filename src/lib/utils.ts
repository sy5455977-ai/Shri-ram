import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts Personally Identifiable Information (PII) from strings.
 * Masks emails and likely UIDs/Document IDs (20+ character alphanumeric strings).
 */
export function redactPII(text: string | null | undefined): string {
  if (!text) return "";

  return text
    // Mask emails
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]")
    // Mask likely UIDs/Document IDs (Firebase UIDs are typically 28 chars, doc IDs are 20)
    .replace(/\b[A-Za-z0-9_-]{20,}\b/g, "[ID_REDACTED]");
}
