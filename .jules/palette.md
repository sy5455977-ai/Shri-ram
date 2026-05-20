## 2025-05-15 - Accessibility Baseline for NEXUS AI
**Learning:** Icon-only buttons and interactive elements without focus states create a significant barrier for keyboard and screen reader users in high-tech "futuristic" interfaces. Adding `focus-visible` rings ensures that high-contrast designs remain usable without compromising the aesthetic for mouse users.
**Action:** Always include `aria-label` for interactive icons and use `focus-visible:ring-2 focus-visible:ring-nexus-primary outline-none` for consistent keyboard navigation discovery across all components.
