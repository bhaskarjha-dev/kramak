# Executor Tool Playbooks & Execution Protocols

> **Trigger:** Loaded on-demand for git operations, multi-worktree management, build tool command recipes, Write-Ahead Logging (WAL) state mutations, crash recovery, and pre-commit verification.
>
> **Core Mandate:** High-fidelity execution. Every command in this module is deterministic and copy-pasteable. Zero conversational filler, zero guessing.
>
> **References:** Universal invariants in [ROUTER.md](../ROUTER.md) and execution lifecycle in [CORE.md](CORE.md).

---

## SECTION 1: GIT OPERATIONS & WORKTREE MANAGEMENT

### 1.1 Branch Management & Commit Conventions

#### Batch Branch Initialization
```bash
# Verify base branch is clean and up to date
git status
git checkout main
git pull --ff-only

# Create or switch to dedicated batch feature branch
git checkout -b pipeline/batch-01
```

#### Atomic Work Item Commit Protocol
Commit immediately after a Work Item passes verification. Stage **ONLY** files declared in `files_targeted`:

```bash
# Stage strictly declared files
git add src/services/auth.ts src/models/user.ts

# Format commit message following Conventional Commits standard
git commit -m "feat(auth): implement refresh token rotation mechanism

WI-102: Refresh Token Rotation
Batch: 01
Detail-Level: directed
Verification: npm test (passed)"
```

#### Branch Synchronization & Remote Push
```bash
# Push batch branch to origin if remote is configured
git push -u origin pipeline/batch-01
```

---

### 1.2 Multi-Worktree Operations (Parallel Mode: `concurrency.budget > 1`)

When operating in parallel dispatch mode, each concurrent Work Item executes in an isolated filesystem worktree:

#### 1. Provision Worktree
```bash
# 1. Clean stale worktree references from crashed or merged sessions
git worktree prune

# 2. Create isolated worktree directory and dedicated feature branch
git worktree add .kramak/worktrees/WI-102 -b pipeline/WI-102

# 3. Verify worktree creation and active path
git worktree list
```

#### 2. Execute Within Worktree
```bash
# Navigate to the provisioned worktree working directory
cd .kramak/worktrees/WI-102

# Inspect worktree status
git status
```

#### 3. Merge & Clean Up Worktree
After the Work Item passes verification and is approved by the merge queue:

```bash
# Return to repository root integration branch
cd ../../..

# Rebase / merge worktree branch onto integration branch HEAD
git merge --no-ff pipeline/WI-102 -m "chore(merge): integrate WI-102 worktree branch"

# Remove the filesystem worktree directory
git worktree remove .kramak/worktrees/WI-102

# Delete the local worktree feature branch
git branch -d pipeline/WI-102

# Prune stale worktree metadata references
git worktree prune
```

---

### 1.3 3-Tier Scope Verification Protocol

Enforce absolute boundary control across all execution tiers:

```
[ Tier 1: Per-Worktree / Every Change ] ──► Tracked diff + Untracked files vs files_targeted
[ Tier 2: Pre-Flight Concurrency Check ] ──► Pairwise disjoint sets: (files_targeted_A ∩ files_targeted_B = ∅)
[ Tier 3: Merge-Time Integration Check ] ──► Post-merge diff against integration base + full test suite
```

#### Tier 1: Per-Worktree Scope Check (MANDATORY after EVERY code change)
*Includes newly created (untracked) files per Amendment 7D (T2-13 §5.2):*

> **Cross-Platform Verification Note:** AI coding agents perform set comparison natively by comparing the list of modified/untracked files from `git diff --name-only HEAD` and `git ls-files --others --exclude-standard` against the Work Item's declared `files_targeted` array. Below are reference snippets for POSIX Bash and Windows PowerShell:

```bash
# --- POSIX / /bin/sh Compatible Reference ---
# 1. Capture all modified tracked files PLUS untracked new files (sorted uniquely)
ACTUAL=$( (git diff --name-only HEAD; git ls-files --others --exclude-standard) | sort -u )

# 2. Extract declared files from active Work Item specification
DECLARED=$(awk '/files_targeted:/{flag=1; next} /^[a-zA-Z0-9_-]+:/{flag=0} flag && /^  - /{gsub(/^[ \t]*- [ \t]*|["\'\r]/, ""); print}' .kramak/work-items/WI-XXX.md | sort -u)

# 3. Compare ACTUAL against DECLARED (detect unauthorized files without bashisms)
TMP_DECL=$(mktemp 2>/dev/null || echo "${TMPDIR:-/tmp}/declared.$$")
printf "%s\n" "$DECLARED" > "$TMP_DECL"
UNAUTHORIZED=$(printf "%s\n" "$ACTUAL" | grep -F -v -x -f "$TMP_DECL")
rm -f "$TMP_DECL"

if [ -n "$UNAUTHORIZED" ]; then
  echo "SCOPE VIOLATION DETECTED! Unauthorized files modified:"
  echo "$UNAUTHORIZED"
  # Trigger Recovery Path C (SCOPE-EXCEEDED)
fi
```

```powershell
# --- Windows PowerShell Reference (supports .json and .md with YAML frontmatter) ---
$actual = @(git diff --name-only HEAD; git ls-files --others --exclude-standard) | ForEach-Object { $_.Replace('\', '/') } | Sort-Object -Unique
$state = Get-Content .kramak/state.json | ConvertFrom-Json
$activeId = $state.active
if (-not $activeId) {
  $wiFile = Get-ChildItem .kramak/work-items/ | Where-Object { $_.Name -like "WI-*.json" -or $_.Name -like "WI-*.md" } | Select-Object -First 1
} else {
  $wiFile = Get-ChildItem .kramak/work-items/ | Where-Object { $_.BaseName -eq $activeId -or $_.Name -like "$activeId.*" } | Select-Object -First 1
}
if ($wiFile -and $wiFile.Extension -eq ".json") {
  $declared = @((Get-Content $wiFile.FullName | ConvertFrom-Json).files_targeted) | ForEach-Object { $_.Replace('\', '/') }
} elseif ($wiFile) {
  $raw = Get-Content $wiFile.FullName -Raw
  $fmMatch = [regex]::Match($raw, '(?s)^---\r?\n(.*?)\r?\n---')
  if ($fmMatch.Success) {
    $targetBlock = [regex]::Match($fmMatch.Groups[1].Value, '(?s)files_targeted:\r?\n((?:\s*-\s*[^\r\n]+\r?\n?)+)')
    if ($targetBlock.Success) {
      $declared = [regex]::Matches($targetBlock.Groups[1].Value, '(?m)^\s*-\s*["'']?([^"'']+)["'']?') | ForEach-Object { $_.Groups[1].Value.Trim().Replace('\', '/') }
    } else { $declared = @() }
  } else { $declared = @() }
} else {
  $declared = @()
}
$unauthorized = $actual | Where-Object { $declared -notcontains $_ }

if ($unauthorized) {
  Write-Error "SCOPE VIOLATION DETECTED! Unauthorized files: $unauthorized"
}
```

#### Tier 2: Pre-Flight Concurrency Check (PARALLEL Mode — Prior to Dispatch)
Before dispatching $K$ concurrent Work Items into parallel worktrees:
1. For each pair $(WI_i, WI_j)$ where $i \neq j$:
   $$\text{files\_targeted}(WI_i) \cap \text{files\_targeted}(WI_j) = \emptyset$$
2. If any file overlap or glob collision exists between candidate items:
   - **Action:** Parallel dispatch rejected. Serialize the overlapping items or revert to sequential mode (`concurrency.budget = 1`).

#### Tier 3: Merge-Time Re-Verification (PARALLEL Mode — At Integration)
After rebasing or merging a completed worktree branch onto the integration branch tip:
```bash
# 1. Inspect integrated diff against baseline integration HEAD
git diff --name-only origin/main...HEAD

# 2. Run complete regression test suite against integrated codebase
npm test # (or detected project test command)
```

---

## SECTION 2: BUILD TOOL AUTO-DETECTION & RECIPES

### 2.1 Ecosystem Detection & Command Matrix

The executor dynamically detects runtime environments by checking indicator file presence in the workspace root:

| Indicator File | Runtime / Ecosystem | Test Command | Lint Command | Build Command | Dev / Start Command |
|---|---|---|---|---|---|
| `package.json` | Node.js / TypeScript | `npm test` | `npm run lint` | `npm run build` | `npm run dev` |
| `pyproject.toml` | Python (Modern) | `pytest` | `ruff check .` | `pip install -e .` | `python -m app` |
| `requirements.txt` / `setup.py` | Python (Legacy) | `pytest` | `flake8 .` | `pip install -r requirements.txt` | `python main.py` |
| `go.mod` | Go | `go test ./...` | `golangci-lint run` | `go build ./...` | `go run .` |
| `Cargo.toml` | Rust | `cargo test` | `cargo clippy -- -D warnings` | `cargo build` | `cargo run` |
| `build.gradle` / `build.gradle.kts` | JVM (Gradle) | `./gradlew test` | `./gradlew check` | `./gradlew build` | `./gradlew bootRun` |
| `pom.xml` | JVM (Maven) | `mvn test` | `mvn checkstyle:check` | `mvn package` | `mvn spring-boot:run` |
| `mix.exs` | Elixir | `mix test` | `mix credo --strict` | `mix compile` | `mix phx.server` |
| `Package.swift` | Swift | `swift test` | `swiftlint` | `swift build` | `swift run` |
| `composer.json` | PHP | `./vendor/bin/phpunit` | `./vendor/bin/phpcs` | `composer install` | `php -S localhost:8000` |
| `Makefile` | Generic / C / C++ | `make test` | `make lint` | `make build` | `make run` |

---

### 2.2 Special Build Tool Edge Cases

1. **Empty Test Suite / Missing Tests:**
   - If the project test command fails because no test directory or test files exist yet (e.g. fresh greenfield project):
   - **Rule:** Run fallback static verification (`toolchain.buildCommand`, syntax verification, or type checks). The Work Item creating initial project files MUST include a basic smoke test to establish the test suite baseline.
2. **Pre-Existing Baseline Lint Errors:**
   - If the linter reports errors in files *outside* `files_targeted`:
   - **Rule:** Do not fail the current Work Item for pre-existing errors in untouched files. Only fail if new lint errors were introduced in files listed in `files_targeted`.
3. **Monorepo Package Scoping:**
   - For monorepo workspaces (pnpm/turborepo/cargo workspaces), execute checks scoped to the specific package directory (e.g., `pnpm --filter @core/auth test` or `cargo test -p auth-service`).

---

## SECTION 3: WRITE-AHEAD LOGGING (WAL) & CRASH RECOVERY

### 3.1 Purpose & Architectural Justification

> **Why Git Alone Is Insufficient:**
> Git records repository commit snapshots. However, Kramak state evolves *between* commits (e.g. activating a Work Item, incrementing retry attempt counters, updating queue order, recording diagnostic error trajectories, and logging in-flight progress).
>
> If an agent session crashes or is terminated mid-task, Git would only restore to the last commit, losing intermediate state and causing redundant or conflicting re-execution.
>
> **WAL records intended state mutations atomically *before* filesystem updates, enabling the next session to resume exactly where it was interrupted without human intervention.**

---

### 3.2 WAL Mutation Protocol (Mandatory for ALL `state.json` Updates)

For every mutation to `.kramak/state.json`, execute this exact 6-step atomic sequence:

```
[ Step 1: Read ]       old_state = read(.kramak/state.json)
       │
[ Step 2: Compute ]    new_state = apply_mutation(old_state)
       │
[ Step 3: Write WAL ]  write(.kramak/state.json.wal, { mutation, intended_state, timestamp })
       │
[ Step 4: Write TMP ]  write(.kramak/state.json.tmp, JSON.stringify(new_state))
       │
[ Step 5: Rename ]     atomic_rename(.kramak/state.json.tmp ──► .kramak/state.json)
       │
[ Step 6: Delete WAL ] delete_if_exists(.kramak/state.json.wal)
```

#### Implementation Logic
```json
// Sample .kramak/state.json.wal payload:
{
  "timestamp": "2026-08-19T18:50:00.000Z",
  "mutation_type": "WI_ACTIVATE",
  "wi_id": "WI-102",
  "intended_state": {
    "version": "1.1.0",
    "phase": "executing",
    "active": "WI-102",
    "queue": ["WI-103", "WI-104"]
  }
}
```

---

### 3.3 Autonomous Crash Recovery Routine

Executed automatically during `BOOTSTRAP` or session initialization:

```
Crash Recovery Decision Logic:
 │
 ├── IF .kramak/state.json.tmp EXISTS AND is_valid_json(.kramak/state.json.tmp):
 │    │
 │    └──► The temporary write completed validly, but atomic rename was interrupted.
 │         ACTION: Rename .kramak/state.json.tmp ──► .kramak/state.json
 │         ACTION: Delete .kramak/state.json.wal if present.
 │
 ├── ELSE IF .kramak/state.json.tmp EXISTS AND NOT is_valid_json(.kramak/state.json.tmp):
 │    │
 │    └──► The temporary write was truncated mid-stream by a crash.
 │         ACTION: Delete corrupted .kramak/state.json.tmp.
 │         ACTION: Read intended_state from .kramak/state.json.wal (if present) ──► write to state.json.
 │         ACTION: Delete .kramak/state.json.wal.
 │
 ├── ELSE IF .kramak/state.json.wal EXISTS (and NO .tmp):
 │    │
 │    └──► The mutation was logged, but temporary write/rename failed.
 │         ACTION: Read intended_state from .kramak/state.json.wal
 │         ACTION: Write intended_state ──► .kramak/state.json
 │         ACTION: Delete .kramak/state.json.wal
 │
 └── ELSE (neither .tmp nor .wal exists):
      │
      └──► State is clean. Validate state.json against state.schema.json and proceed.
```

---

### 3.4 Research Amendments: Idempotency & Replay Safety

#### Amendment 7A: Idempotency Keys (T2-05 §7, T2-13 §5.4)
Before executing any `git commit`, file mutation, or external shell command:
1. Generate unique operation ID:
   $$\text{operation\_id} = \text{SHA256}(\text{intended\_action} + \text{WI\_id} + \text{attempt\_number})$$
2. Check: Has this `operation_id` been recorded in `.kramak/executor/PROGRESS.md`?
3. If **YES** $\rightarrow$ **SKIP execution** (operation was already executed prior to crash; avoid duplicate commits or side-effects).
4. If **NO** $\rightarrow$ Execute the operation, then record `operation_id` in `.kramak/executor/PROGRESS.md`.

#### Amendment 7B: Replay-Safe vs Non-Replayable Operations (T2-05 §7)
- **Replay-Safe Operations (Unconditionally safe to re-execute on recovery):**
  - Reading `state.json`, `ROUTER.md`, or spec files
  - Computing next phase transition or topological queue order
  - Parsing Work Item specifications
  - Inspecting `git status`, `git diff`, or `git worktree list`
- **Non-Replayable Operations (MUST check idempotency key before re-executing):**
  - `git commit` and `git push`
  - Writing or mutating workspace source code files
  - Package manager installations (`npm install`, `cargo add`, `pip install`)
  - Destructive commands (`rm`, `git checkout -- .`, `git clean`)
  - Database schema migrations or stateful test execution
- **Recovery Rule:** On crash recovery, replay orchestration logic freely, but always verify the idempotency key before firing any non-replayable operation.

#### Amendment 7C: Idempotent Recovery Guarantee (T2-13 §5.4)
The recovery routine itself is strictly idempotent. If a second crash occurs during recovery execution, re-running recovery produces the exact same deterministic state:
- Reading `.wal` is read-only (idempotent).
- Writing `intended_state` to `state.json` is an overwrite (idempotent).
- Renaming an already-renamed file is a no-op (idempotent).
- `delete_if_exists` on `.wal` or `.tmp` is idempotent.

---

## SECTION 4: PRE-COMMIT VERIFICATION (RIPER-5 CHECKLIST)

Before staging changes or running `git commit`, execute this mandatory 5-point verification procedure:

```markdown
### RIPER-5 PRE-COMMIT VERIFICATION CHECKLIST
- [ ] 1. Tests Pass: Run project test command (all assertions pass)
- [ ] 2. Lint Passes: Run project lint command (zero new lint errors introduced)
- [ ] 3. Tier 1 Scope Passes: git diff --name-only + untracked matches files_targeted exactly
- [ ] 4. State Schema Valid: state.json validates against schemas/state.schema.json
- [ ] 5. Governance Clean: No .kramak/ specs modified without Anti-Bias G1-G6 compliance
```

### Verification Execution Steps

1. **Step 1 — Test Verification:** Run `toolchain.checkCommands` (e.g. `npm test` or `pytest`). All test cases must pass.
2. **Step 2 — Lint & Type Verification:** Run project linter and type checker. Confirm no new errors or warnings were introduced in `files_targeted`.
3. **Step 3 — Scope Verification:** Run Tier 1 Scope Check. Confirm zero modified or untracked files outside `files_targeted`.
4. **Step 4 — State Schema Validation:** Validate `.kramak/state.json` against `.kramak/schemas/state.schema.json`. Ensure phase, active, queue, and metrics conform to JSON Schema Draft 2020-12.
5. **Step 5 — Governance File Protection:** Inspect diffs in `.kramak/`. If any core governance file (`ROUTER.md`, `CORE.md`, `schemas/`) was modified, verify that G1–G6 Anti-Bias procedures were executed and logged in `.kramak/ledger/self-modifications.jsonl`.

> **Failure Gate:** If ANY check fails, **DO NOT COMMIT**. Resolve the failure within scope or route to Work Item Failure (`STEP: FAIL`).
