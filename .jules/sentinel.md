## 2025-05-15 - Firestore Error Sanitization
**Vulnerability:** Information Disclosure and PII Leakage in database error handlers.
**Learning:** Centralized error handlers that wrap errors into JSON and throw them to the UI can inadvertently leak sensitive internal paths (document IDs) and PII (UIDs, emails) if not explicitly sanitized.
**Prevention:** Always redact odd-indexed path segments in Firestore paths and remove sensitive user fields from error objects before logging to console or throwing to the UI.
