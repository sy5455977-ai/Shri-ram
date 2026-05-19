## 2025-05-15 - [PII Leakage in Global Firestore Error Handler]
**Vulnerability:** The global `handleFirestoreError` function was explicitly bundling user UID and email into the error object that was both logged to the console and thrown to the UI.
**Learning:** Client-side error handlers can inadvertently become a source of PII leakage if they attempt to provide "helpful" context by including authentication state.
**Prevention:** Sanitize all error objects before they leave the service layer. Log raw technical errors only to internal developer consoles and throw generic, user-safe messages to the UI.

## 2025-05-15 - [Reverse Tabnabbing (Tabjacking) in window.open]
**Vulnerability:** Multiple `window.open(..., '_blank')` calls across the codebase lacked `noopener,noreferrer` attributes, allowing the opened page to potentially control the original page via `window.opener`.
**Learning:** Even internal tool-based links (like opening WhatsApp or Google Search) can be vulnerable if they target `_blank` without security attributes.
**Prevention:** Always include `'noopener,noreferrer'` as the third argument in `window.open` calls targeting a new tab.
