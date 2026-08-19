<!-- Kramak Adapter: Devin Desktop | Tier 3 (Minimal) -->
# Kramak — Devin Desktop Adapter

Universal Base: [.kramak/AGENTS.md](../../.kramak/AGENTS.md) | [.kramak/SKILL.md](../../.kramak/SKILL.md)

When instructed to "Start", "begin", "continue", or "go":

1. Read .kramak/state.json (if missing, initialize with `phase: "bootstrap"`).
2. Read [.kramak/ROUTER.md](../../.kramak/ROUTER.md) and follow the routing table for `state.phase`.
3. Follow all invariants in [.kramak/ROUTER.md](../../.kramak/ROUTER.md) and universal instructions in [.kramak/AGENTS.md](../../.kramak/AGENTS.md).

## Operational Guidelines
- Grounded Verification: Inspect live files before proposing changes.
- 3-Tier Hard Scope Check: Restrict file modifications to declared `files_targeted`.
- Atomic Persistence: Maintain state transitions in `.kramak/state.json`.
