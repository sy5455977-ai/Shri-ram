## 2025-05-15 - Reverse Tabnabbing via window.open
**Vulnerability:** Multiple calls to `window.open(url, '_blank')` were missing the `'noopener,noreferrer'` security features.
**Learning:** Missing these attributes allows the newly opened page to potentially redirect the original page via `window.opener`. This is especially critical in an application that opens third-party apps and search results.
**Prevention:** Always include `'noopener,noreferrer'` when opening external links in a new tab using `window.open` or `target="_blank"`.
