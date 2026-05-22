## 2025-05-15 - Explicit PII Leakage in Global Error Handler
**Vulnerability:** The global `handleFirestoreError` function explicitly bundled sensitive user information (`uid`, `email`) into Error objects that were both logged to the console and thrown to the UI.
**Learning:** Client-side error handlers that attempt to be "helpful" by including authentication state can inadvertently expose PII to logs, monitoring services, and the end-user interface if they don't strictly separate technical logging from user-facing messages.
**Prevention:** Always sanitize error objects before they leave a service boundary. Log raw technical details to internal consoles/services only, and provide generic, safe messages to the application's UI.
