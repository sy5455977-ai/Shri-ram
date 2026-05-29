## 2025-05-15 - Accessible Icon-Only Buttons with Feedback
**Learning:** Icon-only buttons (like 'Copy') must have descriptive `aria-label` attributes to be accessible. For temporary success states (like "Copied"), updating the `aria-label` along with the icon provides essential feedback for screen reader users. Use `aria-pressed` for toggleable UI elements to communicate state correctly.
**Action:** Always include `aria-label` on icon-only buttons. Implement a timed feedback state (e.g., `isCopied`) using `useRef` for timeout cleanup to ensure smooth, accessible interactions.
