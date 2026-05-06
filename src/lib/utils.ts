import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize data by redacting PII such as emails and long identifiers.
 * Useful for logging sensitive metadata without leaking user info.
 */
export function sanitize(data: any): any {
  if (typeof data === 'string') {
    // Redact emails
    let sanitized = data.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
    // Redact long alphanumeric identifiers (20+ chars, likely UIDs or tokens)
    sanitized = sanitized.replace(/[a-zA-Z0-9\-_]{20,}/g, '[REDACTED_ID]');
    return sanitized;
  }

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedObj[key] = sanitize(value);
    }
    return sanitizedObj;
  }

  return data;
}
