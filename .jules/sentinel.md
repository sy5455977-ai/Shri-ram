## 2026-05-11 - Information Disclosure in Firestore Error Handling
**Vulnerability:** Detailed Firestore error objects containing user PII (UIDs, emails) and internal document paths were being logged to the console and thrown directly to the UI via Error Boundaries.
**Learning:** Error handlers that stringify raw error objects can accidentally leak sensitive metadata to client-side logs and UI components if not sanitized.
**Prevention:** Use a recursive sanitization utility to redact PII from logs and always throw generic, non-descriptive error messages to the frontend to ensure defense in depth.
