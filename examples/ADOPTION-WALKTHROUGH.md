# Example: Adopting Kramak in Your Project

This step-by-step walkthrough demonstrates what happens when you adopt Kramak in an existing production project (`task-vault`).

---

## 1. Before Kramak

Your project has application code, tests, and an `AGENTS.md`, but no deterministic process engine to keep AI agents on track:

```
task-vault/
├── src/
│   ├── index.ts
│   ├── server.ts
│   └── routes/
│       └── tasks.ts
├── test/
│   └── tasks.test.ts
├── package.json
├── tsconfig.json
├── AGENTS.md                  ← [Context] Tells agents WHAT the project is
└── README.md
```

**The Pain Point:** When you ask an AI agent to "add rate limiting", it might edit `server.ts`, modify `package.json`, reformat `tsconfig.json`, delete unrelated tests, and get stuck in a trial-and-error loop.

---

## 2. Step 1: Add the Kramak Governance Engine

Copy the `.kramak/` directory into your project root:

```bash
# macOS / Linux (Bash)
cp -r /path/to/kramak/.kramak ./

# Windows (PowerShell)
Copy-Item -Recurse -Force "path\to\kramak\.kramak" ".\"
```

---

## 3. Step 2: Connect Your Agent

Since `task-vault` already has an `AGENTS.md` at root, simply append the 2-line Kramak hook to `AGENTS.md`:

```markdown
## Autonomous Process Control
Before taking any action, read [.kramak/ROUTER.md](.kramak/ROUTER.md) and follow [.kramak/state.json](.kramak/state.json).
```

*(If you use Cursor or Claude Code, you can also drop in `.cursorrules` or `CLAUDE.md` from `adapters/`).*

---

## 4. Step 3: Seed a Requirement in INBOX

Drop your new requirement into `.kramak/inbox/feature-rate-limiter.md`:

```markdown
<!-- .kramak/inbox/feature-rate-limiter.md -->
# Feature Request: IP-Based Rate Limiting

**Type:** Feature
**Priority:** High

## Requirements
1. Implement a token-bucket rate limiter middleware in `src/middleware/rate-limiter.ts`.
2. Allow up to 100 requests per minute per client IP address.
3. Return HTTP status 429 (`Too Many Requests`) with `Retry-After` header when limit exceeded.
4. Provide unit tests in `test/middleware/rate-limiter.test.ts`.
```

---

## 5. Step 4: Say "Start"

In your AI chat interface, simply type:
> **`Start`**

### What Happens Behind the Scenes:

#### A. `BOOTSTRAP` Phase
The agent inspects the workspace, auto-detects `npm test` and `npm run build`, and creates `.kramak/state.json`:

```json
{
  "version": "1.1.0",
  "phase": "planning",
  "nextAction": "Run Capability Gate and plan batch.",
  "productPhase": "BUILD",
  "currentBranch": "pipeline/batch-01",
  "batchNumber": 1,
  "toolchain": {
    "packageManager": "npm",
    "buildCommand": "npm run build",
    "checkCommands": ["npm test"],
    "detected": true
  }
}
```

#### B. `PLANNING` Phase
The agent runs the Canary Capability Gate (CT-1 to CT-5), processes `.kramak/inbox/feature-rate-limiter.md`, and structures it into `.kramak/work-items/WI-001.json`:

```json
{
  "id": "WI-001",
  "title": "Implement Token-Bucket Rate Limiter Middleware",
  "tier": "directed",
  "files_targeted": [
    "src/middleware/rate-limiter.ts",
    "test/middleware/rate-limiter.test.ts",
    "src/server.ts"
  ],
  "acceptance_criteria": [
    "Token-bucket rate limiter allows 100 req/min per IP",
    "Returns HTTP 429 with Retry-After header on threshold breach",
    "All unit tests pass with npm test"
  ],
  "verification_commands": [
    "npm test test/middleware/rate-limiter.test.ts"
  ]
}
```

#### C. `EXECUTING` Phase
The agent writes `src/middleware/rate-limiter.ts` and `test/middleware/rate-limiter.test.ts`, runs `npm test`, and enforces the **Tier 1 Hard Scope Check**:

```
$ git diff --name-only
src/middleware/rate-limiter.ts
test/middleware/rate-limiter.test.ts
src/server.ts

[Scope Verification Check]
All 3 modified files are explicitly listed in WI-001.files_targeted.
Scope check: PASSED.
```

#### D. `AUDITING` Phase
The agent runs a clean verification pass across the entire test suite, confirms zero regressions, records completion in `state.json`, and outputs the batch summary:

```
✅ Work Item WI-001 completed and verified.
- 3 files modified (within declared scope)
- 8 new unit tests added (all passing)
- Zero build or lint errors
- Ready for integration / review.
```

---

## 6. After the First Run

Your project structure now has full historical auditability and deterministic governance:

```
task-vault/
├── src/
│   ├── middleware/
│   │   └── rate-limiter.ts           ← New feature implemented
│   ├── routes/
│   ├── index.ts
│   └── server.ts
├── test/
│   ├── middleware/
│   │   └── rate-limiter.test.ts      ← New test suite
│   └── tasks.test.ts
├── .kramak/                          ← Kramak runtime state
│   ├── ROUTER.md
│   ├── state.json                    ← Active state & metrics
│   ├── work-items/
│   │   └── WI-001.json               ← Sealed Work Item specification
│   ├── inbox/                        ← Processed inbox
│   └── ledger/                       ← Audit trail
├── AGENTS.md                         ← Project context + Kramak hook
├── package.json
└── tsconfig.json
```

Whenever you want to build the next feature, simply drop a note into `.kramak/inbox/` and say `"Start"`.