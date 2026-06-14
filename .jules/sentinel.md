## 2025-05-22 - PII Leakage in Firestore Error Handling
**Vulnerability:** Personal Identifiable Information (PII) like user emails and UIDs, as well as internal Document IDs, were being leaked through centralized Firestore error logging and re-thrown error messages.
**Learning:** Standard error handling that stringifies Error objects or includes the full `auth.currentUser` object can easily expose sensitive data to client-side logs or third-party monitoring services if not specifically sanitized.
**Prevention:** Implement a centralized PII redaction utility (e.g., `redactPII`) that uses regex to mask common patterns like emails and long alphanumeric IDs (20+ chars) before they are serialized for logging or display.
