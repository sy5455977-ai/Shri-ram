# Bolt's Performance Journal ⚡

## 2025-05-27 - Large Initial Bundle Size
**Learning:** The application's entry point is ~1.3MB because all major mode components (`ChatInterface`, `VoiceMode`, `VisionMode`) and their heavy dependencies (like `react-markdown`) are imported synchronously. This significantly delays the "Time to Interactive" for users who may only need one specific mode.
**Action:** Implement `React.lazy` and `React.Suspense` to code-split these components into separate chunks, loading them only when needed.
