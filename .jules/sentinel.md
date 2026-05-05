## 2025-05-15 - [Secure Error Handling & PII Redaction]
**Vulnerability:** Information Leakage via Firestore Error Responses
**Learning:** Raw Firestore error objects often contain sensitive metadata such as user IDs, email addresses, and specific database paths. Directly throwing these objects or logging them without sanitization exposes PII to the client UI (via Error Boundaries) and potentially insecure log sinks.
**Prevention:** Implement a centralized sanitization utility for error messages and metadata. Throw generic, non-descriptive error messages to the UI while keeping sanitized, redacted logs for internal debugging.
