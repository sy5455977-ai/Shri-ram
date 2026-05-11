import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes input by redacting PII such as email addresses and long alphanumeric IDs.
 */
export function sanitize(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
      .replace(/\b[a-zA-Z0-9]{20,}\b/g, '[REDACTED_ID]');
  }
  if (Array.isArray(input)) {
    return input.map(sanitize);
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      sanitized[key] = sanitize(input[key]);
    }
    return sanitized;
  }
  return input;
}
