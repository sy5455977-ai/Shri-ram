## 2025-05-22 - PII Leakage in Error Handlers
**Vulnerability:** Error handlers stringifying and throwing raw Firestore error objects directly to the UI, including user emails, UIDs, and internal database paths.
**Learning:** Centralized error handlers that don't sanitize output can become accidental vectors for information disclosure. Throwing stringified JSON within Error objects is an anti-pattern that complicates secure logging.
**Prevention:** Always scrub sensitive patterns (emails, UIDs) from logs and surface only generic, user-friendly messages to the frontend.
