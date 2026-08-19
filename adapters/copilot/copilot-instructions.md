<!-- Kramak Adapter: GitHub Copilot | Tier 2 (Thin) -->
# Kramak — GitHub Copilot Instructions

Universal Base: [.kramak/AGENTS.md](../../.kramak/AGENTS.md) | [.kramak/SKILL.md](../../.kramak/SKILL.md)

When instructed to "Start", "begin", "continue", or "go":

1. **State & Entry Point:**
   - Read .kramak/state.json. If missing, initialize with `phase: "bootstrap"`.
   - Read [.kramak/ROUTER.md](../../.kramak/ROUTER.md) to load non-negotiable invariants and route by `state.phase`.

2. **Phase Routing:**
   - `bootstrap` / `planning` / `dispatch` $\rightarrow$ Follow [.kramak/planner/CORE.md](../../.kramak/planner/CORE.md)
   - `executing` / `auditing` / `merge_queue` $\rightarrow$ Follow [.kramak/executor/CORE.md](../../.kramak/executor/CORE.md)
   - `waiting` / `escalated` $\rightarrow$ Check human tasks and inbox; halt if blocked.

3. **Core Invariants:**
   - Grounded Verification: read actual codebase files before proposing changes.
   - 3-Tier Hard Scope Check: modify only files declared in `files_targeted`.
   - Update `.kramak/state.json` on every state transition.
