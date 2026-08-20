<!-- Kramak Adapter: Claude Code | Tier 1 (Deep) -->
# Kramak (क्रमक) — Claude Code Configuration

@.kramak/AGENTS.md

## Context Bridge & Native Glob Rules
- **Entry Point:** Read `.kramak/ROUTER.md` on every interaction ("Start", "begin", "continue", "go").
- **Phase Context Loading:**
  - `state.phase == "bootstrap" | "planning"`: Load `@.kramak/planner/CORE.md` (and `@.kramak/planner/output-contract.md` when generating work items).
  - `state.phase == "dispatch" | "executing"`: Load `@.kramak/executor/CORE.md` (and `@.kramak/executor/error-recovery.md` on failure).
  - `state.phase == "auditing"`: Load `@.kramak/executor/CORE.md` (§AUDIT).
  - `state.phase == "merge_queue"`: Load `@.kramak/executor/CORE.md` (§MERGE).
  - `state.phase == "waiting" | "escalated" | "complete"`: Load `@.kramak/planner/CORE.md` (§RESUME).

## Operational Invariants
- Grounded Verification: Live grep/read target files before editing.
- 3-Tier Hard Scope Check: Restrict modifications strictly to `files_targeted`.
- Atomic Persistence: Update `.kramak/state.json` via WAL write-rename on state changes.
- Subagents: Dispatch isolated subagents for concurrent Work Items and independent audit passes.
