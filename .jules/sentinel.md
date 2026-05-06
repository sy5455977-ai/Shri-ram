## 2025-05-06 - Secure Error Handling and PII Sanitization
**Vulnerability:** The application was leaking sensitive authentication metadata (UIDs and emails) through error messages thrown by `handleFirestoreError`. These messages were being displayed directly in the UI via the `ErrorBoundary` component.

**Learning:** Error objects often contain more context than intended for the end-user. Relying on `JSON.stringify(error)` for UI display or un-sanitized logging creates a significant information disclosure risk.

**Prevention:** Always use a sanitization utility to redact PII (emails, IDs, tokens) before logging. Throw generic, user-friendly error messages to the UI and keep detailed, sanitized logs for internal investigation.
