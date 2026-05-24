## 2025-05-14 - Lazy Loading Main Feature Modules
**Learning:** Code-splitting the main feature modules (Chat, Voice, Vision) using React.lazy reduced the entry point bundle size from ~1.3MB to ~117kB (~91% reduction). This significantly improves First Contentful Paint and Time to Interactive.
**Action:** Always consider lazy loading heavy feature modules that are not immediately visible or are conditionally rendered to keep the critical path lean.
