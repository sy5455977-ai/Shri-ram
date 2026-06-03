## 2025-05-14 - Prevent PII leakage in error handling
**Vulnerability:** Error handlers and logging mechanisms were stringifying and logging raw error objects and auth context, potentially exposing user emails, UIDs, and internal document IDs in the browser console and UI.
**Learning:** Centralized error handlers should always sanitize inputs before logging to avoid unintentional PII exposure, especially in client-side applications where logs are easily accessible.
**Prevention:** Use a dedicated PII redaction utility to filter sensitive patterns (emails, IDs) from all logs and surface generic, user-friendly messages to the UI.
