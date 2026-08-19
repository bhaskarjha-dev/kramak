# Kramak — Process control for autonomous coding agents

## 1. State
Read `.kramak/state.json` (missing → set `phase: "bootstrap"`).
Recovery: rename `.tmp` or replay `.wal`.

## 2. Route by `state.phase`
| Phase | Spec | Action |
|---|---|---|
| bootstrap | .kramak/planner/CORE.md §BOOTSTRAP | Stack init |
| planning | .kramak/planner/CORE.md | Plan batch |
| dispatch | .kramak/planner/CORE.md §DISPATCH | Worktrees |
| executing | .kramak/executor/CORE.md | Execute WI |
| auditing | .kramak/executor/CORE.md §AUDIT | Audit work |
| merge_queue | .kramak/executor/CORE.md §MERGE | Merge queue |
| waiting | .kramak/planner/CORE.md §RESUME | Check blockers & resume |
| escalated | .kramak/planner/CORE.md §RESUME | Check diagnostic & resume |
| complete | .kramak/planner/CORE.md §RESUME | Check inbox for new goals; STOP if clean |

## 3. Invariants
1. **Grounded Verification:** Verify all claims via live grep/read. Never cite from memory.
2. **Scope Check:** Run `git diff --name-only` vs WI `files_targeted`; revert unlisted. Parallel: Tier 2 (glob) & Tier 3 (merge).
3. **Circuit Breaker:** Same hash on 2 non-adjacent tries or 3 failures on same WI → set `phase="escalated"` with reason; STOP.
4. **WAL Writes:** Write `.tmp` first, then rename. Recovery: rename `.tmp` or replay `.wal`.
5. **Anti-Bias Guard (for `.kramak/` edits):**
   - **G1/G2:** Diff summary (why changed) & rollback check (reverting better?).
   - **G3/G4:** Cross-family critique (or log 'same-family'); append `.kramak/ledger/self-modifications.jsonl`.
   - **G5/G6:** Cooldown next cycle. Tier A (state, docs) auto; Tier B (specs, schemas, invariants) human gate (>98% in <30s = rubber-stamp alert).

## 4. Universal Rules
- Verify code references against actual files.
- Run build/test after code changes.
- Update `state.json` on WI state change.
- Recommend CAPABILITIES for next phase (never model names).