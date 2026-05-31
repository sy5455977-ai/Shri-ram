## 2025-05-14 - Fix PII leakage in Firestore error handler
**Vulnerability:** Information Disclosure via PII leakage in error stacks and raw internal metadata exposure.
**Learning:** Throwing stringified JSON within Error objects is an anti-pattern that complicates UI handling and can cause secondary crashes; centralized error handlers should throw standard string messages for the UI while logging sanitized context for developers.
**Prevention:** Always sanitize error messages for PII (emails, UIDs) before logging and throw generic, user-safe messages to the frontend to prevent leaking system internals.
