## 2026-05-18 - PII Leakage in Global Error Handler
 **Vulnerability:** The global Firestore error handler (`handleFirestoreError`) was explicitly bundling user UID and email into error objects that were both logged to the console and thrown to the UI.
 **Learning:** Centralized error handlers, while useful for consistency, can inadvertently become sinks for sensitive data if they try to be too "helpful" with debugging context.
 **Prevention:** Implement strict sanitization in global error handlers. Log raw technical details only to the server/developer console and never bundle PII or authentication state into errors that reach the frontend UI.
