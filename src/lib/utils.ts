import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts PII (Emails, UIDs, Document IDs) from strings or objects.
 * Essential for preventing sensitive data leakage in logs and error messages.
 */
export function redactPII(input: any): string {
  if (!input) return "";
  const str = typeof input === "string" ? input : JSON.stringify(input);

  return str
    // Mask Emails
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_MASKED]")
    // Mask potential UIDs/Document IDs (20+ chars alphanumeric)
    .replace(/\b[A-Za-z0-9_-]{20,}\b/g, "[ID_MASKED]");
}
