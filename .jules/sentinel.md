# Sentinel's Security Journal 🛡️

This journal records critical security learnings and vulnerability patterns discovered in the NEXUS AI codebase.

## 2025-05-14 - [Initial Entry]
**Vulnerability:** PII Leakage in Global Error Handlers and Reverse Tabnabbing.
**Learning:** Error handlers that bundle `auth.currentUser` data can inadvertently leak PII (UID/Email) to the UI and logs. `window.open` without security attributes allows target pages to potentially redirect the opener.
**Prevention:** Sanitize error messages before throwing; always use `noopener,noreferrer` with `_blank` targets.
