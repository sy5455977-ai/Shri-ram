## 2025-05-14 - [PII Leakage in Error Reporting]
**Vulnerability:** Application logs and the ErrorBoundary UI were exposing raw error messages that could contain sensitive user data (emails, Firebase UIDs, Document IDs) during Firestore operations or system failures.
**Learning:** Centralized error handlers often stringify error objects for debugging, which inadvertently includes PII if the error context (like document paths or auth state) is attached to the error.
**Prevention:** Implement a centralized `redactPII` utility and apply it to all error messages before they reach logs or the user interface. Ensure that even stringified JSON errors are sanitized to maintain compatibility while stripping sensitive data.
