## 2025-05-15 - PII Leakage in Error Logs and UI
**Vulnerability:** Sensitive user information (UIDs, emails) and internal document IDs were being logged to the console and displayed in the UI when Firestore or system errors occurred.
**Learning:** Standard error handlers often stringify full error objects which can contain sensitive context or authentication state. Relying on default `toString()` or `JSON.stringify` for errors without sanitization leads to data exposure.
**Prevention:** Implement a centralized `redactPII` utility and ensure all error handlers and ErrorBoundary components use it before outputting data to logs or the UI. Masking should target common sensitive patterns like email addresses and alphanumeric identifiers.
