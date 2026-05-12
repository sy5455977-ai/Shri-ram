## 2025-05-14 - Information Disclosure of PII via Error Boundary
**Vulnerability:** The `handleFirestoreError` function was stringifying and throwing full error objects containing user emails, UIDs, and document paths. These were then caught by the global `ErrorBoundary` and displayed directly in the UI, exposing sensitive PII to anyone with access to the screen.
**Learning:** Error boundaries and global error handlers are powerful for stability but can become a vector for information disclosure if they render raw error objects. Logs also often contain PII if not carefully managed.
**Prevention:** Always use a sanitization utility for logs and throw generic, user-safe error messages for the UI. Redact emails and long identifiers (UIDs/IDs) by default in sensitive contexts.
