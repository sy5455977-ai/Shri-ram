# Bolt Performance Journal

## 2025-05-15 - Optimizing Background activity in NEXUS AI
**Learning:** Background polling intervals (setInterval) are common but often unnecessary in React when state changes or window events can trigger the same logic reactively. They keep the CPU from entering lower power states and can cause cumulative lag in long-running PWA sessions. Lazy state initialization also prevents redundant DOM/window access on every re-render.
**Action:** Replace polling with event-driven updates (storage events, online/offline status) and use lazy state initialization. In `App.tsx`, separated event listeners from reactive state thresholds to prevent unnecessary re-registrations.
