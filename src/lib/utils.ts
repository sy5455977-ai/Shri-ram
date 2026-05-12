import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts PII (Emails, long IDs) from strings for safe logging.
 */
export function sanitize(input: string): string {
  if (!input) return input;

  // Redact emails
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let sanitized = input.replace(emailRegex, '[EMAIL_REDACTED]');

  // Redact long alphanumeric strings (likely document IDs or UIDs)
  // Usually 20+ characters
  const idRegex = /\b[A-Za-z0-9_-]{20,}\b/g;
  sanitized = sanitized.replace(idRegex, '[ID_REDACTED]');

  return sanitized;
}
