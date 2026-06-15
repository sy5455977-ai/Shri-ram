# Sentinel's Security Journal

## 2025-05-22 - PII Redaction in Error Handling
**Vulnerability:** Error messages and stack traces could contain sensitive PII like user emails and UIDs when serialized and displayed or logged.
**Learning:** Centralized redaction in the global ErrorBoundary and core Firestore error utilities provides essential defense-in-depth against accidental data exposure.
**Prevention:** Always wrap serialized error data in a redaction utility before logging to console or displaying in the UI.
