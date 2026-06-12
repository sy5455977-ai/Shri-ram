import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts PII (Personally Identifiable Information) from strings.
 * Masks emails and long alphanumeric strings (likely UIDs or IDs).
 */
export function redactPII(text: string): string {
  if (!text) return text;

  // Mask emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Mask UIDs / Document IDs (typically 20+ chars alphanumeric)
  const idRegex = /\b[A-Za-z0-9_-]{20,}\b/g;

  return text
    .replace(emailRegex, '[REDACTED_EMAIL]')
    .replace(idRegex, '[REDACTED_ID]');
}
