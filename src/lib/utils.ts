import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitize(text: string): string {
  if (!text) return text;
  // Redact emails
  let sanitized = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
  // Redact long alphanumeric strings (likely UIDs or doc IDs) - 20+ chars
  sanitized = sanitized.replace(/\b[a-zA-Z0-9]{20,}\b/g, '[REDACTED_ID]');
  return sanitized;
}
