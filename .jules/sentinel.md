## 2025-05-14 - PII Leakage in Centralized Error Handling
**Vulnerability:** Inclusion of full authentication context (UID and Email) in stringified error objects logged to console and thrown as new errors.
**Learning:** Centralized error utilities like 'handleFirestoreError' that attempt to provide rich debugging context can inadvertently expose PII to logs and client-side monitoring if they include raw auth state.
**Prevention:** Always redact sensitive fields (UID, email, document paths) before serializing error metadata. Use a dedicated PII redaction utility to mask dynamic content within error messages.
