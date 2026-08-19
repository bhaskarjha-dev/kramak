# Execution Progress — Session [timestamp]

> **Purpose:** Dynamic session scratchpad externalizing execution telemetry. Reset at the start of each execution session to eliminate context window bloat and prevent lost-in-the-middle degradation.

---

## 1. Session Context
- **Model Capabilities:** [from capability gate: fast-code-editing / reasoning-planner / tool-suite]
- **Batch:** [batch number, e.g. Batch 01]
- **Branch:** [pipeline/batch-NN]
- **Capability Score:** [composite score or "N/A" if fast/precise tier]

---

## 2. Work Item Execution Status
| WI | Detail | Status | Files Changed | Tests | Attempts | Error Category |
|---|---|---|---|---|---|---|
| WI-XXX | 🔴/🟡/🟢 | ⬜ queued | — | — | 0 | — |

---

## 3. Idempotency Ledger (Crash Recovery Safety)
<!-- Track executed non-replayable operations to prevent double-execution on crash replay -->
| Operation ID (SHA-256) | Action | WI ID | Attempt | Timestamp | Status |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

---

## 4. Error Log & Diagnostics
<!-- Append each error with timestamp, WI ID, category, error hash, and message summary -->
<!-- Format: [ISO-Timestamp] [WI-ID] [Category] [Hash] Summary -->

---

## 5. Degradation Monitor & Health Gates
- **Consecutive Failures:** 0 / 3 (Limit: 3)
- **Errors Corrected This Session:** 0 / 4 (Limit: 4)
- **Total Files Modified:** 0 / 20 (Limit: 20)
- **Completed WIs This Session:** 0 / 6 (Session Safety Ceiling: 6)
- **Error Trajectory:** [nominal / improving / degrading]
- **Session Health:** [nominal / degraded / critical]

---

## 6. Session Summary & Handoff (Filled at Session Close)
- **WIs Completed:** 0 / N
- **WIs Failed:** 0
- **Files Modified:** 0
- **Total Verification Attempts:** 0
- **Next Phase:** [executing / auditing / planning / waiting / complete]
- **Recommendation for Next Session:** [e.g., "fast code editing capability" or "advanced reasoning planner"]
