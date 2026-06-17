## 2025-05-14 - Redact PII in Error Handling
**Vulnerability:** Personally Identifiable Information (PII) such as emails and Firebase UIDs were being logged and displayed in raw error messages.
**Learning:** Standard error handling that stringifies Error objects or logs auth context can inadvertently leak PII to client-side logs or the UI.
**Prevention:** Centralized PII redaction utility used in global error boundaries and core service error handlers provides essential defense-in-depth.
