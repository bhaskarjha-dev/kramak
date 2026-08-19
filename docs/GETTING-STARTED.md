# Getting Started with Kramak (क्रमक)

> **Process control for autonomous coding agents**  
> *Layer 3 — Process, alongside `AGENTS.md` (Context) and `MCP` (Connectivity)*

---

## 1. What is Kramak?

**Kramak (क्रमक)** is a file-based, model-agnostic, and IDE-agnostic process control framework for autonomous coding agents. It provides a deterministic finite state machine (FSM) that guides AI agents through the **Plan → Execute → Audit** lifecycle without human intervention.

- **`AGENTS.md` (Context)** tells agents **WHAT** your project is (tech stack, conventions, architecture).
- **`Model Context Protocol` (Connectivity)** gives agents **TOOLS** to interact with the environment.
- **`Kramak` (Process)** tells agents **HOW** to develop software methodically with externalized state, grounded verification, and strict scope checks.

> [!NOTE]
> **Zero Mandatory Dependencies:** Kramak consists purely of Markdown specifications and JSON Schemas (Draft 2020-12). No package installations, runtimes, or compilers are required.

---

## 2. 30-Second Quickstart (Pure Copy-Paste — No CLI)

### Step 1: Copy `.kramak/` into your project

Copy the `.kramak/` directory into your project root:

```bash
# Clone or copy the .kramak governance directory
cp -r /path/to/kramak/.kramak ./
```

Your project directory will now contain:
```
your-project/
├── .kramak/
│   ├── ROUTER.md                     # Master invariant router (always read first)
│   ├── AGENTS.md                     # Universal AAIF context bridge
│   ├── SKILL.md                      # Universal Agent Skills standard
│   ├── schemas/                      # JSON Schemas (state, work-item, work-item-state)
│   ├── planner/                      # Planning specifications (CORE.md, edge cases, contracts)
│   ├── executor/                     # Execution specifications (CORE.md, error recovery, playbooks)
│   ├── templates/                    # Work item, human task, and retro templates
│   ├── work-items/                   # Active and queued work items
│   ├── inbox/                        # User requests and bug reports
│   └── ledger/                       # Immutable self-modification audit ledger
└── (your project source code)
```

### Step 2: Configure your agent's entry point

If your project uses `AGENTS.md` (or your IDE's instructions file like `CLAUDE.md`, `.cursorrules`, or `.gemini/AGENTS.md`), add:

```markdown
# Autonomous Development
Before taking any action, read [.kramak/ROUTER.md](.kramak/ROUTER.md) and follow the active state in [.kramak/state.json](.kramak/state.json).
```

### Step 3: Say "Start" to your IDE agent

Invoke your AI coding agent (Claude Code, Cursor, Antigravity, Copilot, Devin, Cline, or Aider) and say **"Start"** or **"Plan next batch"**.

The agent will:
1. Inspect `.kramak/state.json` (or initialize with `phase: "bootstrap"` if missing).
2. Read `.kramak/ROUTER.md` to load the 4 Non-Negotiable Invariants.
3. Route to `.kramak/planner/CORE.md` to analyze requirements and generate Work Items in `.kramak/work-items/`.

---

## 3. Optional CLI Quickstart

If you prefer automated scaffolding and offline validation, use the optional companion CLI:

```bash
# Initialize Kramak in the current directory
npx @kramak/cli init

# Validate state.json and work items against JSON Schemas
npx @kramak/cli validate

# Diagnose environment and adapter setups
npx @kramak/cli doctor
```

*(The CLI is maintained separately under [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli) and is completely optional).*

---

## 4. How the Kramak Loop Operates

Kramak governs development through an 8-state closed-loop Finite State Automaton (FSM):

```mermaid
graph TD
    BOOTSTRAP["1. BOOTSTRAP<br/>(Stack & Toolchain Init)"] --> PLANNING["2. PLANNING<br/>(PERCEIVE ➔ REASON ➔ DECIDE)"]
    
    PLANNING -->|concurrency = 1| EXECUTING["4. EXECUTING<br/>(ReAct + Hard Scope Check)"]
    PLANNING -->|concurrency > 1| DISPATCH["3. DISPATCH<br/>(Git Worktree Setup)"]
    DISPATCH --> EXECUTING
    
    EXECUTING --> AUDITING["5. AUDITING<br/>(Fresh Context Test Run)"]
    
    AUDITING -->|Retry Budget OK| EXECUTING
    AUDITING -->|Retry Exhausted| PLANNING
    AUDITING -->|Sequential Pass| COMPLETE["8. COMPLETE<br/>(Batch Sealed)"]
    AUDITING -->|Parallel Pass| MERGE_QUEUE["6. MERGE_QUEUE<br/>(Serialized FIFO Merge)"]
    MERGE_QUEUE --> COMPLETE
    
    PLANNING -.-> WAITING["7. WAITING<br/>(Human Tasks / Low Canary)"]
    EXECUTING -.-> WAITING
    AUDITING -.-> WAITING
    WAITING -.-> PLANNING
    WAITING -.-> EXECUTING
    
    PLANNING -.-> ESCALATED["ESCALATED<br/>(Circuit Breaker Tripped)"]
    EXECUTING -.-> ESCALATED
    AUDITING -.-> ESCALATED
    ESCALATED -.-> WAITING
```

### 1. `BOOTSTRAP`
- Auto-detects project stack (Node, Python, Rust, Go, Java, etc.) and test commands.
- Initializes `.kramak/state.json` conforming to `.kramak/schemas/state.schema.json`.
- Runs state reconciliation against `git status` to recover from any previous interrupted session.

### 2. `PLANNING` (High-Reasoning Role)
- **PERCEIVE:** Scans codebase via read-only tools (`grep`, `view_file`) and processes any new items in `.kramak/inbox/`.
- **REASON:** Evaluates architecture, determines detail tier (🔴 Guided, 🟡 Directed, 🟢 Outcome), and checks Canary capability score.
- **DECIDE:** Authors Work Item specifications in `.kramak/work-items/WI-XXX.json` (or `.md`) with declared `files_targeted` and verification commands.
- Transitions state to `EXECUTING` (or `DISPATCH` if parallel concurrency $> 1$).

### 3. `DISPATCH` (Parallel Orchestration)
- Provisions isolated git worktrees at `.kramak/worktrees/<id>`.
- Performs Tier 2 pre-flight verification confirming zero file-scope overlap across concurrent Work Items.

### 4. `EXECUTING` (High-Precision Role)
- Implements changes strictly within the declared `files_targeted`.
- Runs declared verification commands (e.g., `npm test`, `pytest`).
- Enforces **Tier 1 Hard Scope Check**: verifies `git diff --name-only` against `files_targeted` and reverts any unlisted modifications.
- Updates session progress in `.kramak/executor/PROGRESS.md`.

### 5. `AUDITING` (Inspection Role)
- Runs in a fresh session to avoid confirmation bias.
- Executes full test and lint suites against the modified working tree.
- Manages bounded retries (cap: 3 attempts or error-reduction trajectory).
- Transitions to `MERGE_QUEUE` (parallel), `COMPLETE` (sequential), or loops back to `PLANNING` for spec elevation.

### 6. `MERGE_QUEUE` (Integration Role)
- Serializes completed worktree branches into the integration branch in FIFO order.
- Executes **Tier 3 Merge Re-verification** to ensure zero regression before queue advancement.

### 7. `WAITING` & `ESCALATED`
- **`WAITING`:** Triggered when human action is required (e.g., API key provisioning) or when model capability score is below threshold.
- **`ESCALATED`:** Triggered by the Progress-Aware Circuit Breaker when consecutive attempts fail or repeat identical error state hashes.

---

## 5. Progressive Disclosure Architecture

To prevent context saturation and comply with LLM token budgets (such as Claude Code's 25KB eager-load limit), Kramak splits specifications into a lean eager core and on-demand modules:

| Document | Path | Loading Trigger | Size |
|---|---|---|---|
| **Master Router** | `.kramak/ROUTER.md` | **Always loaded** on every turn | ≤ 1.8 KB |
| **Planner Core** | `.kramak/planner/CORE.md` | Active phase == `planning` or `bootstrap` | ≤ 8.5 KB |
| **Planner Edge Cases** | `.kramak/planner/edge-cases.md` | Refactor touches >10 files or migration | On-demand |
| **Output Contract** | `.kramak/planner/output-contract.md` | Authoring Work Items | On-demand |
| **Domain Conventions**| `.kramak/planner/domain-conventions.md` | Monorepos, polyglot stacks | On-demand |
| **Executor Core** | `.kramak/executor/CORE.md` | Active phase == `executing` or `auditing` | ≤ 6.5 KB |
| **Error Recovery** | `.kramak/executor/error-recovery.md` | Test failure or build error | On-demand |
| **Tool Playbooks** | `.kramak/executor/tool-playbooks.md` | Git worktrees, patch application | On-demand |
| **Session Scratchpad**| `.kramak/executor/PROGRESS.md` | Active execution session | Dynamic |

---

## 6. User Interaction: INBOX & Human Tasks

### Submitting Mid-Project Guidance (INBOX)
You do not need to interrupt the agent while it is running. Drop notes or bug reports into `.kramak/inbox/` (or `INBOX.md`):

```markdown
### [2026-08-19] Bug: Session cookie missing SameSite attribute
**Type:** bug
**Priority:** high
Chrome rejects authentication cookies on cross-origin redirects.
```

The Planner checks `inbox/` during the PERCEIVE step of every planning cycle and immediately incorporates pending items.

### Non-Blocking Human Tasks
When an agent encounters a step it cannot perform autonomously (e.g., obtaining an OAuth secret, signing up for a SaaS account), it:
1. Records the task in `HUMAN-TASKS.md` (using `.kramak/templates/HUMAN-TASKS.template.md`).
2. Marks `humanTasksPending: true` in `state.json`.
3. Continues executing any non-blocked Work Items.
4. Only transitions to `WAITING` if zero unblocked tasks remain in the queue.

---

## 7. Migration & Deprecation Notices

> [!WARNING]
> **Upgrading from v1.0.0 to v1.1.0:**
> - **Workspace Path:** The pipeline workspace has moved from `.agents/pipeline/` to `.kramak/`.
> - **Specification Paths:** Monolithic files in `spec/` (`PLANNER.md`, `EXECUTOR.md`, `PRINCIPLES.md`) are now modularized under `.kramak/planner/` and `.kramak/executor/`.
> - **Compatibility Shims:** The `spec/` directory in the core repo contains forwarding notices for legacy tools.
> - **Standalone Scripts:** `init.sh`, `init.ps1`, and `validate.js` have been moved to the standalone [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli) repository per Decision D-009.

---

## 8. Pre-Commit Hook (Optional)

To enforce automated schema validation and test verification before git commits:

```bash
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

The hook automatically reads your check commands from `.kramak/state.json` and ensures pipeline invariants are maintained on every commit.
