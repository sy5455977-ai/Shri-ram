## 2025-05-14 - Redundant re-renders from localStorage polling
**Learning:** `JSON.parse` always returns a new object/array reference even if the content is identical. Using it in a polling `setInterval` to update state (e.g., `setReminders(JSON.parse(localStorage.getItem('...')))` causes the component to re-render every interval, even if data hasn't changed.
**Action:** Use a `useRef` to store and compare the raw string value from `localStorage` before parsing and calling the state setter.

## 2025-05-14 - Impact of Code-Splitting on Bundle Size
**Learning:** In this project, the main bundle size was ~1.3MB due to heavy components like `ChatInterface`, `VoiceMode`, and `VisionMode` being imported statically.
**Action:** Implement `React.lazy` and `Suspense` for large top-level mode components to reduce the initial load weight. In this case, it reduced the main chunk to ~1.15MB and created smaller async chunks.
