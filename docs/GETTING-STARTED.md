# Getting Started with Kramak

> **Process control for autonomous coding agents**  
> *Layer 3 — Process Control, alongside `AGENTS.md` (Context) and `MCP` (Connectivity)*

---

## 1. Understanding the Architecture in 30 Seconds

Kramak separates your repository into two clean domains: **Your Application** and **The Governance Subsystem (`.kramak/`)**.

```
your-project/
├── src/                              ← Your application source code
├── package.json / Cargo.toml         ← Your toolchain configuration
├── AGENTS.md                         ← [Layer 1 Context] Tells agents WHAT your app is
│
└── .kramak/                          ← [Layer 3 Process] Private governance engine
    ├── ROUTER.md                     ← Master entry router (always read first)
    ├── AGENTS.md                     ← Internal AAIF bridge defining Kramak's rules
    ├── SKILL.md                      ← Universal agent skill definition
    ├── state.json                    ← Active FSM state (cross-session memory)
    ├── schemas/                      ← JSON Schemas (Draft 2020-12)
    ├── planner/                      ← Planning role specs (CORE.md, capability gate)
    ├── executor/                     ← Execution role specs (CORE.md, error recovery)
    ├── work-items/                   ← Active & queued Work Items (WI-001.json)
    ├── inbox/                        ← User requirements and bug reports
    ├── templates/                    ← Task and retrospective templates
    └── ledger/                       ← Immutable audit trail
```

> [!NOTE]
> **Why is there an `AGENTS.md` inside `.kramak/`?**  
> - **Your Root `AGENTS.md`:** Describes *your application* (tech stack, business logic, endpoints).  
> - **The `.kramak/AGENTS.md`:** Describes *Kramak's process engine* to AI agents browsing `.kramak/` and acts as an import target for IDE adapters like Claude Code (`@.kramak/AGENTS.md`).

---

## 2. 45-Second Quickstart (Pure Copy-Paste)

### Step 1: Copy `.kramak/` into your project

```bash
# macOS / Linux (Bash)
cp -r /path/to/kramak/.kramak ./

# Windows (PowerShell)
Copy-Item -Recurse -Force "path\to\kramak\.kramak" ".\"
```

---

### Step 2: Connect Your IDE Agent

Choose **Path A** (if your project already has an instructions file) or **Path B** (if setting up for a specific IDE):

#### Path A: You already have an `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`
Append this 2-line hook to the bottom of your existing file:

```markdown
## Autonomous Process Control
Before taking action, read [.kramak/ROUTER.md](../.kramak/ROUTER.md) and follow the active state in .kramak/state.json.
```

#### Path B: Setting up for a specific IDE (One-Command Setup)

| IDE | Copy Command (Bash / PowerShell) | Target File Location |
|---|---|---|
| **Cursor** | `cp adapters/cursor/.cursorrules ./` | `.cursorrules` |
| **Claude Code** | `cp adapters/claude-code/CLAUDE.md ./` | `CLAUDE.md` |
| **Google Antigravity** | `mkdir -p .agents/skills/kramak && cp adapters/antigravity/SKILL.md .agents/skills/kramak/SKILL.md` | `.agents/skills/kramak/SKILL.md` |
| **GitHub Copilot** | `mkdir -p .github && cp adapters/copilot/copilot-instructions.md .github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| **Devin Desktop** | `cp adapters/devin/AGENTS.md ./AGENTS.md` | `AGENTS.md` |
| **Cline** | `cp adapters/cline/.clinerules ./` | `.clinerules` |
| **Aider** | `cp adapters/aider/CONVENTIONS.md ./CONVENTIONS.md` | `CONVENTIONS.md` |

---

### Step 3: Say "Start" to your IDE agent

In your AI chat window, simply prompt:
> **`Start`** *(or "Plan next batch")*

---

## 3. First-Run Telemetry: What You Will See

When you prompt `"Start"`, the agent cycles autonomously through the 4-phase loop:

```
[Agent Terminal Telemetry]

▶ 1. BOOTSTRAP PHASE
  - Reading .kramak/ROUTER.md
  - Auto-detected toolchain: npm (test: "npm test", build: "npm run build")
  - Initialized .kramak/state.json with phase="planning"

▶ 2. PLANNING PHASE
  - Executing Canary Capability Gate (CT-1 to CT-5) -> Composite Score: 0.92 (Full Autonomy)
  - Inspecting .kramak/inbox/ for pending user requirements
  - PERCEIVE -> REASON -> DECIDE
  - Generated batch plan: plans/PLAN-batch-01.md
  - Emitted Work Items: .kramak/work-items/WI-001.json (files_targeted: ["src/auth.js", "test/auth.test.js"])
  - Transitioning state.json -> phase="executing"

▶ 3. EXECUTING PHASE (Work Item WI-001)
  - Modifying declared files: src/auth.js
  - Writing unit tests: test/auth.test.js
  - Running verification: npm test -> PASS (12 tests passing)
  - Tier 1 Scope Check: git diff --name-only vs files_targeted -> PASSED (0 unlisted files)
  - Transitioning state.json -> phase="auditing"

▶ 4. AUDITING PHASE
  - Fresh-session verification pass
  - Validating acceptance criteria
  - Running full test suite -> PASS
  - Batch 01 sealed. Transitioning state.json -> phase="complete" (or next batch)
```

---

## 4. How to Feed Tasks: The 3 Interaction Modes

Kramak supports 3 complementary ways to communicate requirements:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          3 WAYS TO FEED WORK TO KRAMAK                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Conversational Chat : "Plan a batch adding JWT auth middleware"         │
│ 2. Async INBOX         : Drop .kramak/inbox/bug-login.md while running     │
│ 3. Non-Blocking Tasks  : Resolve dependencies in HUMAN-TASKS.md            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mode 1: Interactive Chat
Give a high-level goal in your IDE prompt:
> *"Plan and execute a batch that implements token-bucket rate limiting on the `/api/v1/` routes."*

### Mode 2: Async INBOX (Non-Interrupting)
You don't need to stop or interrupt the agent while it is executing code. Drop a Markdown note into `.kramak/inbox/`:

```markdown
<!-- .kramak/inbox/bug-session-cookie.md -->
### Bug: Session cookie missing SameSite attribute
**Type:** bug
**Priority:** high
Chrome rejects authentication cookies on cross-origin redirects.
```
The Planner inspects `.kramak/inbox/` during the `ORIENT` step of every cycle and prioritizes pending items automatically.

### Mode 3: Non-Blocking Human Tasks
When an agent encounters a step it cannot perform autonomously (e.g., creating a Stripe webhook secret), it:
1. Records the task in `HUMAN-TASKS.md` using `.kramak/templates/HUMAN-TASKS.template.md`.
2. Marks `humanTasksPending: true` in `state.json`.
3. Continues executing all non-blocked Work Items.
4. Only transitions to `WAITING` when zero unblocked tasks remain.

---

## 5. Multi-IDE Handoffs (Power-User Workflow)

Because Kramak externalizes state into `.kramak/state.json` (JSON Schema Draft 2020-12), you can switch models and IDEs mid-project without losing context:

```
[Claude Code]               [Cursor]                    [Google Antigravity]
High-Reasoning Planning  ──► Fast Code Generation    ──► Fresh-Context Verification Pass
(Claude Opus 4.6)           (Claude Sonnet / GPT-4o)    (Gemini 3.7 Pro / Subagents)
```

1. **Plan in Claude Code:** Run `CLAUDE.md` to analyze requirements and generate `.kramak/work-items/`.
2. **Execute in Cursor:** Open Cursor, say `"Start"`, and let Cursor pick up the active Work Items and write code with fast feedback.
3. **Audit in Antigravity:** Trigger Antigravity to run a clean audit pass and merge parallel worktrees.

---

## 6. Safety & Failure Recovery

- **What happens if an agent tries to edit unlisted files?**  
  The executor's **Tier 1 Hard Scope Check** compares `git diff --name-only` against the active Work Item's `files_targeted` and automatically reverts unlisted changes via `git checkout -- <file>`.
- **What happens if an agent gets stuck in a loop?**  
  The **Progress-Aware Circuit Breaker** tracks failure counts and error state hashes. After 3 failed attempts (or oscillating hash repeats), it halts safely, transitions to `phase: "escalated"`, and alerts the developer with a structured diagnostic reason.
- **What happens if my IDE crashes mid-run?**  
  Kramak uses **Write-Ahead Logging (WAL)** (`state.json.tmp` atomic rename). When you reopen your IDE and say `"Start"`, Kramak reconciles `state.json` with `git status` and seamlessly resumes from the exact active Work Item.