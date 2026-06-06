## 2025-05-15 - Selective Code-Splitting for Entry Point Optimization
**Learning:** Lazy-loading the primary feature of an application (e.g., ChatInterface) can negatively impact "Time to Content" by introducing an extra network roundtrip and loading state for the user's most likely first interaction.
**Action:** Keep the main entry point statically imported and apply `React.lazy` only to secondary modules to reduce initial bundle size without compromising the primary user experience.
