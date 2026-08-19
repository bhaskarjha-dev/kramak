---
name: kramak
description: "Autonomous development pipeline â€” deterministic Planâ†’Executeâ†’Audit lifecycle with Antigravity subagent & task integration"
trigger: "Start"
---

<!-- Kramak Adapter: Google Antigravity | Tier 2 (Thin) -->
# Kramak â€” Antigravity Adapter

This adapter extends the universal [.kramak/SKILL.md](../../../.kramak/SKILL.md) and [.kramak/AGENTS.md](../../../.kramak/AGENTS.md) with Google Antigravity IDE capabilities.

## Execution Entry Point
When the user says **"Start"** (or "begin", "continue", "go", "kramak"):
1. **State:** Read .kramak/state.json. If missing, initialize from [.kramak/schemas/state.schema.json](../../../.kramak/schemas/state.schema.json) with `phase: "bootstrap"`.
2. **Inbox:** Check .kramak/inbox/ for priority items.
3. **Router:** Read [.kramak/ROUTER.md](../../../.kramak/ROUTER.md) and dispatch according to `state.phase`.

## Antigravity IDE Integration
- **Subagents:** Use Antigravity subagents (`invoke_subagent` / `browser_subagent`) during `DISPATCH` and `AUDITING` for isolated execution and fresh-context verification.
- **Background Tasks:** Use `run_command` (async) and `schedule` for non-blocking long-running build, test, and verification suites.
- **Artifacts:** Document escalations and checkpoints in session artifacts linking to [.kramak/templates/HUMAN-TASKS.template.md](../../../.kramak/templates/HUMAN-TASKS.template.md).

## Phase Dispatch
- `bootstrap` / `planning` / `dispatch` $\rightarrow$ Follow [.kramak/planner/CORE.md](../../../.kramak/planner/CORE.md)
- `executing` / `auditing` / `merge_queue` $\rightarrow$ Follow [.kramak/executor/CORE.md](../../../.kramak/executor/CORE.md)
- `waiting` / `escalated` $\rightarrow$ Enforce invariants, log checkpoint, and request human input.
