import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redactPII(text: string): string {
  if (!text) return text;

  // Redact emails
  let redacted = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]');

  // Redact potential UIDs / Document IDs (usually 20+ chars alphanumeric)
  redacted = redacted.replace(/\b[A-Za-z0-9_-]{20,}\b/g, '[ID_REDACTED]');

  return redacted;
}
