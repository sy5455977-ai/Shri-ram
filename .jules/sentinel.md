# Sentinel's Journal - Critical Security Learnings

This journal tracks critical security learnings, vulnerability patterns, and prevention strategies discovered in the NEXUS AI codebase.

## Learning Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

---

## 2025-05-15 - Information Disclosure in Firestore Error Handling
**Vulnerability:** The `handleFirestoreError` function was logging and throwing raw error messages containing PII (emails), user UIDs, and internal document paths.
**Learning:** Error boundaries in React can inadvertently expose detailed error objects to the end-user if they are not sanitized before being thrown.
**Prevention:** Always sanitize errors and log messages before they leave the service layer. Use generic error messages for the UI and keep detailed, sanitized logs for debugging.
