# Executor Error Recovery & Failure Diagnostics

> **Trigger:** Loaded on-demand when a Work Item fails verification or execution, when a circuit breaker trips, or when failure classification and autonomous remediation are required.
>
> **Core Mandate:** Autonomous self-recovery. This module is NOT passive documentation—it is a deterministic decision tree that the executor follows mechanically to recover from failures without human intervention.
>
> **References:** Universal invariants in [ROUTER.md](../ROUTER.md) and execution lifecycle in [CORE.md](CORE.md).

---

## SECTION 1: FAILURE TAXONOMY & CLASSIFICATION

### 1.1 Priority & Tie-Breaking Rule (Amendment 7E / T2-13 §5.5)

If an observed failure exhibits symptoms matching multiple categories, apply this strict priority ordering from left to right:

```
scope-exceeded > dependency-missing > ambiguous-spec > code-drift > verification-fail > tool-error
```

**Rule:** Evaluate categories from left to right. The **first match wins**. This guarantees mutual exclusivity and eliminates classification ambiguity across overlapping failure symptoms.

---

### 1.2 Failure Classification Decision Tree

When a Work Item fails during execution or verification, follow this mechanical decision tree:

```
START: Work Item Failure Encountered
 │
 ├── 1. Was the failure triggered by an unauthorized file modification or scope check?
 │    │
 │    └── YES ──► [Category: SCOPE-EXCEEDED] ──────────────────────────► Go to Recovery Path C
 │
 ├── 2. Was the failure caused by a missing import, uninstalled package, or incomplete prerequisite WI?
 │    │
 │    └── YES ──► [Category: DEPENDENCY-MISSING] ──────────────────────► Go to Recovery Path D
 │
 ├── 3. Is the WI specification contradictory, incomplete, or testing incorrect behavior?
 │    │
 │    └── YES ──► [Category: AMBIGUOUS-SPEC] ──────────────────────────► Go to Recovery Path E
 │
 ├── 4. Did the target code, file path, or BEFORE pattern change or move since WI planning?
 │    │
 │    └── YES ──► [Category: CODE-DRIFT] ──────────────────────────────► Go to Recovery Path A
 │
 ├── 5. Did a test assertion, lint command, type checker, or build compilation fail in target code?
 │    │
 │    └── YES ──► [Category: VERIFICATION-FAIL] ───────────────────────► Go to Recovery Path B
 │
 └── 6. Was the error caused by a tool binary, git lock, environment, network, or file system failure?
      │
      └── YES ──► [Category: TOOL-ERROR] ──────────────────────────────► Go to Recovery Path F
```

#### Decision Logic Summary

```
START → Was the error in a test/lint/build command?
  YES → Was it a test assertion failure?
    YES → Is the test checking the right behavior? 
      YES → Category: VERIFICATION-FAIL → Go to Recovery Path B
      NO  → Category: AMBIGUOUS-SPEC → Go to Recovery Path E
    NO  → Was it a build/compile error?
      YES → Is the error about a missing import/dependency?
        YES → Category: DEPENDENCY-MISSING → Go to Recovery Path D
        NO  → Category: CODE-DRIFT → Go to Recovery Path A
  NO → Was the error in a git operation?
    YES → Category: TOOL-ERROR → Go to Recovery Path F
    NO  → Did the scope check fail?
      YES → Category: SCOPE-EXCEEDED → Go to Recovery Path C
      NO  → Category: CODE-DRIFT → Go to Recovery Path A
```

---

### 1.3 Master Failure Taxonomy Crosswalk

Kramak maps its 6 actionable categories directly to classical **ODC (Orthogonal Defect Classification, 1992)** and modern **MAST (NeurIPS 2025)** benchmark classifications:

| Kramak Category | Description | ODC Category (1992) | MAST Class (2025) | Automated Remediation Action |
|---|---|---|---|---|
| `code-drift` | Target source or BEFORE pattern moved, changed, or missing since WI planning | Interface / Timing | System Design | Re-scan target file; refresh BEFORE pattern via live grep; update line references or replan |
| `verification-fail` | Test assertion failure, lint error, type mismatch, or logic defect in touched files | Algorithm / Logic | Task Verification | Read full failure diff; fix implementation in touched files; retry up to 3 (or 5 if trajectory improving) |
| `scope-exceeded` | Required fix touches files outside declared `files_targeted` | Checking | Inter-Agent Alignment | Revert unlisted file diffs; create ad-hoc follow-up WI; continue within declared scope |
| `dependency-missing` | Unresolved prerequisite WI, missing module, or uninstalled external package | Relationship | Inter-Agent Alignment | Re-order queue in `state.json` after dependency WI; or create new dependency WI |
| `ambiguous-spec` | Contradictory, missing, or underspecified requirements in WI specification | Documentation | Specification | Mark WI blocked/failed; route to `planning` phase; recommend elevating detail tier (🟢→🟡 or 🟡→🔴) |
| `tool-error` | Toolchain, package manager, git lock, permission, or environment failure | Environment | System Design | Apply exponential backoff (1s, 2s, 4s); clean locks; route to `waiting` if persistent |

---

## SECTION 2: AUTONOMOUS RECOVERY PATHS

Each recovery path is a step-by-step executable procedure. Execute each step in sequence.

---

### Recovery Path A — `code-drift`
*Classification:* ODC: Interface / Timing | MAST: System Design

**Procedure:**
1. **Invalidate Cache:** Invalidate all cached or memorized views of the target file. Open and read the target file directly from disk using read tools.
2. **Execute Live Grep:** Run a live grep/regex search on the target file for the exact `BEFORE` snippet or unique symbol identifier.
3. **Evaluate Search Results:**
   - **Case A1 (Pattern Shifted Lines):** If the exact `BEFORE` pattern exists but line numbers have shifted:
     - Update line number references in the active execution context.
     - Apply the planned `AFTER` transformation at the new line offset.
     - Proceed to verification.
   - **Case A2 (Pattern Modified):** If the surrounding code or function signature was modified (e.g. by an earlier WI or concurrent refactor):
     - If the drift is trivial (whitespace or comment edit), adjust the pattern and apply replacement.
     - If the drift is non-trivial (logic or signature altered), do NOT guess. Set diagnosis: `"code-drift: target file modified since WI creation"`.
     - Mark WI as `failed`, append failure diagnosis to WI file, update WI `status: "failed"`, update `state.json` via WAL, and route to `planning`.
   - **Case A3 (Pattern Missing / File Deleted):** If the pattern or target file is gone:
     - Mark WI as `failed`.
     - Record failure diagnosis explaining missing symbols.
     - Mark WI `status: "failed"`, update `state.json` via WAL, and route to `planning` for re-planning.

---

### Recovery Path B — `verification-fail`
*Classification:* ODC: Algorithm / Logic | MAST: Task Verification

**Procedure:**
1. **Read Full Output:** Read the entire stderr, test runner output, compiler log, and stack trace without truncation.
2. **Isolate Failure:** Identify the specific failing test case, source file, line number, and assertion expression.
3. **Diff Expected vs Actual:** Compare the expected value/type against the actual received value/type.
4. **Determine Bug Root Cause:**
   - **Implementation Defect (Standard):** If the test specification is valid and the implementation is buggy:
     - Modify the source code strictly within `files_targeted` to resolve the defect.
   - **Test Specification Defect (Authored within WI):** If the test was created in this WI and contains a flawed assertion:
     - Correct the test assertion to match the WI's stated acceptance criteria.
   - **External Test Conflict:** If an existing pre-planned test outside this WI is failing due to contradictory requirements:
     - Escalate to **Recovery Path E (`ambiguous-spec`)**.
5. **Enforce Retry Budget & Trajectory Check:**
   - Increment `attempts` in active WI state.
   - Standard retry budget: **3 attempts**.
   - **Trajectory-Aware Extension:** If error count is monotonically decreasing across consecutive attempts (e.g., 8 errors → 3 errors → 1 error), extend retry budget up to **5 attempts** total.
   - **Oscillation / Stagnation:** Compute `error_hash`. If oscillation or stagnation is detected (see Section 3), STOP immediately and trip circuit breaker.
6. **Handle Budget Exhaustion:**
   - If verification fails after exhausting retry budget:
     - Record full chronological `error_trajectory` in WI failure diagnosis.
     - Revert uncommitted changes: `git checkout -- . && git clean -fd`.
     - Update WI file status to `status: "failed"`.
     - Update `state.json` via WAL (increment `totalFailed` and `consecutiveFailures`).
     - If `consecutiveFailures >= 3`, trip circuit breaker, populate `state.escalation`, and set `state.phase: "escalated"`.

---

### Recovery Path C — `scope-exceeded`
*Classification:* ODC: Checking | MAST: Inter-Agent Alignment

**Procedure:**
1. **Inspect Working Tree Diffs:** Run Tier 1 Scope Check:
   ```bash
   ACTUAL=$( (git diff --name-only HEAD; git ls-files --others --exclude-standard) | sort -u )
   ```
2. **Compare Against Declared Scope:** Read `files_targeted` from the active Work Item specification (`.kramak/work-items/WI-XXX.md`).
3. **Isolate Unlisted Files:** Compute set difference ($F_{\text{actual}} \setminus F_{\text{declared}}$).
4. **Revert Unlisted Modifications:**
   - For each modified tracked unlisted file: `git checkout -- <file>`.
   - For each newly created untracked unlisted file: remove the file from filesystem (`rm <file>`).
5. **Handle Required Out-of-Scope Changes:**
   - If the change to the unlisted file is strictly necessary for project correctness:
     - Draft an ad-hoc follow-up Work Item file at `.kramak/work-items/WI-XXX-adhoc.md`.
     - Declare the necessary `files_targeted` and minimal acceptance criteria.
     - Insert the ad-hoc WI into `state.queue` immediately after current batch.
     - Update `state.json` via WAL.
   - If the change was unnecessary cleanup or unprompted refactoring:
     - Discard permanently (strictly enforce Polish Ceiling Rule).
6. **Resume Execution:** Continue execution of the current Work Item modifying ONLY the declared files in `files_targeted`.

---

### Recovery Path D — `dependency-missing`
*Classification:* ODC: Relationship | MAST: Inter-Agent Alignment

**Procedure:**
1. **Identify Missing Component:** Identify the missing dependency (uninstalled npm/pip/cargo package, unbuilt submodule, missing internal module file, or prerequisite Work Item).
2. **Inspect Existing Plans & Queue:** Inspect `state.queue` in `state.json` and the batch plan (`plans/PLAN-batch-XX.md`) to check if a Work Item providing this dependency already exists.
3. **Execute Queue Reordering or Creation:**
   - **Branch D1 (Dependency WI Exists in Queue):**
     - Re-order `state.queue` in `state.json` via WAL so that the dependency WI is placed immediately before the current WI.
     - Reset current WI status to `status: "queued"`.
     - Set `state.active: null`, `state.phase: "executing"`.
     - Resume execution with the dependency WI.
   - **Branch D2 (No WI Exists for Missing Dependency):**
     - If the missing dependency is a package/manifest installation:
       - Create a new Work Item file `.kramak/work-items/WI-XXX-dep.md` with `detail_level: "directed"`, targeting the package manifest (`package.json`, `pyproject.toml`, `Cargo.toml`).
       - Insert `WI-XXX-dep` into `state.queue` ahead of current WI.
       - Reset current WI status to `status: "queued"`.
       - Set `state.active: null`, update `state.json` via WAL, and resume execution.
     - If the missing dependency requires architectural changes:
       - Mark current WI as `failed` with category `dependency-missing`.
       - Clear remaining unexecuted items from `state.queue` (`state.queue: []`) to prevent queue-resumption deadlocks.
       - Update `state.json` via WAL and transition `state.phase: "planning"`.

---

### Recovery Path E — `ambiguous-spec`
*Classification:* ODC: Documentation | MAST: Specification

**Procedure:**
1. **Diagnostic Determination:** The Work Item specification is determined to be contradictory, missing critical type signatures/interfaces, or requesting behavior that contradicts established architecture.
2. **Mark Status Blocked:** Set WI status to `"blocked"` (or `"failed"` with category `ambiguous-spec`) in the WI specification file.
3. **Author Failure Diagnosis:** Append a detailed diagnosis to the WI file:
   ```markdown
   ## Failure Diagnosis
   - **Category:** ambiguous-spec
   - **What happened:** [Explicitly describe the ambiguity, contradiction, or missing interface contract]
   - **Root cause:** [Explain why execution cannot proceed deterministically without planner resolution]
   - **Suggested fix:** [Recommend specific interface definitions and detail tier elevation: 🟢 Outcome → 🟡 Directed, or 🟡 Directed → 🔴 Guided]
   ```
4. **Revert Uncommitted Changes:** `git checkout -- . && git clean -fd`.
5. **Update Status:** Set `status: "failed"` in `.kramak/work-items/WI-XXX.md`.
6. **Update State Plane:** Update `state.json` via WAL:
   - Set `state.active: null`.
   - Add WI record to `state.failed` array with category `ambiguous-spec`.
   - Transition `state.phase: "planning"`.
   - Set `state.nextAction: "Ambiguous specification on WI-XXX: [summary]. Re-orient in planner to elevate detail level."`. STOP.

---

### Recovery Path F — `tool-error`
*Classification:* ODC: Environment | MAST: System Design

**Procedure:**
1. **Identify Tool Failure Signature:** Inspect command exit code and error message. Classify into environment issue, lockfile contention, or transient network/process failure.
2. **Check Tool Availability:** Verify if the required CLI binary exists and is executable in the environment (`git --version`, `node -v`, `cargo --version`, `pytest --version`):
   - **Tool Missing / Uninstalled:**
     - Mark WI as `blocked`.
     - Log blocking human task in `.kramak/HUMAN-TASKS.md` specifying tool name and installation command.
     - Update `state.json` via WAL: set `state.phase: "waiting"`, `state.nextAction: "Missing required tool [name]. Install tool and resume."`; STOP.
3. **Execute Transient Retry with Exponential Backoff:**
   - If tool binary exists but failed due to network timeout, file lock, or process contention:
     - If git index lock exists (`.git/index.lock`): verify no active git process is running; remove stale lock file.
     - **Retry 1:** Wait 1 second → re-execute command.
     - **Retry 2:** Wait 2 seconds → re-execute command.
     - **Retry 3:** Wait 4 seconds → re-execute command.
4. **Evaluate Persistence:**
   - If command succeeds during backoff: continue execution normally.
   - If command still fails after 3 backoff retries:
     - Mark WI as `failed` with category `tool-error`.
     - If error is environmental/permanent: record in `HUMAN-TASKS.md`, update `state.json` via WAL, transition `state.phase: "waiting"`.
     - If internal unrecoverable tool crash: update `state.json` via WAL, transition `state.phase: "escalated"`.

---

## SECTION 3: PROGRESS-AWARE CIRCUIT BREAKER

The Progress-Aware Circuit Breaker terminates infinite retry loops, detects non-productive thrashing, and catches state-hash oscillations before token budgets are depleted.

### 3.1 Error Signature Hashing & Tracking Schema

After **EACH** failed execution or verification attempt, compute the attempt signature:

$$\text{error\_hash} = \text{SHA256}(\text{error\_message} + \text{files\_modified\_sorted} + \text{test\_output\_first\_100\_chars})$$

Update internal tracking record:

```json
{
  "wi_id": "WI-XXX",
  "attempt": 1,
  "error_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "category": "verification-fail",
  "error_count": 4,
  "timestamp": "2026-08-19T18:45:00Z"
}
```

---

### 3.2 Circuit Breaker Evaluation Rules

Evaluate these deterministic rules after every attempt:

```
                  ┌─────────────────────────────────────┐
                  │ Attempt Failed: Compute error_hash  │
                  └──────────────────┬──────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌───────────────────────┐                           ┌─────────────────────┐
│ hash(N) === hash(N-2) │                           │ hash(N) === hash(N-1)│
│ OSCILLATION DETECTED  │                           │   === hash(N-2)     │
└──────────┬────────────┘                           │ NO PROGRESS (3-peat)│
           │                                        └──────────┬──────────┘
           │                                                   │
           └─────────────────────────┬─────────────────────────┘
                                     ▼
                        ┌────────────────────────┐
                        │ TRIP CIRCUIT BREAKER:  │
                        │ Set phase: "escalated" │
                        │ Hard Stop for Operator │
                        └────────────────────────┘
```

1. **Rule 1 — Oscillation Detection (State Flip-Flop):**
   - If $\text{hash}(\text{attempt } N) === \text{hash}(\text{attempt } N-2)$:
   - **Verdict:** Oscillation detected. The agent is caught in an alternating loop (e.g. flipping a type or modifying a condition back and forth).
   - **Action:** STOP immediately. Trip circuit breaker. Fail the WI, populate `state.escalation`, and set `state.phase: "escalated"`.
2. **Rule 2 — Stagnation (Zero Error Reduction):**
   - If 3 consecutive attempts yield the exact same error hash ($\text{hash}(N) === \text{hash}(N-1) === \text{hash}(N-2)$):
   - **Verdict:** No progress. Fixes are having zero effect on compiler/test output.
   - **Action:** STOP immediately. Trip circuit breaker. Fail the WI, populate `state.escalation`, and set `state.phase: "escalated"`.
3. **Rule 3 — Monotonic Error Reduction (Progress Extension):**
   - If $\text{error\_count}(N) < \text{error\_count}(N-1)$ AND $\text{hash}(N) \neq \text{hash}(N-1)$:
   - **Verdict:** Measurable progress verified.
   - **Action:** Extend retry budget up to **5 attempts** maximum.
4. **Rule 4 — Consecutive Failure Tripwire:**
   - If `metrics.consecutiveFailures >= 3` across distinct Work Items:
   - **Verdict:** Architectural failure or broken global state.
   - **Action:** Set `metrics.circuitBreakerTripped: true`, set `state.phase: "escalated"`, `state.nextAction: "Circuit breaker tripped (3 consecutive failures). Developer diagnostic review required."`; STOP.
5. **Rule 5 — Deadlock Escalation:**
   - If consecutive batch failures $\ge 3$ or circular dependency deadlock is detected:
   - **Action:** Set `state.phase: "escalated"`, `state.nextAction: "Pipeline escalated due to recurring batch failure deadlock. Developer intervention required."`; STOP.

---

## SECTION 4: ERROR TRAJECTORY SCHEMA & SPEC INTEGRATION

### 4.1 Schema Definition

When a Work Item fails, its `failure_diagnosis.error_trajectory` must strictly conform to [work-item.schema.json](../schemas/work-item.schema.json):

```json
{
  "category": "verification-fail",
  "description": "Integration test failed: token expiry edge case returns 401 instead of rotated payload.",
  "error_trajectory": [
    {
      "attempt": 1,
      "category": "verification-fail",
      "error_hash": "a1b2c3d4e5f6...",
      "error_count": 3,
      "description": "TestAuthToken failed: expected status 200, got 500 (NullPointerException in TokenService.java:42)",
      "timestamp": "2026-08-19T18:45:00Z"
    },
    {
      "attempt": 2,
      "category": "verification-fail",
      "error_hash": "b2c3d4e5f6a1...",
      "error_count": 1,
      "description": "TestAuthToken failed: expected status 200, got 401 (Token expired without refresh)",
      "timestamp": "2026-08-19T18:48:00Z"
    }
  ]
}
```

---

### 4.2 Markdown WI Failure Diagnosis Format

Append this markdown section to the end of the failed Work Item file in `.kramak/work-items/<WI-ID>.md`:

```markdown
## Failure Diagnosis

- **Category:** verification-fail
- **What happened:** Integration tests failed on token refresh rotation edge cases.
- **Root cause:** TokenService did not handle expired refresh token fallback before invoking token repository.
- **Error Trajectory:**
  - Attempt 1 [a1b2c3d4]: NullPointerException on line 42 (3 errors total)
  - Attempt 2 [b2c3d4e5]: 401 Unauthorized returned instead of refreshed token (1 error remaining)
- **Suggested fix:** Planner should elevate detail level to 🔴 Guided and provide exact BEFORE/AFTER token handler logic with null check.
```

---

### 4.3 Diagnostic Consumption by Planner

When the Planner session starts following a failure:
1. **Step 1:** Planner reads `state.json -> failed` and failed items in `.kramak/work-items/`.
2. **Step 2:** Planner analyzes `error_trajectory` to determine if the failure was an interface misunderstanding, missing dependency, or specification ambiguity.
3. **Step 3:** Planner designs a targeted remediation strategy without repeating the exact failing pattern. (Circuit breaker metrics and retry counters reset only upon verified passing audit in executor/CORE.md).
