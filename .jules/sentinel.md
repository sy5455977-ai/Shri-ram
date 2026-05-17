## 2026-05-17 - [PII Leakage in Client-Side Error Handler]
**Vulnerability:** The `handleFirestoreError` function was capturing and stringifying sensitive user information (UID, email) and exposing it both in the browser's console via `console.error` and in the thrown `Error` message.
**Learning:** Client-side error handlers often aggregate "context" for debugging, but developer convenience can lead to unintended exposure of PII if authentication state is bundled into global error objects that are displayed in the UI.
**Prevention:** Sanitize all error objects before logging or throwing. Use generic, user-safe messages for the UI and keep detailed, sensitive debugging information restricted to server-side logs or authenticated administrative views.
