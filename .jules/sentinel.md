## 2025-05-15 - PII Redaction in Error Messages
**Vulnerability:** Sensitive user data such as emails and UIDs were being included in stringified error objects logged to the console and displayed in the UI via the global ErrorBoundary and Firestore error handler.
**Learning:** Standard error handling that stringifies raw Error objects or auth context can inadvertently leak PII into logs or the user interface, especially when using Firebase where UIDs and emails are readily available in the auth object.
**Prevention:** Use a centralized redaction utility like `redactPII` to mask sensitive data patterns (emails, long alphanumeric IDs) in error messages before they are logged or rendered in the UI.
