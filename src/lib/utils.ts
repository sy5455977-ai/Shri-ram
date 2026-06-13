import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts PII (Personally Identifiable Information) from strings.
 * Masks emails and potential UIDs/IDs (alphanumeric strings of 20+ characters).
 */
export function redactPII(input: string): string {
  if (!input) return input;

  // Mask emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let redacted = input.replace(emailRegex, "[REDACTED_EMAIL]");

  // Mask potential UIDs / Document IDs (usually ~20+ chars alphanumeric)
  // Firestore IDs are usually 20 chars. Let's target 20+ to be safe but thorough.
  const idRegex = /\b[A-Za-z0-9_-]{20,}\b/g;
  redacted = redacted.replace(idRegex, "[REDACTED_ID]");

  return redacted;
}
