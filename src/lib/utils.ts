import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes sensitive information from strings, such as email addresses
 * and long alphanumeric identifiers (potential UIDs or tokens).
 */
export function sanitize(text: string): string {
  if (!text) return text;

  // Redact email addresses
  let sanitized = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');

  // Redact long alphanumeric identifiers (20+ characters) which might be UIDs or keys
  sanitized = sanitized.replace(/\b[a-zA-Z0-9]{20,}\b/g, '[REDACTED_ID]');

  return sanitized;
}
