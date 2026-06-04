## 2025-05-14 - Redacting PII in Centralized Error Handlers
**Vulnerability:** Information Exposure through Error Messages. Firestore error responses and uncaught exceptions often contain UIDs, email addresses, or internal document IDs which were surfaced directly to the UI and browser logs.
**Learning:** When existing error handling expects a specific format (like stringified JSON for auto-repair logic), security enhancements must redact PII *within* that format. Simply switching to generic strings can break system recovery features (like NEXUS's auto-repair).
**Prevention:** Implement a non-breaking `redactPII` utility using regex at centralized egress points (Error Boundaries and Error Handlers) to sanitize the expected error payload before it reaches logs or the UI.
