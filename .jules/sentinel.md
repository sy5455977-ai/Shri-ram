## 2025-05-15 - PII Leakage in Firestore Error Handler
**Vulnerability:** Personal Identifiable Information (PII) leakage and Information Disclosure in global error handler.
**Learning:** The error handler was bundling current user UID and email into thrown Error messages, which could leak to the UI or client-side logs. It also exposed full database paths including document IDs.
**Prevention:** Always use generic error messages for users. Sanitize technical logs to redact PII and internal identifiers (like document IDs) before logging to the console or external services.
