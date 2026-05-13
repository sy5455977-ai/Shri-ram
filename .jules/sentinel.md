## 2025-05-15 - Reverse Tabnabbing Mitigation
**Vulnerability:** Reverse Tabnabbing (Tabjacking) via `window.open` with `_blank` target.
**Learning:** When using `window.open(url, '_blank')`, the newly opened window gains access to the original window via `window.opener`. A malicious destination could redirect the original page to a phishing site.
**Prevention:** Always include `'noopener,noreferrer'` as the third argument to `window.open` when targeting `_blank` to sever the link between the two windows.
