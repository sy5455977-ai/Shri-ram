## 2025-05-14 - Core Accessibility and Keyboard Navigation Enhancements
**Learning:** Icon-only buttons and interactive `div` elements in a dark-themed, glass-heavy UI like NEXUS AI are often invisible to keyboard users and screen readers unless explicitly marked with `aria-label` and high-contrast `focus-visible` rings.
**Action:** Standardize on `focus-visible:ring-2 focus-visible:ring-nexus-primary outline-none` for primary interactive elements and ensure all `lucide-react` icon buttons have descriptive `aria-label` attributes.
