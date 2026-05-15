## 2025-05-15 - PII Leakage in Error Handlers
**Vulnerability:** Detailed Firestore error objects containing user emails and internal database paths were being stringified and thrown, allowing them to be displayed in the UI by a global Error Boundary.
**Learning:** Error boundaries that render `error.toString()` can inadvertently expose sensitive PII and system internals if error handlers are too verbose.
**Prevention:** Always catch and log detailed errors on the client console, but throw generic user-facing messages for the UI.

## 2025-05-15 - Reverse Tabnabbing and Window handle nullification
**Vulnerability:** `window.open(url, '_blank')` calls without `noopener` were vulnerable to reverse tabnabbing.
**Learning:** Adding `noopener` causes `window.open` to return `null` in most modern browsers. Existing logic that checks for a window handle (e.g., to detect popup blockers) will fail and may trigger incorrect fallback behaviors, such as navigating the main application window away.
**Prevention:** When implementing `noopener`, ensure that any logic relying on the returned window object is either removed or updated to handle `null` as a potentially successful case.
