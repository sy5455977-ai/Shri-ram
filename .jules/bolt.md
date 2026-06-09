## 2024-06-09 - [Eliminating redundant background polling]
**Learning:** Background intervals (`setInterval`) in React components can lead to 'interval starvation' if their dependency array triggers frequent re-renders, and they often cause unnecessary CPU overhead on idle pages.
**Action:** Replace `setInterval` with reactive `useEffect` hooks that depend on the specific state being monitored (e.g., `conversations.length`) and use standard browser events (e.g., `window` 'online'/'offline') for environment-driven state updates.
