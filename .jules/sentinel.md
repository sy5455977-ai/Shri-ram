## 2025-05-14 - Information Disclosure and Reverse Tabnabbing Prevention
**Vulnerability:** Widespread use of `window.open(..., '_blank')` without security attributes and potential PII leakage (UIDs, emails) in Firestore error logs and UI.
**Learning:** React applications using external link functions often overlook the `window.opener` security risk. Additionally, centralized error handlers for Firebase often over-log metadata that includes auth state PII.
**Prevention:** Always use `noopener,noreferrer` for external targets. Implement a centralized `sanitize` utility for all logging and genericize errors thrown to the UI to ensure no internal IDs or user data escapes the system boundaries.
