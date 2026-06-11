import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts PII like emails and potential UIDs from strings.
 */
export function redactPII(input: string | null | undefined): string {
  if (!input) return "";

  // Mask emails
  let redacted = input.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]");

  // Mask potential UIDs or Document IDs (20+ alphanumeric characters)
  redacted = redacted.replace(/\b[A-Za-z0-9]{20,}\b/g, "[ID_REDACTED]");

  return redacted;
}
