# Kramak Adapter: Aider | Tier 3 (Minimal)
# Universal Base: .kramak/AGENTS.md | .kramak/SKILL.md

When instructed to "Start", "begin", "continue", or "go":

1. Read `.kramak/state.json` (if missing, initialize with `phase: "bootstrap"`).
2. Read `.kramak/ROUTER.md` and follow the routing table for `state.phase`.
3. Follow the universal context in `.kramak/AGENTS.md` and `.kramak/SKILL.md`.

## Operational Rules
- Grounded Verification: Read actual files before generating diffs.
- Scope Enforcement: Limit changes strictly to `files_targeted`.
- State Persistence: Update `.kramak/state.json` after completing each work item.
