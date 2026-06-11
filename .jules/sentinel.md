## 2025-05-14 - Information Exposure via Error Objects
**Vulnerability:** Error messages and Firestore error handlers were stringifying objects that contained sensitive PII, including user emails and UIDs, which were then displayed in the UI (ErrorBoundary) or stored in LocalStorage.
**Learning:** Centralized error handling is a major vector for information leakage if not paired with data sanitization. Standard React ErrorBoundaries often display raw error strings, which can inadvertently expose internal state or auth context.
**Prevention:** Always use a redaction utility before displaying or persisting error messages. Implement defense-in-depth by applying redaction at both the source (error handlers) and the sink (UI display components).
