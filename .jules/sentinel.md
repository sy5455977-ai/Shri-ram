## 2025-06-10 - PII leakage in Firestore error handling
**Vulnerability:** Firestore error handler was leaking user email, UID, and document paths in plain text to console logs and throwing them as error messages, which then reached the UI.
**Learning:** Centralized error handlers that aggregate context (like auth info) for debugging can inadvertently expose PII if not sanitized.
**Prevention:** Always wrap diagnostic data in a redaction utility before logging or surfacing to the UI. Implement a defense-in-depth redaction layer in global ErrorBoundaries as a catch-all.
