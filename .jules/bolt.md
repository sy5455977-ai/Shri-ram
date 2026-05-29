## 2026-05-29 - Bundle Size Optimization via Code-Splitting
**Learning:** The application's initial bundle size was 1.3MB due to heavy dependencies in sub-components (like react-markdown in ChatInterface) being statically imported. Code-splitting reduced the entry point by >90% to ~117kB.
**Action:** Use React.lazy and Suspense for mutually exclusive high-level components to ensure users only download what they need for the initial view.

## 2026-05-29 - Preventing Redundant State Updates from localStorage
**Learning:** JSON.parse returns a new object/array reference even if the content is identical, which triggers re-renders in hooks like useEffect or setInterval.
**Action:** Use a useRef to store and compare the raw string from localStorage before updating state to skip unnecessary re-renders.
