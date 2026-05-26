## 2025-05-14 - Redacted PII and Information Disclosure in Firestore Error Handler
**Vulnerability:** Information Disclosure and PII Leakage via Error Messages. The previous implementation threw raw Firestore error objects containing user emails, UIDs, and full document paths.
**Learning:** Client-side error handlers often log or throw the entire error object for debugging, which can inadvertently expose sensitive data to the UI or browser console.
**Prevention:** Implement mandatory sanitization for all external service error handlers (e.g., Firebase, Stripe) to redact PII and redact internal resource IDs from paths before logging or throwing.
