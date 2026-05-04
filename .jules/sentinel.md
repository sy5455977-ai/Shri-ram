## 2025-05-15 - Information Disclosure in Firestore Error Handler
**Vulnerability:** User PII (email, UID) and internal document paths were leaked to the UI via raw error objects thrown in `src/firebase.ts` and caught by the global Error Boundary.
**Learning:** Raw database errors often contain sensitive context. Sanitizing logs and genericizing thrown errors is crucial for defense-in-depth.
**Prevention:** Always use a sanitization utility for logging and never pass raw error objects to UI components.
