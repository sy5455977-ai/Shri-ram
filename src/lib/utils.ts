import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes sensitive information from strings, such as emails and long alphanumeric IDs.
 * Used for logging to prevent PII leakage.
 */
export function sanitizePII(text: string): string {
  if (!text) return text;

  // Mask emails: user@example.com -> u***@example.com
  const emailRegex = /([a-zA-Z0-9._%+-])([a-zA-Z0-9._%+-]*)(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  let sanitized = text.replace(emailRegex, (_, firstChar, middle, domain) => {
    return `${firstChar}${'*'.repeat(Math.min(middle.length, 5))}${domain}`;
  });

  // Mask long alphanumeric IDs (likely Firebase UIDs or Document IDs, typically 20+ chars)
  // Matches strings of 20+ alphanumeric characters, excluding common words
  const idRegex = /\b[a-zA-Z0-9\-_]{20,}\b/g;
  sanitized = sanitized.replace(idRegex, (match) => {
    return `${match.substring(0, 4)}...${match.substring(match.length - 4)}`;
  });

  return sanitized;
}
