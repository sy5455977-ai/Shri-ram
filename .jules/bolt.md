## 2026-05-28 - Dramatically Reduced Initial Bundle via Mode Code-Splitting
**Learning:** In a multi-mode AI application where each mode (Chat, Voice, Vision) carries heavy dependencies (Markdown, Firestore, etc.), static imports of all modes into the root App component can bloat the entry bundle beyond 1MB. Code-splitting at the mode boundary via React.lazy and Suspense reduced the entry bundle by ~90% (1.3MB to 117KB).
**Action:** Always evaluate the entry point bundle size and split high-level functional modes that aren't immediately visible to the user.
