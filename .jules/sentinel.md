## 2025-05-22 - PII Leakage in Error Handlers
**Vulnerability:** Error handlers were explicitly logging and throwing full JSON objects containing user emails, UIDs, and document IDs, exposing them to the console and UI.
**Learning:** Centralized error handlers that bundle "helpful" context for debugging often accidentally become PII leakage points if they don't implement a redaction layer before surfacing data.
**Prevention:** Always implement a redaction utility (like `redactPII`) in core utility libraries and ensure error boundaries/handlers use generic messages for users while logging sanitized context for developers.
