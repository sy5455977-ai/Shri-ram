## 2025-05-15 - PII Leakage in Error Handlers
**Vulnerability:** Information Disclosure (PII Leakage)
**Learning:** The `handleFirestoreError` function was explicitly capturing sensitive user information (`uid`, `email`) and including it in both console logs and thrown errors. These errors were then displayed to the user via the `ErrorBoundary`, exposing PII in the UI. Additionally, raw Firestore paths containing document IDs were being logged without sanitization.
**Prevention:** Implement strict sanitization in centralized error handlers. Scrub PII from both logs and thrown errors. Mask sensitive identifiers (like Firestore document IDs) in paths using regex. Always throw generic, user-friendly error messages to the UI while keeping detailed, sanitized logs for debugging.
