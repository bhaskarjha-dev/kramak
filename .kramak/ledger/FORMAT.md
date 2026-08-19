# Kramak Audit Ledger — JSONL Specification (FORMAT.md)

> **Subsystem:** Anti-Bias Guard (G4 Immutable Audit Ledger)  
> **Target File:** `.kramak/ledger/self-modifications.jsonl`  
> **Standard:** JSON Lines (JSONL) — UTF-8 encoded, 1 JSON object per line

---

## 1. Overview & Purpose

Under Kramak's Anti-Bias Guard (Decision D-006 / FAD §5.1), any proposed or executed modification to the internal `.kramak/` directory (specifications, schemas, templates, routing rules) must be permanently logged in the append-only audit trail:

```
.kramak/ledger/self-modifications.jsonl
```

This ledger provides an immutable, machine-readable chronological history of framework self-modifications, preventing recency bias, accidental drift, and unauthorized relaxation of safety invariants.

---

## 2. JSONL Entry Schema

Each line in `self-modifications.jsonl` must be a valid, compact single-line JSON object adhering to the following structure:

```json
{
  "timestamp": "ISO-8601",
  "actor": "planner|executor|auditor|human",
  "action": "modify|create|delete|revert",
  "target_file": "relative path within .kramak/",
  "diff_summary": "one-line description of what changed",
  "rationale": "why this change was made",
  "anti_bias_checks": {
    "g1_history_diff": true,
    "g2_rollback_check": true,
    "g3_dual_model": false,
    "g4_ledger_entry": true,
    "g5_cooldown": false,
    "g6_human_gate": false
  },
  "reversible": true,
  "batch": 0,
  "session_id": "optional session identifier"
}
```

---

## 3. Field Definitions

| Field Name | Type | Allowed Values / Constraints | Description |
|---|---|---|---|
| `timestamp` | string | ISO 8601 (e.g. `2026-08-19T14:30:00Z`) | Exact UTC timestamp when the ledger record was written |
| `actor` | string | `"planner"`, `"executor"`, `"auditor"`, `"human"` | The entity proposing or performing the modification |
| `action` | string | `"modify"`, `"create"`, `"delete"`, `"revert"` | The nature of the filesystem mutation on the target file |
| `target_file` | string | Relative path (e.g. `".kramak/planner/CORE.md"`) | Target file within `.kramak/` being created or modified |
| `diff_summary` | string | Max 150 chars | Crisp, one-line summary of the concrete change |
| `rationale` | string | String | Detailed explanation of why the change is necessary |
| `anti_bias_checks` | object | See §4 Anti-Bias Guard G1–G6 checks | Status object recording which guard checks were evaluated |
| `reversible` | boolean | `true`, `false` | Whether the change can be cleanly rolled back via git revert |
| `batch` | integer | $\ge 0$ | The active batch number during which the change occurred |
| `session_id` | string | Optional string / null | Unique identifier of the current execution session |

---

## 4. Anti-Bias Guard G1–G6 Checklist

The `anti_bias_checks` object captures the status of the 6 governance gates:

| Gate | Check Name | Description | Required For |
|---|---|---|---|
| **G1** | `g1_history_diff` | Programmatic git history diff check (`git log -p`) to understand why the existing rule was originally established. | All `.kramak/` edits |
| **G2** | `g2_rollback_check` | Automated rollback check evaluating whether reverting recent changes is cleaner than adding new rules. | All `.kramak/` edits |
| **G3** | `g3_dual_model` | Independent cross-family model critique pass (or explicitly logged as `"same-family"` if unavailable). | Tier B changes |
| **G4** | `g4_ledger_entry` | Append-only entry written to `.kramak/ledger/self-modifications.jsonl`. | Mandatory for ALL |
| **G5** | `g5_cooldown` | Cooldown window: change remains staged/provisional for 1 planning cycle before activation. | Tier B changes |
| **G6** | `g6_human_gate` | Mandatory human sign-off before activating modifications to governance rules or safety invariants. | Tier B changes |

---

## 5. Risk-Tiered Blast Radius

- **Tier A (Low Risk — Auto-Merge):**
  - Files: `.kramak/state.json`, `.kramak/templates/*`, `.kramak/executor/PROGRESS.md`, documentation.
  - Requirement: G1, G2, and G4 pass $\rightarrow$ change may activate automatically.
- **Tier B (High Risk — Human Gate Enforced):**
  - Files: `.kramak/ROUTER.md`, `.kramak/schemas/*`, `.kramak/planner/CORE.md`, `.kramak/executor/CORE.md`, invariants.
  - Requirement: G1 through G6 mandatory. Change requires explicit human review. Rubber-stamp alert triggers if approval rate exceeds 98% with $<30$s review time.

---

## 6. Append Protocol & Invariants

1. **Strict Append-Only:** Existing entries in `self-modifications.jsonl` are immutable. They must never be rewritten, edited, reordered, or truncated.
2. **Single-Line Formatting:** Each record must occupy exactly one line, terminated by `\n`. No multiline JSON formatting is permitted in the raw `.jsonl` file.
3. **Pre-Mutation Logging:** The ledger entry must be appended and committed atomically alongside or prior to the `.kramak/` specification mutation.
