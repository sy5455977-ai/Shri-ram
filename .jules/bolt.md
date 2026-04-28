## 2025-05-15 - PR Scope and Environmental Noise
**Learning:** Bundling unrelated type fixes or large lockfile updates with performance optimizations can lead to rejection in code reviews, even if the fixes themselves are correct. The "50-line diff limit" is strictly enforced and counts all changes.
**Action:** Keep performance PRs focused strictly on the optimization logic. If pre-existing lint errors block verification, document them and rely on build stability rather than fixing them in the same PR.
