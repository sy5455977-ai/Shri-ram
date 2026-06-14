## 2025-05-14 - Replace Polling with Event-Driven Updates
**Learning:** Background polling intervals (setInterval) for UI state that can be derived from events (like navigator.onLine) or existing listeners (like storage) cause unnecessary CPU wake-ups and React re-renders, especially in a mobile-first AI application.
**Action:** Always prioritize event listeners (window.online/offline, storage, custom events) over polling intervals for monitoring system state or local storage changes.
