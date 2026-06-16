import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redacts Personally Identifiable Information (PII) like emails and UIDs from strings or objects.
 */
export function redactPII(input: any): string {
  if (!input) return "";

  let str = typeof input === 'string' ? input : JSON.stringify(input);

  // Redact emails
  str = str.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_MASKED]");

  // Redact potential UIDs/IDs (20+ chars alphanum, common for Firebase)
  str = str.replace(/\b[A-Za-z0-9_-]{20,}\b/g, "[ID_MASKED]");

  return str;
}
